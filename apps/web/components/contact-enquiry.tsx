"use client";

import { useRef, useState } from "react";

const topics = [
 {name:"Product and technology",hint:"Product directions, technical ideas and capabilities",subject:"Product and technology enquiry"},
 {name:"Collaboration",hint:"Partnerships, projects and shared opportunities",subject:"Collaboration enquiry"},
 {name:"Media and speaking",hint:"Interviews, press requests and speaking invitations",subject:"Media and speaking enquiry"},
 {name:"General enquiry",hint:"Company information and other questions",subject:"General enquiry"}
] as const;

export function ContactEnquiry() {
 const dialog=useRef<HTMLDialogElement>(null);
 const [topic,setTopic]=useState(0);
 const [name,setName]=useState("");
 const [reply,setReply]=useState("");
 const [message,setMessage]=useState("");
 const [copied,setCopied]=useState(false);
 const email="pectriumgroup@gmail.com";
 const subject=topics[topic].subject;
 const body=[`Enquiry: ${topics[topic].name}`,`Name: ${name.trim()||"Not provided"}`,`Reply email: ${reply.trim()||"Not provided"}`,"",message.trim()].join("\n");
 const mailto=`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
 return <section className="pct-contact-interaction" aria-labelledby="enquiry-title">
  <div className="pct-contact-interaction-copy">
   <span className="pct-contact-kicker">Start a conversation</span>
   <h2 id="enquiry-title">Tell us what you have in mind.</h2>
   <p>Choose the kind of enquiry you want to make. We&apos;ll help you prepare a message to the official Pectrium inbox.</p>
   <button className="pct-contact-button" type="button" onClick={()=>dialog.current?.showModal()}>Start an enquiry <span aria-hidden="true">↗</span></button>
  </div>
  <div className="pct-contact-direct">
   <span className="pct-contact-kicker">Official channels</span>
   <a href="mailto:pectriumgroup@gmail.com">pectriumgroup@gmail.com <span aria-hidden="true">↗</span></a>
   <p>For written enquiries and introductions</p>
   <a href="https://x.com/pectrium" target="_blank" rel="noopener noreferrer">Pectrium on X <span aria-hidden="true">↗</span></a>
   <p>Updates and public conversation</p>
  </div>
  <dialog ref={dialog} className="pct-enquiry-dialog" aria-labelledby="pct-enquiry-title" onClose={()=>setCopied(false)}>
   <div className="pct-enquiry-dialog-head"><div><span className="pct-contact-kicker">Contact Pectrium</span><h2 id="pct-enquiry-title">Make an enquiry.</h2></div><button type="button" className="pct-dialog-close" aria-label="Close enquiry" onClick={()=>dialog.current?.close()}>×</button></div>
   <p className="pct-enquiry-help">Select a subject, add context, and open your email application to send it. This website does not collect or store your message.</p>
   <form onSubmit={event=>{event.preventDefault();window.location.href=mailto;}}>
    <fieldset className="pct-enquiry-topics"><legend>What is your enquiry about?</legend>
     {topics.map((item,index)=><label key={item.name} className={topic===index?"is-selected":""}><input type="radio" name="enquiry-topic" checked={topic===index} onChange={()=>setTopic(index)}/><span><strong>{item.name}</strong><small>{item.hint}</small></span></label>)}
    </fieldset>
    <div className="pct-enquiry-fields">
     <label>Your name <span>(optional)</span><input value={name} onChange={e=>setName(e.target.value)} autoComplete="name" maxLength={120} placeholder="Your name"/></label>
     <label>Reply email <span>(optional)</span><input type="email" value={reply} onChange={e=>setReply(e.target.value)} autoComplete="email" maxLength={180} placeholder="you@example.com"/></label>
     <label className="pct-enquiry-message">Your message <textarea value={message} onChange={e=>setMessage(e.target.value)} maxLength={4000} required rows={4} placeholder="Briefly explain your enquiry and what you would like to discuss."/></label>
    </div>
    <div className="pct-enquiry-actions"><button className="pct-contact-button" type="submit">Open email to send <span aria-hidden="true">↗</span></button><button type="button" className="pct-contact-secondary" onClick={async()=>{await navigator.clipboard.writeText(email);setCopied(true);}}>{copied?"Email copied":"Copy email address"}</button></div>
    <p className="pct-enquiry-privacy">Your email app opens with a prepared message. Nothing is submitted until you send it from that app. If no email app opens, use the address above.</p>
   </form>
  </dialog>
 </section>;
}
