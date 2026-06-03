"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const BlobUIWrapper = dynamic(() => import("@/components/BlobUI/BlobUIWrapper"), {
  ssr: false,
});

/**
 * Landing page — J.A.R.V.I.S. logo reveal with BlobUI as entry point.
 */
export default function HomePage() {
  const [showBlob, setShowBlob] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    // Animate logo reveal
    const t1 = setTimeout(() => setRevealed(true), 500);
    const t2 = setTimeout(() => setShowBlob(true), 2000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (showBlob) {
    return (
      <div className="fixed inset-0">
        <BlobUIWrapper />

        {/* Overlay text */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-jarvis-neon via-jarvis-purple to-jarvis-neon bg-clip-text text-transparent animate-pulse">
            J.A.R.V.I.S.
          </h1>
          <p className="text-jarvis-muted text-sm mt-2 tracking-widest uppercase">
            Just A Rather Very Intelligent System
          </p>
        </div>

        {/* Bottom actions */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-10">
          <Link
            href="/dashboard"
            className="px-6 py-2.5 rounded-full bg-jarvis-neon text-white text-sm font-medium hover:bg-jarvis-accent-hover transition-all shadow-lg shadow-jarvis-neon/25"
          >
            Enter Command Center
          </Link>
        </div>

        {/* Voice prompt */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 pointer-events-none z-10">
          <p className="text-xs text-jarvis-muted tracking-widest">
            Say &ldquo;J.A.R.V.I.S.&rdquo; to activate
          </p>
        </div>
      </div>
    );
  }

  // Initial reveal animation
  return (
    <div className="min-h-screen bg-jarvis-base flex flex-col items-center justify-center overflow-hidden">
      <div
        className={`transition-all duration-1000 ${
          revealed
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight">
          <span className="bg-gradient-to-r from-jarvis-neon via-jarvis-purple to-transparent bg-clip-text text-transparent">
            J.A.R.V.I.S.
          </span>
        </h1>
        <p className="text-jarvis-muted text-sm mt-4 text-center tracking-widest uppercase">
          Initializing System
        </p>

        {/* Loading bar */}
        <div className="mt-8 w-48 h-0.5 mx-auto bg-jarvis-border rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-jarvis-neon to-jarvis-purple rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}
