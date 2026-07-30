---
name: install-constellation
description: "Install the four Alex ACT constellation plugins (alex-act-core, alex-act-illustrator-plugin, alex-act-enterprise, alex-act-msft) at their correct default scope (user for all four) with the correct install order (Core first). Consent-gated. Idempotent — skips plugins already installed at the target version. Asks about tenant scope before installing alex-act-msft (Microsoft-internal only). Delegates to `plugin-management` for the mechanical CLI commands."
lastReviewed: 2026-07-30
---

# Install Constellation

Install the Alex ACT constellation plugins at their correct default scope, in the correct order, with the correct tenant checks. Everything else about plugin mechanics (commands, scope rules, settings shape, safety) lives in [`plugin-management`](../plugin-management/SKILL.md) — this skill is the Alex ACT-specific overlay.

## When to fire

- Heir asks "install Alex ACT" / "set up the constellation" / "install the Alex plugins"
- Heir invokes `/install-constellation`
- First-run of a fresh Alex ACT install on a new machine
- Repairing a partial install (some constellation plugins present, others missing)

## The four constellation plugins

Per [`PLUGIN-INTEGRATION.md`](https://github.com/fabioc-aloha/Alex_ACT_Steward/blob/main/constellation/PLUGIN-INTEGRATION.md) § 2, all four install at **user scope** (they describe *who the heir is*, not *what any single project needs*):

| Order | Plugin | Distribution | Tenant check | Purpose |
|---|---|---|---|---|
| 1 | `alex-act-core` | `alex-mall` marketplace | None | Always-on epistemic discipline — every heir installs Core first |
| 2 | `alex-act-illustrator-plugin` | `alex-mall` marketplace | None | Visual authoring: charts, docs shells, SVG banners, print figures, AI imagery |
| 3 | `alex-act-enterprise` | `alex-mall` marketplace | None | Config-template plugin for the public Microsoft ecosystem (Azure, Fabric, Power BI, M365) |
| 4 | `alex-act-msft` | **Direct install** from private GitHub (`fabioc-aloha/alex-act-msft`), gated by `gh auth` | **Microsoft-internal only** | Agency framework + config template for internal Microsoft plugins (WorkIQ, org-report). Never published to any mall. |

## Install order

Always in the order shown above. Rationale:

1. **Core first** — Core carries `plugin-management` (this skill's dependency) and the always-on discipline every subsequent plugin composes with.
2. **Illustrator second** — visual authoring is broadly useful; no dependency on Enterprise / MSFT.
3. **Enterprise third** — the `setup-enterprise-stack` skill helps heirs enable the public Microsoft ecosystem when a project needs it.
4. **MSFT last, conditional** — only install if the heir confirms they are a Microsoft employee and on the corporate network. Never install by default.

If a plugin is already installed at the target version, skip it and continue with the next one. Report what was skipped alongside what was installed.

## Consent flow

### Step 1 — Confirm the target list

Print the four-plugin table above. Ask the heir:

> "Install the Alex ACT constellation? I will install these four plugins at user scope. Reply 'all four', 'just Core + Illustrator', or name specific plugins."

Default to "all four" if the heir just says "yes". Never install `alex-act-msft` without an explicit tenant confirmation in Step 2.

### Step 2 — Tenant check for `alex-act-msft`

Only if `alex-act-msft` is in the install list, ask:

> "The MSFT plugin is Microsoft-internal only — every skill in it requires Microsoft's corporate network. Are you (a) a Microsoft employee and (b) currently on the corporate network?"

Both yes → include MSFT in the install. Either no → drop MSFT from the list, tell the heir "MSFT skipped — reason", continue with the rest.

### Step 3 — Marketplace registration

Register the `alex-mall` marketplace in `~/.copilot/settings.json` `extraKnownMarketplaces` if it is not already there:

- `alex-mall` → `copilot plugin marketplace add fabioc-aloha/Alex_Skill_Mall`

`alex-act-msft` does **not** need a marketplace — it installs directly from its private GitHub repo, gated by the heir's `gh auth` session. Verify with `gh auth status` that the heir is authenticated before including MSFT in the install.

If the heir has never installed anything from `alex-mall`, run `copilot plugin marketplace list` first to confirm — do not re-register.

### Step 4 — Install commands

Run the install commands in order:

```powershell
copilot plugin install alex-act-core@alex-mall
copilot plugin install alex-act-illustrator-plugin@alex-mall
copilot plugin install alex-act-enterprise@alex-mall
# Only if MSFT check passed both (Microsoft employee AND on corp network):
copilot plugin install fabioc-aloha/alex-act-msft
```

After each install, run `copilot plugin info <name>` and verify the plugin registered at user scope. If any install fails, report the failure and stop — do not attempt to continue past a broken install.

### Step 5 — Settings merge

For each installed plugin, add an entry to `~/.copilot/settings.json` `enabledPlugins`:

```json
{
  "enabledPlugins": {
    "alex-act-core@alex-mall": true,
    "alex-act-illustrator-plugin@alex-mall": true,
    "alex-act-enterprise@alex-mall": true
  }
}
```

Delegate to [`plugin-management`](../plugin-management/SKILL.md) § Safe settings edits for the merge algorithm — preserve any pre-existing `enabledPlugins` or `extraKnownMarketplaces` entries the heir has.

### Step 6 — Report

Print a summary:

- Plugins installed and at what version
- Plugins skipped (with reason: already-present, tenant-mismatch, off-network, user-declined)
- Files modified: `~/.copilot/settings.json` — show a diff of what changed
- Next steps: enabling Microsoft ecosystem plugins per project → `/setup-enterprise` in that project's workspace; enabling Microsoft-internal signals → `/setup-msft` (if MSFT installed)

## Idempotency

The skill is safe to re-run. On subsequent runs:

- If all four (or three) plugins are already installed at their latest version, report "constellation is current — nothing to install" and exit.
- If some are missing, install only the missing ones.
- If any are at a lower version than what the marketplace currently ships, defer to `update-plugins` — this skill installs, it does not update.

## Anti-patterns

| Anti-pattern | Correction |
|---|---|
| Install all four without asking about MSFT tenant | Always tenant-check MSFT; default is "not installed" without explicit yes |
| Install at repo scope by default | Constellation plugins are user scope. Repo scope is for downstream Microsoft plugins (Azure, Fabric, etc.) — different skill (`setup-enterprise-stack`) does that. |
| Skip Core and install Illustrator standalone | Core is the baseline; Illustrator and the setup skills reference `plugin-management` which ships in Core. Do not skip Core. |
| Install MSFT on a public tenant | MSFT is Microsoft-internal only. Fail closed on the tenant check. |
| Overwrite pre-existing `enabledPlugins` entries | Merge, preserve. Delegate to `plugin-management` for the algorithm. |
| Report "installed successfully" without running `copilot plugin info` verify | Verify at user scope after each install. |

## Composes with

- [`plugin-management`](../plugin-management/SKILL.md) — this skill's dependency for all mechanical commands + safety rules
- [`update-plugins`](../update-plugins/SKILL.md) — after install, this skill's sibling handles keeping the constellation current
- `setup-enterprise-stack` (in `alex-act-enterprise`) — invoked after this skill inside a Microsoft-ecosystem project
- `setup-msft-stack` (in `alex-act-msft`) — invoked after this skill inside Microsoft-internal work
- `configure-vscode` (Batch 10) — complementary; that skill sets VS Code settings, this one sets Copilot CLI plugins

## Falsifiability

Sunset or revise this skill by **2027-01-30** (6 months) if:

- The Alex ACT constellation gains or loses a plugin — the four-plugin table goes stale on emit.
- The default scope decision changes for any constellation plugin — the install-at-user default is wrong.
- The tenant check for MSFT proves inadequate (heirs off-network complete the install and hit failures) — the check needs tightening.
- The install order proves wrong (dependency inversion surfaces) — the order needs adjustment.
- ≥2 heirs report the idempotent re-run pattern doing damage (deleting pre-existing entries, re-installing when already current) — merge algorithm needs a regression fix.

Track outcomes in the maintaining repo's curation log.

## Related

- [`/install-constellation`](../../prompts/install-constellation.prompt.md) — slash-command entry point
- [`plugin-management`](../plugin-management/SKILL.md) — general Copilot CLI plugin operations
- [`update-plugins`](../update-plugins/SKILL.md) — keep the constellation current after install
- Constellation doc: `constellation/PLUGIN-INTEGRATION.md` in Steward — the scope + install-order decisions that ground this skill
