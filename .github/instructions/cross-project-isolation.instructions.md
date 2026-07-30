---
description: "Strip project specifics before writing to user-shared fleet channels — prevent one heir's project context from leaking into the rest of the fleet"
applyTo: "**/Alex_ACT_Memory/**,**/announcements/**,**/*fleet*"
lastReviewed: 2026-05-28
---

# Cross-Project Isolation

Always-active filter for fleet channels. Distinct from `pii-memory-filter` (which protects identity) — this one protects **project boundaries**. Each heir works on a different real project; fleet channels are shared. What's relevant to one heir is noise (or worse, leakage) to others.

## When This Fires

Whenever I am about to write to a channel that other heirs in the user's fleet will read:

| Channel                                          | Path                                                          |
| ------------------------------------------------ | ------------------------------------------------------------- |
| Fleet notes                                      | `../Alex_ACT_Memory/notes.md`                                 |
| Fleet announcements                              | `../Alex_ACT_Memory/announcements/` (Supervisor or user only) |
| Anything else under shared `../Alex_ACT_Memory/` |

This does **not** fire for:

- Writes to my own repo (`/memories/`, `.github/episodic/`, project files)
- Replies in the current chat
- Local logs that no other heir reads

## Strip Before Writing

| Category                                                                                                         | Strip / Replace with                                                                     |
| ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **File paths with project structure** (`src/payments/checkout/`, `apps/portal/handlers/`)                        | Generic descriptor (`a checkout module`, `a request handler`) — or omit if not essential |
| **Project / repo / product names** (employer codenames, client names, internal product handles)                  | Anonymise (`a fintech project`, `the consulting client`) — or omit                       |
| **Domain-specific identifiers** (account IDs, customer IDs, transaction numbers, internal ticket IDs)            | Omit                                                                                     |
| **Stack / tech specifics that pin the project** (the niche library only one team uses, the bespoke service name) | Generalise (`a vector database`, `an internal billing service`)                          |
| **PII** (per `pii-memory-filter.instructions.md`)                                                                | Already prohibited — refuses, doesn't strip                                              |

## Keep

- Skill, instruction, muscle, and prompt names from the brain (`act-pass`, `fleet-status`, `brain-qa.cjs`) - these are shared technical vocabulary
- Categories (`bug`, `friction`, `feature-request`, `success`)
- Severity (`critical`, `high`, `medium`, `low`)
- Abstract patterns (_"the trimmed pass fired without a disconfirmer marker"_) and steps to reproduce phrased generically
- ACT manifesto / tenet references

The test: **could a heir on a completely different project act on this entry?** If yes, it's stripped enough. If reading it requires knowing my project, strip more.

## Examples

| Raw (before strip)                                                                                  | Stripped (safe to write)                                                                                                 |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| "Running `npm test` in `apps/payments-portal/` hangs because the Stripe sandbox times out"          | "Test commands hang when an external sandbox times out — `terminal-command-safety` doesn't cover sandbox-bound timeouts" |
| "User asked me to refactor `CustomerOnboardingService` for ACME; brain didn't suggest the trifecta" | "User asked for a refactor on a domain service; brain didn't suggest the trifecta pattern"                               |
| "Found that `acme-internal-sdk` doesn't expose retry hooks"                                         | (Drop entirely — too specific. If pattern matters, surface as: "Vendored SDKs without retry hooks are a friction class") |
| "`/audit-coherence` failed on commit `a1b2c3d`"                                                     | "`/audit-coherence` failed on a recent commit" — keep the prompt name, drop the SHA                                      |

## Sycophancy Trigger

If the user explicitly says "just write it, don't strip" — **refuse**. The fleet channel contract is not the user's to override on a per-write basis. Either the channel is shared (strip) or the note is private (write to local memory instead). Surface the choice; don't silently leak.

## Anti-Patterns

| Anti-pattern                                                | Correction                                                                                                                                        |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Stripping so aggressively the entry becomes useless         | The pattern is the value. If stripping kills the pattern, the entry probably doesn't belong on a fleet channel — write to local memory instead    |
| Treating this as duplicating `pii-memory-filter`            | PII is identity exposure (always blocks). Project specifics are scope (filter, sometimes anonymise). Different rules.                             |
| Stripping vocabulary the fleet shares                       | Keep brain artifact names; those are signal, not leakage                                                                                          |
| Writing freeform context "just so the Supervisor has color" | The Supervisor reads the structured schema, not freeform notes. If structure can't carry the signal, the signal is too project-specific to share. |

## Falsifiability

This instruction is decorative if, after 30 days of fleet activity, an audit of `../Alex_ACT_Memory/announcements/` finds zero entries that required stripping (over-restrictive) or any entries containing un-stripped project-identifying detail (under-restrictive). Mitigation: when the Supervisor writes any announcement or note to the shared memory bus, it explicitly verifies stripping before publish.

## Related

- [pii-memory-filter.instructions.md](pii-memory-filter.instructions.md) — sibling filter for identity-grade leakage
- [note.prompt.md](../prompts/note.prompt.md), [save-session-note.prompt.md](../prompts/save-session-note.prompt.md) — primary callers (writes to `notes.md` mirror)
