---
name: bootstrap-project
description: "Previews and applies Core's repository scaffold, portable workspace QoL settings, project Copilot settings, and Markdown CSS while preserving project-owned files. Use for new repositories, missing AGENTS/HANDOFF/episodic files, or project .vscode setup."
lastReviewed: 2026-08-15
---

# Bootstrap Project

Set up one repository with Core's project-local guidance and a portable VS Code
workspace baseline. The baseline covers editor, diff, Markdown, file/search,
PowerShell terminal, and Git QoL preferences. It never edits user settings,
configures extensions, or configures shared continuity.

## Preview First

```text
node <this-skill>/scripts/bootstrap-project.cjs --repository-root <path>
```

The preview classifies agent guidance, nested contracts, missing scaffold files,
settings additions, CSS state, and `.gitignore` changes. It writes nothing.

## Apply After Consent

After explicit repository consent, rerun with `--apply`. Existing files are
preserved. Settings are additive: missing keys and nested map entries are added,
while project values such as custom `markdown.styles` remain authoritative.
Differing CSS is preserved unless the user separately approves
`--refresh-css --apply`.

The minimal scaffold is `AGENTS.md`, thin Claude/Gemini adapters, `HANDOFF.md`,
`.github/episodic/README.md`, `.vscode/settings.json`, Markdown CSS, and narrow
`.gitignore` exceptions for the two managed `.vscode` files.

## Boundaries

- One explicit repository root per invocation.
- Divergent root `AGENT.md` and `AGENTS.md` block apply.
- Existing handoff, episodic, agent, settings, and CSS files are preserved.
- Comment-rich JSONC requiring changes fails closed for manual merge.
- Do not create `MEMORY.md`, README, license, framework, package manager, or Git.
- Do not edit VS Code user settings or configure Scout/shared continuity.

## Anti-Patterns

| Anti-pattern | Correction |
| --- | --- |
| Run this through optional Manager | Core owns required project setup |
| Replace custom project settings | Add only missing baseline entries |
| Refresh CSS because hashes differ | Require separate refresh consent |
| Configure shared continuity | Route to Scout |

## Would Revise If

Revise by **2026-11-15** if project bytes are overwritten, a second preview is
not idempotent, user settings are touched, or the baseline proves non-portable.
