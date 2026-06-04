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
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="glass rounded-xl p-3 sm:p-4"
        >
          <div className="text-[10px] sm:text-xs text-jarvis-muted mb-1">{stat.label}</div>
          <div className="text-lg sm:text-xl lg:text-2xl font-semibold text-white">{stat.value}</div>
          {stat.delta && (
            <div
              className={`text-[10px] sm:text-xs mt-1 ${
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
