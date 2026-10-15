# CHANGELOG

## [0.2.0] - 2026-10-15
### Added
- `skill-manifest.json` and project config examples (`yaml` + `json`).
- `core/` operational protocol, evidence model, schemas, planning/reporting artifacts, and policies.
- `.agent/README.md` artifact lifecycle guidance.
- Domain registry (`domains/registry.json`) and compatibility alias (`registry/domain-packs.json`).
- CLI and scripts for `inspect`, `context`, `validate`, `pack`, and `report`.
- Deterministic `tools` equivalents via scripts: context planner, docs validator, packer, security gates.
- Security authorization matrix docs and templates.
- Platform/UI/Integrations domain packs.
- Executable local eval runner with fixtures and score JSON output.
- CI workflows (`validate`, `security`, `links`) and GitHub templates.
- `docs/` guides including migration and evidence-first operation.

### Changed
- `package.json` scripts/metadata upgraded for v0.2.
- Validation pipeline extended with docs and security checks.
- Existing v0.1 structure preserved with compatibility updates.

### Validation baseline executed (pre-change)
- `npm ci` ✅
- `npm run validate` ✅
- `npm test` ✅

### Limitations
- YAML config is example-only (JSON is machine-ready example).
- Context planner is deterministic keyword/rule based.
- Mutable platform details must be verified against official docs.
