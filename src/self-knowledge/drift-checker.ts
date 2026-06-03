/**
 * drift-checker.ts — Self-knowledge drift detection.
 *
 * Compares the current state of the codebase against the rendered doc
 * and reports findings where the doc may have drifted from reality.
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOC_PATH = path.resolve(__dirname, "../../context/self/jarvis.md");
const ALLOWLIST_PATH = path.resolve(
  __dirname,
  "../../context/self/.jarvis-allowlist.txt",
);

export interface DriftFinding {
  kind: "missing-capability" | "stale-reference" | "missing-block" | "doc-not-found";
  reference: string;
  locationInDoc: string;
  reason: string;
}

/**
 * Load the allowlist of known false positives, one pattern per line.
 */
function loadAllowlist(): string[] {
  try {
    const content = fs.readFileSync(ALLOWLIST_PATH, "utf-8");
    return content
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0 && !l.startsWith("#"));
  } catch {
    return [];
  }
}

/**
 * Check if a finding is allowlisted.
 */
function isAllowlisted(finding: DriftFinding): boolean {
  const allowlist = loadAllowlist();
  const key = `${finding.kind}:${finding.reference}`;
  return allowlist.some(
    (pattern) => key.includes(pattern) || finding.reference.includes(pattern),
  );
}

/**
 * Run drift checking against the self-knowledge document.
 * Returns findings for everything that looks stale.
 */
export function checkDrift(): DriftFinding[] {
  const findings: DriftFinding[] = [];

  // Check that the doc exists
  if (!fs.existsSync(DOC_PATH)) {
    findings.push({
      kind: "doc-not-found",
      reference: "context/self/jarvis.md",
      locationInDoc: "N/A",
      reason: "Self-knowledge document does not exist.",
    });
    return findings;
  }

  const doc = fs.readFileSync(DOC_PATH, "utf-8");

  // Check that all expected AUTO blocks are present
  const expectedBlocks = [
    "capabilities",
    "subagents",
    "integrations",
    "voice",
    "recent-activity",
  ];

  for (const blockName of expectedBlocks) {
    const startRe = new RegExp(
      `<!--\\s*AUTO-START:\\s*${blockName}\\s*-->`,
    );
    const endRe = new RegExp(
      `<!--\\s*AUTO-END:\\s*${blockName}\\s*-->`,
    );

    if (!startRe.test(doc)) {
      findings.push({
        kind: "missing-block",
        reference: blockName,
        locationInDoc: `AUTO-START:${blockName}`,
        reason: `Missing AUTO-START marker for "${blockName}".`,
      });
    }
    if (!endRe.test(doc)) {
      findings.push({
        kind: "missing-block",
        reference: blockName,
        locationInDoc: `AUTO-END:${blockName}`,
        reason: `Missing AUTO-END marker for "${blockName}".`,
      });
    }
  }

  // Filter out allowlisted findings
  return findings.filter((f) => !isAllowlisted(f));
}

/**
 * Run drift check and exit with non-zero code if strict mode finds issues.
 * Prints findings to stdout.
 */
export function printFindings(
  findings: DriftFinding[],
  strict: boolean,
): { ok: boolean } {
  if (findings.length === 0) {
    console.log("✅ No drift findings. Self-knowledge is up to date.");
    return { ok: true };
  }

  console.log(`⚠️  Found ${findings.length} drift finding(s):\n`);

  for (const f of findings) {
    console.log(`  [${f.kind}] ${f.reference}`);
    console.log(`    Location: ${f.locationInDoc}`);
    console.log(`    Reason: ${f.reason}\n`);
  }

  if (strict) {
    console.log("❌ Strict mode: treating findings as errors.");
    return { ok: false };
  }

  console.log("ℹ️  Soft mode: findings reported but not failing.");
  return { ok: true };
}
