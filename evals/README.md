# Local evaluations

The runner checks a response/patch directory against deterministic rules. It
does not call models or external APIs. A future agent adapter can place its
sanitized output in a fixture directory and invoke `npm run evals -- --input
<path>`. Fixtures are fictional and marked `EXAMPLE ONLY`.
