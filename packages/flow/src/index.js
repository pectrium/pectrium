import { assertWorkflow } from "../../core/src/index.js";

/**
 * Sequential, deterministic in-process DAG executor.
 * Checkpoints are plain JSON data; callers own durable storage and idempotency.
 * A restored 'running' step is rejected: its external side effects may have occurred.
 */
export async function executeWorkflow(workflow, { checkpoint, onCheckpoint = async () => {}, signal } = {}) {
  const ordered = assertWorkflow(workflow);
  if (typeof onCheckpoint !== "function") throw new TypeError("onCheckpoint must be a function");
  const ids = ordered.map(step => step.id);
  const initial = () => Object.fromEntries(ids.map(id => [id, {status:"pending", attempts:0}]));
  let steps = initial();
  if (checkpoint !== undefined) {
    if (!checkpoint || checkpoint.version !== 1 || checkpoint.workflowId !== workflow.id ||
        JSON.stringify(checkpoint.stepIds) !== JSON.stringify(ids) ||
        !checkpoint.steps || typeof checkpoint.steps !== "object") throw new TypeError("Incompatible checkpoint");
    steps = structuredClone(checkpoint.steps);
    if (Object.keys(steps).length !== ids.length) throw new TypeError("Invalid checkpoint steps");
    for (const id of ids) {
      const s = steps[id];
      if (!s || !["pending","succeeded","failed","cancelled"].includes(s.status) ||
          !Number.isSafeInteger(s.attempts) || s.attempts < 0) throw new TypeError("Unsafe checkpoint state");
    }
    for (const step of ordered) {
      if (steps[step.id].status === "succeeded" &&
          (step.dependsOn ?? []).some(dep => steps[dep].status !== "succeeded")) throw new TypeError("Inconsistent checkpoint dependencies");
    }
  }
  const snapshot = () => structuredClone({version:1, workflowId:workflow.id, stepIds:ids, steps});
  const persist = async () => { await onCheckpoint(snapshot()); };
  for (const step of ordered) {
    const state = steps[step.id];
    if (state.status === "succeeded") continue;
    if (state.status !== "pending") break;
    if (signal?.aborted) { state.status = "cancelled"; await persist(); break; }
    if ((step.dependsOn ?? []).some(id => steps[id].status !== "succeeded")) break;
    const maxAttempts = (step.retries ?? 0) + 1;
    while (state.attempts < maxAttempts) {
      if (signal?.aborted) { state.status = "cancelled"; await persist(); break; }
      state.attempts++;
      // Persist intent before running: failures here must prevent execution.
      state.status = "running";
      await persist();
      try {
        const value = await step.run({signal, results: Object.fromEntries(
          ids.filter(id => steps[id].status === "succeeded").map(id => [id, steps[id].value])
        )});
        state.value = value === undefined ? null : structuredClone(value);
        state.status = "succeeded";
        delete state.error;
        await persist();
        break;
      } catch (error) {
        // Checkpoint persistence failures must not be interpreted as step failures.
        if (state.status === "succeeded") throw error;
        state.error = String(error instanceof Error ? error.message : error);
        state.status = state.attempts < maxAttempts ? "pending" : "failed";
        await persist();
        if (state.status === "failed") break;
      }
    }
    if (state.status !== "succeeded") break;
  }
  const statuses = ids.map(id => steps[id].status);
  const status = statuses.every(s => s === "succeeded") ? "succeeded" :
    statuses.includes("failed") ? "failed" : statuses.includes("cancelled") ? "cancelled" : "pending";
  return {status, checkpoint:snapshot()};
}
