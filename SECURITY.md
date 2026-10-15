# SECURITY POLICY

## Supported scope
This repository provides standards, templates, and examples. It is not a deployment artifact.

## Reporting vulnerabilities
If you find a vulnerability in this repository content, open a private security report through GitHub Security Advisories when available, or open an issue without sensitive details.

## Security requirements for contributed content
- No secrets, tokens, real tenant IDs, real connection IDs, or personal data.
- All examples must be labeled as sample/fake when not project-observed.
- Include least-privilege guidance and environment boundary notes.
- Include input validation and safe logging practices.

## Secure development checklist
- Threat model considered.
- Data minimization documented.
- Authentication/authorization assumptions explicit.
- Injection/XSS risk reviewed.
- Dependencies reviewed for known advisories.
