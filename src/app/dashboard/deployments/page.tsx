"use client";

import React from "react";

interface Deployment {
  id: string;
  name: string;
  version: string;
  status: "running" | "stopped" | "failed";
  uptime: string;
  lastDeployed: string;
}

const deployments: Deployment[] = [
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

export default function DeploymentsPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">Deployments</h1>
          <p className="text-xs sm:text-sm text-jarvis-muted mt-0.5 sm:mt-1">
            Manage running services and rollbacks
          </p>
        </div>
        <button className="px-4 py-2 min-h-[44px] rounded-lg bg-jarvis-neon text-white text-sm font-medium hover:bg-jarvis-accent-hover transition-colors self-start sm:self-auto">
          + New Deployment
        </button>
      </div>

      {/* ── Desktop Table (hidden on mobile) ── */}
      <div className="hidden sm:block glass rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-jarvis-border">
                <th className="text-left px-4 py-3 text-jarvis-muted font-medium">
                  Name
                </th>
                <th className="text-left px-4 py-3 text-jarvis-muted font-medium">
                  Version
                </th>
                <th className="text-left px-4 py-3 text-jarvis-muted font-medium">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-jarvis-muted font-medium">
                  Uptime
                </th>
                <th className="text-left px-4 py-3 text-jarvis-muted font-medium">
                  Last Deployed
                </th>
                <th className="text-right px-4 py-3 text-jarvis-muted font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {deployments.map((dep) => {
                const s = statusConfig[dep.status];
                return (
                  <tr
                    key={dep.id}
                    className="border-b border-jarvis-border last:border-b-0 hover:bg-jarvis-card transition-colors"
                  >
                    <td className="px-4 py-3 text-white font-medium">
                      {dep.name}
                    </td>
                    <td className="px-4 py-3 text-jarvis-muted">
                      <code className="text-xs bg-jarvis-card px-1.5 py-0.5 rounded">
                        {dep.version}
                      </code>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className={`status-dot ${s.dot}`} />
                        <span className="text-jarvis-text">{s.label}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-jarvis-text">{dep.uptime}</td>
                    <td className="px-4 py-3 text-jarvis-muted">
                      {dep.lastDeployed}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="text-xs px-2 py-1 rounded bg-jarvis-card text-jarvis-muted hover:text-white hover:bg-jarvis-border transition-colors">
                        Manage
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Mobile Card View (hidden on desktop) ── */}
      <div className="sm:hidden space-y-3">
        {deployments.map((dep) => {
          const s = statusConfig[dep.status];
          return (
            <div
              key={dep.id}
              className="glass rounded-xl p-3 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-white">
                  {dep.name}
                </span>
                <span className={`status-dot ${s.dot}`} />
              </div>
              <div className="flex items-center gap-2 text-xs text-jarvis-muted">
                <span>Version:</span>
                <code className="text-xs bg-jarvis-card px-1.5 py-0.5 rounded text-jarvis-text">
                  {dep.version}
                </code>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-jarvis-muted">Status:</span>
                <span className="text-jarvis-text">{s.label}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-jarvis-muted">Uptime:</span>
                <span className="text-jarvis-text">{dep.uptime}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-jarvis-muted">Last Deployed:</span>
                <span className="text-jarvis-text">{dep.lastDeployed}</span>
              </div>
              <button className="w-full mt-1 py-2 min-h-[44px] rounded-lg text-xs text-jarvis-neon bg-jarvis-neon/10 hover:bg-jarvis-neon/20 transition-colors">
                ▲ More Details
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
