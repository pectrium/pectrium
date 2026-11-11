# Pectrium

**Technology built around real needs.**

Pectrium is a technology company developing software, intelligent systems, and digital platforms that make complex work and everyday experiences more useful, understandable, and dependable.

We approach technology as a means to solve meaningful problems—not as an end in itself. Our work brings together product thinking, software engineering, applied intelligence, and infrastructure, with a commitment to responsible design and long-term maintainability.

## What we build

Pectrium's technology direction spans:

- **Software products:** tools and workflows designed to reduce friction in work and services.
- **Intelligent systems:** responsible, human-centered ways to make information and decisions more accessible.
- **Connected infrastructure:** dependable foundations for digital experiences and interoperable systems.
- **Pectrium Platforms:** distinct platforms developed and built by Pectrium, each with its own identity and scope.

These are areas of focus, not claims that every proposed capability is publicly available.

## Pectrium Platforms

| Platform | Relationship | Public information |
| --- | --- | --- |
| **Quincestone** | Platform developed and built by Pectrium | Product scope and release status under review |
| **Ramptium** | Platform developed and built by Pectrium | [Public GitHub repository](https://github.com/Pectrium-technology/Ramptium); capabilities and release status not yet verified |

Platforms are distinct from the planned Pectrium product family. Listing a platform does not imply a public launch, commercial availability, or a separately incorporated company.

## Our principles

**Start with real needs.** Understand the people, constraints, and outcomes before selecting technology.

**Engineer for trust.** Favor security, privacy, accessibility, reliability, and clear ownership.

**Make complexity useful.** Build systems that simplify decisions and workflows instead of adding unnecessary layers.

**Build for longevity.** Design for maintainability, iteration, and responsible evolution.

**Communicate with precision.** Distinguish vision, prototypes, internal tools, and shipped capabilities.

## This repository

This repository contains the Pectrium corporate web application and supporting workspace packages.

- **Web application:** `apps/web` — Next.js application
- **Shared UI and design tokens:** `packages/ui`
- **Workspace:** pnpm-based monorepo

### Local development

Use the package manager and Node.js versions defined by the repository configuration. From the repository root:

```bash
pnpm install
pnpm dev
```

Check `package.json` for the current scripts and package names before running workspace-specific commands.

## Engineering standards

Changes should be reviewed and verified before release. The website must distinguish factual company information from proposed or in-development technology. Accessibility, responsive behavior, dependency health, security boundaries, and build correctness are release requirements.

Production releases require separate approval. Preview builds and review branches are not production authorization.

## Company and brand

**Pectrium** is the public-facing technology brand. **Evans Jep** is its founder and CEO. The relationship of **EJEP Systems** to the underlying legal/corporate structure remains subject to verification of legal records. **Jeclazon** is a retired legacy brand and is not the current company identity.

The governing [Pectrium Master Brand Directive](docs/00_PECTRIUM_MASTER_BRAND_DIRECTIVE.md) and [migration plan](docs/PECTRIUM_PHASE_02_MIGRATION_PLAN.md) document identity and release controls. Older documents are retained for historical reference, not as current brand authority.

---

*Pectrium — Technology built around real needs.*
