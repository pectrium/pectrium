export const TERMINAL_STATES = Object.freeze(["succeeded", "failed", "cancelled"]);

export function assertWorkflow(workflow) {
  if (!workflow || typeof workflow !== "object" || Array.isArray(workflow)) throw new TypeError("Workflow must be an object");
  if (typeof workflow.id !== "string" || !workflow.id.trim()) throw new TypeError("Workflow id is required");
  if (typeof workflow.revision !== "string" || !workflow.revision.trim()) throw new TypeError("Immutable workflow revision is required");
  if (!Array.isArray(workflow.steps) || workflow.steps.length === 0) throw new TypeError("Workflow requires steps");
  const ids = new Set();
  for (const step of workflow.steps) {
    if (!step || typeof step.id !== "string" || !step.id.trim() || ids.has(step.id) ||
        ["__proto__", "constructor", "prototype"].includes(step.id)) throw new TypeError("Step ids must be unique safe nonempty strings");
    ids.add(step.id);
    if (typeof step.run !== "function") throw new TypeError("Every step requires a run function");
    if (step.dependsOn !== undefined && (!Array.isArray(step.dependsOn) ||
        step.dependsOn.some(d => typeof d !== "string" || !d.trim()) ||
        new Set(step.dependsOn).size !== step.dependsOn.length)) throw new TypeError("dependsOn must contain unique nonempty ids");
    if (step.retries !== undefined && (!Number.isSafeInteger(step.retries) || step.retries < 0)) throw new TypeError("retries must be a nonnegative integer");
  }
  const byId = new Map(workflow.steps.map(s => [s.id, s]));
  const visiting = new Set(), visited = new Set(), ordered = [];
  function visit(id) {
    if (visiting.has(id)) throw new TypeError("Workflow contains a cycle");
    if (visited.has(id)) return;
    visiting.add(id);
    const step = byId.get(id);
    for (const dep of step.dependsOn ?? []) {
      if (!byId.has(dep)) throw new TypeError("Unknown dependency: " + dep);
      visit(dep);
    }
    visiting.delete(id);
    visited.add(id);
    ordered.push(step);
  }
  for (const step of workflow.steps) visit(step.id);
  return ordered;
}

/** Canonical definition, independent of declaration order and object property insertion order. */
export function workflowDefinition(workflow) {
  const steps = assertWorkflow(workflow);
  return JSON.stringify(steps.map(s => ({
    id: s.id,
    dependsOn: [...(s.dependsOn ?? [])].sort(),
    retries: s.retries ?? 0
  })).sort((a,b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
}
