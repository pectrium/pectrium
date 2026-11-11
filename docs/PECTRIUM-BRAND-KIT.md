# PECTRIUM — Flagship digital brand kit

**Status:** Brand design direction locked for the website. This is a design system and usage policy, not a claim of externally registered trademarks or a production product launch.

**Brand promise:** Technology built around real needs.

## Three complementary visual languages

The three systems are **one Pectrium brand**, not three separate brands. Apply them by context; never mix competing hero treatments on a single page.

| System | Assigned flagship page | Purpose | Palette | Composition |
| --- | --- | --- | --- | --- |
| **Quantum Architecture** | Homepage (`/`) | Introduce Pectrium as a systems-thinking technology company | Midnight navy `#071526`, deep blue `#0b243e`, ice-blue `#9bcaff` | Geometric orbital field, perspective engineering grid, careful luminous depth |
| **Obsidian** | Technology (`/technology`) | Express technical rigor and research discipline | Near-black `#03080e`, ink `#081421`, steel blue `#9cbad5` | One restrained, code-built sculptural object; quiet contrast |
| **Infinite Systems** | Solutions (`/solutions`) | Communicate clarity, accessibility and connected problem-solving | Mist white `#f1f6fc`, pale blue `#d4e9fc`, cobalt `#3077b8`, ink `#142c48` | Bright modular geometry, clean structure, accessible contrast |

## Non-negotiable shared brand rules

1. **One wordmark and voice:** PECTRIUM; no separate names or logos for the three visual directions.
2. **One type family:** Geist for interface and editorial typography; Geist Mono for code and small technical notation. Clear hierarchy, restrained weights and tight but legible headings.
3. **One promise:** “Technology built around real needs.” Use truthful, useful language rather than superlatives or unverified claims.
4. **Original visual materials:** Build hero artwork from CSS and native HTML. Do not reuse Tesla, xAI, Google or Microsoft marks, photographs, interface screenshots or source assets.
5. **Meaningful interaction:** Real links, visible focus, keyboard navigation, responsive layout and reduced-motion behavior. Never animate at the expense of clarity.
6. **Evidence boundaries:** Clearly label conceptual interfaces and architecture. Never invent deployed features, customers, certifications, revenue, benchmarks or service guarantees.
7. **Contrast:** Light text on dark Quantum/Obsidian fields; dark text on Infinite Systems. The headline and CTA must remain readable at 390px and desktop widths.
8. **No numbering decoration:** Do not introduce 01 / 02 / 03 section indices as ornamental headline prefixes.

## System ownership

- Homepage is the primary **Quantum Architecture** flagship.
- Technology page is the dedicated **Obsidian** expression.
- Solutions overview is the dedicated **Infinite Systems** expression.
- Products and product detail pages inherit the shared typography, navigation, spacing and interaction standards; they do not introduce a fourth hero identity.
- Company, Insights, Platforms and Contact remain editorial and restrained, using shared brand tokens.

## Implementation references

- `apps/web/components/hero-media.tsx`: Quantum Architecture field, replacing the deleted low-resolution photograph.
- `apps/web/components/direction-hero.tsx`: Obsidian and Infinite Systems hero compositions.
- `apps/web/app/globals.css`: scoped visual system rules and mobile variants.
- `apps/web/components/architecture-explorer.tsx` and `apps/web/components/product-concept-showcase.tsx`: original interactive technical demonstrations.

## Release checklist

Before merging: validate production build, lint, type checks, Flow tests, and Phase 02; inspect desktop and 390px mobile for all three hero pages; verify no image request for the removed collage; verify accessibility and correct links. Keep production separate until review is green.
