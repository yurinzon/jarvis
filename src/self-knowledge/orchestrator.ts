/**
 * orchestrator.ts — Coordinates the self-knowledge system.
 *
 * Reads the doc, runs all generators, updates the AUTO blocks,
 * and writes back to disk (if --refresh) or prints to stdout (if --render).
 *
 * Also supports drift checking via --check / --check --strict.
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { parseAutoBlocks, renderBlocks } from "./parser.js";
import { renderCapabilities } from "./generators/capabilities.js";
import { renderSubAgents } from "./generators/subagents.js";
import { renderIntegrations } from "./generators/integrations.js";
import { renderVoice } from "./generators/voice.js";
import { renderRecentActivity } from "./generators/recent-activity.js";
import { renderAgents } from "./generators/agents.js";
import { renderSkills } from "./generators/skills.js";
import { checkDrift, printFindings } from "./drift-checker.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOC_PATH = path.resolve(__dirname, "../../context/self/jarvis.md");

export interface RenderResult {
  doc: string;
  blocks: Record<string, string>;
}

/**
 * Run all generators and produce a new version of the doc.
 */
export function generateFullDoc(): RenderResult {
  const doc = fs.readFileSync(DOC_PATH, "utf-8");

  const blocks: Record<string, string> = {
    capabilities: renderCapabilities(),
    subagents: renderSubAgents(),
    agents: renderAgents(),
    skills: renderSkills(),
    integrations: renderIntegrations(),
    voice: renderVoice(),
    "recent-activity": renderRecentActivity(),
  };

  const updated = renderBlocks(doc, blocks);
  return { doc: updated, blocks };
}

/**
 * CLI entry point.
 */
export function runCLI(args: string[]): void {
  const hasRender = args.includes("--render");
  const hasRefresh = args.includes("--refresh");
  const hasCheck = args.includes("--check");
  const isStrict = args.includes("--strict");

  if (hasCheck) {
    const findings = checkDrift();
    const result = printFindings(findings, isStrict);
    if (!result.ok && isStrict) {
      process.exit(1);
    }
    return;
  }

  if (hasRender || hasRefresh) {
    const result = generateFullDoc();

    if (hasRender) {
      console.log(result.doc);
    }

    if (hasRefresh) {
      fs.writeFileSync(DOC_PATH, result.doc, "utf-8");
      console.log(`✅ Self-knowledge document refreshed: ${DOC_PATH}`);
    }

    return;
  }

  // No flags — print usage
  console.log(`J.A.R.V.I.S. Self-Knowledge System

Usage:
  jarvis self-knowledge --render     # Preview the rendered doc
  jarvis self-knowledge --refresh    # Write to disk
  jarvis self-knowledge --check      # Soft drift check
  jarvis self-knowledge --check --strict  # Strict drift check (CI)
`);
}
