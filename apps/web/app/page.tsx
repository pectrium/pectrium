import Link from "next/link";
import { PageFrame } from "@/components/page-frame";
import { HeroMedia } from "@/components/hero-media";
import { TechnologySystem } from "@/components/technology-system";
import { ProductConceptShowcase } from "@/components/product-concept-showcase";

const focus = [
 {number:"01",title:"Work and operations",description:"Clearer workflows, service coordination and accountable execution.",href:"/solutions/work-and-services"},
 {number:"02",title:"Knowledge and intelligence",description:"Information made easier to find, interpret and apply.",href:"/solutions/learning-and-intelligence"},
 {number:"03",title:"Connected communities",description:"Better access to services, participation and opportunity.",href:"/solutions/connected-communities"},
 {number:"04",title:"Data and decisions",description:"Structure, context and insight for more informed decisions.",href:"/solutions/learning-and-intelligence"},
 {number:"05",title:"Digital foundations",description:"Resilient systems and integrations that support the work behind the experience.",href:"/technology"}
];
const products=[
 {name:"Flow",field:"Workflow systems",description:"A direction for coordinated work, requests and approvals.",href:"/products/flow"},
 {name:"Assist",field:"Intelligent assistance",description:"Contextual guidance and knowledge discovery with human oversight.",href:"/products/assist"},
 {name:"Connect",field:"Connected services",description:"Interoperable systems and authorized information exchange.",href:"/products/connect"},
 {name:"Insight",field:"Data intelligence",description:"Information organized for operational clarity and decision support.",href:"/products/insight"},
 {name:"Studio",field:"Engineering foundation",description:"Internal tools and standards for consistent software delivery.",href:"/products/studio"}
];

export default function Home(){return <PageFrame>
 <section className="pectrium-cinematic-hero" aria-labelledby="home-heading">
  <HeroMedia/>
  <div className="pectrium-cinematic-shade" aria-hidden="true"/>
  <div className="shell pectrium-cinematic-inner"><div className="pectrium-cinematic-content">
   <p className="eyebrow">Technology company</p>
   <h1 id="home-heading">Technology built<br/>around real needs.</h1>
   <p className="pectrium-cinematic-deck">We develop software, intelligent systems and digital platforms with a commitment to practical utility and enduring value.</p>
   <Link className="pectrium-cinematic-cta" href="/company">Explore Pectrium <span aria-hidden="true">↗</span></Link>
  </div></div>
 </section>
 <section className="pectrium-statement" aria-label="Company perspective"><div className="shell pectrium-statement-inner"><p className="section-index">Our perspective</p><p>Technology should make complex work more understandable, essential services more accessible, and the systems people rely on more dependable.</p></div></section>
 <section className="home-directory pectrium-hybrid-directory" id="solutions"><div className="shell">
  <div className="directory-intro"><p className="section-index">Where we focus</p><h2>Defined by the challenge. Disciplined in the response.</h2></div>
  <div className="directory-grid pectrium-focus-grid">{focus.map(item=><Link className="directory-card" href={item.href} key={item.number}><span className="directory-title">{item.title}<span aria-hidden="true">↗</span></span><span className="directory-description">{item.description}</span></Link>)}</div>
  <Link className="text-link pectrium-section-link" href="/solutions">Explore all solutions <span aria-hidden="true">↗</span></Link>
 </div></section>
 <section className="pct-technology-showcase" aria-labelledby="pct-tech-title"><div className="shell"><div className="pct-technology-intro"><p className="section-index">Technology / Systems thinking</p><div><h2 id="pct-tech-title">Intelligence is only as useful as the systems around it.</h2><p>Our technical direction connects software, data, applied intelligence and infrastructure. Explore the disciplines shaping how we approach complex problems.</p></div></div><TechnologySystem/><div className="pct-tech-bottom"><span>Interactive technology overview · Disciplines, not claims of deployed capabilities</span><Link className="text-link" href="/technology">Explore technology <span aria-hidden="true">↗</span></Link></div></div></section>
 <section className="pectrium-home-products"><div className="shell">
  <div className="pectrium-section-heading"><p className="section-index">Product directions</p><div><h2>Focused capabilities. Coherent systems.</h2><p>Five complementary product directions across work, intelligence, connectivity and engineering. Individual capabilities and availability depend on development status.</p></div></div>
  <ProductConceptShowcase/>
  <div className="pectrium-product-index">{products.map((item,index)=><Link href={item.href} className="pectrium-product-index-row" key={item.name}><strong>{item.name}</strong><span className="pectrium-product-field">{item.field}</span><span className="pectrium-product-description">{item.description}</span><span className="pectrium-product-arrow" aria-hidden="true">↗</span></Link>)}</div>
  <Link className="text-link pectrium-section-link" href="/products">Explore the product family <span aria-hidden="true">↗</span></Link>
 </div></section>
 <section className="shell editorial-section pectrium-hybrid-approach"><p className="section-index">Engineering</p><div><h2>Precision in approach. Responsibility in execution.</h2><p>Software engineering, applied intelligence and digital infrastructure are disciplines we bring together around defined needs. Our standards emphasize clarity, security, accessibility and maintainability.</p><Link className="text-link" href="/technology">Our technology approach <span aria-hidden="true">↗</span></Link>
 <div className="process-strip" aria-label="Engineering approach"><span>Understand</span><span>Design</span><span>Validate</span></div></div></section>
 <section className="pectrium-platform-feature"><div className="shell pectrium-platform-feature-inner"><p className="section-index">Pectrium Platforms</p><div><h2>Distinct platforms. Shared conviction.</h2><p>Quincestone and Ramptium are developed by Pectrium with individual identities and a shared commitment to thoughtful engineering. Development status and public availability are communicated separately.</p><div className="pectrium-platform-names"><span>Quincestone</span><span>Ramptium</span></div><Link className="text-link" href="/platforms">Explore platforms <span aria-hidden="true">↗</span></Link></div></div></section>
 <section className="shell home-bottom"><p className="section-index">The company</p><div><h2>Clarity of purpose. Depth of execution.</h2><p>Discover the principles, people and engineering philosophy guiding Pectrium.</p><Link className="text-link" href="/company">About Pectrium <span aria-hidden="true">↗</span></Link></div></section>
 </PageFrame>;}
