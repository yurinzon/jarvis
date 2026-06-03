/**
 * capabilities.ts — Generator for the capabilities AUTO block.
 *
 * Imports ToolRegistry and renders a markdown table of registered capabilities.
 * Fail-safe: returns a placeholder if no tools are registered.
 */

import { ToolRegistry, type ToolDef } from "../../tools/ToolRegistry.js";

/**
 * Render the capabilities section for the self-knowledge document.
 * Returns markdown to place between the AUTO-START and AUTO-END markers.
 */
export function renderCapabilities(): string {
  const tools = ToolRegistry.getAll();

  if (tools.length === 0) {
    return [
      "<!-- No tools registered yet. Add tool files to `src/tools/` and import ToolRegistry. -->",
      "",
      "_No capabilities registered._",
    ].join("\n");
  }

  const lines: string[] = [
    "## Registered Capabilities",
    "",
    "| Name | Description | File |",
    "|------|-------------|------|",
  ];

  for (const tool of tools) {
    lines.push(`| ${tool.name} | ${tool.description} | \`${tool.filePath}\` |`);
  }

  lines.push("");
  return lines.join("\n");
}
