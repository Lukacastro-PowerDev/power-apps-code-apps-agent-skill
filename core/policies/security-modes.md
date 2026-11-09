# Security modes

`advisory` reports findings without failing. `standard` fails obvious secrets,
broken required artifacts, and unsafe examples. `strict` additionally fails
tenant-bound identifiers, unverified schema claims, and missing reviews.
`regulated` requires explicit evidence references, authorization matrix,
security review, accessibility review, and auditable validation output.
