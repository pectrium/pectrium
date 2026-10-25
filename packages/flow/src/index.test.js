import test from "node:test";
import assert from "node:assert/strict";
import { executeWorkflow, HandlerExecutionError, OutputCaptureError, CheckpointPersistenceError, RecoveryRequiredError, IncompatibleCheckpointError } from "./index.js";
const w = steps => ({id:"w",revision:"v1",steps});
test("deterministic dependency order, values and successful resume",async()=>{
  const calls=[], saved=[];
  const workflow=w([{id:"b",dependsOn:["a"],run:({results})=>{calls.push("b");return results.a+1;}},{id:"a",run:()=>{calls.push("a");return 2;}}]);
  const result=await executeWorkflow(workflow,{onCheckpoint:c=>saved.push(c)});
  assert.equal(result.status,"succeeded");
  assert.deepEqual(calls,["a","b"]);
  assert.equal(result.checkpoint.steps.b.value,3);
  assert.match(result.checkpoint.fingerprint,/^[a-f0-9]{64}$/);
  assert.equal(saved.at(-1).steps.b.status,"succeeded");
  await executeWorkflow(workflow,{checkpoint:result.checkpoint});
  assert.deepEqual(calls,["a","b"]);
});
test("bounded handler retries and persisted counters",async()=>{
  let attempts=0,downstream=0;
  const workflow=w([{id:"a",retries:2,run:()=>{attempts++;throw Error("failed");}},{id:"b",dependsOn:["a"],run:()=>downstream++}]);
  const saved=[];
  const result=await executeWorkflow(workflow,{onCheckpoint:c=>saved.push(c)});
  assert.equal(result.status,"failed");
  assert.equal(attempts,3);assert.equal(downstream,0);
  assert.deepEqual(saved.filter(c=>c.steps.a.status==="running").map(c=>c.steps.a.attempts),[1,2,3]);
  assert.equal(result.checkpoint.steps.a.failureReason,"handler");
  await executeWorkflow(workflow,{checkpoint:result.checkpoint});
  assert.equal(attempts,3);
});
test("uncloneable output after side effect never retries",async()=>{
  let sideEffects=0;
  await assert.rejects(executeWorkflow(w([{id:"a",retries:4,run:()=>{sideEffects++;return ()=>1;}}]),{checkpointMode:"durable",onCheckpoint:async()=>{}}),error=>{
    assert.ok(error instanceof OutputCaptureError);
    assert.equal(error.stepId,"a");assert.equal(error.attempt,1);
    assert.equal(error.acknowledgedCheckpoint.steps.a.status,"running");
    return true;
  });
  assert.equal(sideEffects,1);
});
test("undefined and nonfinite outputs are rejected without retries",async()=>{
  for(const value of [undefined,NaN,Infinity,1n,new Date(),{nested:undefined}]) {
    let calls=0;
    await assert.rejects(executeWorkflow(w([{id:"a",retries:2,run:()=>{calls++;return value;}}])),OutputCaptureError);
    assert.equal(calls,1);
  }
});
test("failure before handler execution exposes tentative and acknowledged snapshots",async()=>{
  let called=0;
  await assert.rejects(executeWorkflow(w([{id:"a",run:()=>called++}]),{
    onCheckpoint:()=>{throw Error("disk down");}
  }),e=>{
    assert.ok(e instanceof CheckpointPersistenceError);
    assert.equal(e.tentativeCheckpoint.steps.a.status,"running");
    assert.equal(e.acknowledgedCheckpoint,null);
    assert.equal(e.cause.message,"disk down");
    return true;
  });
  assert.equal(called,0);
});
test("failure persisting success does not rerun completed side effect",async()=>{
  let calls=0;
  await assert.rejects(executeWorkflow(w([{id:"a",retries:3,run:()=>{calls++;return 5;}}]),{
    onCheckpoint:cp=>{if(cp.steps.a.status==="succeeded")throw Error("storage unavailable");}
  }),e=>{
    assert.ok(e instanceof CheckpointPersistenceError);
    assert.equal(e.tentativeCheckpoint.steps.a.status,"succeeded");
    assert.equal(e.acknowledgedCheckpoint.steps.a.status,"running");
    return true;
  });
  assert.equal(calls,1);
});
test("failure recording handler retry stops execution without additional invocation",async()=>{
  let calls=0;
  await assert.rejects(executeWorkflow(w([{id:"a",retries:2,run:()=>{calls++;throw Error("handler");}}]),{
    onCheckpoint:cp=>{if(cp.steps.a.status==="pending" && cp.steps.a.attempts===1)throw Error("write failure");}
  }),CheckpointPersistenceError);
  assert.equal(calls,1);
});
test("failure recording terminal handler failure stops execution",async()=>{
  let calls=0;
  await assert.rejects(executeWorkflow(w([{id:"a",run:()=>{calls++;throw Error("handler");}}]),{
    onCheckpoint:cp=>{if(cp.steps.a.status==="failed")throw Error("write failure");}
  }),CheckpointPersistenceError);
  assert.equal(calls,1);
});
test("running checkpoint requires recovery and never reruns",async()=>{
  let calls=0, running;
  const workflow=w([{id:"a",run:()=>{calls++;return 1;}}]);
  await executeWorkflow(workflow,{onCheckpoint:cp=>{if(cp.steps.a.status==="running")running=cp;}});
  await assert.rejects(executeWorkflow(workflow,{checkpoint:running}),e=>{
    assert.ok(e instanceof RecoveryRequiredError);
    assert.equal(e.stepId,"a");assert.equal(e.attempt,1);
    return true;
  });
  assert.equal(calls,1);
});
test("revision and definition mismatch reject before handler invocation",async()=>{
  let calls=0;
  const workflow=w([{id:"a",run:()=>{calls++;return 1;}}]);
  const result=await executeWorkflow(workflow);
  for(const changed of [{...workflow,revision:"v2"},{...workflow,steps:[{...workflow.steps[0],retries:1}]}]){
    await assert.rejects(executeWorkflow(changed,{checkpoint:result.checkpoint}),IncompatibleCheckpointError);
  }
  assert.equal(calls,1);
});
test("malformed checkpoint matrix rejected before execution",async()=>{
  let calls=0;
  const workflow=w([{id:"a",run:()=>{calls++;return 1;}}]);
  const valid=(await executeWorkflow(workflow)).checkpoint;
  const mutations=[
    cp=>{delete cp.revision;},cp=>{cp.extra=true;},cp=>{cp.version=99;},
    cp=>{cp.steps.extra={status:"pending",attempts:0};},
    cp=>{delete cp.steps.a;},cp=>{cp.steps.a.status="unknown";},
    cp=>{cp.steps.a.attempts=-1;},cp=>{cp.steps.a.attempts=99;},
    cp=>{cp.steps.a.value=NaN;},cp=>{cp.steps.a.value={nested:undefined};},
    cp=>{cp.steps.a.failureReason="handler";},
    cp=>{cp.steps.a.status="failed";},
    cp=>{cp.steps.a.status="pending";},
    cp=>{cp.steps.a.extra=true;},
    cp=>{cp.fingerprint="incorrect";}
  ];
  for(const mutate of mutations) {
    const cp=structuredClone(valid);mutate(cp);
    await assert.rejects(executeWorkflow(workflow,{checkpoint:cp}));
  }
  assert.equal(calls,1);
});
test("downstream mutation cannot change committed results",async()=>{
  const workflow=w([
    {id:"a",run:()=>({nested:{count:1}})},
    {id:"b",dependsOn:["a"],run:({results})=>{results.a.nested.count=999;return true;}},
    {id:"c",dependsOn:["b"],run:({results})=>results.a.nested.count}
  ]);
  const result=await executeWorkflow(workflow);
  assert.equal(result.checkpoint.steps.a.value.nested.count,1);
  assert.equal(result.checkpoint.steps.c.value,1);
});
test("cooperative cancellation during active handler prevents next step",async()=>{
  const controller=new AbortController();let next=0;
  const result=await executeWorkflow(w([
    {id:"a",run:()=>{controller.abort();return 1;}},
    {id:"b",dependsOn:["a"],run:()=>next++}
  ]),{signal:controller.signal});
  assert.equal(result.status,"cancelled");
  assert.equal(result.checkpoint.steps.a.status,"succeeded");
  assert.equal(result.checkpoint.steps.b.status,"cancelled");
  assert.equal(next,0);
});
test("cancel before execution",async()=>{
  const controller=new AbortController();controller.abort();
  let calls=0;
  const result=await executeWorkflow(w([{id:"a",run:()=>calls++}]),{signal:controller.signal});
  assert.equal(result.status,"cancelled");assert.equal(calls,0);
});

test("terminal handler failure exposes typed context",async()=>{
  const result=await executeWorkflow(w([{id:"a",run:()=>{throw Error("boom");}}]));
  assert.equal(result.status,"failed");
  assert.ok(result.error instanceof HandlerExecutionError);
  assert.equal(result.error.stepId,"a");
  assert.equal(result.error.attempt,1);
  assert.equal(result.error.cause.message,"boom");
});
test("persisted pending retry resumes at the next attempt",async()=>{
  let calls=0, pending;
  const workflow=w([{id:"a",retries:2,run:()=>{calls++;if(calls===1)throw Error("temporary");return "ok";}}]);
  await executeWorkflow(workflow,{onCheckpoint:cp=>{if(cp.steps.a.status==="pending" && cp.steps.a.attempts===1)pending=cp;}});
  const result=await executeWorkflow(workflow,{checkpoint:pending});
  assert.equal(result.status,"succeeded");
  assert.equal(result.checkpoint.steps.a.attempts,2);
  assert.equal(calls,3); // First full execution made two calls; restored pending checkpoint makes one more.
});

test("memory mode is explicitly non-durable and rejects false durability claims",async()=>{
  let calls=0;
  const workflow=w([{id:"a",run:()=>{calls++;return 1;}}]);
  const result=await executeWorkflow(workflow,{checkpointMode:"memory"});
  assert.equal(result.checkpointMode,"memory");
  assert.equal(result.status,"succeeded");
  assert.equal(calls,1);
  await assert.rejects(executeWorkflow(workflow,{checkpointMode:"durable"}),/requires an onCheckpoint/);
  await assert.rejects(executeWorkflow(workflow,{checkpointMode:"memory",onCheckpoint:()=>{}}),/does not accept/);
  assert.equal(calls,1);
});
test("durable JSON checkpoint survives process-style restart and skips committed effects",async()=>{
  let stored=null,first=0,second=0;
  const workflow=w([
    {id:"a",run:()=>{first++;return {count:7};}},
    {id:"b",dependsOn:["a"],run:({results})=>{second++;return results.a.count+1;}}
  ]);
  const save=async cp=>{stored=JSON.stringify(cp);};
  const initial=await executeWorkflow(workflow,{checkpointMode:"durable",onCheckpoint:save});
  assert.equal(initial.status,"succeeded");
  assert.equal(initial.checkpointMode,"durable");
  assert.equal(JSON.parse(stored).steps.b.value,8);
  const restarted=await executeWorkflow(workflow,{
    checkpoint:JSON.parse(stored),checkpointMode:"durable",onCheckpoint:save
  });
  assert.equal(restarted.status,"succeeded");
  assert.deepEqual([first,second],[1,1]);
});
test("durable crash after running intent demands recovery without replay",async()=>{
  let persisted=null,calls=0;
  const workflow=w([{id:"external",retries:3,run:()=>{calls++;return "charged";}}]);
  await assert.rejects(executeWorkflow(workflow,{
    checkpointMode:"durable",
    onCheckpoint:async cp=>{
      if(cp.steps.external.status==="running")persisted=JSON.stringify(cp);
      if(cp.steps.external.status==="succeeded")throw Error("durable store offline");
    }
  }),CheckpointPersistenceError);
  assert.equal(calls,1);
  assert.equal(JSON.parse(persisted).steps.external.status,"running");
  await assert.rejects(executeWorkflow(workflow,{
    checkpointMode:"durable",checkpoint:JSON.parse(persisted),
    onCheckpoint:async()=>{throw Error("should not write");}
  }),e=>{
    assert.ok(e instanceof RecoveryRequiredError);
    assert.equal(e.acknowledgedCheckpoint.steps.external.status,"running");
    return true;
  });
  assert.equal(calls,1);
});
test("durable failed intent write never invokes external handler after restart",async()=>{
  let persisted=null,calls=0;
  const workflow=w([{id:"external",run:()=>{calls++;return "charged";}}]);
  await assert.rejects(executeWorkflow(workflow,{
    checkpointMode:"durable",onCheckpoint:async()=>{throw Error("store offline");}
  }),e=>{
    assert.ok(e instanceof CheckpointPersistenceError);
    assert.equal(e.acknowledgedCheckpoint,null);
    return true;
  });
  assert.equal(persisted,null);
  assert.equal(calls,0);
  const restarted=await executeWorkflow(workflow,{
    checkpointMode:"durable",onCheckpoint:async cp=>{persisted=JSON.stringify(cp);}
  });
  assert.equal(restarted.status,"succeeded");
  assert.equal(calls,1);
  assert.equal(JSON.parse(persisted).steps.external.status,"succeeded");
});
test("durable restart after persisted handler failure remains terminal",async()=>{
  let persisted=null,calls=0;
  const workflow=w([{id:"external",run:()=>{calls++;throw Error("refused");}}]);
  const result=await executeWorkflow(workflow,{
    checkpointMode:"durable",onCheckpoint:async cp=>{persisted=JSON.stringify(cp);}
  });
  assert.equal(result.status,"failed");
  assert.equal(JSON.parse(persisted).steps.external.failureReason,"handler");
  const resumed=await executeWorkflow(workflow,{
    checkpointMode:"durable",checkpoint:JSON.parse(persisted),
    onCheckpoint:async()=>{throw Error("should not write");}
  });
  assert.equal(resumed.status,"failed");
  assert.equal(calls,1);
});
