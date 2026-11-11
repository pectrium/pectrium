import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame, PageHero } from "@/components/page-frame";
import { ContactEnquiry } from "@/components/contact-enquiry";

export const metadata: Metadata = {
 title:"Contact",
 description:"Contact Pectrium about technology, collaboration, media or general enquiries. Email pectriumgroup@gmail.com or connect on X."
};

export default function Contact(){
 return <PageFrame>
  <PageHero eyebrow="Contact" title="Let’s start a useful conversation." description="Have a question, an idea or an opportunity to explore? Reach Pectrium through our official channels, or choose an enquiry type and compose a message."/>
  <div className="shell"><ContactEnquiry/></div>
  <section className="shell pct-depth-section pct-contact-guidance">
   <div className="pct-depth-heading"><p className="section-index">Before you write</p><h2>A little context goes a long way.</h2><p>There is no formal proposal template. A few useful details help us understand the nature of your enquiry.</p></div>
   <div className="pct-contact-guidance-grid">
    <article><h3>What is the opportunity?</h3><p>Introduce the problem, idea or subject you would like to discuss.</p></article>
    <article><h3>Who is it for?</h3><p>Share the people, organization or setting involved, where relevant.</p></article>
    <article><h3>What would be useful next?</h3><p>Tell us whether you are looking for a conversation, information or a specific response.</p></article>
   </div>
  </section>
  <section className="editorial-band"><div className="shell editorial-section"><p className="section-index">Explore Pectrium</p><div><h2>Get to know the work behind the conversation.</h2><p>Explore the thinking behind our products, solution areas and engineering direction.</p><Link className="text-link" href="/solutions">Solutions <span aria-hidden="true">↗</span></Link><Link className="text-link" href="/technology">Technology <span aria-hidden="true">↗</span></Link></div></div></section>
 </PageFrame>;
}
