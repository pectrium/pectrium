import type { Metadata } from "next";
import Link from "next/link";
import { PageFrame, PageHero } from "@/components/page-frame";

export const metadata: Metadata = {
 title: "Ramptium — Pectrium",
 description: "Ramptium is a Pectrium product with a public GitHub repository."
};

export default function RamptiumPage() {
 return <PageFrame>
  <PageHero eyebrow="Pectrium / Products / Ramptium" title="Ramptium." description="A Pectrium product. Its capabilities and availability have not yet been verified."/>
  <section className="shell editorial-section">
   <p className="section-index">Product information</p>
   <div>
    <h2>Follow the project at its source.</h2>
    <p>Ramptium is part of the Pectrium product family. Its public repository currently identifies the project by name, without enough documentation to confirm features, release status or availability.</p>
    <a className="text-link" href="https://github.com/Pectrium-technology/Ramptium" target="_blank" rel="noopener noreferrer">View Ramptium on GitHub <span aria-hidden="true">↗</span></a>
    <p><Link className="text-link" href="/products">Explore all Pectrium products <span aria-hidden="true">↗</span></Link></p>
   </div>
  </section>
 </PageFrame>;
}
