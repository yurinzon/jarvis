"use client";

import React, { useState, useCallback } from "react";

interface BlobControllerProps {
  color: string;
  size: number;
  sensitivity: number;
  isSpeaking: boolean;
  onColorChange: (color: string) => void;
  onSizeChange: (size: number) => void;
  onSensitivityChange: (sensitivity: number) => void;
}

const PRESET_COLORS = [
  { label: "Neon Blue", value: "#6366f1" },
  { label: "Purple", value: "#a855f7" },
  { label: "Cyan", value: "#06b6d4" },
  { label: "Emerald", value: "#10b981" },
  { label: "Pink", value: "#ec4899" },
  { label: "Orange", value: "#f97316" },
];

export default function BlobController({
  color,
  size,
  sensitivity,
  isSpeaking,
  onColorChange,
  onSizeChange,
  onSensitivityChange,
}: BlobControllerProps) {
  const [showPanel, setShowPanel] = useState(false);
  const [position, setPosition] = useState({ x: 16, y: 16 });
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setDragging(true);
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    },
    [position],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!dragging) return;
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    },
    [dragging, dragOffset],
  );

  const handleMouseUp = useCallback(() => {
    setDragging(false);
  }, []);

  return (
    <>
      {/* ── Desktop: draggable floating panel (hidden on mobile) ── */}
      <div
        className="fixed z-50 hidden sm:block"
        style={{ left: position.x, right: "auto", top: position.y }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Toggle button */}
        <button
          onMouseDown={handleMouseDown}
          onClick={() => setShowPanel(!showPanel)}
          className="w-10 h-10 rounded-xl glass flex items-center justify-center cursor-grab active:cursor-grabbing hover:bg-jarvis-card/50 transition-colors"
          title="Blob Controls"
        >
          <span className="text-sm">⚙️</span>
        </button>

        {/* Panel */}
        {showPanel && (
          <div className="absolute left-12 top-0 w-56 glass rounded-xl p-4 space-y-3">
            {/* Voice indicator */}
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  isSpeaking
                    ? "bg-jarvis-green animate-pulse"
                    : "bg-jarvis-muted"
                }`}
              />
              <span className="text-xs text-jarvis-muted">
                {isSpeaking ? "Voice Active" : "Listening"}
              </span>
            </div>

            {/* Color presets */}
            <div>
              <label className="text-[10px] text-jarvis-muted uppercase tracking-wider mb-1.5 block">
                Color
              </label>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_COLORS.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => onColorChange(c.value)}
                    className={`w-6 h-6 rounded-full border-2 transition-all ${
                      color === c.value
                        ? "border-white scale-110"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: c.value }}
                    title={c.label}
                  />
                ))}
              </div>
            </div>

            {/* Size slider */}
            <div>
              <label className="text-[10px] text-jarvis-muted uppercase tracking-wider mb-1 block">
                Size: {size.toFixed(1)}
              </label>
              <input
                type="range"
                min={0.5}
                max={2.0}
                step={0.1}
                value={size}
                onChange={(e) => onSizeChange(parseFloat(e.target.value))}
                className="w-full accent-jarvis-neon"
              />
            </div>

            {/* Sensitivity slider */}
            <div>
              <label className="text-[10px] text-jarvis-muted uppercase tracking-wider mb-1 block">
                Sensitivity: {sensitivity.toFixed(1)}
              </label>
              <input
                type="range"
                min={0.2}
                max={2.0}
                step={0.1}
                value={sensitivity}
                onChange={(e) =>
                  onSensitivityChange(parseFloat(e.target.value))
                }
                className="w-full accent-jarvis-neon"
              />
            </div>
          </div>
        )}
      </div>

      {/* ── Mobile: bottom sheet toggle button ── */}
      <div className="fixed bottom-6 right-4 z-50 sm:hidden">
        <button
          onClick={() => setShowPanel(!showPanel)}
          className="w-12 h-12 rounded-full glass flex items-center justify-center shadow-lg hover:bg-jarvis-card/50 transition-colors"
          title="Blob Controls"
        >
          <span className="text-lg">⚙️</span>
        </button>
      </div>

      {/* ── Mobile: bottom sheet panel ── */}
      {showPanel && (
        <div className="fixed inset-x-0 bottom-0 z-50 sm:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setShowPanel(false)}
          />
          {/* Sheet */}
          <div className="relative glass rounded-t-2xl p-5 pb-8 space-y-4">
            {/* Handle */}
            <div className="w-10 h-1 rounded-full bg-jarvis-border mx-auto mb-3" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isSpeaking
                      ? "bg-jarvis-green animate-pulse"
                      : "bg-jarvis-muted"
                  }`}
                />
                <span className="text-xs text-jarvis-muted">
                  {isSpeaking ? "Voice Active" : "Listening"}
                </span>
              </div>
              <button
                onClick={() => setShowPanel(false)}
                className="text-jarvis-muted hover:text-white w-8 h-8 flex items-center justify-center"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Color presets */}
            <div>
              <label className="text-[10px] text-jarvis-muted uppercase tracking-wider mb-2 block">
                Color
              </label>
              <div className="flex flex-wrap gap-2">
                {PRESET_COLORS.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => onColorChange(c.value)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      color === c.value
                        ? "border-white scale-110"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: c.value }}
                    title={c.label}
                  />
                ))}
              </div>
            </div>

            {/* Size slider */}
            <div>
              <label className="text-[10px] text-jarvis-muted uppercase tracking-wider mb-1 block">
                Size: {size.toFixed(1)}
              </label>
              <input
                type="range"
                min={0.5}
                max={2.0}
                step={0.1}
                value={size}
                onChange={(e) => onSizeChange(parseFloat(e.target.value))}
                className="w-full accent-jarvis-neon h-6"
              />
            </div>

            {/* Sensitivity slider */}
            <div>
              <label className="text-[10px] text-jarvis-muted uppercase tracking-wider mb-1 block">
                Sensitivity: {sensitivity.toFixed(1)}
              </label>
              <input
                type="range"
                min={0.2}
                max={2.0}
                step={0.1}
                value={sensitivity}
                onChange={(e) => onSensitivityChange(parseFloat(e.target.value))}
                className="w-full accent-jarvis-neon h-6"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
