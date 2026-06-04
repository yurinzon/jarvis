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

export default function ActivityFeed({ activities }: ActivityFeedProps) {
  if (activities.length === 0) {
    return (
      <div className="glass rounded-xl p-4 sm:p-6 text-center">
        <p className="text-jarvis-muted text-xs sm:text-sm">No recent activity</p>
      </div>
    );
  }

  return (
    <div className="glass rounded-xl p-3 sm:p-4">
      <h3 className="text-xs sm:text-sm font-semibold text-white mb-2 sm:mb-3">
        Real-Time Activity
      </h3>
      <div className="space-y-1 sm:space-y-2">
        {activities.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-3 py-2 border-b border-jarvis-border last:border-b-0"
          >
            <span className="text-base flex-shrink-0">
              {activityIcons[item.type] || "📌"}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-jarvis-text truncate">
                {item.message}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] text-jarvis-muted">
                  {item.timestamp}
                </span>
                {item.status && (
                  <span
                    className={`text-[10px] ${
                      statusColors[item.status] || "text-jarvis-muted"
                    }`}
                  >
                    {item.status}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
