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
    <div
      className="fixed z-50"
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
  );
}
