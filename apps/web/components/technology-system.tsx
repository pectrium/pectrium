"use client";
import { useState } from "react";

const disciplines=[
 {id:"software",number:"01",title:"Software engineering",subtitle:"Systems that make work understandable",description:"Designing dependable applications and workflows with clear interfaces, explicit responsibilities and maintainable foundations."},
 {id:"intelligence",number:"02",title:"Applied intelligence",subtitle:"Context for better decisions",description:"Exploring responsible ways to organize knowledge, assist people and keep human judgment central to consequential decisions."},
 {id:"data",number:"03",title:"Data systems",subtitle:"Information that can be trusted",description:"Creating clear paths from raw information to useful insight, with attention to quality, provenance and access."},
 {id:"infrastructure",number:"04",title:"Digital infrastructure",subtitle:"Foundations built to endure",description:"Considering interoperability, resilience and security from the beginning, rather than as afterthoughts."}
] as const;
export function TechnologySystem(){
 const [active,setActive]=useState<(typeof disciplines)[number]["id"]>("software");
 const selected=disciplines.find(item=>item.id===active)??disciplines[0];
 return <div className="pct-system" aria-label="Explore Pectrium technology disciplines">
  <div className="pct-system-visual" aria-hidden="true">
   <div className="pct-system-orbit pct-system-orbit-one"/>
   <div className="pct-system-orbit pct-system-orbit-two"/>
   <div className="pct-system-core"><span>PECTRIUM</span><small>TECHNOLOGY</small></div>
   {disciplines.map((item,index)=><div key={item.id} className={`pct-system-node pct-system-node-${index+1}${active===item.id?" is-active":""}`}><span>{item.number}</span><strong>{item.title}</strong></div>)}
  </div>
  <div className="pct-system-details">
   <p className="pct-system-kicker">Explore the disciplines</p>
   <div className="pct-system-options" role="group" aria-label="Select technology discipline">{disciplines.map(item=><button type="button" key={item.id} className={active===item.id?"is-active":""} aria-pressed={active===item.id} onClick={()=>setActive(item.id)}><span>{item.number}</span>{item.title}<span aria-hidden="true">↗</span></button>)}</div>
   <div className="pct-system-description" aria-live="polite"><p>{selected.subtitle}</p><h3>{selected.title}</h3><p>{selected.description}</p></div>
  </div>
 </div>;
}
