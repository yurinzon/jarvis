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

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="glass rounded-xl p-4"
        >
          <div className="text-xs text-jarvis-muted mb-1">{stat.label}</div>
          <div className="text-2xl font-semibold text-white">{stat.value}</div>
          {stat.delta && (
            <div
              className={`text-xs mt-1 ${
                stat.deltaPositive
                  ? "text-jarvis-green"
                  : "text-jarvis-red"
              }`}
            >
              {stat.deltaPositive ? "↑" : "↓"} {stat.delta}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
