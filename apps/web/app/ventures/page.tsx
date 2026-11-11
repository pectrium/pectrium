import type {Metadata} from "next";
import Link from "next/link";
import {PageFrame,PageHero} from "@/components/page-frame";
export const metadata:Metadata={title:"Initiatives",description:"Explore Pectrium’s independent initiatives, including Ramptium."};
const names=["Quincestone","Emperor Armani","Clesla","Ramptium"];
export default function Ventures(){return <PageFrame>
 <PageHero eyebrow="Initiatives / Current scope" title="Independent ideas. Distinct identities." description="Pectrium’s current development scope includes independent initiatives. Each requires its own verified story, role and development stage."/>
 <section className="shell editorial-section"><p className="section-index">Named initiatives</p><div><div className="initiative-preview initiative-page-list">{names.map((name,i)=><article className="initiative-preview-row" key={name}><span>0{i+1}</span><h2>{name}</h2>{name==="Ramptium"?<a className="text-link" href="https://github.com/Pectrium-technology/Ramptium" target="_blank" rel="noopener noreferrer" aria-label="View Ramptium repository on GitHub">GitHub repository <span aria-hidden="true">↗</span></a>:<span>Details under review</span>}</article>)}</div><p className="editorial-disclaimer">Ramptium is classified as an independent initiative. Its public GitHub repository currently documents its name only. Descriptions, ownership relationships and development stages of other initiatives remain under review. No public launch is implied.</p></div></section>
 <section className="editorial-band"><div className="shell editorial-section"><p className="section-index">Explore</p><div><h2>One standard of care. Different directions.</h2><p>Independent initiatives may draw on common research and engineering practices while retaining their own audiences, requirements and identities.</p><Link className="text-link" href="/company">About the company <span aria-hidden="true">↗</span></Link></div></div></section>
 </PageFrame>;}
