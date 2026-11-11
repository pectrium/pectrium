import Link from "next/link";

const records=[
 {title:"Public source and review history",label:"REPOSITORY",body:"Pectrium's public repository exposes versioned source, reviewable changes and the documented boundary between concept interfaces and engineering work.",href:"https://github.com/pectrium/pectrium",action:"Explore source"},
 {title:"Website quality workflow",label:"WEB ENGINEERING",body:"A GitHub Actions workflow defines type checking, linting and a production build for the web application. Individual run results should be inspected rather than assumed.",href:"https://github.com/pectrium/pectrium/blob/main/.github/workflows/web-quality.yml",action:"Inspect checks"},
 {title:"Flow execution contract",label:"ENGINEERING BOUNDARIES",body:"The Flow package documents a sequential in-process workflow executor, checkpoint modes, retry semantics, and limitations. It does not claim distributed recovery or a hosted commercial service.",href:"https://github.com/pectrium/pectrium/blob/main/packages/flow/README.md",action:"Read the contract"},
 {title:"Flow and Core test definitions",label:"AUTOMATED TESTING",body:"The required workflow runs Core and Flow tests. Test definitions and workflow configuration are visible, but they are not substitutes for a third-party security audit or service-level guarantee.",href:"https://github.com/pectrium/pectrium/blob/main/.github/workflows/flow-engine.yml",action:"Inspect test workflow"}
] as const;

export function EngineeringEvidence({compact=false}:{compact?:boolean}){
 return <section className={`pct-evidence${compact?" pct-evidence-compact":""}`} aria-labelledby={compact?"pct-evidence-home":"pct-evidence-page"}>
  <div className="shell">
   <div className="pct-evidence-intro"><p className="section-index">Evidence, not exaggeration</p><div><h2 id={compact?"pct-evidence-home":"pct-evidence-page"}>Trust should be inspectable.</h2><p>Technical credibility comes from source, explicit design decisions and reviewable limitations. Here is what Pectrium can point to today, without invented customers, uptime figures, certifications or launch claims.</p></div></div>
   <div className="pct-evidence-grid">{records.map(record=><article key={record.title} className="pct-evidence-card">
    <span className="pct-evidence-category">{record.label}</span>
    <h3>{record.title}</h3>
    <p>{record.body}</p>
    <a href={record.href} target="_blank" rel="noopener noreferrer" className="pct-evidence-link">{record.action} <span aria-hidden="true">↗</span></a>
   </article>)}</div>
   <div className="pct-evidence-boundary"><p><strong>What is not claimed:</strong> the site does not represent these workflows as independently certified security controls, production-scale infrastructure, uptime guarantees or customer deployments.</p><Link href="/technology" className="text-link">Explore our engineering direction <span aria-hidden="true">↗</span></Link></div>
  </div>
 </section>;
}
