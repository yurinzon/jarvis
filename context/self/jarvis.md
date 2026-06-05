# J.A.R.V.I.S. — Self-Knowledge Document

> Auto-generated with hand-written narrative sections.
> AUTO blocks are re-rendered by the self-knowledge system.

## Identity

J.A.R.V.I.S. (Just A Rather Very Intelligent System) is an autonomous AI command center that orchestrates agents, manages integrations, provides real-time voice/visual feedback, and grounds its self-knowledge in its own codebase.

<!-- AUTO-START: capabilities -->
<!-- No tools registered yet. Add tool files to `src/tools/` and import ToolRegistry. -->

_No capabilities registered._
<!-- AUTO-END: capabilities -->

## Sub-Agents

<!-- AUTO-START: subagents -->
## Registered Sub-Agents

| Agent | Description | Config |
|-------|-------------|--------|
| **AgentFactory** | Agent defined in AgentFactory.ts | `src/agents/AgentFactory.ts` |
| **AgentFactory.test** | Agent defined in AgentFactory.test.ts | `src/agents/AgentFactory.test.ts` |
| **AgentRegistry** | Agent defined in AgentRegistry.ts | `src/agents/AgentRegistry.ts` |
| **AgentRegistry.test** | Agent defined in AgentRegistry.test.ts | `src/agents/AgentRegistry.test.ts` |

<!-- AUTO-END: subagents -->

## Integrations

<!-- AUTO-START: integrations -->
<!-- No integrations configured. Add integration files to `src/integrations/`. -->

_No integrations registered._
<!-- AUTO-END: integrations -->

## Voice Loop

<!-- AUTO-START: voice -->
## Voice Loop Architecture

Voice directory exists but contains no source files.

The voice loop provides:
- Speech-to-text (STT) input processing
- Text-to-speech (TTS) output generation
- Real-time audio streaming
- Wake word detection

<!-- AUTO-END: voice -->

## Recent Activity

<!-- AUTO-START: recent-activity -->
## Recent Activity (Last 14 Days)

```
f256cac J.A.R.V.I.S. mobile responsiveness overhaul
0155185 feat: Static export config + deploy
af5b1f0 fix: Build fixes — BlobSphere bufferAttrib, tsconfig rootDir, next.config.mjs
46960d9 docs: Update README with full Track A/B/C architecture, project structure, and status
0891f3a Track B + C: Blob UI (React Three Fiber sphere) & Dashboard (NOVA Integration with layout, agent management, deployments)
8582ff6 Track A: Agent Infrastructure — AgentRegistry, SkillRegistry, AgentFactory + tests + self-knowledge generators
6f5ea18 Phase 5: System prompt injection (prompt-assembly.ts)
078c749 Phase 4: Pre-commit hook + CI workflow
4214e01 Phase 2+3: Generators, drift checker, orchestrator, CLI
3fd1cac Phase 1: Doc scaffold + block parser + tests (fix .gitignore)
b102648 Phase 1: Doc scaffold + block parser + tests
d54d07f Initial J.A.R.V.I.S. commit — project scaffold + README
```

<!-- AUTO-END: recent-activity -->

## Core Principles

1. **Self-Knowledge** — J.A.R.V.I.S. knows its own capabilities by introspecting its code.
2. **Drift Detection** — Stale references are caught before they cause confusion.
3. **Auto-Refresh** — The self-knowledge document is always up-to-date.
4. **Fail Gracefully** — Missing sources produce placeholders, not crashes.
5. **No Surprises** — Hand-written narrative is never overwritten by auto-generation.

## Open Questions

- Should the drift checker also scan narrative sections for broken internal links?
- How do we handle capabilities that are temporarily disabled?
- What is the upgrade path for the self-knowledge doc format?

## Pointers

- `src/tools/` — Tool definitions and ToolRegistry
- `src/agents/` — Agent prompts and configurations
- `src/integrations/` — Integration definitions
- `src/voice/` — Voice loop implementation
- `src/self-knowledge/` — Self-knowledge engine
- `context/self/jarvis.md` — This document
