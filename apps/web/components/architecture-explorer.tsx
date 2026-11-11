"use client";

import { useId, useState } from "react";

const layers = [
 {id:"experience",title:"Experience",sub:"Interaction and access",purpose:"Design the journey that people can understand, including permissions, feedback, accessibility and meaningful recovery paths.",input:"Needs, tasks and user context",output:"Clear screens, states and actions",check:"Can someone understand the next step and recover from an error?",example:"An accessible service request with explicit status and ownership."},
 {id:"application",title:"Application logic",sub:"Decisions and workflow",purpose:"Translate intentions into predictable rules, responsibilities and handoffs before adding more automation.",input:"Validated inputs and permissions",output:"Business rules and accountable actions",check:"Where does responsibility sit when a process changes or fails?",example:"A request moving through review, approval and recorded resolution."},
 {id:"intelligence",title:"Applied intelligence",sub:"Grounded assistance",purpose:"Introduce intelligent assistance only where source quality, human oversight and failure boundaries can be evaluated.",input:"Context and appropriate references",output:"Suggestions with clear limitations",check:"Can the person verify and override the suggestion?",example:"An explanation linked back to the material that informed it."},
 {id:"information",title:"Information systems",sub:"Quality and provenance",purpose:"Shape records and exchanges around explicit meaning, quality, freshness, authorized access and provenance.",input:"Source data and access policy",output:"Understandable, traceable information",check:"Who owns this information, and how do we know it is current?",example:"A record with identifiable origin, timestamps and permission boundaries."},
 {id:"foundation",title:"Digital foundation",sub:"Reliability and operations",purpose:"Consider deployments, integration contracts, test coverage, observability and recovery as part of how a system earns trust.",input:"Infrastructure and external dependencies",output:"Reviewable operational boundaries",check:"What happens during an outage or an uncertain external effect?",example:"A monitored integration with explicit retry and reconciliation policies."}
] as const;

export function ArchitectureExplorer({compact=false}:{compact?:boolean}) {
 const [active,setActive]=useState<(typeof layers)[number]["id"]>("application");
 const selected=layers.find(layer=>layer.id===active)??layers[1];
 const identifier=useId();
 return <div className={`pct-architecture${compact?" pct-architecture-compact":""}`} aria-label="Interactive conceptual Pectrium architecture explorer">
  <div className="pct-architecture-map">
   <div className="pct-architecture-map-head"><span>REFERENCE SYSTEM MAP</span><span>CONCEPTUAL · NOT DEPLOYED</span></div>
   <div className="pct-architecture-stack" role="group" aria-label="Select a layer to understand its role">
    {layers.map((layer,index)=><button key={layer.id} type="button" className={`pct-architecture-layer${active===layer.id?" is-active":""}`} aria-pressed={active===layer.id} aria-controls={identifier} onClick={()=>setActive(layer.id)}>
      <span className="pct-architecture-layer-mark" aria-hidden="true"><i/><i/><i/></span>
      <span className="pct-architecture-layer-text"><strong>{layer.title}</strong><small>{layer.sub}</small></span>
      <span className="pct-architecture-layer-end" aria-hidden="true">{active===layer.id?"●":"○"}</span>
      {index<layers.length-1&&<span className="pct-architecture-connector" aria-hidden="true"/>}
    </button>)}
   </div>
   <p className="pct-architecture-map-foot">Select any layer to explore its purpose, boundaries and review questions. Connections show conceptual dependencies, not an implemented deployment.</p>
  </div>
  <div id={identifier} className="pct-architecture-details" aria-live="polite" aria-atomic="true">
   <p className="pct-architecture-overline">System design / Selected layer</p>
   <h3>{selected.title}</h3>
   <p className="pct-architecture-purpose">{selected.purpose}</p>
   <dl className="pct-architecture-io">
    <div><dt>Works with</dt><dd>{selected.input}</dd></div>
    <div><dt>Should produce</dt><dd>{selected.output}</dd></div>
   </dl>
   <div className="pct-architecture-review"><span>ENGINEERING QUESTION</span><p>{selected.check}</p></div>
   <div className="pct-architecture-example"><span>ILLUSTRATIVE APPLICATION</span><p>{selected.example}</p></div>
  </div>
 </div>;
}
