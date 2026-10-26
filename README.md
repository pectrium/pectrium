# Pectrium — Technology Company and Engineering Repository

**Pectrium** is the public-facing technology company identity founded by Evans Jep. This repository, `pectrium/pectrium`, contains its corporate website and engineering foundations. The company explores software, intelligent systems, and digital infrastructure with a focus on making complex experiences simpler and more useful.

**Homepage positioning:** Technology built around real needs.

**Earlier approved brand statement:** Intelligent Systems. Global Possibilities. This is a distinct historical/strategic brand statement recorded in the [master directive](docs/00_PECTRIUM_MASTER_BRAND_DIRECTIVE.md), not the same string as the homepage positioning. Neither statement is evidence of operational scale.

## Authority and historical context

1. [Pectrium Master Brand Directive](docs/00_PECTRIUM_MASTER_BRAND_DIRECTIVE.md) — current company identity authority.
2. [Pectrium Engineering Reference Standard](docs/PECTRIUM_ENGINEERING_REFERENCE_STANDARD_01.md) — engineering and experience reference principles.
3. [Pectrium Phase 02 Migration Plan](docs/PECTRIUM_PHASE_02_MIGRATION_PLAN.md) — historical migration record, **not** a current release-state report.

Jeclazon is a retired predecessor identity. Legacy technical identifiers (if any) must be inventoried and assessed separately; a historical name in source, configuration, or infrastructure is not authorization for an automatic rename. The `docs/*JECLAZON*` records are preserved for historical provenance and explicitly superseded; they are not current branding, design, or communication authority. EJEP Systems may be referenced only for a verified underlying legal/corporate role and legally required disclosures. This repository does not establish ownership, registrations, or legal relationships.

## Repository map

- `apps/web` — Pectrium corporate web application.
- `packages/core` — shared core engineering package.
- `packages/flow` — Pectrium Flow execution engine and its documented contracts.
- `packages/ui` — shared UI foundation.
- `templates/corporate` — corporate project starter template.
- `tooling/` — local engineering and project generation tools.
- `docs/` — active specifications, milestone records, and historical decisions.

Refer to each package's source and documentation for verified behavior; a planned capability is not an implemented capability.

## Pectrium Flow milestone status

**PECTRIUM-FLOW-002 was merged into `main` through [PR #8](https://github.com/pectrium/pectrium/pull/8).** The approved PR head was `e326365042bf69d877487dc217279cb1ba359eac`; the resulting merge commit was `13e1e18145d53c57ecfb887cd915d83a28008165`.

The implemented **Flow engine** in Milestone 02 is distinct from any broader conceptual **Pectrium Flow product or hosted platform**. Flow Milestone 02 provides an in-process sequential executor with explicit memory/durable checkpoint modes and documented uncertain-execution recovery boundaries. **It is not a hosted or distributed execution service.** See [Flow's README](packages/flow/README.md) for exact guarantees and limitations. A full-repository reproducible pnpm lockfile is not yet established; isolated Flow CI does not imply monorepo-wide reproducibility.

## Company and product boundaries

Quincestone, Emperor Armani, and Clesla retain distinct identities and governance. Repository documentation alone does not establish their legal ownership, affiliation, operational status, or public launch.

The corporate website is a company presence, not a customer dashboard, checkout, billing system, or authentication portal. Publish only evidence-supported capabilities and development stages.

## Legacy infrastructure verification (separate scope)

Historical Vercel project names, preview URLs, domain aliases, and any legacy domain association must be checked against the **current Vercel project configuration and DNS** before drawing conclusions about ownership, active routing, or release status. This documentation PR neither verifies nor changes Vercel domains, aliases, environment variables, or deployment settings. Record findings in a separately authorized infrastructure audit; do not infer that a legacy domain is removed merely because company wording changed.

## Engineering governance

- Protect `main`; use scoped feature branches, tests, independent review, and engineering assurance.
- Distinguish current authority from superseded records and proposed future work.
- Preserve secrets isolation, project independence, and preview/production boundaries.
- Do not merge, deploy, change domains, migrate legal identity, or rename infrastructure without explicit authorization.
- Follow **AUDIT → BASELINE → PLAN → IMPLEMENT → VERIFY → INDEPENDENT REVIEW → ASSURANCE → APPROVAL**.

**PECTRIUM-DOCS-001** is a documentation-authority correction. It does not authorize Flow 003 implementation or production deployment.
