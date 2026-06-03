/**
 * agents.ts — Generator for the agents AUTO block.
 *
 * Uses AgentRegistry instead of filesystem scanning.
 * Fail-safe: returns a placeholder if no agents are registered.
 */

import { AgentRegistry } from "../../agents/AgentRegistry.js";

/**
 * Render the agents section for the self-knowledge document.
 * Returns markdown to place between the AUTO-START and AUTO-END markers.
 */
export function renderAgents(): string {
  const agents = AgentRegistry.list();

  if (agents.length === 0) {
    return [
      "<!-- No agents registered. Add agents via AgentRegistry or AgentFactory. -->",
      "",
      "_No agents registered._",
    ].join("\n");
  }

  const lines: string[] = [
    "## Registered Agents",
    "",
    "| Agent | Description | Model | Skills | Status |",
    "|-------|-------------|-------|--------|--------|",
  ];

  for (const agent of agents) {
    const skills = agent.skills.length > 0 ? agent.skills.join(", ") : "—";
    const status = agent.status ?? "idle";
    const statusDot =
      status === "active"
        ? "🟢"
        : status === "error"
          ? "🔴"
          : "🟡";
    lines.push(
      `| **${agent.name}** | ${agent.description} | ${agent.model} | ${skills} | ${statusDot} ${status} |`,
    );
  }

  lines.push("");
  return lines.join("\n");
}
