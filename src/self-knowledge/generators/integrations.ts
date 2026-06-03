/**
 * integrations.ts — Generator for the integrations AUTO block.
 *
 * Reads integration definitions from `src/integrations/` and renders a list.
 * Fail-safe: returns a placeholder if no integrations are found.
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const INTEGRATIONS_DIR = path.resolve(__dirname, "../../integrations");

export interface IntegrationDef {
  name: string;
  kind: string;
  filePath: string;
}

/**
 * Scan the integrations directory and return integration definitions.
 */
function discoverIntegrations(): IntegrationDef[] {
  try {
    if (!fs.existsSync(INTEGRATIONS_DIR)) {
      return [];
    }

    const entries = fs.readdirSync(INTEGRATIONS_DIR, { withFileTypes: true });
    const integrations: IntegrationDef[] = [];

    for (const entry of entries) {
      const fullPath = path.join(INTEGRATIONS_DIR, entry.name);
      if (entry.isDirectory()) {
        integrations.push({
          name: entry.name,
          kind: "directory",
          filePath: `src/integrations/${entry.name}/`,
        });
      } else if (entry.isFile() && /\.(ts|js|json|yaml|yml)$/.test(entry.name)) {
        const name = path.basename(entry.name, path.extname(entry.name));
        const ext = path.extname(entry.name);
        integrations.push({
          name,
          kind: ext === ".json" ? "config" : ext === ".yml" || ext === ".yaml" ? "config" : "module",
          filePath: `src/integrations/${entry.name}`,
        });
      }
    }

    return integrations.sort((a, b) => a.name.localeCompare(b.name));
  } catch {
    return [];
  }
}

/**
 * Render the integrations section for the self-knowledge document.
 */
export function renderIntegrations(): string {
  const integrations = discoverIntegrations();

  if (integrations.length === 0) {
    return [
      "<!-- No integrations configured. Add integration files to `src/integrations/`. -->",
      "",
      "_No integrations registered._",
    ].join("\n");
  }

  const lines: string[] = [
    "## Registered Integrations",
    "",
    "| Integration | Kind | Location |",
    "|-------------|------|----------|",
  ];

  for (const int of integrations) {
    lines.push(`| **${int.name}** | ${int.kind} | \`${int.filePath}\` |`);
  }

  lines.push("");
  return lines.join("\n");
}
