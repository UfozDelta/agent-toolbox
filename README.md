# agent-toolbox

Personal Claude Code skills, installable by anyone. Ships as a Claude Code
plugin under the `ufoz` namespace — each skill runs inside your own Claude Code
session (no npm install, no API key, no server; your code never leaves your
machine).

## Install

    /plugin marketplace add UfozDelta/agent-toolbox
    /plugin install ufoz@ufoz

## Skills

| Skill | Invoke | What it does |
|-------|--------|--------------|
| AnvilCV extractor | `/ufoz:anvilcv-extract` | Explores a codebase and emits a context doc for AnvilCV resume-bullet generation. |

## One-shot setup wizard (`ufoz-tools`)

Bootstraps a Claude Code project with a chosen set of community tools in one
run — instead of installing each by hand. Run it in the project you want set up:

    npx ufoz-tools

It asks Yes/No per tool, then delegates to each tool's own official installer
(it orchestrates, it does not reimplement). The wizard groups tools into three
sections — **Core** installs machine-wide, everything else is per-project:

**Core** (global install)

| Choice | What it does |
|--------|--------------|
| Headroom | `pip install --user headroom-ai` (Python ≥3.10) installs the CLI **globally**; `headroom init claude` wires hooks into **this project** only |

**Features** (per-project)

| Choice | What it does |
|--------|--------------|
| Caveman | runs `npx github:JuliusBrussee/caveman -- --only claude` |
| Karpathy CLAUDE.md | writes an opinionated `CLAUDE.md` (appends, never clobbers) |
| Supabase MCP | writes a Supabase server block to `.mcp.json` (token gitignored) |
| Ponytail | runs `claude plugin install ponytail@ponytail` (project scope) |

**Addons** (per-project skills)

| Choice | What it does |
|--------|--------------|
| anvilCV | copies this repo's skill into `.claude/skills/` |
| Graphify | `uv\|pipx\|pip install graphifyy` + `graphify install --project` |
| React-Doctor | runs `npx react-doctor@latest install` |

All writes are non-destructive and the wizard is idempotent (safe to re-run).
If a required runtime (npm/npx/uv/pipx/pip, the `claude` CLI for Ponytail, or
Python ≥3.10 for Headroom) for a selected tool is missing, it aborts **before**
making any changes and tells you what to install.

Run the wizard in a plain terminal, not inside a Claude Code session — Ponytail
installs via the `claude` CLI, which can't be nested.

## Local development

    claude --plugin-dir ./   # from inside the cloned repo

Then run a skill, e.g. `/ufoz:anvilcv-extract`, to confirm it loads.

For the wizard:

    cd cli && npm install
    node index.js            # run against the current directory
