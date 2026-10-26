# Pectrium Flow — Milestone 02 execution contract

This package is a **sequential, in-process** workflow executor, not a hosted service.

- Handler retries are **at-least-once** for external operations. A retry can repeat a side effect. Callers must provide their own safe idempotency and reconciliation policies.
- Checkpoint callbacks must acknowledge durable persistence only after a write succeeds. An acknowledged callback is not proof of durability if the caller's storage implementation lies or loses data.
- Intent is checkpointed before each handler. A persisted `running` checkpoint requires explicit recovery; the engine will **not** replay it automatically.
- `CheckpointPersistenceError` carries tentative and last acknowledged snapshots; the former is **not** claimed to be durable. An external side effect may have occurred before a success write failed.
- `OutputCaptureError` is non-retryable: the handler completed but returned non-JSON-safe data. It also exposes snapshots and requires operator/application reconciliation.
- A terminal handler failure returns a `failed` workflow checkpoint with `failureReason: "handler"`; checkpoint and output failures throw typed errors.
- The caller must supply a nonempty immutable `workflow.revision` and increment/change it whenever handler behavior or execution semantics change. The engine fingerprints canonical step IDs, dependencies and retry policies; it cannot inspect handler source or detect semantic changes.
- Results must be JSON-safe values (not `undefined`, nonfinite numbers, BigInt, Dates, functions, cycles, sparse arrays or custom instances). Downstream handlers receive independent copies.
- Cancellation is **cooperative**. It is checked between steps/attempts; an active handler is not forcibly stopped. Handlers may observe the supplied AbortSignal themselves.
- This milestone does **not** provide distributed workers, durable persistence, automatic recovery of uncertain side effects, compare-and-set checkpoint sequencing, worker ownership, or exactly-once delivery.
- Future safe retry keys must include unique **run identity**; workflow ID and step ID alone are insufficient.

## Deferred follow-up

Plan explicit run identity, durable compare-and-set sequence numbers, worker ownership, operator-controlled resolution and distributed recovery as a separate milestone. Do not infer that these features exist today.

## Checkpoint execution modes

`executeWorkflow(workflow, { checkpointMode: "memory" })` runs without a persistence
callback. This is the default when `onCheckpoint` is absent. Its returned
`checkpoint` is an **in-memory snapshot only**; it must not be treated as an
acknowledged durable write or a crash-safe recovery record.

`executeWorkflow(workflow, { checkpointMode: "durable", onCheckpoint })`
requires a callback that resolves **only after** the checkpoint is durably
stored. Passing `onCheckpoint` without `checkpointMode` selects durable
mode for backward compatibility. Explicit memory mode rejects a callback to
avoid ambiguous durability claims.

The executor never supplies its own durable storage. Callers are responsible
for storage atomicity, persistence, ownership, and serializing the checkpoint.
If the callback resolves without durable storage, the engine cannot detect
that false acknowledgement. The `acknowledgedCheckpoint` on errors is only
the last callback-acknowledged snapshot, **not proof of physical durability**.

On restart, a durable `succeeded` checkpoint skips committed steps; a
`failed` checkpoint remains terminal; a `running` checkpoint produces
`RecoveryRequiredError` and **must not** be replayed without external
reconciliation. A failed intent write prevents execution in that invocation.
A failed success write can leave an external effect completed but uncommitted;
the last acknowledged `running` checkpoint deliberately blocks automatic
replay. A durable `pending` checkpoint after a handler failure may be
retried up to the remaining attempt budget; side effects can therefore repeat.

## Milestone boundary and CI status classification

Concurrent workflow execution, distributed ownership/locking, automatic
external-effect reconciliation, compare-and-set writes and operator recovery
interfaces are **outside Milestone 02**.

Flow CI installs only the local `@pectrium/flow...` workspace graph using
pnpm 10.16.1 and Node 22. The repository has no committed pnpm lockfile.
This isolates Flow from the unrelated web app's dependency resolution but
**does not establish reproducible dependency installation for the full
monorepo**. A repository-wide lockfile and frozen installs must be addressed
in a separately approved workspace-dependency task before claiming that
property.

Historical Milestone 02 review: the obsolete `pectrium-cinematic-preview` Vercel status failed due to an absent `apps/cinematic` root. That Vercel project was subsequently deleted, and PR #8 was merged into `main`. The historical failed status remains commit provenance, not evidence of a Flow test failure. For future PRs, inspect their actual required checks and protection rules; do not recreate `apps/cinematic`.
