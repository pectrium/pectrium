import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageFrame, PageHero } from "@/components/page-frame";

const catalog = {
 "work-and-services": {
  name:"Work and services", headline:"Make complex work feel coherent.",
  intro:"Operational systems should reduce uncertainty, not move it from one screen to another. We examine the full journey of work: the request, its ownership, the decisions, and the outcome.",
  problem:"A service request may begin in a form, move to an inbox, wait for an approval and end in a separate record. Every disconnected handoff creates uncertainty about ownership, progress and responsibility.",
  thesis:"The most useful workflow is not necessarily the most automated. It is the one in which each person knows what needs attention, why it matters and what happens next.",
  system:[["01","A clear point of entry","Capture intent once, with the minimum information necessary to begin."],["02","Visible coordination","Represent responsibilities, decisions and handoffs in a way people can follow."],["03","Accountable resolution","Close the loop with an understandable outcome, useful history and routes for correction."]],
  scenarios:[["Service delivery","Track a request from first contact through assignment, resolution and communication, without making the requester chase its status."],["Internal operations","Give cross-functional work a shared vocabulary of ownership, priority and next action."],["Onboarding journeys","Replace scattered instructions with manageable steps, explicit dependencies and guidance when something goes wrong."]],
  measures:[["Clarity","Can a person understand the next step and who owns it?"],["Friction","Where do repeated inputs or unnecessary handoffs occur?"],["Reliability","How does a workflow recover from delays, exceptions or incomplete information?"]],
  boundaries:"Design must respect role-based access, audit needs, accessibility and the fact that some decisions require a human. Automation should support accountability rather than obscure it.",
  products:[["Flow","/products/flow"],["Connect","/products/connect"]]
 },
 "learning-and-intelligence":{
  name:"Learning and intelligence",headline:"From information to understanding.",
  intro:"Better intelligence is not just faster answers. It is information with context, transparent limits and a path for people to inspect and apply what they learn.",
  problem:"Knowledge is often fragmented across documents, systems and people. Search may surface material without explaining its relevance, while automated summaries can sound definitive when the underlying evidence is incomplete.",
  thesis:"Intelligence should strengthen judgment. Useful systems distinguish retrieved facts from interpretation, show the origin of information and make uncertainty visible.",
  system:[["01","Retrieve with context","Find relevant knowledge while preserving source, date, audience and access boundaries."],["02","Explain with evidence","Organize information into clear explanations, with room for comparison and follow-up questions."],["03","Keep judgment in the loop","Let people verify important claims, correct errors and make consequential decisions."]],
  scenarios:[["Learning assistance","Offer structured explanations and progressive guidance that support understanding rather than simply delivering a result."],["Organizational knowledge","Help teams locate policies, procedures and institutional knowledge with traceable references."],["Decision support","Make relevant signals and limitations easier to interpret, without presenting an automated suggestion as a final decision."]],
  measures:[["Relevance","Does the information answer the actual question and fit the user's context?"],["Traceability","Can important statements be traced to appropriate sources?"],["Human control","Can a person challenge, correct or decline a system recommendation?"]],
  boundaries:"AI outputs require evaluation and proportionate oversight. Sensitive information needs deliberate handling; high-stakes use cases require domain-specific safeguards. Concepts shown here are design directions, not deployed AI service claims.",
  products:[["Assist","/products/assist"],["Insight","/products/insight"]]
 },
 "connected-communities":{
  name:"Connected communities",headline:"Useful connections start with trust.",
  intro:"Local information and opportunities only become valuable when people can discover, understand and act on them. We focus on the design of clear pathways between needs, services and participation.",
  problem:"A resident may know a service exists but not who provides it, whether the information is current or how to take the next step. Fragmented channels create uneven access and erode confidence.",
  thesis:"Connection is more than a directory. A useful community system makes information understandable, respects local context and helps people act without surrendering control of their data.",
  system:[["01","Discover what matters","Organize services and opportunities around meaningful needs and location context."],["02","Establish relevance and trust","Make provenance, eligibility, freshness and contact pathways understandable."],["03","Support the next action","Help people move from discovery to a legitimate service or opportunity, with accessible alternatives."]],
  scenarios:[["Service discovery","Navigate civic or local resources by need, with clear eligibility and next-step information."],["Community updates","Present timely, attributable notices without turning essential information into an attention feed."],["Skills and opportunity","Help people understand available pathways and connect with appropriate services or opportunities."]],
  measures:[["Findability","Can people discover the right information in plain language?"],["Inclusion","Does the experience work across devices, abilities and varying connectivity?"],["Trust","Can people tell who provided information and when it was last checked?"]],
  boundaries:"Community-oriented systems require careful privacy choices, consent, moderation, information verification and inclusive design. No current network of providers or launched community service is implied.",
  products:[["Connect","/products/connect"],["Flow","/products/flow"]]
 }
} as const;

type Slug = keyof typeof catalog;
const slugs = Object.keys(catalog) as Slug[];
export function generateStaticParams(){return slugs.map(slug=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params;const item=catalog[slug as Slug];
 return item?{title:item.name,description:item.intro}:{title:"Solution not found"};
}
export default async function SolutionDetail({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const item=catalog[slug as Slug];if(!item)notFound();
 return <PageFrame>
  <PageHero eyebrow={`Solutions / ${item.name}`} title={item.headline} description={item.intro}/>
  <section className="shell pectrium-detail-intro"><div><p className="section-index">01 / The operating reality</p><h2>Understand the system before changing it.</h2></div><div><p className="pectrium-detail-lead">{item.problem}</p><p>{item.thesis}</p></div></section>
  <section className="pectrium-detail-band"><div className="shell"><p className="section-index">02 / System design</p><h2>Think beyond the interface.</h2><div className="pectrium-detail-cards">{item.system.map(([number,title,detail])=><article key={number}><span className="pct-depth-number">{number} / SYSTEM LAYER</span><h3>{title}</h3><p>{detail}</p></article>)}</div></div></section>
  <section className="shell pct-depth-section"><div className="pct-depth-heading"><p className="section-index">03 / Illustrative applications</p><h2>Where this thinking could matter.</h2><p>These are design scenarios, not claims of live deployments or customer engagements.</p></div><div className="pct-depth-rows">{item.scenarios.map(([title,detail],i)=><article key={title}><span className="pct-depth-number">0{i+1}</span><h3>{title}</h3><p>{detail}</p></article>)}</div></section>
  <section className="editorial-band"><div className="shell pct-depth-section"><div className="pct-depth-heading"><p className="section-index">04 / What good looks like</p><h2>Evaluate the outcome, not the spectacle.</h2><p>Questions we would use to examine an approach during discovery and validation.</p></div><div className="pct-depth-rows">{item.measures.map(([title,detail],i)=><article key={title}><span className="pct-depth-number">0{i+1}</span><h3>{title}</h3><p>{detail}</p></article>)}</div></div></section>
  <section className="shell pectrium-detail-intro"><div><p className="section-index">05 / Responsibilities</p><h2>Ambition needs boundaries.</h2></div><div><p className="pectrium-detail-lead">{item.boundaries}</p><Link className="text-link" href="/technology">How we approach engineering <span aria-hidden="true">↗</span></Link></div></section>
  <section className="shell pectrium-detail-next"><div><p className="section-index">Explore related directions</p><h2>From challenge to product thinking.</h2></div><div>{item.products.map(([name,href])=><Link key={href} className="text-link" href={href}>Pectrium {name} <span aria-hidden="true">↗</span></Link>)}<Link className="text-link" href="/solutions">All solutions <span aria-hidden="true">↗</span></Link></div></section>
 </PageFrame>;
}
