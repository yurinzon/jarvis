"use client";

import React from "react";
import Link from "next/link";

/**
 * Minimal landing page — redirect to dashboard or show search bar.
 */
export default function HomePage() {
  const suggestions = [
    { label: "What are my agents doing?", icon: "🤖" },
    { label: "Check system health", icon: "🩺" },
    { label: "Create new agent", icon: "✨" },
    { label: "Recent activity", icon: "📋" },
  ];

  return (
    <div className="min-h-screen bg-jarvis-base flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <div className="mb-10 text-center">
        <p className="text-xs text-jarvis-muted font-mono tracking-widest uppercase mb-2">
          J.A.R.V.I.S.
        </p>
        <h1 className="text-2xl sm:text-3xl font-light text-jarvis-text tracking-tight">
          Just A Rather Very Intelligent System
        </h1>
      </div>

      {/* Search bar */}
      <div className="w-full max-w-xl relative mb-8">
        <div className="flex items-center gap-3 bg-jarvis-surface border border-jarvis-border rounded-xl px-4 py-3 focus-within:border-jarvis-neon/50 focus-within:ring-1 focus-within:ring-jarvis-neon/20 transition-all">
          <span className="text-jarvis-muted flex-shrink-0">🔍</span>
          <input
            type="text"
            placeholder="Ask J.A.R.V.I.S. anything..."
            className="flex-1 bg-transparent text-sm text-jarvis-text placeholder-jarvis-muted outline-none"
            readOnly
          />
        </div>
      </div>

      {/* Suggested searches */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl w-full mb-10">
        {suggestions.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-jarvis-surface border border-jarvis-border hover:border-jarvis-neon/30 transition-all cursor-pointer"
          >
            <span className="text-base">{item.icon}</span>
            <span className="text-sm text-jarvis-muted">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Enter Command Center */}
      <Link
        href="/dashboard"
        className="px-5 py-2.5 rounded-lg text-sm text-jarvis-neon hover:text-jarvis-accent-hover border border-jarvis-border hover:border-jarvis-neon/30 transition-all"
      >
        Enter Command Center →
      </Link>
    </div>
  );
}
