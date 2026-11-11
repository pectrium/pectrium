import type {Metadata} from "next";
import Link from "next/link";
import {PageFrame,PageHero} from "@/components/page-frame";
import {ContactEnquiry} from "@/components/contact-enquiry";
export const metadata:Metadata={title:"Contact Pectrium",description:"Contact Pectrium at pectriumgroup@gmail.com for partnerships, technology collaborations, products, media and general enquiries."};
export default function Contact(){return <PageFrame>
 <PageHero eyebrow="Pectrium / Contact" title="Start a meaningful conversation." description="Reach the Pectrium team about partnerships, product questions, technology collaboration or the challenges you're working to solve."/>
 <section className="shell pct-contact-section"><ContactEnquiry/></section>
 <section className="shell editorial-section pct-contact-outro"><p className="section-index">Before you write</p><div><h2>Good conversations begin with context.</h2><p>There is no need for a lengthy proposal. Tell us what you are exploring, why it matters and what kind of response would be useful. Please avoid including passwords, credentials or sensitive personal information in an initial enquiry.</p><div className="hero-actions"><Link className="text-link" href="/solutions">Our solutions <span aria-hidden="true">↗</span></Link><Link className="text-link" href="/company">About Pectrium <span aria-hidden="true">↗</span></Link></div></div></section>
 </PageFrame>;}