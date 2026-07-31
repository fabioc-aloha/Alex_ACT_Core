---
description: "Deferred tools require tool_search before calling; external ingest handles remote-workspace context automatically; SKILL.md description field must never be stripped to declutter the slash picker (three consumers, only one visible)"
applyTo: "**"
lastReviewed: 2026-07-31
---

# Tool Awareness

**Always-on rationale**: deferred-tool resolution, external-ingest expectations, and skill-picker discipline all apply to any tool-using turn regardless of file context. The `search before calling` rule must fire on every deferred-tool need; scoping by file pattern would silence the protection exactly when the agent needs an unfamiliar tool.

## Deferred Tools (VS Code 1.118+)

Many tools are **deferred** (lazy-loaded). They appear in `availableDeferredTools` but cannot be called directly. Load via `tool_search` first with a natural-language capability description.

### Rules

1. **Search before calling.** Calling a deferred tool without loading via `tool_search` fails silently.
2. **Search once per tool.** After load, the tool stays available for the session.
3. **Use broad queries.** One broad search beats multiple narrow ones.
4. **No results means unavailable.** Don't retry with synonyms.

For common deferred-tool categories with example search queries per capability, see the [platform-awareness skill](../skills/platform-awareness/SKILL.md).

## External Ingest (VS Code 1.119+)

In remote or virtual-filesystem workspaces (GitHub.dev, VS Code Remote, Codespaces), the editor provides codebase context automatically. `semantic_search` and file operations work transparently — no agent action needed.

## Skill Picker — Never Strip the Description

The SKILL.md `description` field has three consumers and the slash-picker tooltip is the least important of them:

1. **Agent skill discovery (primary)** — every session loads SKILL.md descriptions into the `<skills>` block; this is how the parent agent decides whether to invoke the skill
2. **Brain QA enforcement** — where a brain-qa script exists (Alex_ACT_Steward ships one as `scripts/brain-qa.cjs`), it hard-fails on missing/empty description
3. **Chat picker tooltip** — the surface visible to humans

**Never strip the description to declutter the picker.** If picker noise is the problem, the user-level `github.copilot.chat.skillTool.enabled = false` setting is the lever. See the [platform-awareness skill](../skills/platform-awareness/SKILL.md) for the platform-side behavior this rule guards against.

## Related

- [platform-awareness skill](../skills/platform-awareness/SKILL.md) — VS Code 1.117–1.128 tool-system platform changes + common deferred-tool categories + skill-picker surfacing behavior

## Would Revise If

Revise if VS Code changes the deferred-tool mechanism (e.g. `tool_search` semantics change, deferred tools become directly callable, or external-ingest changes scope in remote workspaces), or if the "search before calling" rule produces no observed failures over a quarter (the rule is no longer needed because the platform changed).
