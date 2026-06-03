/**
 * AgentRegistry — Central registry of all J.A.R.V.I.S. agents.
 *
 * Every agent in `src/agents/` self-registers here.
 * Usable both at runtime (for orchestration) and by self-knowledge generators.
 */

export interface IntegrationRef {
  name: string;
  config: Record<string, unknown>;
}

export interface AgentConfig {
  name: string;
  description: string;
  model: string;
  skills: string[];
  integrations: IntegrationRef[];
  status?: "active" | "idle" | "error";
}

class AgentRegistryClass {
  private agents = new Map<string, AgentConfig>();

  register(config: AgentConfig): void {
    if (this.agents.has(config.name)) {
      console.warn(
        `[AgentRegistry] Overwriting existing agent: "${config.name}"`,
      );
    }
    this.agents.set(config.name, {
      ...config,
      status: config.status ?? "idle",
    });
  }

  get(name: string): AgentConfig | undefined {
    return this.agents.get(name);
  }

  list(): AgentConfig[] {
    return Array.from(this.agents.values()).sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  }

  hasAny(): boolean {
    return this.agents.size > 0;
  }

  count(): number {
    return this.agents.size;
  }

  updateStatus(name: string, status: AgentConfig["status"]): boolean {
    const agent = this.agents.get(name);
    if (!agent) return false;
    agent.status = status;
    return true;
  }

  clear(): void {
    this.agents.clear();
  }
}

export const AgentRegistry = new AgentRegistryClass();
