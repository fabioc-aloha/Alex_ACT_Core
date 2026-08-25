# Alex ACT Core

![Alex ACT Core](https://raw.githubusercontent.com/fabioc-aloha/Alex_ACT_Core/main/assets/banner.svg)

[Core](https://github.com/fabioc-aloha/Alex_ACT_Core) · [Illustrator](https://github.com/fabioc-aloha/Alex_ACT_Illustrator_Plugin) · [Document Tools](https://github.com/fabioc-aloha/Alex_ACT_Document_Tools) · [Enterprise](https://github.com/fabioc-aloha/alex-act-enterprise)

Alex ACT Core gives every workspace the same reasoning floor: Alex Finch's identity, ACT's critical-thinking discipline, and reusable skills arrive as one plugin-native baseline. Projects add specialized capability without rebuilding the brain.

**Published version**: `4.0.2`. Install from the Alex ACT Mall as
`alex-act-core@alex-mall`.

**Current source shape**: 34 skills, 16 source instructions, and 9
slash-command prompts. Core activates its own 16 instructions through the
consent-gated `bootstrap-core` command and records a Core-owned receipt.

**Public runtime source**: [Alex ACT Core](https://github.com/fabioc-aloha/Alex_ACT_Core) contains the shipped skills, prompts, instruction sources, release history, and installation contract. Changes remain evidence-gated before release.

**Public project home**: [Alex_ACT_Core](https://github.com/fabioc-aloha/Alex_ACT_Core).

**Personality and voice reference**: [`ALEX-FINCH.md`](ALEX-FINCH.md) is Core's public identity reference. It is not an automatically loaded plugin component; the separately bootstrapped personality instruction carries the runtime contract.

**Complete end-user installation**: [`INSTALL.md`](https://github.com/fabioc-aloha/Alex_ACT_Core/blob/main/INSTALL.md).

## Quick install (4 steps)

For a fresh Windows install, or an explicitly unverified macOS/Linux canary:

1. **Register the Alex Mall marketplace**:

   ```powershell
   copilot plugin marketplace add fabioc-aloha/Alex_Skill_Mall
   ```

2. **Install Core**:

   ```powershell
   copilot plugin install alex-act-core@alex-mall
   ```

3. **Reload VS Code** (or restart if using CLI standalone) so Core activates.

4. **Open Copilot Chat and run**:

   ```text
   /alex-act-core bootstrap-core
   ```

Step 4 previews and separately asks whether to activate Core's 16 user-scope
runtime instructions. Core project bootstrap and native Copilot CLI lifecycle
commands cover the remaining baseline operations.

**Full walkthrough**: [Install the Alex ACT constellation](https://github.com/fabioc-aloha/Alex_ACT_Core/blob/main/INSTALL.md).

## Constellation Plugins

Core is the baseline. The other five plugins are optional capabilities: their
manifests declare no dependency on Core or on one another, so users install only
the capabilities their work needs.

| Plugin | Published version | Delivery | Use it for |
| --- | --- | --- | --- |
| `alex-act-core` | `4.0.2` | `alex-mall` | Baseline identity, ACT discipline, instruction activation, and project bootstrap. |
| `alex-act-illustrator-plugin` | `2.5.2` | `alex-mall` | Charts, figures, imagery, shells, banners, and visual companions. |
| `alex-act-document-tools` | `1.2.0` | `alex-mall` | Markdown, HTML, Word, email, and plain-text production. |
| `alex-act-ai-operations` | `0.2.1` | `alex-mall` | Consent-gated model planning and provider execution. |
| `alex-act-enterprise` | `1.1.2` | `alex-mall` | Public Azure, Fabric, Power BI, and Microsoft 365 setup. |
| `alex-act-msft` | `1.1.4` | Managed private source | Microsoft-internal Agency, WorkIQ, S360, and Org Report setup. |

### Dependency Matrix

| Plugin | Manifest dependency | Expected composition | Additional boundary |
| --- | --- | --- | --- |
| Core | None | The baseline itself | Activates and verifies its 16 user-scope instructions. |
| Illustrator | None | Core is recommended, not required | MCP-backed features provision their reviewed local runtime only when selected. |
| Document Tools | None | Core is recommended, not required | Converter tools and local prerequisites remain Document Tools-owned. |
| AI Operations | None | Separately installed from the brain spine | Provider login, data transfer, and cost require separate execution approval. |
| Enterprise | None | Core is the expected discipline baseline | Configures seven public Microsoft plugins at repository scope by default. |
| MSFT | None | Core is expected; Enterprise is optional | Requires Microsoft identity, corporate network access, and managed-source access. |

### Install Commands

Close all VS Code windows before installing or updating a plugin that VS Code
has loaded. On Windows, an active extension host can retain plugin files and
cause `os error 5`; use a standalone PowerShell terminal when that occurs.

Windows is the verified production platform. Core's Node.js runtime scripts are
platform-neutral, but the macOS and Linux installation paths remain candidates
until their host canaries pass. The same `copilot` commands are intended across
the three platforms. Core resolves the user instruction directory from an
absolute `COPILOT_HOME` when set, so it activates at
`$COPILOT_HOME/instructions`; otherwise it uses
`%USERPROFILE%\.copilot\instructions` on Windows and
`~/.copilot/instructions` elsewhere.

Register and refresh the public Mall once per machine:

```powershell
copilot plugin marketplace add fabioc-aloha/Alex_Skill_Mall
copilot plugin marketplace update alex-mall
```

Install the selected public plugins:

```powershell
copilot plugin install alex-act-core@alex-mall
copilot plugin install alex-act-illustrator-plugin@alex-mall
copilot plugin install alex-act-document-tools@alex-mall
copilot plugin install alex-act-ai-operations@alex-mall
copilot plugin install alex-act-enterprise@alex-mall
```

Install MSFT only on a Microsoft-managed account and corporate network:

```powershell
git config --global core.longpaths true
copilot plugin install fabioc_microsoft/alex-act-msft
```

After installing Core, reload the host and run
`/alex-act-core bootstrap-core`. Run each selected plugin's namespaced setup
command only when its workload applies.

## Managing the Alex Mall marketplace

The Alex Mall distributes Core and the public capability plugins: Illustrator,
Document Tools, AI Operations, and Enterprise. Four commands cover its lifecycle
(all user-scope; work from any workspace):

| Command | What it does |
| --- | --- |
| `copilot plugin marketplace add fabioc-aloha/Alex_Skill_Mall` | **Register** the Mall as `alex-mall`. Needed once per machine before any `<plugin>@alex-mall` install works. (Step 1 of Quick install above.) |
| `copilot plugin marketplace update alex-mall` | **Refresh** the local catalog cache from GitHub. The Mall self-curates weekly; the local cache doesn't auto-refresh. Run this when a new plugin was added to the Mall since your last install. Omit the name to update all registered marketplaces at once. |
| `copilot plugin marketplace browse alex-mall` | **List** every plugin available in the Mall with descriptions. Read-only. |
| `copilot plugin marketplace remove alex-mall` | **Unregister** the Mall. Refuses if any of its plugins are currently installed; add `--force` to also uninstall those plugins in one command. |

Also: `copilot plugin marketplace list` shows every registered marketplace, including the two built-in defaults (`copilot-plugins`, `awesome-copilot`) that don't need registration.

### Removing when plugins are installed

Two paths:

**Safe path** — uninstall plugins first, then unregister:

```powershell
# Uninstall individual plugins explicitly
copilot plugin uninstall alex-act-core@alex-mall
copilot plugin uninstall alex-act-illustrator-plugin@alex-mall
# ... and so on

# Then unregister the marketplace
copilot plugin marketplace remove alex-mall
```

**One-command teardown** — removes the marketplace AND uninstalls its plugins:

```powershell
copilot plugin marketplace remove alex-mall --force
```

> **Windows only**: if VS Code is running when you invoke either path, the CLI can hit `os error 5` on loaded plugin trees. Close all VS Code windows first (File → Exit), open a fresh PowerShell terminal (not VS Code's integrated terminal), and run the commands there. File-lock behavior on the macOS and Linux candidate paths remains unqualified.

## What this is

Alex ACT Core is the **baseline plugin** — the minimal always-on brain that every heir needs regardless of domain. It sits at the bottom of a three-layer stack:

| Layer | What it ships | Example |
| --- | --- | --- |
| **Baseline** (this plugin) | Self-activated epistemic discipline plus reusable reasoning, safety, communication, engineering, and project-capability authoring skills | `act-pass`, `critical-thinking`, `problem-framing-audit`, `meditation`, `project-capability-authoring` |
| **Specialization** (Mall opt-in) | Domain plugins heirs install as needed | `alex-act-illustrator-plugin` (visual authoring), future Azure / Fabric / M365 plugins |
| **Local customization** (`.github/skills/local/` in each heir) | Heir-specific customizations | Whatever the heir invented for their own project |

**What Core is NOT**:

- Not the Copilot CLI itself — Core rides on top of Copilot CLI + Chat
- Not a shared-continuity transport. Core owns local placement and trust semantics; native host memory, `HANDOFF.md`, and episodic records are the continuity defaults.
- Not the Mall itself — the Mall lives in [`Alex_ACT_Plugin_Mall`](https://github.com/fabioc-aloha/Alex_Skill_Mall) and self-curates per ADR-008
- Not a visual-authoring bundle — chart authoring, SVG banners, print figures, and AI imagery live in [`alex-act-illustrator-plugin`](https://github.com/fabioc-aloha/Alex_ACT_Illustrator_Plugin), not Core
- Not a lifecycle wrapper — native Copilot CLI owns plugin install, list, update, and uninstall; required project bootstrap remains in Core
- Not a conversion bundle — document conversion lives in [`alex-act-document-tools`](https://github.com/fabioc-aloha/Alex_ACT_Document_Tools)
- Not a cross-platform surface bridge — host pairing, app adapters, MCP policy, and task execution belong in an optional capability; Core retains only local continuity and safety semantics

## Surface Continuity

Native Copilot user, repository, and session memory are the default persistence
layers. Repository-root `HANDOFF.md` carries active project state, and
`.github/episodic/` carries durable project summaries. Cross-project knowledge
and cross-surface work remain local until a separately approved capability owns
them.

Core does not validate, stage, publish, poll, claim, acknowledge, or transport
shared records. Native memory, `.github/episodic/`, and `HANDOFF.md` are normal
operation. No root `MEMORY.md` or automatic `memory-triggers` instruction is
introduced.

## Project Capability Authoring

When a repeated project workflow or deterministic task has caused inconsistency,
meditation can route it to `project-capability-authoring`. That skill scans local
prior art, previews a project-local skill or script, requires explicit approval
before writing project files, and validates the result. It does not change Core,
write persistent memory, or create a cross-platform adapter.

## Why the plugin?

Under the v1 heir-template model, [`Alex_ACT_Edition`](https://github.com/fabioc-aloha/Alex_ACT_Edition) was a template each heir bootstrapped into its own `.github/`. Upgrading meant N-heir manual bootstraps. Under the plugin-native model, Core lives in one place (this repo → Mall) and every heir picks it up on next session via `copilot plugin update alex-act-core`. Fork-and-freeze on 2026-07-26 established that the plugin-native lineage runs alongside the frozen v1 compatibility line rather than replacing it in place.

Full reasoning in the Steward Plan (private governance record) (twelve chapters: overview → distribution mechanism → topology → migration strategy → nomenclature).

## Layout

```text
Alex_ACT_Core/
├── manifest.json               # Mall-side plugin metadata (identity, assets, install paths)
├── README.md                   # (this file)
├── CHANGELOG.md                # Keep a Changelog format
├── LICENSE                     # MIT
├── .gitignore
├── .markdownlint.json
├── .github/                    # Copilot Chat + CLI discovery surface
│   ├── copilot-instructions.md
│   ├── config/                 # brand-palette.json
│   ├── skills/                 # 34 baseline framework, continuity, reasoning, safety, craft, and project-capability skills
│   ├── instructions/           # 16 Core-owned sources activated by bootstrap-core
│   └── prompts/                # 9 slash-command prompts
└── .vscode/                    # workspace settings for self-dogfooding
```

Same layout as [`alex-act-illustrator-plugin`](https://github.com/fabioc-aloha/Alex_ACT_Illustrator_Plugin) — the proven Steward-authored CLI plugin pattern.

## Install

**Prerequisites** (once per machine):

- **Copilot CLI ≥ 1.0.75** — [install docs](https://docs.github.com/copilot/how-tos/set-up/install-copilot-cli). Verify with `copilot --version`. Install or update with `winget install --id GitHub.Copilot` (Windows), `brew install --cask copilot-cli` (macOS), or `npm install -g @github/copilot` (any platform with Node.js 22+).
- **GitHub CLI authenticated** — `gh auth login` and confirm with `gh auth status`.

Full brand-new-user walkthrough (four personas, six install stages, anti-patterns): see [Alex ACT Core install guide](https://github.com/fabioc-aloha/Alex_ACT_Core/blob/main/INSTALL.md).

### Install from the Alex ACT Mall

Register the mall as a marketplace (one-time, per machine):

```powershell
copilot plugin marketplace add fabioc-aloha/Alex_Skill_Mall
```

Then install Core:

```powershell
copilot plugin install alex-act-core@alex-mall
```

Installs at user scope — Core becomes active in every workspace on the machine. That's the correct behavior; Core is an identity plugin per [`PLUGIN-INTEGRATION.md` § 2](https://github.com/fabioc-aloha/Alex_ACT_Core/blob/main/INSTALL.md).

> **Publication status.** The Mall and Core entry are live and publicly available as `alex-act-core@alex-mall`.

### Verify the install

```powershell
copilot plugin list
```

You should see `alex-act-core@alex-mall` with the current version.

### VS Code Skill Resolver Workaround

Keep `chat.useAgentSkills` set to `true`, and set
`github.copilot.chat.skillTool.enabled` to `false`. This works around
[`microsoft/vscode#314772`](https://github.com/microsoft/vscode/issues/314772): it
disables only the experimental generic skill resolver, not Agent Skills. Start a
new Agent chat or reload VS Code after changing the setting.

## Configure specializations (optional)

Use native Copilot CLI commands to install optional plugins, then invoke each
plugin's namespaced setup command:

- **`/alex-act-core bootstrap-project`** — previews and consent-gates project Markdown Preview CSS, settings, repository guidance, and handoff scaffolding
- **`/alex-act-document-tools convert`** — routes supported Markdown, HTML, Word, email, and plain-text conversions

Full walkthrough with slash-command examples: [INSTALL Stages 3–5](https://github.com/fabioc-aloha/Alex_ACT_Core/blob/main/INSTALL.md).

## Update Core

For the Alex ACT Mall, use a targeted update when you want an explicit version
transition:

```powershell
copilot plugin update alex-act-core
```

GitHub Copilot CLI can auto-update plugins from its built-in marketplaces at
trusted session start. User-added marketplaces, including `alex-mall`, remain
manual unless the user enables that marketplace's user-scope `autoUpdate`
setting. Read the [CHANGELOG](CHANGELOG.md) before applying a version that
carries breaking changes.

## Uninstall

```powershell
copilot plugin uninstall alex-act-core
```

Before uninstalling Core, preview `/alex-act-core bootstrap-core` with
`--remove` through the skill contract if you also want to remove Core-owned
user instructions.

**Troubleshooting.** If the uninstall fails with either:

- `Access is denied (os error 5)` on Windows — close every VS Code window first. Copilot Chat's active MCP servers hold file handles on plugin binaries.
- `Plugin "alex-act-core" is not installed` with the plugin still showing in `copilot plugin list [disabled]` — you have a zombie entry in `~/.copilot/config.json`'s `installedPlugins` array.

Both failure modes and their fixes (including a working two-file cleanup pattern) are documented in [`INSTALL.md § Optional — start from a clean slate`](https://github.com/fabioc-aloha/Alex_ACT_Core/blob/main/INSTALL.md).

## Optional document conversion

Install `alex-act-document-tools@alex-mall` when a project needs Markdown,
HTML, Word, email, or plain-text conversion. That plugin owns converter
prerequisites, execution, and validation; Core's `/alex-act-core convert`
command is a temporary redirect only.

## Roadmap

Core changes only through evidence-gated Steward proposals, explicit approval,
focused tests, semantic-version classification, and a coordinated Core release
plus Mall origin update. Packaging migrations must also pass their accepted
cross-host gates before changing the current Copilot package.

## Related

- [Alex_ACT_Core](https://github.com/fabioc-aloha/Alex_ACT_Core) — public baseline runtime source
- [`Alex_ACT_Illustrator_Plugin`](https://github.com/fabioc-aloha/Alex_ACT_Illustrator_Plugin) — visual authoring specialization
- [`Alex_ACT_Document_Tools`](https://github.com/fabioc-aloha/Alex_ACT_Document_Tools) — optional document conversion and shared converter runtime
- [`Alex_ACT_Plugin_Mall`](https://github.com/fabioc-aloha/Alex_Skill_Mall) — public distribution record
- [`Alex_ACT_Edition`](https://github.com/fabioc-aloha/Alex_ACT_Edition) — frozen v1 compatibility evidence

## License

[MIT](LICENSE) — same as sibling plugins.
