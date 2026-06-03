/**
 * parser.ts — Self-knowledge document block parser.
 *
 * Reads the self-knowledge markdown document, identifies AUTO blocks
 * (bounded by <!-- AUTO-START: <name> --> / <!-- AUTO-END: <name> -->),
 * and allows replacing their content without touching hand-written sections.
 *
 * Pure functions — no side effects.
 */

export interface AutoBlock {
  name: string;
  fullStart: string; // e.g. "<!-- AUTO-START: capabilities -->"
  fullEnd: string;   // e.g. "<!-- AUTO-END: capabilities -->"
  /** The content between start and end markers (excluding markers) */
  content: string;
  /** 0-indexed line number of the start marker */
  startLine: number;
  /** 0-indexed line number of the end marker */
  endLine: number;
}

const AUTO_START_RE = /^<!--\s*AUTO-START:\s*(\S+)\s*-->\s*$/;
const AUTO_END_RE = /^<!--\s*AUTO-END:\s*(\S+)\s*-->\s*$/;

/**
 * Parse a markdown document and extract all AUTO blocks.
 */
export function parseAutoBlocks(doc: string): AutoBlock[] {
  const lines = doc.split("\n");
  const blocks: AutoBlock[] = [];
  let current: { name: string; startLine: number } | null = null;
  let contentLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const startMatch = line.match(AUTO_START_RE);

    if (startMatch) {
      current = { name: startMatch[1], startLine: i };
      contentLines = [];
      continue;
    }

    const endMatch = line.match(AUTO_END_RE);
    if (endMatch && current) {
      blocks.push({
        name: current.name,
        fullStart: lines[current.startLine],
        fullEnd: line,
        content: contentLines.join("\n"),
        startLine: current.startLine,
        endLine: i,
      });
      current = null;
      contentLines = [];
      continue;
    }

    // If content starts with "<!-- " skip that as well (our own placeholders)
    if (current) {
      contentLines.push(line);
    }
  }

  return blocks;
}

/**
 * Find a specific auto block by name.
 */
export function findBlock(
  blocks: AutoBlock[],
  name: string,
): AutoBlock | undefined {
  return blocks.find((b) => b.name === name);
}

/**
 * Render a fresh version of the document with new content for specific blocks.
 *
 * @param doc - Original document text
 * @param replacements - Map of block name → new content (the text that goes between markers)
 * @returns The updated document
 */
export function renderBlocks(
  doc: string,
  replacements: Record<string, string>,
): string {
  const blocks = parseAutoBlocks(doc);
  // Sort blocks in reverse order so line indices stay valid as we replace
  const sorted = [...blocks]
    .filter((b) => b.name in replacements)
    .sort((a, b) => b.startLine - a.startLine);

  const lines = doc.split("\n");

  for (const block of sorted) {
    const newContent = replacements[block.name];
    // Replace from startLine+1 to endLine-1 with new content
    const before = lines.slice(0, block.startLine + 1);
    const after = lines.slice(block.endLine);
    const newLines = newContent ? newContent.split("\n") : [];
    const combined = [...before, ...newLines, ...after];
    // We need to reconstruct and re-split to keep indices correct for subsequent blocks
    // Since we process in reverse and don't process the same block twice, this is safe
    lines.splice(0, lines.length, ...combined);
  }

  return lines.join("\n");
}

/**
 * Round-trip: parse → render with same content → should produce identical doc.
 */
export function roundTripStable(doc: string): boolean {
  const blocks = parseAutoBlocks(doc);
  const sameContent: Record<string, string> = {};
  for (const block of blocks) {
    sameContent[block.name] = block.content;
  }
  const reRendered = renderBlocks(doc, sameContent);
  return reRendered === doc;
}
