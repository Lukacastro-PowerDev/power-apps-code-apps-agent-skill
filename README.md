# Power Apps Code Apps Agent Skill

Universal, evidence-first operational skill for agents building Power Apps
Code Apps. SharePoint remains the primary path; Dataverse, ALM, UI, security,
quality, and integrations are on-demand domain packs.

## What it is / is not

It is a small universal core, deterministic context planner, formal evidence
schemas, safety gates, templates, evaluations, and host adapters. It is not a
published npm package, a replacement for Microsoft documentation, an
authenticated connector, or a promise that an agent knows every platform
capability.

## Quick start

```bash
npm ci
npm run context -- --task "Create a SharePoint CRUD page using observed schema"
npm run validate
npm test
npm run evals
```

The local CLI is available after `npm run build`:

```bash
node dist/tools/cli.js inspect .
node dist/tools/cli.js context --task "Dataverse table form with authorization"
node dist/tools/cli.js validate
node dist/tools/cli.js pack
node dist/tools/cli.js report --input .agent/final-report.json
```

Node `>=20` is supported. The YAML file is an example for project
configuration; v0.2 does not parse YAML automatically. Use JSON or explicit
CLI arguments.

## Universal agent flow

Read `AGENTS.md`, classify the task, run the context planner, collect observed
or generated schema evidence, load only the selected pack, decide permissions
and UI states, implement, validate, and produce the universal report. Stop for
missing/conflicting schema or ambiguous authorization.

For SharePoint, never infer internal names from display names. For Dataverse,
never infer logical names or relationships. Fictional fixtures are marked
`EXAMPLE ONLY`. Mutable platform behavior must say **verify against current official documentation** and cite an official URL.

## Structure

`core/` contains the protocol, evidence, planning, quality, and policy
contracts. `registry/` and `library/index.json` catalog packs. `skills/`
contains SharePoint, Dataverse, platform/ALM, UI, integrations, security, and
quality guidance. `tools/` provides deterministic context, validation,
reporting, packing, and CLI commands. `evals/` provides local rule-based
grading. `.agent/` documents project-local artifacts. `adapters/` maps the
contract to Copilot, Claude Code, Codex, Cursor, and generic hosts.

## Dataverse, ALM, UI, and security

Use the Dataverse pack only with observed metadata or generated services.
Use the ALM pack for environment strategy, solutions, variables, connection
references, pipelines, DLP, releases, and rollback decisions. Use UI packs for
responsive states, forms, tables, dialogs, WCAG, internationalization, and
visual review. Use authorization matrices and security modes (`advisory`,
`standard`, `strict`, `regulated`) before release.

## Configuration and artifacts

Start from `power-apps-skill.config.example.yaml`; it is documentation only.
Project artifacts live under `.agent/`: task, evidence, schema map, plans,
reviews, validation results, and final report. Never store credentials,
tenant identifiers, connection IDs, or personal data.

## Compatibility, roadmap, limitations

v0.2 preserves the v0.1 folders, adapters, examples, templates, and catalog
shape. v0.3 can add richer schema adapters, project-specific configuration
parsing, and broader deterministic benchmarks. v1 can stabilize pack
interfaces and release governance. No external API or connector behavior is
implemented by this repository; verify current official documentation.

Documentation is available in English and Portuguese (`docs/operacao-pt-br.md`).
See `docs/migration-v0.1-to-v0.2.md`, `docs/evidence-first-workflow.md`, and
`docs/one-skill-operating-model.md`.

## Official references

- https://learn.microsoft.com/en-us/power-apps/developer/code-apps/overview
- https://learn.microsoft.com/en-us/power-apps/developer/code-apps/how-to/sharepoint-operations
- https://learn.microsoft.com/en-us/power-platform/alm/solution-concepts-alm
