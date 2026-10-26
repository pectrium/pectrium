# ADR-0001 — Preserve the current workspace and isolate foundation changes

**Status:** Proposed for independent review (PECTRIUM-FOUNDATION-001)  
**Decision authority:** Evans Jep  
**Baseline:** `main` at `13e1e18145d53c57ecfb887cd915d83a28008165`

## Context

Pectrium's repository already contains `apps/web`, `packages/core`, `packages/flow`, `packages/ui`, `templates/corporate`, `tooling`, and four GitHub Actions workflows. Flow Milestone 02 was merged through PR #8. Documentation authority reconciliation is underway separately in PR #9.

The current root package manager is pnpm 10.16.1, with `apps/*` and `packages/*` workspace globs. No `pnpm-lock.yaml` is committed at the baseline. CI currently uses non-frozen or lockfile-disabled installs.

## Proposed decision

1. Retain the existing pnpm workspace and package locations. Do not add monorepo orchestration frameworks or placeholder applications.
2. Treat a committed, generated and CI-verified lockfile as a required future reproducibility gate; do not fabricate it, hand-author registry integrity data, or enable frozen installs until it exists.
3. Document contribution, review, and responsible vulnerability-reporting expectations without inventing staff, contacts, or guarantees.
4. Keep DOCS-001 changes separate. Resolve conflicts only after review and explicit approval.
5. Research tracks PECTRIUM-RES-001 and PECTRIUM-RES-002 do not authorize product implementation.
6. Evaluate a separate repository for each future approved product when its requirements are known.

## Lockfile completion plan (pending verified registry access)

- On a trusted environment with pnpm 10.16.1 and registry access, run `corepack pnpm install --lockfile-only --no-frozen-lockfile` at the repository root.
- Commit the **actual generated** `pnpm-lock.yaml` on this branch after reviewing its workspace importers and resolved dependency changes.
- Replace non-frozen install commands in relevant workflows with `--frozen-lockfile`, preserving Flow's isolated install requirements or replacing them with a tested frozen equivalent.
- Verify `pnpm install --frozen-lockfile`, web lint/typecheck/build, Core and Flow tests, and corporate starter generator and generated-project checks.
- Submit the exact lockfile SHA and CI evidence to independent engineering review. Do not claim completion before these gates pass.

## Consequences

Minimal architectural churn and clearer change authority. Repository-wide deterministic dependency resolution **remains unverified until the lockfile completion plan is executed**.

## Not decided

Hosted workers, databases, Flow Studio, product apps, new frameworks, package renames, deployment changes, and legal identity.
