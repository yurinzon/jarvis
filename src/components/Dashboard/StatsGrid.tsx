"use client";

import React from "react";

interface StatItem {
  label: string;
  value: string | number;
  delta?: string;
  deltaPositive?: boolean;
}

interface StatsGridProps {
  stats: StatItem[];
}

/**
 * Minimal inline stats — just text with thin separators.
 */
export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="flex items-center gap-4 sm:gap-6 text-sm flex-wrap">
      {stats.map((stat, i) => (
        <React.Fragment key={stat.label}>
          {i > 0 && <div className="w-px h-4 bg-jarvis-border" />}
          <div className="flex items-center gap-2">
            <span className="text-jarvis-muted">{stat.label}</span>
            <span className="text-jarvis-text font-medium">
              {stat.value}
              {stat.delta && (
                <span
                  className={`ml-1 text-xs ${
                    stat.deltaPositive ? "text-jarvis-green" : "text-jarvis-red"
                  }`}
                >
                  {stat.deltaPositive ? "↑" : "↓"} {stat.delta}
                </span>
              )}
            </span>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
