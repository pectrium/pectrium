"use client";
import { useState } from "react";

const views=[
 {name:"Flow",kind:"Workflow concept",heading:"Work, with a clear path forward.",caption:"Illustrative interface study — not a live product",rows:[["01","Request received","Intake"],["02","Review and route","Decision"],["03","Resolve and record","Outcome"]],metric:"03",metricLabel:"Workflow stages"},
 {name:"Assist",kind:"Intelligence concept",heading:"Knowledge, in context.",caption:"Illustrative interface study — not a live product",rows:[["01","Identify the question","Context"],["02","Review relevant knowledge","Sources"],["03","Confirm the response","Human review"]],metric:"03",metricLabel:"Review stages"},
 {name:"Connect",kind:"Integration concept",heading:"Systems, working together.",caption:"Illustrative interface study — not a live product",rows:[["01","Authorize connection","Access"],["02","Map information","Exchange"],["03","Observe the flow","Governance"]],metric:"03",metricLabel:"Integration stages"},
 {name:"Insight",kind:"Data concept",heading:"Clarity from information.",caption:"Illustrative interface study — not a live product",rows:[["01","Establish data quality","Foundation"],["02","Organize the signals","Analysis"],["03","Support decisions","Interpretation"]],metric:"03",metricLabel:"Analysis stages"},
 {name:"Studio",kind:"Engineering concept",heading:"Consistency by design.",caption:"Illustrative interface study — internal tooling direction",rows:[["01","Define standards","System"],["02","Compose components","Build"],["03","Verify delivery","Quality"]],metric:"03",metricLabel:"Engineering stages"}
] as const;

export function ProductConceptShowcase(){
 const [active,setActive]=useState<(typeof views)[number]["name"]>("Flow");
 const view=views.find(item=>item.name===active)??views[0];
 return <div className="pct-product-concept">
  <div className="pct-product-concept-tabs" role="group" aria-label="Choose a product interface concept">{views.map(item=><button key={item.name} type="button" aria-pressed={active===item.name} className={active===item.name?"is-active":""} onClick={()=>setActive(item.name)}>{item.name}</button>)}</div>
  <div className="pct-product-concept-stage">
   <div className="pct-product-concept-copy"><p className="section-index">{view.kind}</p><h3>{view.heading}</h3><p>Explore an early visual interpretation of how this product direction could organize work and information.</p><span className="pct-concept-disclaimer">{view.caption}</span></div>
   <div className="pct-concept-window" aria-label={`${view.name} illustrative interface concept`}>
    <div className="pct-concept-toolbar"><span className="pct-concept-dot"/><span className="pct-concept-dot"/><span className="pct-concept-dot"/><strong>PECTRIUM / {view.name.toUpperCase()}</strong><span>CONCEPT 01</span></div>
    <div className="pct-concept-dashboard"><div className="pct-concept-side"><span>OVERVIEW</span><span>ACTIVITY</span><span>SETTINGS</span></div><div className="pct-concept-main"><p>Illustrative workflow</p><div className="pct-concept-summary"><div><strong>{view.metric}</strong><span>{view.metricLabel}</span></div><div className="pct-concept-pulse" aria-hidden="true"><span/><span/><span/><span/><span/></div></div><div className="pct-concept-rows">{view.rows.map(row=><div key={row[0]}><span>{row[0]}</span><strong>{row[1]}</strong><small>{row[2]}</small></div>)}</div></div></div>
   </div>
  </div>
 </div>;
}
