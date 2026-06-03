"use client";

import React from "react";
import StatsGrid from "@/components/Dashboard/StatsGrid";
import ActivityFeed from "@/components/Dashboard/ActivityFeed";

/**
 * J.A.R.V.I.S. Main Dashboard — Command Center
 */
export default function DashboardPage() {
  const stats = [
    { label: "Active Agents", value: 3, delta: "+1", deltaPositive: true },
    { label: "Skills Loaded", value: 12, delta: "+2", deltaPositive: true },
    { label: "Uptime", value: "72h", delta: undefined },
    { label: "System Status", value: "Optimal", delta: undefined },
  ];

  const activities = [
    {
      id: "1",
      type: "agent" as const,
      message: "Researcher agent deployed and active",
      timestamp: "2 min ago",
      status: "success" as const,
    },
    {
      id: "2",
      type: "system" as const,
      message: "Self-knowledge document refreshed",
      timestamp: "15 min ago",
      status: "success" as const,
    },
    {
      id: "3",
      type: "skill" as const,
      message: "web-search skill registered",
      timestamp: "1h ago",
      status: "success" as const,
    },
    {
      id: "4",
      type: "deployment" as const,
      message: "Dashboard v2 deployed",
      timestamp: "2h ago",
      status: "success" as const,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Command Center</h1>
        <p className="text-sm text-jarvis-muted mt-1">
          J.A.R.V.I.S. System Status — All systems nominal
        </p>
      </div>

      {/* Stats Grid */}
      <StatsGrid stats={stats} />

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <ActivityFeed activities={activities} />
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-white">Quick Actions</h3>
          <div className="glass rounded-xl p-4 space-y-2">
            {[
              { label: "Deploy New Agent", icon: "🤖" },
              { label: "Run Self-Knowledge Sync", icon: "🔄" },
              { label: "View System Logs", icon: "📋" },
              { label: "Configure Integrations", icon: "🔗" },
            ].map((action) => (
              <button
                key={action.label}
                className="w-full text-left px-3 py-2 rounded-lg text-sm text-jarvis-text hover:bg-jarvis-card transition-colors flex items-center gap-2"
              >
                <span>{action.icon}</span>
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
