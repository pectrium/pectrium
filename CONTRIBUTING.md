# Contributing to Pectrium

Pectrium is an independent technology company. This repository contains its corporate website, shared engineering packages, Flow engine, and local corporate starter tooling. Changes must be scoped to verified needs and approved work.

## Before starting

- Read the root README and relevant package README, source, and tests.
- Check open pull requests for overlap, especially documentation authority changes.
- Open an issue or obtain founder approval for structural changes, new products, new infrastructure, legal/corporate statements, or deployments.
- Work on a dedicated branch from the current `main`; do not push directly to `main`.

## Current local prerequisites

- Node.js 22 for the web and Flow validation baseline. The existing starter validation workflow uses Node.js 24; do not assume identical results across versions.
- pnpm 10.16.1, declared in the root package manifest.
- **Baseline at FOUNDATION-001 review:** no committed root `pnpm-lock.yaml`. Until an actual pnpm-generated root lockfile is committed and verified, installs may resolve different transitive dependencies. Once that gate passes, use `corepack pnpm install --frozen-lockfile` for the root workspace. Generated starter projects are separate and have no bundled lockfile; their initial install is intentionally non-frozen.

## Commands

From the repository root:

```sh
corepack enable
corepack pnpm install --no-frozen-lockfile  # temporary root fallback until lockfile verified
corepack pnpm lint
corepack pnpm typecheck
corepack pnpm build
corepack pnpm --filter @pectrium/core test
corepack pnpm --filter @pectrium/flow test
node --test tooling/create-platform.test.mjs tooling/studio-server.test.mjs
```

The corporate starter generator creates an independent project in ignored `generated/`. Follow `tooling/studio/README.md` for the local-only Studio. Do not expose it publicly.

## Pull request expectations

- Explain the problem, files affected, alternatives considered, and compatibility impact.
- Include tests and evidence appropriate to the changed surface.
- Report exact commit SHA and CI results; distinguish pending checks from successful checks.
- Flag any dependency, configuration, security, accessibility, legal, or deployment implications.
- Use independent engineering review and engineering assurance for milestones that require them.
- No merge or deployment without Evans Jep's explicit approval.

## Scope boundaries

Do not change Flow checkpoint/recovery semantics, package paths, Vercel projects, domains, legal identity, or production settings as part of unrelated work. New research initiatives do not authorize new application directories.

For sensitive vulnerability reports, follow [SECURITY.md](SECURITY.md). Do not disclose exploitable details in a public issue.
