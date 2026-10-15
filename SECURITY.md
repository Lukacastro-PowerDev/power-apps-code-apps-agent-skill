# SECURITY POLICY (v0.2)

## Scope
Repository provides guidance, templates, and deterministic checks.

## Baseline
- No credentials, tokens, tenant IDs, connection IDs, or personal data.
- Least privilege required.
- Safe logging and input validation required.

## Security modes
See `core/policies/security-modes.md`:
- advisory
- standard
- strict
- regulated

## Gates
Run:
```bash
npm run validate:security
```

Security docs:
- `skills/security/security-gates.md`
- `skills/security/authorization-matrix.md`
