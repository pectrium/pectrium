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
