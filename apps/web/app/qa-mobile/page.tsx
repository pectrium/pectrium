export const metadata = { title: "Mobile QA — Pectrium", robots: { index: false, follow: false } };
export default function MobileQaPage() {
 return <main style={{background:"#dfe6ee",minHeight:"100vh",padding:"20px 12px",fontFamily:"Arial,sans-serif",color:"#1a2737"}}>
  <div style={{maxWidth:1100,margin:"0 auto"}}>
   <h1 style={{fontSize:24,margin:"0 0 8px"}}>Mobile viewport QA</h1>
   <p style={{maxWidth:750,fontSize:13,lineHeight:1.6}}>Temporary preview-only browser test fixture. The embedded homepage is in a true 390 CSS pixel viewport; its media queries and interactive components execute in the iframe. No production changes.</p>
   <div style={{width:392,maxWidth:"100%",margin:"20px auto",border:"1px solid #8d9cac",background:"#fff",boxShadow:"0 22px 60px #162e4655"}}>
    <div style={{padding:"8px 12px",fontSize:12,background:"#14263d",color:"#fff"}}>PECTRIUM · 390px mobile frame</div>
    <iframe title="Pectrium homepage at 390 pixels" src="/" style={{display:"block",width:"390px",height:"840px",border:"0",maxWidth:"none"}}/>
   </div>
  </div>
 </main>;
}
