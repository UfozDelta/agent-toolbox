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

## Local development

    claude --plugin-dir ./   # from inside the cloned repo

Then run a skill, e.g. `/ufoz:anvilcv-extract`, to confirm it loads.
