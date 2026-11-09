# Evidence model

Every implementation claim must be traceable to evidence. The JSON shape is
defined in `evidence.schema.json`; the model is deliberately small so agents
can use it without a platform-specific runtime.

## Evidence kinds

`observed` is directly found in the project; `generated` comes from a generated
service or model; `official` is a current official Microsoft source;
`documented` is repository or project documentation; `example` is fictional
and never a schema authority; `inferred` is a reasoned conclusion; and
`unverified` is an explicit unknown that blocks risky implementation.

Record authority, recency, scope, source, locator, and confidence. Display
names are not internal names, and logical names are not inferred from them.
For mutable platform behavior, **verify against current official
documentation** before implementation.
