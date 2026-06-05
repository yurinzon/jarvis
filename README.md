# J.A.R.V.I.S. — Just A Rather Very Intelligent System

**Autonomous AI Command Center**

J.A.R.V.I.S. orchestrates agents, manages skills, provides a clean Perplexity/Arc Search style interface, and grounds its self-knowledge in its own codebase.

## Architecture

### ✅ Core System (Phase 0-5)
| Phase | Description | Status |
|-------|------------|--------|
| 0 | Interview | ✅ |
| 1 | Doc scaffold + block parser | ✅ |
| 2 | Introspecting generators | ✅ |
| 3 | Drift checker | ✅ |
| 4 | Pre-commit hook + CI | ✅ |
| 5 | System prompt injection | ✅ |

### 🆕 Track A: Agent Infrastructure
| Component | Description | Status |
|-----------|------------|--------|
| `AgentRegistry` | Central agent registry — register, get, list, status updates | ✅ |
| `SkillRegistry` | Central skill registry — register, get, list by category | ✅ |
| `AgentFactory` | CLI tool to scaffold new agents with config, prompt, skills | ✅ |
| Self-knowledge generators | `generators/agents.ts`, `generators/skills.ts` | ✅ |
| Vitest tests | 19 tests across all 3 components | ✅ |

### 🆕 Track B: Dashboard UI (Perplexity Style)
| Component | Description | Status |
|-----------|------------|--------|
| Dashboard layout | Desktop sidebar (w-64) + mobile bottom nav (5 tabs) | ✅ |
| Landing page | Minimal: search bar + suggested searches + "Enter Command Center" | ✅ |
| Discover page | Search bar + Agent Status chips + Suggested cards + Activity list | ✅ |
| Agent Management | Thread-list style: initials avatar, name, skills, status dot | ✅ |
| Deployments/Library | Notion-like table + "Your library is empty" empty state | ✅ |
| Design system | Clean dark theme (#111111), thin borders, text-driven, indigo accent | ✅ |

## Project Structure

```
src/
├── agents/
│   ├── AgentRegistry.ts          # Central agent registry
│   ├── AgentFactory.ts           # Agent scaffolding CLI
│   ├── AgentRegistry.test.ts     # Tests
│   └── AgentFactory.test.ts      # Tests
├── skills/
│   ├── SkillRegistry.ts          # Central skill registry
│   └── SkillRegistry.test.ts     # Tests
├── app/
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Tailwind v4 + custom styles
│   ├── page.tsx                  # Minimal landing page with search bar
│   └── dashboard/
│       ├── layout.tsx            # Sidebar + bottom nav layout
│       ├── page.tsx              # Discover page (Perplexity-style)
│       ├── agents/page.tsx       # Agent management (thread list)
│       └── deployments/page.tsx  # Deployments / Library (Notion table + empty state)
├── components/
│   ├── BlobUI/
│   │   ├── BlobSphere.tsx        # R3F 3D blob (legacy, available for settings)
│   │   ├── BlobController.tsx    # Settings overlay (legacy)
│   │   └── BlobUIWrapper.tsx     # Simplified background accent
│   └── Dashboard/
│       ├── AgentCard.tsx         # Thread-list style agent row
│       ├── StatsGrid.tsx         # Minimal inline stats
│       └── ActivityFeed.tsx      # Perplexity thread/history style
├── self-knowledge/
│   ├── orchestrator.ts           # Coordinates doc generation
│   ├── parser.ts                 # AUTO block parser
│   ├── parser.test.ts            # Parser tests (10 tests)
│   ├── drift-checker.ts          # Stale reference detection
│   └── generators/
│       ├── capabilities.ts       # Tool registry → markdown
│       ├── agents.ts             # Agent registry → markdown
│       ├── skills.ts             # Skill registry → markdown
│       ├── subagents.ts          # Filesystem agent scan
│       ├── integrations.ts       # Integration scan
│       ├── voice.ts              # Voice architecture doc
│       └── recent-activity.ts    # Git log introspection
└── tools/
    └── ToolRegistry.ts           # Tool capability registry
```

## Getting Started

```bash
npm install
npm run dev          # Start Next.js dev server
npm test             # Run vitest suite (29 tests)
npm run jarvis -- self-knowledge --render   # Preview self-knowledge doc
npm run jarvis -- self-knowledge --refresh  # Write doc to disk
```

## CLI

```
jarvis self-knowledge --render     # Preview the rendered doc
jarvis self-knowledge --refresh    # Write to disk
jarvis self-knowledge --check      # Soft drift check
jarvis self-knowledge --check --strict  # Strict drift check (CI)
```

To scaffold a new agent:
```bash
tsx src/agents/AgentFactory.ts create-agent Researcher \
  --description "Deep research specialist" \
  --model "claude-3-opus" \
  --skills "web-search,analysis"
```

## Design System

- **Base:** `#111111` — clean dark bg
- **Surface:** `#1a1a1a` — cards, sidebar, containers
- **Border:** `#2a2a2a` — subtle dividers
- **Accent:** `#6366f1` (indigo-500) / `#818cf8` (hover)
- **Text:** `#e2e8f0` primary / `#64748b` muted
- **Status:** `#22c55e` (active/green), `#eab308` (idle/yellow), `#ef4444` (error/red)
- **Cards:** Thin border `1px solid #2a2a2a`, no glassmorphism — clean and text-driven
- **Typography:** -apple-system, BlinkMacSystemFont; information-dense

The UI is inspired by Perplexity AI and Arc Search: information-dense, text-driven, search-first. White space, thin borders, no heavy visuals.

## Tests

```bash
npm test                          # All 29 tests
npx vitest run src/agents/        # Agent infrastructure tests (19)
npx vitest run src/self-knowledge # Parser tests (10)
```
