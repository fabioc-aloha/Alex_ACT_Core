---
description: "Route Copilot CLI plugin operations (install, list, update, remove, marketplace management, scope decisions) to the plugin-management skill and its Alex ACT-specific siblings. Fires on plugin-related file patterns AND on any conversation about `copilot plugin`, `~/.copilot/settings.json`, `.github/copilot/settings.json`, or the Alex ACT constellation install / update flow."
applyTo: "**/copilot/settings.json,**/.copilot/**,**/*plugin*,**/*mall*,**/*marketplace*"
lastReviewed: 2026-07-30
---

# Plugin Management

Always-on routing for Copilot CLI plugin operations. Delegates every mechanical action to the plugin-management skill and its Alex ACT-specific siblings.

## Router

| Heir request | Route to |
|---|---|
| "install X plugin" / "add Y plugin from Z mall" | [`plugin-management`](../skills/plugin-management/SKILL.md) skill (works for any plugin from any Mall) |
| "install Alex ACT" / "set up the constellation" / "install the Alex plugins" | [`install-constellation`](../skills/install-constellation/SKILL.md) skill (four-plugin flow, user scope, tenant check for MSFT) |
| "update my plugins" / "keep plugins current" / "latest stable" | [`update-plugins`](../skills/update-plugins/SKILL.md) skill (diff summary + per-breaking consent) |
| "what plugins do I have" / "plugin status" / "audit my plugins" | [`/plugin-status`](../prompts/plugin-status.prompt.md) prompt → `plugin-management` in audit-only mode |
| "remove X plugin" / "uninstall Y" | `plugin-management` skill § Command reference |
| "add the Alex mall" / "register a new marketplace" | `plugin-management` skill § Command reference (`marketplace add`) |
| "should X be user scope or repo scope?" | `plugin-management` skill § Scope decision |
| "why is my settings.json overriding X" | `plugin-management` skill § Scope precedence |
| "add setup for Azure/Fabric/Power BI/M365" | `setup-enterprise-stack` skill (in `alex-act-enterprise` plugin, not Core) |
| "add setup for WorkIQ / Agency / org-report" | `setup-msft-stack` skill (in `alex-act-msft` plugin, not Core) |

## Two universal rules

Every plugin-related action, regardless of which skill handles it:

1. **Emit before apply.** Print the target settings block and command list before running anything. Only proceed to filesystem writes or CLI invocations after explicit heir consent.
2. **Merge, don't overwrite.** Every edit to `~/.copilot/settings.json` or `.github/copilot/settings.json` preserves existing keys the heir has. Overwriting is a P0 safety violation.

If the request is ambiguous, ask the heir which mode (emit only / consent-apply / audit only) before doing anything.

## When this instruction is quiet

- Heir asks about VS Code extensions → route to `configure-vscode` prompt (Batch 10), not plugin skills.
- Heir asks about Alex ACT Memory sibling repo → route to `ai-memory-setup` (Batch 10), not plugin skills — Memory is a Git repo, not a Copilot CLI plugin.
- Heir asks about brain artifacts (skills, instructions, prompts, agents) authoring workflow → route to `skill-creator` / `instruction-creator` / etc.

## Would revise if

Revisit by **2027-01-30** (6 months) or sooner if:

- The router table becomes ambiguous (≥2 rows compete for the same request pattern) — add disambiguation or split the request patterns.
- Copilot CLI adds plugin operations not covered by the three sibling skills — extend the table.
- The applyTo glob fires too broadly (loads on unrelated conversations) — narrow the pattern.
