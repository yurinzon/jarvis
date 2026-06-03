/**
 * subagents.ts — Generator for the sub-agents AUTO block.
 *
 * Imports agent definitions from `src/agents/` and renders a list.
 * Fail-safe: returns a placeholder if no agents are found.
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AGENTS_DIR = path.resolve(__dirname, "../../agents");

export interface AgentDef {
  name: string;
  description: string;
  filePath: string;
}

/**
 * Scan the agents directory and return agent definitions.
 * Each agent is expected to have an agent.json or .ts/.js config file.
 */
function discoverAgents(): AgentDef[] {
  try {
    if (!fs.existsSync(AGENTS_DIR)) {
      return [];
    }

    const entries = fs.readdirSync(AGENTS_DIR, { withFileTypes: true });
    const agents: AgentDef[] = [];

    for (const entry of entries) {
      const fullPath = path.join(AGENTS_DIR, entry.name);
      if (entry.isFile() && /\.(ts|js|json)$/.test(entry.name)) {
        const name = path.basename(entry.name, path.extname(entry.name));
        agents.push({
          name,
          description: `Agent defined in ${entry.name}`,
          filePath: `src/agents/${entry.name}`,
        });
      }
    }

    return agents.sort((a, b) => a.name.localeCompare(b.name));
  } catch {
    return [];
  }
}

/**
 * Render the sub-agents section for the self-knowledge document.
 */
export function renderSubAgents(): string {
  const agents = discoverAgents();

  if (agents.length === 0) {
    return [
      "<!-- No sub-agents found. Add agent definitions to `src/agents/`. -->",
      "",
      "_No sub-agents registered._",
    ].join("\n");
  }

  const lines: string[] = [
    "## Registered Sub-Agents",
    "",
    "| Agent | Description | Config |",
    "|-------|-------------|--------|",
  ];

  for (const agent of agents) {
    lines.push(
      `| **${agent.name}** | ${agent.description} | \`${agent.filePath}\` |`,
    );
  }

  lines.push("");
  return lines.join("\n");
}
