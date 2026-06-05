"use client";

import React, { useState } from "react";

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
    status: "active" as const,
    skills: ["code-review", "security-scan", "linting"],
    lastActive: "30 min ago",
  },
  {
    name: "Sentinel",
    description: "Monitors system health, checks for anomalies, and sends alerts.",
    model: "gpt-4-turbo",
    status: "idle" as const,
    skills: ["monitoring", "alerting", "health-check"],
    lastActive: "2 min ago",
  },
];

const statusConfig = {
  active: { dot: "status-dot--active", label: "Active" },
  idle: { dot: "status-dot--idle", label: "Idle" },
  error: { dot: "status-dot--error", label: "Error" },
} as const;

/**
 * Agents page — Thread list style, like Perplexity threads.
 */
export default function AgentsPage() {
  const [search, setSearch] = useState("");

  const filtered = allAgents.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.description.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-white">Library</h1>
        <button className="px-4 py-2 rounded-lg bg-jarvis-neon text-white text-sm font-medium hover:bg-jarvis-accent-hover transition-colors">
          + New
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 bg-jarvis-surface border border-jarvis-border rounded-xl px-4 py-3 focus-within:border-jarvis-neon/50 focus-within:ring-1 focus-within:ring-jarvis-neon/20 transition-all">
        <span className="text-jarvis-muted flex-shrink-0">🔍</span>
        <input
          type="text"
          placeholder="Search agents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent text-sm text-jarvis-text placeholder-jarvis-muted outline-none"
        />
      </div>

      {/* Thread list */}
      <div className="rounded-xl bg-jarvis-surface border border-jarvis-border overflow-hidden">
        {filtered.map((agent) => {
          const s = statusConfig[agent.status];
          const initials = agent.name.slice(0, 2).toUpperCase();
          return (
            <div
              key={agent.name}
              className="flex items-start gap-3 px-4 py-3.5 border-b border-jarvis-border last:border-b-0 hover:bg-white/[0.02] transition-colors"
            >
              {/* Avatar (initials) */}
              <div className="w-9 h-9 rounded-full bg-jarvis-neon/15 flex items-center justify-center text-sm font-semibold text-jarvis-neon flex-shrink-0">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-medium text-jarvis-text">{agent.name}</span>
                  <span className={`status-dot ${s.dot}`} />
                  <span className="text-xs text-jarvis-muted">{s.label}</span>
                </div>
                <p className="text-xs text-jarvis-muted line-clamp-1 mb-1.5">{agent.description}</p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-jarvis-muted bg-jarvis-base px-1.5 py-0.5 rounded font-mono">
                    {agent.model}
                  </span>
                  {agent.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] text-jarvis-muted bg-jarvis-base px-1.5 py-0.5 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                  {agent.skills.length > 3 && (
                    <span className="text-[10px] text-jarvis-muted">
                      +{agent.skills.length - 3}
                    </span>
                  )}
                </div>
              </div>
              <span className="text-xs text-jarvis-muted flex-shrink-0 mt-1">
                {agent.lastActive}
              </span>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-jarvis-muted text-sm">No agents match your search</p>
        </div>
      )}
    </div>
  );
}
