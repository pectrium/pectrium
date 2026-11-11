"use client";
import { useState, type FormEvent } from "react";

const enquiries = [
 {value:"General enquiry",title:"General enquiry",hint:"Company information and introductory conversations"},
 {value:"Partnership or collaboration",title:"Partnership",hint:"Ideas for working with Pectrium"},
 {value:"Products and platforms",title:"Products & platforms",hint:"Questions about Flow, Assist, Connect, Insight, Studio, Quincestone or Ramptium"},
 {value:"Technology and engineering",title:"Technology",hint:"Technical conversations and engineering interests"},
 {value:"Media or press",title:"Media & press",hint:"Editorial requests and public information"},
 {value:"Other",title:"Something else",hint:"Anything that doesn't fit the options above"}
] as const;
const email="pectriumgroup@gmail.com";
export function ContactEnquiry(){
 const [kind,setKind]=useState<string>(enquiries[0].value);
 const [name,setName]=useState("");
 const [reply,setReply]=useState("");
 const [organization,setOrganization]=useState("");
 const [message,setMessage]=useState("");
 const [copied,setCopied]=useState(false);
 const subject=`Pectrium — ${kind}`;
 const body=`Enquiry type: ${kind}\nName: ${name}\nReply email: ${reply}\nOrganization: ${organization||"Not provided"}\n\nMessage:\n${message}`;
 const mailto=`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
 function submit(event:FormEvent<HTMLFormElement>){event.preventDefault();window.location.href=mailto;}
 async function copyEmail(){try{await navigator.clipboard.writeText(email);setCopied(true);}catch{setCopied(false);}}
 return <div className="pct-contact-layout">
  <div className="pct-contact-intro">
   <p className="section-index">Direct communication</p>
   <h2>Tell us what you have in mind.</h2>
   <p>Choose the nature of your enquiry and share a little context. We&apos;ll help you prepare a clear email to the official Pectrium inbox.</p>
   <div className="pct-contact-channels">
    <div><span>Official email</span><a href="mailto:pectriumgroup@gmail.com">pectriumgroup@gmail.com <span aria-hidden="true">↗</span></a></div>
    <div><span>Social updates</span><a href="https://x.com/pectrium" target="_blank" rel="noopener noreferrer">X / @pectrium <span aria-hidden="true">↗</span></a></div>
   </div>
   <button type="button" className="pct-contact-copy" onClick={()=>void copyEmail()}>{copied?"Email address copied":"Copy email address"} <span aria-hidden="true">↗</span></button>
  </div>
  <form className="pct-contact-form" onSubmit={submit}>
   <fieldset><legend>What can we help with?</legend>
    <div className="pct-enquiry-grid">{enquiries.map(option=><label key={option.value} className={kind===option.value?"pct-enquiry-option is-selected":"pct-enquiry-option"}><input name="enquiry" type="radio" value={option.value} checked={kind===option.value} onChange={()=>setKind(option.value)}/><strong>{option.title}</strong><span>{option.hint}</span></label>)}</div>
   </fieldset>
   <div className="pct-contact-fields">
    <label htmlFor="pct-contact-name">Your name <span>Required</span></label>
    <input id="pct-contact-name" name="name" type="text" autoComplete="name" maxLength={120} required value={name} onChange={event=>setName(event.target.value)} placeholder="How should we address you?"/>
    <label htmlFor="pct-contact-email">Reply email <span>Required</span></label>
    <input id="pct-contact-email" name="email" type="email" autoComplete="email" maxLength={180} required value={reply} onChange={event=>setReply(event.target.value)} placeholder="name@example.com"/>
    <label htmlFor="pct-contact-org">Organization <span>Optional</span></label>
    <input id="pct-contact-org" name="organization" type="text" autoComplete="organization" maxLength={160} value={organization} onChange={event=>setOrganization(event.target.value)} placeholder="Company or team"/>
    <label htmlFor="pct-contact-message">Tell us a little more <span>Required</span></label>
    <textarea id="pct-contact-message" name="message" rows={5} maxLength={6000} required value={message} onChange={event=>setMessage(event.target.value)} placeholder="The challenge, your question, or what you'd like to explore…"/>
   </div>
   <button className="pct-contact-submit" type="submit">Open email draft <span aria-hidden="true">↗</span></button>
   <p className="pct-contact-disclosure">This opens your device&apos;s email application with a prepared message. It does not submit information to a Pectrium website server. Review the draft and press Send in your email application to contact us. If no email app is configured, use the email address above.</p>
  </form>
 </div>;
}
