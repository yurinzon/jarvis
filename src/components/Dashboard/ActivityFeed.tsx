"use client";

import React from "react";

interface ActivityItem {
  id: string;
  type: "agent" | "system" | "deployment" | "skill";
  message: string;
  timestamp: string;
  status?: "success" | "pending" | "error";
}

interface ActivityFeedProps {
  activities: ActivityItem[];
}

const activityIcons: Record<string, string> = {
  agent: "🤖",
  system: "⚙️",
  deployment: "🚀",
  skill: "🧩",
};

const statusColors: Record<string, string> = {
  success: "text-jarvis-green",
  pending: "text-jarvis-yellow",
  error: "text-jarvis-red",
};

/**
 * Perplexity thread/history style activity feed.
 * Simple icon + text + timestamp, no card borders — just border-b between items.
 */
export default function ActivityFeed({ activities }: ActivityFeedProps) {
  if (activities.length === 0) {
    return (
      <div className="rounded-xl bg-jarvis-surface border border-jarvis-border p-6 text-center">
        <p className="text-jarvis-muted text-sm">No recent activity</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-jarvis-surface border border-jarvis-border overflow-hidden">
      {activities.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-3 px-4 py-3 border-b border-jarvis-border last:border-b-0"
        >
          <span className="text-base flex-shrink-0">
            {activityIcons[item.type] || "📌"}
          </span>
          <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
            <span className="text-sm text-jarvis-text truncate">
              {item.message}
            </span>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs text-jarvis-muted">
                {item.timestamp}
              </span>
              {item.status && (
                <span
                  className={`text-xs ${
                    statusColors[item.status] || "text-jarvis-muted"
                  }`}
                >
                  {item.status === "success" ? "✓" : item.status === "pending" ? "○" : "✕"}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
