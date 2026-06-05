"use client";

import React from "react";

/**
 * J.A.R.V.I.S. Discover — Perplexity-style dashboard.
 */
export default function DashboardPage() {
  const agentStatuses = [
    { name: "Researcher", status: "active" as const },
    { name: "CodeReviewer", status: "active" as const },
    { name: "Sentinel", status: "idle" as const },
  ];

  const suggestions = [
    {
      icon: "✨",
      title: "Create a new agent",
      desc: "Define role, skills, and model",
    },
    {
      icon: "🎤",
      title: "Voice commands",
      desc: "Activate voice loop for hands-free",
    },
    {
      icon: "🩺",
      title: "System diagnostics",
      desc: "Check health, logs, and performance",
    },
    {
      icon: "🔄",
      title: "Agent orchestration",
      desc: "Route tasks between agents",
    },
  ];

  const activities = [
    {
      icon: "🤖",
      text: "Researcher agent deployed and active",
      time: "2 min ago",
    },
    {
      icon: "⚙️",
      text: "Self-knowledge document refreshed",
      time: "15 min ago",
    },
    {
      icon: "🧩",
      text: "web-search skill registered",
      time: "1h ago",
    },
    {
      icon: "🚀",
      text: "Dashboard v2 deployed",
      time: "2h ago",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Search bar */}
      <div className="flex items-center gap-3 bg-jarvis-surface border border-jarvis-border rounded-xl px-4 py-3 focus-within:border-jarvis-neon/50 focus-within:ring-1 focus-within:ring-jarvis-neon/20 transition-all">
        <span className="text-jarvis-muted flex-shrink-0">🔍</span>
        <input
          type="text"
          placeholder="Ask J.A.R.V.I.S. anything..."
          className="flex-1 bg-transparent text-sm text-jarvis-text placeholder-jarvis-muted outline-none"
        />
      </div>

      {/* Stats row — minimal */}
      <div className="flex items-center gap-4 sm:gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-jarvis-muted">Agents</span>
          <span className="text-jarvis-text font-medium">3</span>
        </div>
        <div className="w-px h-4 bg-jarvis-border" />
        <div className="flex items-center gap-2">
          <span className="text-jarvis-muted">Skills</span>
          <span className="text-jarvis-text font-medium">12</span>
        </div>
        <div className="w-px h-4 bg-jarvis-border" />
        <div className="flex items-center gap-2">
          <span className="text-jarvis-muted">Uptime</span>
          <span className="text-jarvis-text font-medium">72h</span>
        </div>
        <div className="w-px h-4 bg-jarvis-border" />
        <div className="flex items-center gap-2">
          <span className="text-jarvis-muted">Status</span>
          <span className="text-jarvis-green font-medium">Optimal</span>
        </div>
      </div>

      {/* Agent Status */}
      <section>
        <h2 className="text-sm font-medium text-jarvis-text mb-3">Agent Status</h2>
        <div className="flex flex-wrap gap-3">
          {agentStatuses.map((agent) => (
            <div
              key={agent.name}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-jarvis-surface border border-jarvis-border"
            >
              <span
                className={`status-dot ${
                  agent.status === "active"
                    ? "status-dot--active"
                    : "status-dot--idle"
                }`}
              />
              <span className="text-sm text-jarvis-text">{agent.name}</span>
              <span className="text-xs text-jarvis-muted">
                {agent.status === "active" ? "Active" : "Idle"}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Suggested */}
      <section>
        <h2 className="text-sm font-medium text-jarvis-text mb-3">Suggested</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {suggestions.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-3 px-4 py-3 rounded-xl bg-jarvis-surface border border-jarvis-border hover:border-jarvis-neon/30 transition-all cursor-pointer"
            >
              <span className="text-base mt-0.5">{item.icon}</span>
              <div>
                <p className="text-sm text-jarvis-text font-medium">{item.title}</p>
                <p className="text-xs text-jarvis-muted mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Activity */}
      <section>
        <h2 className="text-sm font-medium text-jarvis-text mb-3">Activity</h2>
        <div className="rounded-xl bg-jarvis-surface border border-jarvis-border overflow-hidden">
          {activities.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-4 py-3 border-b border-jarvis-border last:border-b-0"
            >
              <span className="text-base flex-shrink-0">{item.icon}</span>
              <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
                <span className="text-sm text-jarvis-text truncate">{item.text}</span>
                <span className="text-xs text-jarvis-muted flex-shrink-0">{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
