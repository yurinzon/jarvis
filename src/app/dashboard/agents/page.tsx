"use client";

import React from "react";
import AgentCard from "@/components/Dashboard/AgentCard";

/**
 * Agent Management page — view and control all registered agents.
 */
export default function AgentsPage() {
  const agents = [
    {
      name: "Researcher",
      description: "Deep research specialist. Searches the web, analyzes data, and produces comprehensive reports.",
      model: "claude-3-opus",
      status: "active" as const,
      skills: ["web-search", "analysis", "report-generation", "fact-checking"],
      lastActive: "Just now",
    },
    {
      name: "CodeReviewer",
      description: "Reviews pull requests for code quality, security, and best practices.",
      model: "gpt-4",
      status: "idle" as const,
      skills: ["code-review", "security-scan", "linting"],
      lastActive: "30 min ago",
    },
    {
      name: "Sentinel",
      description: "Monitors system health, checks for anomalies, and sends alerts.",
      model: "gpt-4-turbo",
      status: "active" as const,
      skills: ["monitoring", "alerting", "health-check"],
      lastActive: "2 min ago",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Agent Management</h1>
          <p className="text-sm text-jarvis-muted mt-1">
            Manage your J.A.R.V.I.S. agent fleet
          </p>
        </div>
        <button className="px-4 py-2 rounded-lg bg-jarvis-neon text-white text-sm font-medium hover:bg-jarvis-accent-hover transition-colors">
          + New Agent
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((agent) => (
          <AgentCard key={agent.name} {...agent} />
        ))}
      </div>
    </div>
  );
}
