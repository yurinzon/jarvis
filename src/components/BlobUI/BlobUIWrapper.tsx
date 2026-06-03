"use client";

import React, { useState, useCallback } from "react";
import dynamic from "next/dynamic";

// Dynamically import BlobSphere (requires Three.js client-side)
const BlobSphere = dynamic(() => import("./BlobSphere"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-jarvis-neon border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

const BlobController = dynamic(() => import("./BlobController"), {
  ssr: false,
});

/**
 * Full-page wrapper integrating BlobSphere + BlobController.
 */
export default function BlobUIWrapper() {
  const [color, setColor] = useState("#6366f1");
  const [size, setSize] = useState(1.0);
  const [sensitivity, setSensitivity] = useState(1.0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Simulate voice detection (toggle for demo)
  const toggleSpeaking = useCallback(() => {
    setIsSpeaking((prev) => !prev);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: `radial-gradient(ellipse at center, ${color}15 0%, transparent 70%)`,
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Blob sphere fills the page */}
      <div className="absolute inset-0">
        <BlobSphere
          color={color}
          size={size}
          sensitivity={sensitivity}
          isSpeaking={isSpeaking}
        />
      </div>

      {/* Controller */}
      <BlobController
        color={color}
        size={size}
        sensitivity={sensitivity}
        isSpeaking={isSpeaking}
        onColorChange={setColor}
        onSizeChange={setSize}
        onSensitivityChange={setSensitivity}
      />

      {/* Voice toggle (bottom center) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <button
          onClick={toggleSpeaking}
          className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
            isSpeaking
              ? "bg-jarvis-neon/30 text-jarvis-neon border border-jarvis-neon/50"
              : "glass text-jarvis-muted hover:text-white"
          }`}
        >
          {isSpeaking ? "🔊 Speaking..." : "🎤 Tap to Simulate Voice"}
        </button>
      </div>
    </div>
  );
}
