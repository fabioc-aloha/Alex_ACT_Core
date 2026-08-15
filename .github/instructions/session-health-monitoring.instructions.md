---
description: "Monitors context-window health and graceful handoff continuously, using native plugin lifecycle commands and routing shared continuity to Scout"
applyTo: "**"
lastReviewed: 2026-08-15
---

# Session Health Monitoring

**Always-on rationale**: context capacity is a per-conversation property, not a per-file one. Tracking proxy heuristics, warning signs, and checkpoints must fire continuously across every turn; a scoped glob would silence the monitoring exactly when sessions extend across many file types.

Monitor context usage and ensure graceful session transitions. Token-cost details for specific operations live in the `platform-awareness` skill and in skill bodies; this file owns session-level signals.

## Proxy Heuristics

VS Code does not expose token counts for built-in models. **BYOK models (1.120+) show real token usage and percent-full in the Chat view context-window control** — use that as ground truth when available. For non-BYOK or older builds, estimate via:

| Signal | Interpretation |
|--------|----------------|
| ~4 characters | ≈ 1 token |
| Large file read (500+ lines) | ~2,000-5,000 tokens |
| Base64 image in response | ~10,000-50,000 tokens (avoid — write to file) |
| Unfiltered terminal output | Variable, often 1,000+ tokens (use `Select-Object -First 20`) |

## Warning Signs

| Signal | Action |
|--------|--------|
| Forgetting early conversation context | Update session memory, suggest new session |
| Responses truncating unexpectedly | Reduce output verbosity, offload to files |
| Repeated clarification of established facts | Context may be dropping off |
| User mentions "you forgot" or "we discussed" | Acknowledge, re-read session memory |

## Checkpoints

- **After 6+ exchanges**: consider updating session memory
- **Before image work / large reads**: warn about token cost, confirm approach
- **After major milestone**: summarize progress to session memory
- **If unsure about capacity**: offer to start fresh session with handoff

## Graceful Handoff

When approaching session limits or switching topics, write the cross-session handoff to **repo-root `HANDOFF.md`** (state, completed work, next steps, pending decisions). `/memories/session/` is for in-conversation scratch only — it clears at conversation end and is the wrong tier for handoff content. Suggest: "New session can read `HANDOFF.md` at repo root to continue."

## Operational Boundaries

Core owns its instruction and project-bootstrap health. Use native
`copilot plugin list`, `update`, and `uninstall` commands for plugin lifecycle.
Scout owns optional shared continuity health and repair. If Scout is
unavailable, continue with local handoff and context-health practices above.

## Would Revise If

Revise by **2026-11-15** if proxy heuristics for token counts consistently mispredict session capacity (warning signs miscalibrated for the current model class), if the BYOK token-counter assumption breaks (extension UI no longer surfaces percent-full), if graceful-handoff produces `HANDOFF.md` content that the next session cannot pick up from, or if Core duplicates Scout transport.
