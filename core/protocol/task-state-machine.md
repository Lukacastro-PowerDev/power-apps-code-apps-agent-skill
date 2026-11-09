# Task state machine

```text
intake -> classified -> context-planned -> evidence-collected
        -> designed -> implementing -> validating -> reported
```

Allowed exceptional states are `blocked` and `abandoned`. A task may move
backward only when validation exposes a missing decision or evidence. Each
transition records the reason and the next required artifact in `task.yaml`
or the project task system.
