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

  return (
    <div className="glass rounded-xl p-4 glass-hover">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`status-dot ${s.dot}`} />
          <div>
            <h3 className="text-sm font-semibold text-white">{name}</h3>
            <span className="text-xs text-jarvis-muted">{model}</span>
          </div>
        </div>
        {onToggle && (
          <button
            onClick={onToggle}
            className="text-xs px-2 py-1 rounded-md bg-jarvis-neon/20 text-jarvis-neon hover:bg-jarvis-neon/30 transition-colors"
          >
            {status === "active" ? "Deactivate" : "Activate"}
          </button>
        )}
      </div>

      {/* Description */}
      <p className="text-xs text-jarvis-muted mb-3 line-clamp-2">{description}</p>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {skills.slice(0, 4).map((skill) => (
          <span
            key={skill}
            className="text-[10px] px-1.5 py-0.5 rounded-full bg-jarvis-purple/10 text-jarvis-purple border border-jarvis-purple/20"
          >
            {skill}
          </span>
        ))}
        {skills.length > 4 && (
          <span className="text-[10px] text-jarvis-muted">
            +{skills.length - 4}
          </span>
        )}
      </div>

      {/* Footer */}
      {lastActive && (
        <div className="text-[10px] text-jarvis-muted">
          Last active: {lastActive}
        </div>
      )}
    </div>
  );
}
