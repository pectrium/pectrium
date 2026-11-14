"use client";

import Link from "next/link";
import { useId, useState } from "react";

const concepts=[
 {id:"flow",name:"Flow",discipline:"Workflows",heading:"A clearer path through work.",intro:"A concept for making requests, ownership and decisions visible from beginning to resolution.",status:"Product concept",challenge:"A service request moves across people and tools without a dependable sense of progress.",outcome:"A shared view of next actions and responsibility.",steps:[["Request received","Collect context"],["Review and route","Clarify ownership"],["Resolve and record","Close the loop"]]},
 {id:"assist",name:"Assist",discipline:"Knowledge",heading:"Make context part of the answer.",intro:"An assistance concept that places evidence, limitations and human review beside guidance.",status:"Product concept",challenge:"A confident answer may hide the limits or age of the information behind it.",outcome:"A guided response with inspectable sources and human judgment.",steps:[["Understand question","Identify intent"],["Examine references","Check relevance"],["Review response","Retain control"]]},
 {id:"connect",name:"Connect",discipline:"Integration",heading:"Bring the right systems together.",intro:"An integration concept that makes authorization, mappings and operational boundaries understandable.",status:"Product concept",challenge:"Connections can fail invisibly when permissions and data contracts are unclear.",outcome:"Traceable exchanges with purposeful boundaries.",steps:[["Grant access","Explicit permissions"],["Map records","Shared meaning"],["Observe delivery","Handle exceptions"]]},
 {id:"insight",name:"Insight",discipline:"Information",heading:"See beyond the surface of data.",intro:"A decision-support concept built around definitions, data quality and the question behind a chart.",status:"Product concept",challenge:"A polished chart can hide uncertain definitions or incomplete source data.",outcome:"Interpretable information that can be checked and discussed.",steps:[["Confirm sources","Establish quality"],["Explore signals","Preserve context"],["Interpret together","Support decisions"]]},
 {id:"studio",name:"Studio",discipline:"Engineering",heading:"Consistency through deliberate design.",intro:"An internal-tooling direction connecting reusable components, design decisions and engineering checks.",status:"Internal tooling direction",challenge:"Inconsistent implementation creates unnecessary work and difficult maintenance.",outcome:"A more coherent design and delivery process.",steps:[["Define foundations","Shared language"],["Compose experiences","Reusable patterns"],["Review quality","Test and refine"]]}
] as const;

function ConceptCanvas({name}:{name:(typeof concepts)[number]["name"]}){
 if(name==="Flow")return <div className="pct-gallery-kanban">
  {["Inbox","In review","Resolved"].map((column,i)=><div key={column}><div className="pct-gallery-column-heading"><span>{column}</span><i/></div><div className="pct-gallery-ticket"><small>ILLUSTRATIVE REQUEST</small><strong>{["New service enquiry","Confirm next action","Outcome recorded"][i]}</strong><span>{["Context gathered","Owner assigned","History available"][i]}</span></div><div className="pct-gallery-ticket-line"/></div>)}
 </div>;
 if(name==="Assist")return <div className="pct-gallery-assist">
  <div className="pct-gallery-question"><small>EXAMPLE QUESTION</small><strong>What should happen next?</strong></div>
  <div className="pct-gallery-answer"><small>GUIDANCE / CONCEPT</small><p>Review the relevant process, confirm the details, and choose an accountable next step.</p><div><span>Reference context</span><span>Human review</span></div></div>
  <div className="pct-gallery-evidence"><span>Context panel</span><strong>Sources and limitations remain visible</strong><small>No automated factual answer is being generated here.</small></div>
 </div>;
 if(name==="Connect")return <div className="pct-gallery-connect">
  <div className="pct-gallery-service"><span className="pct-gallery-icon">A</span><strong>Source system</strong><small>Authorized input</small></div>
  <div className="pct-gallery-flowline"><span>Permission boundary</span><i/><span>Mapping rules</span></div>
  <div className="pct-gallery-service pct-gallery-service-primary"><span className="pct-gallery-icon">P</span><strong>Connection layer</strong><small>Traceable exchange</small></div>
  <div className="pct-gallery-flowline"><span>Delivery check</span><i/><span>Error handling</span></div>
  <div className="pct-gallery-service"><span className="pct-gallery-icon">B</span><strong>Destination</strong><small>Confirmed outcome</small></div>
 </div>;
 if(name==="Insight")return <div className="pct-gallery-insight">
  <div className="pct-gallery-chart-head"><div><small>ILLUSTRATIVE SIGNAL</small><strong>Patterns need context.</strong></div><span>Example visualization</span></div>
  <div className="pct-gallery-chart" aria-label="Decorative illustrative bar chart, not performance data">{[37,52,44,67,60,82,71,90,76].map((height,index)=><span key={index} style={{height:height+"%"}}/>)}</div>
  <div className="pct-gallery-data-notes"><div><small>Source definition</small><strong>Known</strong></div><div><small>Quality checks</small><strong>Required</strong></div><div><small>Interpretation</small><strong>Human led</strong></div></div>
 </div>;
 return <div className="pct-gallery-studio">
  <div className="pct-gallery-studio-label">COMPONENT STUDY / DESIGN TOKENS</div>
  <div className="pct-gallery-studio-samples"><div><span>BUTTON / PRIMARY</span><strong>Continue <i>↗</i></strong></div><div><span>INPUT / FIELD</span><div className="pct-gallery-faux-input">Example input value</div></div></div>
  <div className="pct-gallery-swatches"><span/><span/><span/><span/></div>
  <div className="pct-gallery-studio-footer"><span>Consistency</span><span>Accessibility</span><span>Review</span></div>
 </div>;
}

export function ProductConceptShowcase(){
 const [active,setActive]=useState<(typeof concepts)[number]["id"]>("flow");
 const nameId=useId();
 const selected=concepts.find(item=>item.id===active)??concepts[0];
 return <div className="pct-gallery">
  <div className="pct-gallery-header"><span>PRODUCT EXPERIENCE STUDIES</span><span>INTERACTIVE CONCEPTS · NOT LIVE SOFTWARE</span></div>
  <div role="tablist" aria-label="Explore Pectrium product directions" className="pct-gallery-tabs">
   {concepts.map((item,i)=><button key={item.id} type="button" role="tab" id={nameId+"-"+item.id} aria-selected={active===item.id} aria-controls={nameId+"-panel"} tabIndex={active===item.id?0:-1} onClick={()=>setActive(item.id)} onKeyDown={e=>{if(!["ArrowRight","ArrowLeft","Home","End"].includes(e.key))return;e.preventDefault();const next=e.key==="Home"?0:e.key==="End"?concepts.length-1:(i+(e.key==="ArrowRight"?1:-1)+concepts.length)%concepts.length;setActive(concepts[next].id);const container=e.currentTarget.parentElement;const buttons=container?.querySelectorAll<HTMLButtonElement>('[role="tab"]');buttons?.[next]?.focus();}}>
    <strong>{item.name}</strong><span>{item.discipline}</span>
   </button>)}
  </div>
  <div role="tabpanel" id={nameId+"-panel"} aria-labelledby={nameId+"-"+selected.id} className="pct-gallery-stage" key={selected.id}>
   <div className="pct-gallery-story">
    <p className="pct-gallery-kicker">{selected.status}</p>
    <h3>{selected.heading}</h3>
    <p>{selected.intro}</p>
    <div className="pct-gallery-story-detail"><span>DESIGN CHALLENGE</span><p>{selected.challenge}</p></div>
    <div className="pct-gallery-story-detail"><span>INTENDED DIRECTION</span><p>{selected.outcome}</p></div>
    <Link className="pct-gallery-detail-link" href={`/products/${selected.id}`}>Explore Pectrium {selected.name} <span aria-hidden="true">↗</span></Link>
   </div>
   <div className="pct-gallery-screen">
    <div className="pct-gallery-screen-bar"><div className="pct-gallery-window-dots" aria-hidden="true"><i/><i/><i/></div><span>PECTRIUM / {selected.name.toUpperCase()}</span><span>INTERFACE STUDY</span></div>
    <div className="pct-gallery-screen-body"><div className="pct-gallery-screen-title"><div><small>EXPERIENCE / PREVIEW</small><strong>{selected.discipline} workspace</strong></div><span>Concept only</span></div><ConceptCanvas name={selected.name}/></div>
    <div className="pct-gallery-screen-bottom">An illustrative interface study · Not a functional product or customer data</div>
   </div>
  </div>
  <div className="pct-gallery-journey"><div><span>EXAMPLE JOURNEY</span><p>From intent to an accountable outcome</p></div><ol>{selected.steps.map(([step,description])=><li key={step}><strong>{step}</strong><span>{description}</span></li>)}</ol></div>
  <p className="pct-gallery-disclaimer">Visualizations are original conceptual interface studies. They do not show deployed Pectrium products, customer information, measured usage or verified product functionality.</p>
 </div>;
}
