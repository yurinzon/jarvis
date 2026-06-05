"use client";

import React, { useState } from "react";

interface Deployment {
  id: string;
  name: string;
  version: string;
  status: "running" | "stopped" | "failed";
  uptime: string;
  lastDeployed: string;
}

const initialDeployments: Deployment[] = [
  {
    id: "d-001",
    name: "Researcher Agent",
    version: "1.2.0",
    status: "running",
    uptime: "72h 14m",
    lastDeployed: "2025-06-01",
  },
  {
    id: "d-002",
    name: "CodeReviewer Agent",
    version: "0.9.1",
    status: "running",
    uptime: "48h 02m",
    lastDeployed: "2025-06-02",
  },
  {
    id: "d-003",
    name: "Sentinel Monitor",
    version: "2.0.0",
    status: "running",
    uptime: "168h 00m",
    lastDeployed: "2025-05-27",
  },
  {
    id: "d-004",
    name: "Legacy Voice Module",
    version: "0.4.0",
    status: "stopped",
    uptime: "—",
    lastDeployed: "2025-05-15",
  },
];

const statusConfig: Record<string, { dot: string; label: string }> = {
  running: { dot: "status-dot--active", label: "Running" },
  stopped: { dot: "status-dot--idle", label: "Stopped" },
  failed: { dot: "status-dot--error", label: "Failed" },
};

/**
 * Deployments page — Perplexity "Library" style.
 * Empty state with "Your library is empty" + Notion-like clean rows.
 */
export default function DeploymentsPage() {
  const [search, setSearch] = useState("");
  const [deployments] = useState(initialDeployments);

  const filtered = deployments.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.version.includes(search),
  );

  const isEmpty = filtered.length === 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-white">Threads</h1>
        <button className="px-4 py-2 rounded-lg bg-jarvis-neon text-white text-sm font-medium hover:bg-jarvis-accent-hover transition-colors">
          + New
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 bg-jarvis-surface border border-jarvis-border rounded-xl px-4 py-3 focus-within:border-jarvis-neon/50 focus-within:ring-1 focus-within:ring-jarvis-neon/20 transition-all">
        <span className="text-jarvis-muted flex-shrink-0">🔍</span>
        <input
          type="text"
          placeholder="Search threads..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent text-sm text-jarvis-text placeholder-jarvis-muted outline-none"
        />
      </div>

      {isEmpty ? (
        /* ── Empty State ── */
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="text-3xl mb-4 text-jarvis-muted">📚</div>
          <h3 className="text-base font-medium text-jarvis-text mb-1">Your library is empty</h3>
          <p className="text-sm text-jarvis-muted mb-6">
            Deployments and threads will appear here
          </p>
          <button className="px-4 py-2 rounded-lg bg-jarvis-neon text-white text-sm font-medium hover:bg-jarvis-accent-hover transition-colors">
            + Create your first thread
          </button>
        </div>
      ) : (
        /* ── Notion-like table ── */
        <div className="rounded-xl bg-jarvis-surface border border-jarvis-border overflow-hidden">
          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-jarvis-border">
                  <th className="text-left px-4 py-3 text-jarvis-muted font-medium text-xs">Name</th>
                  <th className="text-left px-4 py-3 text-jarvis-muted font-medium text-xs">Version</th>
                  <th className="text-left px-4 py-3 text-jarvis-muted font-medium text-xs">Status</th>
                  <th className="text-left px-4 py-3 text-jarvis-muted font-medium text-xs">Uptime</th>
                  <th className="text-left px-4 py-3 text-jarvis-muted font-medium text-xs">Deployed</th>
                  <th className="text-right px-4 py-3 text-jarvis-muted font-medium text-xs">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((dep) => {
                  const s = statusConfig[dep.status];
                  return (
                    <tr
                      key={dep.id}
                      className="border-b border-jarvis-border last:border-b-0 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-4 py-3 text-jarvis-text font-medium">{dep.name}</td>
                      <td className="px-4 py-3">
                        <code className="text-xs text-jarvis-muted bg-jarvis-base px-1.5 py-0.5 rounded">
                          {dep.version}
                        </code>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className={`status-dot ${s.dot}`} />
                          <span className="text-xs text-jarvis-text">{s.label}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-jarvis-text">{dep.uptime}</td>
                      <td className="px-4 py-3 text-xs text-jarvis-muted">{dep.lastDeployed}</td>
                      <td className="px-4 py-3 text-right">
                        <button className="text-xs px-2 py-1 rounded bg-jarvis-base text-jarvis-muted hover:text-jarvis-text transition-colors">
                          Manage
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile list */}
          <div className="sm:hidden">
            {filtered.map((dep) => {
              const s = statusConfig[dep.status];
              return (
                <div
                  key={dep.id}
                  className="px-4 py-3 border-b border-jarvis-border last:border-b-0"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-jarvis-text font-medium">{dep.name}</span>
                    <span className={`status-dot ${s.dot}`} />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-jarvis-muted">
                    <code className="bg-jarvis-base px-1 py-0.5 rounded">{dep.version}</code>
                    <span>·</span>
                    <span>{s.label}</span>
                    <span>·</span>
                    <span>{dep.uptime}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
