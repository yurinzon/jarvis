/**
 * OpenAgents Integration Bridge
 * 
 * Integrates the OpenAgents SDK (openagents-org/openagents) into J.A.R.V.I.S.
 * Provides agent definitions, skills/tools, and workspace connectivity.
 * 
 * Source: https://github.com/openagents-org/openagents
 */

export const OPENAGENTS_CONFIG = {
  name: "OpenAgents",
  version: "0.1.0",
  source: "https://github.com/openagents-org/openagents",
  description: "AI Agent Network SDK — agent definitions, skills/tools, workspace",
};

export interface OpenAgentDef {
  id: string;
  name: string;
  type: string;
  description: string;
  skills: string[];
  config: Record<string, unknown>;
}

/**
 * Importable agent definitions from OpenAgents YAML configs.
 * These are structured agent blueprints that J.A.R.V.I.S. can instantiate.
 */
export function getOpenAgentRegistry(): OpenAgentDef[] {
  return [
    {
      id: "router",
      name: "Router / Coordinator",
      type: "collaborator",
      description: "Receives research requests, delegates to specialists, compiles results",
      skills: ["task-delegation", "project-management", "event-triggering"],
      config: { max_iterations: 5, model: "auto" },
    },
    {
      id: "analyst",
      name: "Research Analyst",
      type: "collaborator",
      description: "Analyzes and synthesizes information, draws conclusions",
      skills: ["data-analysis", "synthesis", "report-generation"],
      config: { max_iterations: 3, model: "auto" },
    },
    {
      id: "web-searcher",
      name: "Web Searcher",
      type: "collaborator",
      description: "Searches the web for information using DuckDuckGo",
      skills: ["web-search", "data-collection", "scraping"],
      config: { max_iterations: 3, model: "auto" },
    },
    {
      id: "commentator",
      name: "News Commentator",
      type: "collaborator",
      description: "Sharp tech analyst providing commentary, analysis, and hot takes on news",
      skills: ["news-analysis", "commentary", "trend-analysis"],
      config: { model: "auto" },
    },
    {
      id: "founder",
      name: "Startup Founder",
      type: "collaborator",
      description: "Pitches startup ideas and defends them against investor questions",
      skills: ["pitching", "storytelling", "defense"],
      config: { model: "auto" },
    },
    {
      id: "investor",
      name: "Investor",
      type: "collaborator",
      description: "Grills startup pitches with tough questions and scrutiny",
      skills: ["due-diligence", "critique", "valuation"],
      config: { model: "auto" },
    },
    {
      id: "engineer",
      name: "Engineer",
      type: "collaborator",
      description: "Evaluates technical feasibility and implementation challenges",
      skills: ["technical-assessment", "architecture", "feasibility"],
      config: { model: "auto" },
    },
  ];
}

/**
 * Available mods (middleware modules) from OpenAgents SDK
 */
export function getOpenAgentMods(): string[] {
  return [
    "workspace.wiki",
    "workspace.project",
    "workspace.documents",
    "workspace.default",
    "workspace.shared_artifact",
    "workspace.messaging",
    "workspace.forum",
    "workspace.feed",
    "communication.simple_messaging",
    "coordination.task_delegation",
    "discovery.agent_discovery",
    "integrations.n8n",
    "core.shared_cache",
    "games.agentworld",
  ];
}

/**
 * Available tools/skills from OpenAgents SDK
 */
export function getOpenAgentTools(): string[] {
  return [
    "rss-fetcher",
    "exa-search",
    "custom-event",
    "web-search",
    "file-processor",
    "weather-report",
  ];
}
