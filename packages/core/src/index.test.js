import test from "node:test";
import assert from "node:assert/strict";
import { assertWorkflow } from "./index.js";
const run = () => {};
test("orders dependencies even if declared later", () => {
  assert.deepEqual(assertWorkflow({id:"w",steps:[{id:"b",dependsOn:["a"],run},{id:"a",run}]}).map(s=>s.id),["a","b"]);
});
test("rejects cycles, missing dependencies and duplicate ids", () => {
  for (const steps of [
    [{id:"a",dependsOn:["b"],run},{id:"b",dependsOn:["a"],run}],
    [{id:"a",dependsOn:["missing"],run}],
    [{id:"a",run},{id:"a",run}]
  ]) assert.throws(()=>assertWorkflow({id:"w",steps}));
});
test("rejects invalid retries and missing runners", () => {
  assert.throws(()=>assertWorkflow({id:"w",steps:[{id:"a",run,retries:-1}]}));
  assert.throws(()=>assertWorkflow({id:"w",steps:[{id:"a"}]}));
});
