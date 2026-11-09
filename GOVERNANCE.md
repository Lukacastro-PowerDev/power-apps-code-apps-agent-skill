# GOVERNANCE

## Normative language
- **MUST**: mandatory requirement.
- **SHOULD**: strong recommendation with explicit rationale if not followed.
- **MAY**: optional.

## Decision model
Architecture and policy changes SHOULD be captured as ADRs (`templates/adr/adr-template.md`).

## Evidence policy
- Repository-observed facts MUST include file/path evidence.
- External platform details MAY change and must be marked: "verify against current official documentation".

## Versioning
This project follows semantic versioning for documented releases in `CHANGELOG.md`.

## v0.2 operating model

`skill-manifest.json` is the canonical contract. `library/index.json` remains
the compatible catalog. Domain packs are reviewed for evidence requirements,
official references, safety gates, and deterministic validation before being
cataloged. Generated project artifacts must not be committed unless they are
sanitized release evidence.
