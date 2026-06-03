/**
 * skills.ts — Generator for the skills AUTO block.
 *
 * Uses SkillRegistry for introspecting available skills.
 * Fail-safe: returns a placeholder if no skills are registered.
 */

import { SkillRegistry } from "../../skills/SkillRegistry.js";

/**
 * Render the skills section for the self-knowledge document.
 * Returns markdown to place between the AUTO-START and AUTO-END markers.
 */
export function renderSkills(): string {
  const skills = SkillRegistry.list();

  if (skills.length === 0) {
    return [
      "<!-- No skills registered. Add skills via SkillRegistry. -->",
      "",
      "_No skills registered._",
    ].join("\n");
  }

  const lines: string[] = [
    "## Registered Skills",
    "",
    "| Skill | Description | Category |",
    "|-------|-------------|----------|",
  ];

  for (const skill of skills) {
    lines.push(
      `| **${skill.name}** | ${skill.description} | ${skill.category} |`,
    );
  }

  lines.push("");
  return lines.join("\n");
}
