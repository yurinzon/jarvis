import { describe, it, expect, beforeEach } from "vitest";
import { SkillRegistry, type SkillConfig } from "../skills/SkillRegistry.js";

const sampleSkill: SkillConfig = {
  name: "web-search",
  description: "Search the web using Brave Search API",
  category: "research",
};

describe("SkillRegistry", () => {
  beforeEach(() => {
    SkillRegistry.clear();
  });

  it("registers a skill", () => {
    SkillRegistry.register(sampleSkill);
    expect(SkillRegistry.hasAny()).toBe(true);
    expect(SkillRegistry.count()).toBe(1);
  });

  it("retrieves a skill by name", () => {
    SkillRegistry.register(sampleSkill);
    const skill = SkillRegistry.get("web-search");
    expect(skill).toBeDefined();
    expect(skill!.name).toBe("web-search");
    expect(skill!.description).toContain("Brave Search");
  });

  it("returns undefined for unknown skill", () => {
    expect(SkillRegistry.get("unknown")).toBeUndefined();
  });

  it("lists all skills sorted by name", () => {
    SkillRegistry.register(sampleSkill);
    SkillRegistry.register({
      name: "analysis",
      description: "Data analysis capability",
      category: "analysis",
    });
    const list = SkillRegistry.list();
    expect(list).toHaveLength(2);
    expect(list[0].name).toBe("analysis");
    expect(list[1].name).toBe("web-search");
  });

  it("lists skills by category", () => {
    SkillRegistry.register(sampleSkill);
    SkillRegistry.register({
      name: "code-review",
      description: "Review code changes",
      category: "development",
    });
    SkillRegistry.register({
      name: "data-analysis",
      description: "Analyze datasets",
      category: "analysis",
    });

    const research = SkillRegistry.listByCategory("research");
    expect(research).toHaveLength(1);
    expect(research[0].name).toBe("web-search");
  });

  it("returns categories", () => {
    SkillRegistry.register(sampleSkill);
    SkillRegistry.register({
      name: "code-review",
      description: "Review code changes",
      category: "development",
    });
    const cats = SkillRegistry.categories();
    expect(cats).toContain("research");
    expect(cats).toContain("development");
  });

  it("warns on duplicate registration", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    SkillRegistry.register(sampleSkill);
    SkillRegistry.register(sampleSkill);
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});
