# power-apps-code-apps-agent-skill (v0.2)

Universal, evidence-first operational skill for AI agents that build Power Apps Code Apps.

## What this skill is
- A strict **operational core** (`AGENTS.md`, `core/`, `skill-manifest.json`).
- Domain packs loaded on demand (SharePoint-first, Dataverse, Platform ALM, UI, Integrations).
- Deterministic local CLI + validations + evals.

## What this skill is not
- Not a promise that one agent “knows everything”.
- Not a source of mutable platform truth without verification.
- Not a deployment artifact with secrets or tenant-bound data.

## v0.2 scope and compatibility
- v0.1 documentation structure is preserved and extended.
- `library/index.json` remains compatible.
- New manifest, schemas, context planner, packer, security gates, and eval runner are added.

## Quick start (universal)
```bash
npm ci
npm run validate
npm test
npm run context -- --task "Implement SharePoint CRUD using observed schema"
npm run evals
npm run pack
```

## Installation and usage
- Clone/copy repository as standards library.
- Use local CLI via Node:
  - `node dist/scripts/cli.js inspect <path>`
  - `node dist/scripts/cli.js context --task "..."`
  - `node dist/scripts/cli.js validate`
  - `node dist/scripts/cli.js pack`
  - `node dist/scripts/cli.js report --input <path>`

## Agent task flow
1. Read mandatory docs from manifest.
2. Generate context plan.
3. Collect evidence artifacts.
4. Implement minimal coherent change.
5. Run validations, tests, evals.
6. Produce final report (`templates/agent-report/`).

## Context selection
Use `library/index.json` + `domains/registry.json` and load only required artifacts.

## SharePoint and Dataverse
- SharePoint: never invent internal names.
- Dataverse: separate display vs logical names.
- All mutable details: **verify against current official documentation**.

## ALM, security, UI, and tests
- ALM domain pack: `skills/platform/`.
- Security gates and authorization matrix: `skills/security/` + `templates/authorization-matrix/`.
- UI pack with states/WCAG basics: `skills/ui/`.
- Deterministic evals runner: `evals/`.

## Structure
```text
core/
domains/
skills/
templates/
docs/
evals/
library/
adapters/
```

## Adapters
- GitHub Copilot, Claude Code, Codex, Cursor, Generic (`adapters/`).

## Português / English
- PT-BR operation guide: `docs/operacao-ptbr.md`
- English quick guides: `docs/getting-started.md`

## Roadmap
- v0.2: operational core + deterministic tooling + initial domain packs.
- v0.3: richer executable checks and expanded domain templates.
- v1.0: hardened governance and broader adoption patterns.

## Real limitations
- YAML config is example-only unless converted manually to JSON.
- Context planning is deterministic keyword/rule based (not semantic NLP).
- Platform behavior can change; always validate against official docs.

## Official references
- https://learn.microsoft.com/en-us/power-apps/developer/code-apps/overview
- https://learn.microsoft.com/en-us/power-apps/developer/code-apps/how-to/sharepoint-operations
- https://github.com/microsoft/PowerAppsCodeApps
