import test from "node:test";
import assert from "node:assert/strict";
import { assertWorkflow, workflowDefinition } from "./index.js";
const run = () => {};
const w = steps => ({id:"w",revision:"v1",steps});
test("deterministic dependency ordering and canonical definition",()=>{
  const a=w([{id:"b",dependsOn:["a"],run},{id:"a",run}]);
  const b=w([{id:"a",run},{id:"b",dependsOn:["a"],run}]);
  assert.deepEqual(assertWorkflow(a).map(s=>s.id),["a","b"]);
  assert.equal(workflowDefinition(a),workflowDefinition(b));
});
test("rejects cycles, missing dependencies, duplicate ids, and unsafe ids",()=>{
  for(const steps of [
    [{id:"a",dependsOn:["b"],run},{id:"b",dependsOn:["a"],run}],
    [{id:"a",dependsOn:["missing"],run}],
    [{id:"a",run},{id:"a",run}],
    [{id:"__proto__",run}],
    [{id:"a",dependsOn:["a"],run}],
    [{id:"a",dependsOn:["b","b"],run},{id:"b",run}]
  ]) assert.throws(()=>assertWorkflow(w(steps)));
});
test("requires revision, runner and valid retries",()=>{
  assert.throws(()=>assertWorkflow({id:"w",steps:[{id:"a",run}]}),/revision/);
  assert.throws(()=>assertWorkflow(w([{id:"a",run,retries:-1}])));
  assert.throws(()=>assertWorkflow(w([{id:"a"}])));
});
