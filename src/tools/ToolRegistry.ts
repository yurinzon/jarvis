/**
 * ToolRegistry — central registry of all J.A.R.V.I.S. capabilities.
 * Every tool in `src/tools/` self-registers here.
 */
export interface ToolDef {
  name: string;
  description: string;
  filePath: string;
}

class ToolRegistryClass {
  private tools = new Map<string, ToolDef>();

  register(def: ToolDef): void {
    this.tools.set(def.name, def);
  }

  getAll(): ToolDef[] {
    return Array.from(this.tools.values()).sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  }

  get(name: string): ToolDef | undefined {
    return this.tools.get(name);
  }

  hasAny(): boolean {
    return this.tools.size > 0;
  }
}

export const ToolRegistry = new ToolRegistryClass();
