export const metadata={title:"Pectrium mobile release QA",robots:{index:false,follow:false}};
export default function MobileReview(){
 return <main style={{background:"#dce6f1",minHeight:"100vh",padding:"25px 10px",fontFamily:"Arial,sans-serif",color:"#142842"}}>
  <div style={{maxWidth:1000,margin:"auto"}}>
   <h1 style={{fontSize:23,margin:"0 0 10px"}}>Preview-only mobile QA frame</h1>
   <p style={{maxWidth:680,fontSize:13,lineHeight:1.6}}>The iframe below has a true 390 CSS-pixel viewport, so responsive breakpoints execute naturally. This route is a temporary review fixture and will be removed before release.</p>
   <div style={{width:392,margin:"22px auto",border:"1px solid #8194ad",background:"#fff",boxShadow:"0 18px 44px #2d466744"}}>
    <div style={{background:"#142a45",color:"#fff",padding:10,fontSize:12}}>PECTRIUM / 390px mobile viewport</div>
    <iframe title="Pectrium homepage inside a 390 pixel mobile viewport" src="/" style={{display:"block",width:390,height:800,border:0}}/>
   </div>
  </div>
 </main>;
}