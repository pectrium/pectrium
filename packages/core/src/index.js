export const TERMINAL_STATES = Object.freeze(["succeeded", "failed", "cancelled"]);

export function assertWorkflow(workflow) {
  if (!workflow || typeof workflow !== "object" || Array.isArray(workflow)) throw new TypeError("Workflow must be an object");
  if (typeof workflow.id !== "string" || !workflow.id.trim()) throw new TypeError("Workflow id is required");
  if (!Array.isArray(workflow.steps) || workflow.steps.length === 0) throw new TypeError("Workflow requires steps");
  const ids = new Set();
  for (const step of workflow.steps) {
    if (!step || typeof step.id !== "string" || !step.id.trim() || ids.has(step.id)) throw new TypeError("Step ids must be unique nonempty strings");
    ids.add(step.id);
    if (typeof step.run !== "function") throw new TypeError("Every step requires a run function");
    if (step.dependsOn !== undefined && (!Array.isArray(step.dependsOn) || step.dependsOn.some(d => typeof d !== "string"))) throw new TypeError("dependsOn must be an array of ids");
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
      if (dep === id) throw new TypeError("Step cannot depend on itself");
      visit(dep);
    }
    visiting.delete(id);
    visited.add(id);
    ordered.push(step);
  }
  for (const step of workflow.steps) visit(step.id);
  return ordered;
}
