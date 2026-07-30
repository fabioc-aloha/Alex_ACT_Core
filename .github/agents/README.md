# Agents

Core ships no worker agents by design. Agents come from the heir workspace's own `.github/agents/`, from user-scope `~/.copilot/agents/`, or from specialization plugins (for example, `alex-act-illustrator-plugin`).

Content may land here in the future through evidence-gated Steward proposals per [`constellation/act/CURATION-RULES.md`](https://github.com/fabioc-aloha/Alex_ACT_Steward/blob/main/constellation/act/CURATION-RULES.md).

Filename convention (matches Steward + Illustrator plugin): `<kebab-name>.agent.md` with frontmatter `description` + `lastReviewed` + tool allowlist per Microsoft Learn agent spec.

See Steward's [`.github/skills/agent-creator/SKILL.md`](https://github.com/fabioc-aloha/Alex_ACT_Steward/blob/main/.github/skills/agent-creator/SKILL.md) for the authoring guide + spec. Agent-review's Gate 6 (Tool Allowlist Minimality) is mandatory.
