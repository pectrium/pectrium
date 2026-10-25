import test from "node:test";
import assert from "node:assert/strict";
import { executeWorkflow } from "./index.js";
test("dependency order, values, and checkpoints", async () => {
  const calls=[], saved=[];
  const workflow={id:"w",steps:[
    {id:"b",dependsOn:["a"],run:({results})=>{calls.push("b");return results.a+1;}},
    {id:"a",run:()=>{calls.push("a");return 2;}}
  ]};
  const result=await executeWorkflow(workflow,{onCheckpoint:c=>saved.push(c)});
  assert.equal(result.status,"succeeded");
  assert.deepEqual(calls,["a","b"]);
  assert.equal(result.checkpoint.steps.b.value,3);
  assert.equal(saved.at(-1).steps.b.status,"succeeded");
  const resumed=await executeWorkflow(workflow,{checkpoint:result.checkpoint});
  assert.equal(resumed.status,"succeeded");
  assert.deepEqual(calls,["a","b"]);
});
test("retries are bounded; downstream does not execute after failure",async()=>{
  let attempts=0, downstream=0;
  const result=await executeWorkflow({id:"w",steps:[
    {id:"a",retries:2,run:()=>{attempts++;throw Error("failure");}},
    {id:"b",dependsOn:["a"],run:()=>downstream++}
  ]});
  assert.equal(result.status,"failed");
  assert.equal(attempts,3);
  assert.equal(downstream,0);
});
test("cancel before execution and reject uncertain running checkpoints",async()=>{
  const controller=new AbortController();controller.abort();
  let calls=0;
  const workflow={id:"w",steps:[{id:"a",run:()=>calls++}]};
  const result=await executeWorkflow(workflow,{signal:controller.signal});
  assert.equal(result.status,"cancelled");assert.equal(calls,0);
  const unsafe=structuredClone(result.checkpoint);unsafe.steps.a.status="running";
  await assert.rejects(executeWorkflow(workflow,{checkpoint:unsafe}),/Unsafe checkpoint/);
});
test("checkpoint write failure prevents step execution",async()=>{
  let called=false;
  await assert.rejects(executeWorkflow({id:"w",steps:[{id:"a",run:()=>{called=true;}}]},{
    onCheckpoint:()=>{throw Error("storage down");}
  }),/storage down/);
  assert.equal(called,false);
});
test("rejects mismatched checkpoints",async()=>{
  await assert.rejects(executeWorkflow({id:"w",steps:[{id:"a",run:()=>{}}]},{
    checkpoint:{version:1,workflowId:"different",stepIds:["a"],steps:{}}
  }),/Incompatible checkpoint/);
});
