# J.A.R.V.I.S. — Just A Rather Very Intelligent System

**Autonomous AI Command Center**

J.A.R.V.I.S. orchestrates agents, manages skills, provides a real-time 3D interactive interface, and grounds its self-knowledge in its own codebase.

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

### 🆕 Track B: Blob UI (Interactive Sphere)
| Component | Description | Status |
|-----------|------------|--------|
| `BlobSphere.tsx` | React Three Fiber 3D sphere with vertex displacement (breathing), particle ring, glow shader | ✅ |
| `BlobController.tsx` | Controls: color presets, size/sensitivity sliders, drag-to-move, voice indicator | ✅ |
| `BlobUIWrapper.tsx` | Full-page wrapper integrating sphere + controller + gradient background | ✅ |
| Landing page | Logo reveal animation → BlobUI entry point with "Say J.A.R.V.I.S. to activate" | ✅ |

### 🆕 Track C: Dashboard (NOVA Integration)
| Component | Description | Status |
|-----------|------------|--------|
| Dashboard layout | NavBar + narrow sidebar (56px) + main content area | ✅ |
| Main dashboard | StatsGrid, ActivityFeed, Quick Actions | ✅ |
| Agent management | AgentCard grid with status dots, skills, activation toggle | ✅ |
| Deployments table | Full deployments table with status, uptime, version, manage actions | ✅ |
| Design system | Dark theme (#050505), neon blue/purple accents, glassmorphism, Tailwind CSS | ✅ |

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
│   ├── globals.css               # Tailwind + custom styles
│   ├── page.tsx                  # Landing page with BlobUI
│   └── dashboard/
│       ├── layout.tsx            # Dashboard layout (nav + sidebar)
│       ├── page.tsx              # Main command center
│       ├── agents/page.tsx       # Agent management
│       └── deployments/page.tsx  # Deployments table
├── components/
│   ├── BlobUI/
│   │   ├── BlobSphere.tsx        # R3F 3D blob with particle ring
│   │   ├── BlobController.tsx    # Settings overlay
│   │   └── BlobUIWrapper.tsx     # Full-page wrapper
│   └── Dashboard/
│       ├── AgentCard.tsx         # Agent status card
│       ├── StatsGrid.tsx         # Live statistics grid
│       └── ActivityFeed.tsx      # Real-time activity feed
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

- **Base:** `#050505` (deep dark background)
- **Accent:** `#6366f1` (indigo neon) / `#a855f7` (purple secondary)
- **Cards:** Glassmorphism with `rgba(255,255,255,0.03)` background + blur
- **Status dots:** Green (active), Yellow (idle), Red (error) — Linear-style
- **Typography:** White text on dark, muted text `#64748b`

## Tests

```bash
npm test                          # All 29 tests
npx vitest run src/agents/        # Agent infrastructure tests (19)
npx vitest run src/self-knowledge # Parser tests (10)
```
