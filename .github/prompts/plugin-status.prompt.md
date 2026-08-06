---
description: "Routes legacy Core plugin-status requests to Manager's canonical read-only inventory. Use when an older caller invokes Core's compatibility command."
lastReviewed: 2026-08-05
---

# /plugin-status

This is a compatibility command. Manager owns plugin inventory and version
authority. Do not invoke the generic skill tool or reproduce the audit in Core.

Steps:

1. Verify `alex-act-manager@alex-mall` is installed with `copilot plugin list`.
2. If Manager is absent, provide `copilot plugin install alex-act-manager@alex-mall` and stop until it is loaded.
3. Invoke `/alex-act-manager plugin-status`.
4. Preserve Manager's read-only behavior and report its activation-plane result.

Remove this compatibility prompt after **2026-11-05** if supported callers no
longer use the Core namespace.
