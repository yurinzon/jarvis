"use client";

import React, { useState } from "react";
import AgentCard from "@/components/Dashboard/AgentCard";

const allAgents = [
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

/**
 * Agent Management page — view and control all registered agents.
 */
export default function AgentsPage() {
  const [search, setSearch] = useState("");

  const filtered = allAgents.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.description.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">Agent Management</h1>
          <p className="text-xs sm:text-sm text-jarvis-muted mt-0.5 sm:mt-1">
            Manage your J.A.R.V.I.S. agent fleet
          </p>
        </div>
        <button className="px-4 py-2 min-h-[44px] rounded-lg bg-jarvis-neon text-white text-sm font-medium hover:bg-jarvis-accent-hover transition-colors self-start sm:self-auto">
          + New Agent
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-jarvis-muted pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search agents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:max-w-xs pl-10 pr-4 py-2.5 min-h-[44px] rounded-xl text-sm bg-jarvis-surface border border-jarvis-border text-jarvis-text placeholder-jarvis-muted focus:outline-none focus:border-jarvis-neon/50 focus:ring-1 focus:ring-jarvis-neon/20 transition-all"
        />
      </div>

      {/* Agent grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {filtered.map((agent) => (
          <AgentCard key={agent.name} {...agent} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-jarvis-muted text-sm">No agents match your search</p>
        </div>
      )}
    </div>
  );
}
