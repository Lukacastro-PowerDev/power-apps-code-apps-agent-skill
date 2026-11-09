# CHANGELOG

## [0.2.0] - 2026-11-09
### Added
- Canonical skill manifest, evidence model, schemas, lifecycle, state machine,
  planning/report contracts, quality definition, and security modes.
- Deterministic context planner, documentation validator, report validator,
  local CLI, packer, and evaluation runner.
- Structured ALM/platform, UI, integrations, and security domain packs.
- Authorization matrix, agent report templates, project artifact guidance, and
  English/Portuguese operational documentation.
- Local CI definitions and public project templates.
### Validation
- Baseline before dependency installation could not run because `tsc` was not
  installed; `npm ci` restored the locked toolchain.
- Final validation commands and their actual results are recorded in the PR.
### Limitations
- The example YAML is not parsed automatically.
- Platform behavior, connector availability, permissions, and deployment
  semantics require current official documentation and project evidence.
- The session remote exposed no `main` ref; v0.2 preserves the available v0.1
  branch content and does not rewrite history.

## [0.1.0] - 2026-10-15
### Added
- First complete operational version of `power-apps-code-apps-agent-skill`.
- Universal agent contract (`AGENTS.md`) and governance docs.
- Indexed library with decision tree and context loading protocol.
- Detailed skills/playbooks for discovery, architecture, SharePoint, Dataverse, implementation, security, quality, and reference.
- Reusable templates for pages, services, ADRs, planning, schema docs, and security review.
- Didactic examples for SharePoint CRUD, Dataverse CRUD, dashboard, approval process, and secure form.
- Deterministic TypeScript validation scripts and tests.
- Adapters for GitHub Copilot, Claude Code, Codex, Cursor, and generic-compatible agents.
