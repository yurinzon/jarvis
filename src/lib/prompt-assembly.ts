/**
 * prompt-assembly.ts — System prompt builder for J.A.R.V.I.S.
 *
 * Builds a system prompt from the self-knowledge document.
 * Two modes:
 *   - Slim (~500 tokens): identity + principles + capability names
 *   - Full: entire rendered self-knowledge document
 *
 * Mode is controlled via environment variable:
 *   JARVIS_PROMPT_MODE=slim (default) or full
 *   JARVIS_SELF_KNOWLEDGE_PATH — optional path override for the doc
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_DOC_PATH = path.resolve(
  __dirname,
  "../../context/self/jarvis.md",
);

export type PromptMode = "slim" | "full";

export interface PromptAssemblyResult {
  prompt: string;
  mode: PromptMode;
  source: string;
}

/**
 * Get the configured prompt mode.
 */
function getMode(): PromptMode {
  const env = process.env.JARVIS_PROMPT_MODE?.toLowerCase().trim();
  if (env === "full") return "full";
  return "slim";
}

/**
 * Get path to the self-knowledge document.
 */
function getDocPath(): string {
  return (
    process.env.JARVIS_SELF_KNOWLEDGE_PATH || DEFAULT_DOC_PATH
  );
}

/**
 * Read and return the full self-knowledge document.
 */
function readFullDoc(): string {
  try {
    return fs.readFileSync(getDocPath(), "utf-8");
  } catch {
    return "⚠️ Self-knowledge document not found. Run `jarvis self-knowledge --refresh` to generate it.";
  }
}

/**
 * Extract identity section from the doc (first lines before any AUTO block).
 */
function extractIdentity(doc: string): string {
  const lines = doc.split("\n");
  const identityLines: string[] = [];
  for (const line of lines) {
    if (line.startsWith("<!-- AUTO-START:")) break;
    identityLines.push(line);
  }
  return identityLines.join("\n").trim();
}

/**
 * Extract core principles from the doc.
 */
function extractPrinciples(doc: string): string {
  const principles: string[] = [];
  const lines = doc.split("\n");
  let inPrinciples = false;

  for (const line of lines) {
    if (line.startsWith("## Core Principles")) {
      inPrinciples = true;
      continue;
    }
    if (inPrinciples) {
      if (line.startsWith("## ")) break;
      if (line.match(/^\d+\.\s/)) {
        principles.push(line.trim());
      }
    }
  }

  return principles.join("\n");
}

/**
 * Extract capability names from the capabilities AUTO block.
 */
function extractCapabilityNames(doc: string): string[] {
  const names: string[] = [];
  const lines = doc.split("\n");
  let inCaps = false;

  for (const line of lines) {
    if (line.includes("AUTO-START: capabilities")) {
      inCaps = true;
      continue;
    }
    if (line.includes("AUTO-END: capabilities")) {
      inCaps = false;
      continue;
    }
    if (inCaps && line.startsWith("| ") && line.includes("|")) {
      const parts = line.split("|").map((p) => p.trim());
      if (parts.length >= 2 && parts[1] && !parts[1].startsWith("Name")) {
        names.push(parts[1]);
      }
    }
  }

  return names;
}

/**
 * Build a slim system prompt (~500 tokens).
 */
function buildSlimPrompt(doc: string): string {
  const identity = extractIdentity(doc);
  const principles = extractPrinciples(doc);
  const capabilities = extractCapabilityNames(doc);

  const parts: string[] = [
    identity,
    "",
    "## Core Principles",
    principles,
    "",
  ];

  if (capabilities.length > 0) {
    parts.push("## Capabilities");
    for (const cap of capabilities) {
      parts.push(`- ${cap}`);
    }
    parts.push("");
  }

  return parts.join("\n");
}

/**
 * Build the system prompt based on configured mode.
 */
export function assemblePrompt(): PromptAssemblyResult {
  const mode = getMode();
  const doc = readFullDoc();

  if (mode === "full") {
    return {
      prompt: doc,
      mode: "full",
      source: getDocPath(),
    };
  }

  return {
    prompt: buildSlimPrompt(doc),
    mode: "slim",
    source: getDocPath(),
  };
}

/**
 * Force a full doc read and return it.
 */
export function assembleFullPrompt(): PromptAssemblyResult {
  return {
    prompt: readFullDoc(),
    mode: "full",
    source: getDocPath(),
  };
}

/**
 * Force a slim summary.
 */
export function assembleSlimPrompt(): PromptAssemblyResult {
  return {
    prompt: buildSlimPrompt(readFullDoc()),
    mode: "slim",
    source: getDocPath(),
  };
}
