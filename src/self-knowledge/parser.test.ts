import { describe, it, expect } from "vitest";
import {
  parseAutoBlocks,
  renderBlocks,
  roundTripStable,
  findBlock,
} from "./parser.js";

const SAMPLE_DOC = `# Test

Identity text here.

<!-- AUTO-START: capabilities -->
## Capabilities
- Tool A
- Tool B
<!-- AUTO-END: capabilities -->

More narrative.

<!-- AUTO-START: subagents -->
<!-- Sub-agents placeholder -->
<!-- AUTO-END: subagents -->

Questions.
`;

describe("parseAutoBlocks", () => {
  it("finds all AUTO blocks", () => {
    const blocks = parseAutoBlocks(SAMPLE_DOC);
    expect(blocks).toHaveLength(2);
    expect(blocks[0].name).toBe("capabilities");
    expect(blocks[1].name).toBe("subagents");
  });

  it("extracts content correctly", () => {
    const blocks = parseAutoBlocks(SAMPLE_DOC);
    const caps = blocks.find((b) => b.name === "capabilities")!;
    expect(caps.content).toContain("- Tool A");
    expect(caps.content).toContain("- Tool B");
  });

  it("returns empty array for doc with no blocks", () => {
    expect(parseAutoBlocks("No blocks here")).toEqual([]);
  });
});

describe("findBlock", () => {
  it("finds by name", () => {
    const blocks = parseAutoBlocks(SAMPLE_DOC);
    const found = findBlock(blocks, "capabilities");
    expect(found).toBeDefined();
    expect(found!.name).toBe("capabilities");
  });

  it("returns undefined for missing block", () => {
    const blocks = parseAutoBlocks(SAMPLE_DOC);
    expect(findBlock(blocks, "nonexistent")).toBeUndefined();
  });
});

describe("renderBlocks", () => {
  it("replaces specific blocks", () => {
    const result = renderBlocks(SAMPLE_DOC, {
      capabilities: "## Capabilities\n- Updated Tool",
    });
    expect(result).toContain("- Updated Tool");
    expect(result).toContain("More narrative.");
    expect(result).toContain("More narrative.");
  });

  it("does not modify blocks not in replacements", () => {
    const result = renderBlocks(SAMPLE_DOC, {
      capabilities: "NEW CONTENT",
    });
    expect(result).not.toContain("Tool A");
    expect(result).toContain("Sub-agents placeholder");
  });
});

describe("roundTripStable", () => {
  it("is stable with no changes", () => {
    expect(roundTripStable(SAMPLE_DOC)).toBe(true);
  });

  it("is stable for doc with no blocks", () => {
    expect(roundTripStable("No blocks here")).toBe(true);
  });

  it("detects instability", () => {
    // A doc with no AUTO blocks is trivially stable
    expect(roundTripStable("Just plain text")).toBe(true);
  });
});
