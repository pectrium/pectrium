import { createHash } from "node:crypto";
import { assertWorkflow, workflowDefinition } from "@pectrium/core";

export class FlowError extends Error {
  constructor(message, { workflowId, stepId = null, attempt = null, cause, tentativeCheckpoint, acknowledgedCheckpoint } = {}) {
    super(message, { cause });
    this.name = new.target.name;
    this.workflowId = workflowId;
    this.stepId = stepId;
    this.attempt = attempt;
    if (tentativeCheckpoint !== undefined) this.tentativeCheckpoint = tentativeCheckpoint;
    if (acknowledgedCheckpoint !== undefined) this.acknowledgedCheckpoint = acknowledgedCheckpoint;
  }
}
export class HandlerExecutionError extends FlowError {}
export class OutputCaptureError extends FlowError {}
export class CheckpointPersistenceError extends FlowError {}
export class RecoveryRequiredError extends FlowError {}
export class IncompatibleCheckpointError extends FlowError {}

const own = (object, key) => Object.prototype.hasOwnProperty.call(object, key);
function exactKeys(object, keys) {
  return object && typeof object === "object" && !Array.isArray(object) &&
    Object.keys(object).length === keys.length && keys.every(k => own(object, k));
}
function jsonCopy(value) {
  const seen = new WeakSet();
  function validate(v) {
    if (v === null || typeof v === "string" || typeof v === "boolean") return;
    if (typeof v === "number" && Number.isFinite(v)) return;
    if (!v || typeof v !== "object" || seen.has(v)) throw new TypeError("Value is not JSON-safe");
    if (Object.getPrototypeOf(v) !== Object.prototype && Object.getPrototypeOf(v) !== null && !Array.isArray(v))
      throw new TypeError("Value must contain plain JSON objects");
    seen.add(v);
    if (Array.isArray(v)) {
      if (Object.keys(v).length !== v.length) throw new TypeError("Sparse or extended arrays are not JSON-safe");
      for (let i = 0; i < v.length; i++) validate(v[i]);
    } else {
      for (const key of Object.keys(v)) {
        if (["__proto__", "constructor", "prototype"].includes(key)) throw new TypeError("Unsafe JSON key");
        const descriptor = Object.getOwnPropertyDescriptor(v, key);
        if (!own(descriptor, "value")) throw new TypeError("Accessors are not JSON-safe");
        validate(descriptor.value);
      }
    }
    seen.delete(v);
  }
  validate(value);
  return JSON.parse(JSON.stringify(value));
}
const fingerprint = workflow => createHash("sha256").update(workflowDefinition(workflow)).digest("hex");
const stepKeys = ["status", "attempts"];
function validateCheckpoint(cp, workflow, ids, hash, ordered) {
  const context = {workflowId:workflow.id};
  const invalid = message => { throw new IncompatibleCheckpointError(message, context); };
  if (!exactKeys(cp, ["version", "workflowId", "revision", "fingerprint", "stepIds", "steps"]) ||
      cp.version !== 1 || cp.workflowId !== workflow.id || cp.revision !== workflow.revision ||
      cp.fingerprint !== hash || !Array.isArray(cp.stepIds) ||
      JSON.stringify(cp.stepIds) !== JSON.stringify(ids)) invalid("Checkpoint identity, revision or definition mismatch");
  if (!cp.steps || typeof cp.steps !== "object" || Array.isArray(cp.steps) ||
      Object.keys(cp.steps).length !== ids.length || !ids.every(id => own(cp.steps,id)))
    invalid("Invalid checkpoint step set");
  for (const step of ordered) {
    const s = cp.steps[step.id];
    if (!s || typeof s !== "object" || Array.isArray(s)) invalid("Invalid step state");
    const expected = [...stepKeys, ...(own(s,"value") ? ["value"] : []),
      ...(own(s,"error") ? ["error"] : []), ...(own(s,"failureReason") ? ["failureReason"] : [])];
    if (!exactKeys(s, expected) || !["pending","running","succeeded","failed","cancelled"].includes(s.status) ||
        !Number.isSafeInteger(s.attempts) || s.attempts < 0 ||
        s.attempts > (step.retries ?? 0) + 1) invalid("Invalid step status or attempt count");
    if ((s.status === "pending" && s.attempts > (step.retries ?? 0)) ||
        (s.status === "running" && s.attempts === 0) ||
        (s.status === "succeeded" && s.attempts === 0) ||
        (s.status === "failed" && s.attempts !== (step.retries ?? 0) + 1) ||
        (s.status === "cancelled" && s.attempts !== 0)) invalid("Impossible step attempt state");
    if (s.status === "succeeded") {
      if (!own(s,"value") || own(s,"error") || own(s,"failureReason")) invalid("Invalid succeeded state");
      try { jsonCopy(s.value); } catch { invalid("Invalid checkpoint result"); }
    } else if (own(s,"value")) invalid("Unexpected step result");
    if (s.status === "failed" || (s.status === "pending" && s.attempts > 0)) {
      if (s.failureReason !== "handler" || typeof s.error !== "string") invalid("Invalid failure reason");
    } else if (own(s,"error") || own(s,"failureReason")) invalid("Unexpected failure metadata");
    if (["running","succeeded","failed"].includes(s.status) &&
        (step.dependsOn ?? []).some(dep => cp.steps[dep].status !== "succeeded"))
      invalid("Inconsistent checkpoint dependencies");
  }
  const incomplete = ordered.findIndex(s => cp.steps[s.id].status !== "succeeded");
  if (incomplete >= 0 && ordered.slice(incomplete + 1).some(s => cp.steps[s.id].status !== "pending"))
    invalid("Impossible execution ordering");
  try { jsonCopy(cp); } catch { invalid("Checkpoint contains non-JSON data"); }
  for (const step of ordered) {
    if (cp.steps[step.id].status === "running")
      throw new RecoveryRequiredError("Interrupted running step requires explicit resolution", {
        workflowId:workflow.id,stepId:step.id,attempt:cp.steps[step.id].attempts,
        acknowledgedCheckpoint:jsonCopy(cp)
      });
  }
}

/**
 * Sequential, in-process execution. Retryable handlers are at-least-once.
 * A running checkpoint is never automatically replayed. Cancellation is cooperative.
 * Callers must change workflow.revision when handler behavior or execution semantics change.
 */
export async function executeWorkflow(workflow, { checkpoint, onCheckpoint = async () => {}, signal } = {}) {
  const ordered = assertWorkflow(workflow);
  if (typeof onCheckpoint !== "function") throw new TypeError("onCheckpoint must be a function");
  const ids = ordered.map(s => s.id);
  const hash = fingerprint(workflow);
  const steps = Object.fromEntries(ids.map(id => [id, {status:"pending", attempts:0}]));
  if (checkpoint !== undefined) {
    validateCheckpoint(checkpoint,workflow,ids,hash,ordered);
    const restored = jsonCopy(checkpoint.steps);
    for (const id of ids) steps[id] = restored[id];
  }
  let acknowledgedCheckpoint = checkpoint === undefined ? null : jsonCopy(checkpoint);
  const snapshot = () => jsonCopy({
    version:1,workflowId:workflow.id,revision:workflow.revision,fingerprint:hash,stepIds:ids,steps
  });
  async function persist(step) {
    const tentativeCheckpoint = snapshot();
    try {
      await onCheckpoint(jsonCopy(tentativeCheckpoint));
      acknowledgedCheckpoint = tentativeCheckpoint;
    } catch (cause) {
      throw new CheckpointPersistenceError("Checkpoint persistence failed; execution must stop", {
        workflowId:workflow.id,stepId:step?.id ?? null,attempt:step ? steps[step.id].attempts : null,
        cause,tentativeCheckpoint,acknowledgedCheckpoint
      });
    }
  }
  for (const step of ordered) {
    const state = steps[step.id];
    if (state.status === "succeeded") continue;
    if (state.status !== "pending") break;
    if (signal?.aborted) { state.status = "cancelled"; await persist(step); break; }
    if ((step.dependsOn ?? []).some(id => steps[id].status !== "succeeded")) break;
    const maxAttempts = (step.retries ?? 0) + 1;
    while (state.attempts < maxAttempts) {
      if (signal?.aborted) { state.status = "cancelled"; await persist(step); break; }
      state.attempts++;
      state.status = "running";
      await persist(step); // A failed intent write prevents handler invocation.
      let result, handlerError;
      try {
        result = await step.run({signal, results:jsonCopy(Object.fromEntries(
          ids.filter(id => steps[id].status === "succeeded").map(id => [id, steps[id].value])
        ))});
      } catch (error) {
        handlerError = error;
      }
      if (handlerError !== undefined) {
        state.error = String(handlerError instanceof Error ? handlerError.message : handlerError);
        state.failureReason = "handler";
        state.status = state.attempts < maxAttempts ? "pending" : "failed";
        await persist(step); // Not inside the handler retry catch.
        if (state.status === "failed") break;
        continue;
      }
      try {
        state.value = jsonCopy(result);
      } catch (cause) {
        throw new OutputCaptureError("Handler completed but output is not JSON-safe; do not retry", {
          workflowId:workflow.id,stepId:step.id,attempt:state.attempts,cause,
          tentativeCheckpoint:snapshot(),acknowledgedCheckpoint
        });
      }
      state.status = "succeeded";
      delete state.error;
      delete state.failureReason;
      await persist(step); // No retry on persistence failure after side effects.
      break;
    }
    if (state.status !== "succeeded") break;
  }
  const statuses = ids.map(id => steps[id].status);
  const status = statuses.every(s => s === "succeeded") ? "succeeded" :
    statuses.includes("failed") ? "failed" : statuses.includes("cancelled") ? "cancelled" : "pending";
  return {status,checkpoint:snapshot()};
}
