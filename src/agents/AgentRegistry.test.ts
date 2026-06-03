import { describe, it, expect, beforeEach } from "vitest";
import { AgentRegistry, type AgentConfig } from "./AgentRegistry.js";

const sampleAgent: AgentConfig = {
  name: "Researcher",
  description: "Deep research specialist",
  model: "claude-3-opus",
  skills: ["web-search", "analysis"],
  integrations: [],
};

describe("AgentRegistry", () => {
  beforeEach(() => {
    AgentRegistry.clear();
  });

  it("registers an agent", () => {
    AgentRegistry.register(sampleAgent);
    expect(AgentRegistry.hasAny()).toBe(true);
    expect(AgentRegistry.count()).toBe(1);
  });

  it("retrieves an agent by name", () => {
    AgentRegistry.register(sampleAgent);
    const agent = AgentRegistry.get("Researcher");
    expect(agent).toBeDefined();
    expect(agent!.name).toBe("Researcher");
    expect(agent!.description).toBe("Deep research specialist");
    expect(agent!.model).toBe("claude-3-opus");
    expect(agent!.skills).toEqual(["web-search", "analysis"]);
  });

  it("returns undefined for unknown agent", () => {
    expect(AgentRegistry.get("Unknown")).toBeUndefined();
  });

  it("lists all registered agents sorted by name", () => {
    AgentRegistry.register(sampleAgent);
    AgentRegistry.register({
      name: "AlphaAgent",
      description: "First agent",
      model: "gpt-4",
      skills: [],
      integrations: [],
    });
    const list = AgentRegistry.list();
    expect(list).toHaveLength(2);
    expect(list[0].name).toBe("AlphaAgent");
    expect(list[1].name).toBe("Researcher");
  });

  it("updates agent status", () => {
    AgentRegistry.register(sampleAgent);
    const result = AgentRegistry.updateStatus("Researcher", "active");
    expect(result).toBe(true);
    expect(AgentRegistry.get("Researcher")!.status).toBe("active");
  });

  it("returns false for updateStatus on unknown agent", () => {
    expect(AgentRegistry.updateStatus("Ghost", "error")).toBe(false);
  });

  it("warns on duplicate registration", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    AgentRegistry.register(sampleAgent);
    AgentRegistry.register(sampleAgent);
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});
