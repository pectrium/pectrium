# PECTRIUM-DESIGN-001 — Live-aligned corporate experience review

Status: DRAFT / NOT APPROVED FOR MERGE OR PRODUCTION

## Verified baseline
- The deployed Pectrium site at https://pectrium-web.vercel.app/ contains the cinematic homepage, corporate navigation, and the Flow, Assist, Connect, Insight and Studio product routes.
- GitHub's earlier ejepsystems/ejepsystems path redirects to pectrium/pectrium; treat the old deployment commit metadata as historical until the Vercel Git integration and branch are verified.
- Corporate design authority: docs/PECTRIUM_DESIGN_FAMILY_02.md and docs/PECTRIUM_CORPORATE_POSITIONING_03.md. Preserve Geist Sans/Mono, precision monochrome, lowercase pectrium. wordmark, compact mobile layout and truthful stage labels.

## Product hierarchy
1. **Flow**: featured engineering-stage workflow foundation. Its proposed end-user experience is not verified as released or commercially available.
2. **Assist**, **Connect**, **Insight**: future product directions / concepts, not operating products.
3. **Studio**: internal engineering tooling, not a public commercial product.
4. **Core**: shared internal infrastructure, not a separate public commercial offering.

## Design and editorial corrections
- Keep existing cinematic hero and established corporate pages; do not replace them with the standalone mockup.
- Make lifecycle language prominent on Products and individual product pages.
- Do not claim customers, partnerships, availability, integrations, operational reliability or performance without verified evidence.
- Preserve Initiatives and Insights routes; do not infer ownership or operational status of independent initiatives.
- Live site includes a geometric symbol although Design Family 02 says no permanent symbol was approved. Resolve approval before brand certification; do not remove it without a separate decision.
- Contact channels and legal links require factual verification before publication.

## Required verification
- Confirm Vercel Git integration points to the renamed repository and correct production branch.
- Run exact-HEAD lint, typecheck, build, and relevant tests; record CI run links.
- Test 320, 375, 390, 768, 1024 and 1440 px viewports in a real browser.
- Verify mobile drawer keyboard behavior, Escape handling, focus return, 44 px touch targets, contrast, reduced motion, link targets, metadata and overflow.
- Reconcile with open FOUNDATION-001 PR #10; do not merge until independent review and founder approval.
- No domain, production, deployment or merge changes authorized.

## Scope of this draft
Small copy-only update to the existing product overview plus this audit note. Individual product detail pages, header and brand symbol are deliberately unchanged pending review.
