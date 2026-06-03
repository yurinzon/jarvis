/**
 * recent-activity.ts — Generator for the recent-activity AUTO block.
 *
 * Runs `git log --oneline --since="14 days ago"` and renders recent commits.
 * Fail-safe: returns a placeholder if not in a git repo or no recent commits.
 */

import { execSync } from "node:child_process";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_DIR = path.resolve(__dirname, "../../..");

/**
 * Render the recent activity section for the self-knowledge document.
 */
export function renderRecentActivity(): string {
  try {
    const log = execSync(
      'git log --oneline --since="14 days ago" --no-decorate',
      {
        cwd: REPO_DIR,
        encoding: "utf-8",
        timeout: 5000,
        stdio: ["ignore", "pipe", "pipe"],
      },
    ).trim();

    if (!log) {
      return [
        "<!-- No commits in the last 14 days. -->",
        "",
        "_No recent activity in the last 14 days._",
      ].join("\n");
    }

    const lines: string[] = [
      "## Recent Activity (Last 14 Days)",
      "",
      "```",
    ];

    const commits = log.split("\n");
    for (const commit of commits) {
      lines.push(commit);
    }

    lines.push("```");
    lines.push("");

    return lines.join("\n");
  } catch {
    return [
      "<!-- Unable to read git log. Make sure the project is a git repository. -->",
      "",
      "_Unable to retrieve recent activity._",
    ].join("\n");
  }
}
