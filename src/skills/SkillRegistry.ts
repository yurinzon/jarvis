/**
 * SkillRegistry — Central registry of all J.A.R.V.I.S. skills.
 *
 * Every skill in `src/skills/` self-registers here.
 * Skills represent discrete capabilities an agent can possess.
 */

export type SkillHandler = (input: unknown) => Promise<unknown>;

export interface SkillConfig {
  name: string;
  description: string;
  category: string;
  handler?: SkillHandler;
}

class SkillRegistryClass {
  private skills = new Map<string, SkillConfig>();

  register(config: SkillConfig): void {
    if (this.skills.has(config.name)) {
      console.warn(
        `[SkillRegistry] Overwriting existing skill: "${config.name}"`,
      );
    }
    this.skills.set(config.name, config);
  }

  get(name: string): SkillConfig | undefined {
    return this.skills.get(name);
  }

  list(): SkillConfig[] {
    return Array.from(this.skills.values()).sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  }

  listByCategory(category: string): SkillConfig[] {
    return this.list().filter((s) => s.category === category);
  }

  categories(): string[] {
    const cats = new Set(this.skills.values().map((s) => s.category));
    return Array.from(cats).sort();
  }

  hasAny(): boolean {
    return this.skills.size > 0;
  }

  count(): number {
    return this.skills.size;
  }

  clear(): void {
    this.skills.clear();
  }
}

export const SkillRegistry = new SkillRegistryClass();
