# Security gates

The standard gates detect obvious secrets, tenant-bound identifiers in
unmarked examples, direct HTTP in SharePoint examples, missing evidence,
missing authorization review, and unsafe logging. Modes are documented in
`core/policies/security-modes.md`; external secret scanners are optional and
must not be required by CI.
