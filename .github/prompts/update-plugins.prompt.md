---
description: "Routes legacy Core plugin-update requests to Manager's canonical preview and consent workflow. Use when an older caller invokes Core's compatibility command."
lastReviewed: 2026-08-05
---

# /update-plugins

This is a compatibility command. Manager owns plugin update planning and
execution. Do not invoke the generic skill tool or reproduce the flow in Core.

Steps:

1. Verify `alex-act-manager@alex-mall` is installed with `copilot plugin list`.
2. If Manager is absent, provide `copilot plugin install alex-act-manager@alex-mall` and stop until it is loaded.
3. Invoke `/alex-act-manager update-plugins`.
4. Preserve Manager's audit-only default, change summary, and per-breaking-change consent.

Remove this compatibility prompt after **2026-11-05** if supported callers no
longer use the Core namespace.
