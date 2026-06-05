"use client";

import React from "react";

interface AgentCardProps {
  name: string;
  description: string;
  model: string;
  status: "active" | "idle" | "error";
  skills: string[];
  lastActive?: string;
  onToggle?: () => void;
}

const statusConfig = {
  active: { dot: "status-dot--active", label: "Active" },
  idle: { dot: "status-dot--idle", label: "Idle" },
  error: { dot: "status-dot--error", label: "Error" },
} as const;

/**
 * Thread-list style agent card — minimal, compact.
 * Like Perplexity threads.
 */
export default function AgentCard({
  name,
  description,
  model,
  status,
  skills,
  lastActive,
  onToggle,
}: AgentCardProps) {
  const s = statusConfig[status];
  const initials = name.slice(0, 2).toUpperCase();

  return (
    <div className="flex items-start gap-3 px-4 py-3.5 border-b border-jarvis-border last:border-b-0 hover:bg-white/[0.02] transition-colors">
      {/* Avatar (initials) */}
      <div className="w-9 h-9 rounded-full bg-jarvis-neon/15 flex items-center justify-center text-sm font-semibold text-jarvis-neon flex-shrink-0">
        {initials}
      </div>

      <div className="flex-1 min-w-0">
        {/* Name + status */}
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-sm font-medium text-jarvis-text">{name}</span>
          <span className={`status-dot ${s.dot}`} />
          <span className="text-xs text-jarvis-muted">{s.label}</span>
        </div>

        {/* Description */}
        <p className="text-xs text-jarvis-muted line-clamp-1 mb-1.5">{description}</p>

        {/* Meta row: model + skills */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] text-jarvis-muted bg-jarvis-base px-1.5 py-0.5 rounded font-mono">
            {model}
          </span>
          {skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="text-[10px] text-jarvis-muted bg-jarvis-base px-1.5 py-0.5 rounded"
            >
              {skill}
            </span>
          ))}
          {skills.length > 3 && (
            <span className="text-[10px] text-jarvis-muted">
              +{skills.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Right column: last active + toggle */}
      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
        {lastActive && (
          <span className="text-xs text-jarvis-muted">{lastActive}</span>
        )}
        {onToggle && (
          <button
            onClick={onToggle}
            className="text-[10px] px-2 py-1 rounded bg-jarvis-neon/10 text-jarvis-neon hover:bg-jarvis-neon/20 transition-colors"
          >
            {status === "active" ? "Deactivate" : "Activate"}
          </button>
        )}
      </div>
    </div>
  );
}
