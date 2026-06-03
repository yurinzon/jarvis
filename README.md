# J.A.R.V.I.S. — Just A Rather Very Intelligent System

**Living Self-Knowledge System**

This project implements the agent self-knowledge pattern:
- A self-knowledge document that lives in the repo and is the single source of truth
- Code-introspecting generators that keep the AUTO sections accurate
- A drift checker that catches stale references in narrative sections
- A pre-commit hook that auto-refreshes the doc on every commit
- System prompt injection so J.A.R.V.I.S. knows its own capabilities accurately

## Tiers

| Phase | Description | Status |
|-------|------------|--------|
| 0 | Interview | 🔜 |
| 1 | Doc scaffold + block parser | 📋 |
| 2 | Introspecting generators | 📋 |
| 3 | Drift checker | 📋 |
| 4 | Pre-commit hook + CI | 📋 |
| 5 | System prompt injection | 📋 |

## CLI

```
jarvis self-knowledge --render     # Preview the rendered doc
jarvis self-knowledge --refresh    # Write to disk
jarvis self-knowledge --check      # Soft drift check
jarvis self-knowledge --check --strict  # Strict drift check (CI)
```
