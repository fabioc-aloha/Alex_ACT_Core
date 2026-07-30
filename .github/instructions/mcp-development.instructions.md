---
description: "MCP server development architecture, primitives, and implementation patterns"
applyTo: "**/*mcp*,**/*mcp-server*,**/*mcp*/**,**/*mcp-server*/**"
lastReviewed: 2026-05-26
---

# MCP Development — Auto-Loaded Rules

Full MCP architecture, primitives, server patterns, resource design, quality gates → see [mcp-builder skill](../skills/mcp-builder/SKILL.md).

Full protocol in `.github/skills/mcp-builder/SKILL.md`.

## Quick Reference

| Transport | Use When |
|-----------|----------|
| **stdio** | Local tools, CLI, VS Code tasks (DEFAULT -- start here) |
| **Streamable HTTP** | Remote services, cloud deployment, multi-client |

## Would Revise If

Revise by **2026-08-26** (90 days) or sooner if any of the following fires:

- The auto-loaded routing fails to surface mcp-builder when MCP work is requested ≥2 times in a quarter
- The Quick Reference transport table becomes stale per Microsoft Learn MCP spec (a new transport joins, or stdio/HTTP defaults change)
- This file's stub shape (routing only) consistently leaves heirs reinventing MCP basics ≥2 times — if so, inline more substantive rules or delete this file and rely on description-match discovery
