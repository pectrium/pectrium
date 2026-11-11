import Link from "next/link";

type Direction="obsidian"|"infinite";
const details={
 obsidian:{eyebrow:"Technology / Obsidian",title:"Engineering begins with a better question.",description:"Explore the thinking behind software, applied intelligence, information systems and dependable digital foundations.",cta:"Explore the architecture",href:"#architecture-explorer"},
 infinite:{eyebrow:"Solutions / Infinite Systems",title:"See the whole system. Design for the person.",description:"From service workflows to knowledge and connected communities, understand the challenges before choosing the technology.",cta:"Explore solution fields",href:"#solution-fields"}
} as const;
export function DirectionHero({direction}:{direction:Direction}){
 const item=details[direction];
 return <section className={`pct-direction-hero pct-direction-${direction}`} aria-label={item.eyebrow}>
  <div className="pct-direction-art" aria-hidden="true">
   {direction==="obsidian"?<div className="pct-obsidian-object"><i/><i/><i/><i/></div>:<div className="pct-infinite-art"><span/><span/><span/><span/><span/><span/><span/><span/><span/></div>}
  </div>
  <div className="shell pct-direction-hero-inner">
   <p className="pct-direction-eyebrow">{item.eyebrow}</p>
   <h1>{item.title}</h1>
   <p className="pct-direction-description">{item.description}</p>
   <Link className="pct-direction-link" href={item.href}>{item.cta}<span aria-hidden="true">↗</span></Link>
   <div className="pct-direction-signature" aria-hidden="true"><span>PECTRIUM</span><span>{direction==="obsidian"?"OBSIDIAN / TECHNOLOGY":"INFINITE SYSTEMS / SOLUTIONS"}</span></div>
  </div>
 </section>;
}
