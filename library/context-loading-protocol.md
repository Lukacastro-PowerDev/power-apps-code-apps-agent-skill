# Context Loading Protocol

## Goal
Prevent indiscriminate context loading and reduce hallucination risk.

## Protocol
1. **Classify task** (feature, bugfix, refactor, security review, architecture).
2. **Identify data source** (SharePoint, Dataverse, mixed, unknown).
3. **Load core controls** (`AGENTS.md`, decision tree, index entries).
4. **Load minimal skill docs** based on category and tags.
5. **Load project evidence** (models/services/schema docs) only as needed.
6. **Validate assumptions** before coding.
7. **Expand context incrementally** only when a blocker appears.

## Hard limits
- Never infer schema from examples.
- Never load unrelated examples as normative rules.
- Always distinguish observed artifacts vs hypothetical templates.
