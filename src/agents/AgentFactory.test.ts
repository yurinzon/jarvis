import { describe, it, expect, beforeEach } from "vitest";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { createAgent } from "./AgentFactory.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AGENTS_DIR = path.resolve(__dirname);

describe("AgentFactory", () => {
  const testAgentName = "TestFactoryAgent";

  beforeEach(() => {
    // Clean up any leftover test agent
    const testDir = path.join(AGENTS_DIR, testAgentName);
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true });
    }
  });

  it("creates an agent directory with all required files", () => {
    const agentDir = createAgent({
      name: testAgentName,
      description: "Test agent for factory",
      model: "gpt-4",
      skills: ["web-search", "code-gen"],
    });

    expect(fs.existsSync(agentDir)).toBe(true);
    expect(fs.existsSync(path.join(agentDir, "config.ts"))).toBe(true);
    expect(fs.existsSync(path.join(agentDir, "prompt.md"))).toBe(true);
    expect(fs.existsSync(path.join(agentDir, "skills"))).toBe(true);
    expect(fs.existsSync(path.join(agentDir, "skills", "README.md"))).toBe(true);
  });

  it("creates config.ts with correct agent name and model", () => {
    createAgent({
      name: testAgentName,
      description: "Another test",
      model: "claude-3-opus",
      skills: ["analysis"],
    });

    const config = fs.readFileSync(
      path.join(AGENTS_DIR, testAgentName, "config.ts"),
      "utf-8",
    );
    expect(config).toContain(testAgentName);
    expect(config).toContain("claude-3-opus");
    expect(config).toContain("analysis");
    expect(config).toContain("Another test");
  });

  it("creates prompt.md with agent identity", () => {
    createAgent({
      name: testAgentName,
      description: "Test prompt agent",
      model: "gpt-4",
      skills: ["web-search"],
    });

    const prompt = fs.readFileSync(
      path.join(AGENTS_DIR, testAgentName, "prompt.md"),
      "utf-8",
    );
    expect(prompt).toContain(testAgentName);
    expect(prompt).toContain("Test prompt agent");
    expect(prompt).toContain("gpt-4");
    expect(prompt).toContain("web-search");
  });

  it("rejects invalid agent names", () => {
    expect(() =>
      createAgent({
        name: "lowercase",
        description: "bad",
        model: "gpt-4",
        skills: [],
      }),
    ).toThrow("Invalid agent name");
  });

  it("rejects duplicate agent creation", () => {
    createAgent({
      name: testAgentName,
      description: "first",
      model: "gpt-4",
      skills: [],
    });

    expect(() =>
      createAgent({
        name: testAgentName,
        description: "duplicate",
        model: "gpt-4",
        skills: [],
      }),
    ).toThrow("already exists");
  });

  afterEach(() => {
    const testDir = path.join(AGENTS_DIR, testAgentName);
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true });
    }
  });
});
