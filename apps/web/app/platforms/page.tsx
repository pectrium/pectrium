import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame, PageHero } from "@/components/page-frame";

export const metadata: Metadata = {
 title: "Platforms",
 description: "Explore Quincestone and Ramptium, platforms developed and built by Pectrium."
};

const platforms = [
 {number:"01",name:"Quincestone",description:"A platform built by Pectrium. Its capabilities, development stage and availability have not yet been verified."},
 {number:"02",name:"Ramptium",description:"A platform built by Pectrium. Its public repository identifies the project by name; capabilities and availability remain unverified.",repository:"https://github.com/Pectrium-technology/Ramptium"}
];

export default function Platforms(){return <PageFrame>
 <PageHero eyebrow="Pectrium / Platforms" title="Built by Pectrium." description="Distinct technology platforms developed around real needs, with a shared commitment to thoughtful engineering and long-term usefulness."/>
 <section className="shell editorial-section"><p className="section-index">Pectrium platforms</p><div><h2>Different platforms. One builder.</h2><p>Quincestone and Ramptium are platforms developed and built by Pectrium. Each has its own identity and direction. No public launch or availability is implied.</p><div className="initiative-preview initiative-page-list">{platforms.map(platform=><article className="initiative-preview-row" key={platform.name}><span>{platform.number}</span><div><h3>{platform.name}</h3><p>{platform.description}</p>{platform.repository?<a className="text-link" href={platform.repository} target="_blank" rel="noopener noreferrer">View GitHub repository <span aria-hidden="true">↗</span></a>:null}</div></article>)}</div></div></section>
 <section className="editorial-band"><div className="shell editorial-section"><p className="section-index">Our approach</p><div><h2>Technology built around real needs.</h2><p>Pectrium develops digital platforms with attention to useful experiences, responsible design and maintainable systems.</p><Link className="text-link" href="/company">About Pectrium <span aria-hidden="true">↗</span></Link></div></div></section>
 </PageFrame>;}
