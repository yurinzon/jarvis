/**
 * voice.ts — Generator for the voice loop AUTO block.
 *
 * Describes the voice loop architecture based on `src/voice/` contents.
 * Fail-safe: returns a placeholder if voice directory doesn't exist.
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VOICE_DIR = path.resolve(__dirname, "../../voice");

/**
 * Describe the voice loop architecture.
 * The voice loop is a real-time audio pipeline for speech input/output.
 */
export function renderVoice(): string {
  try {
    if (!fs.existsSync(VOICE_DIR)) {
      return [
        "<!-- No voice directory found. Create `src/voice/` to integrate the voice loop. -->",
        "",
        "_Voice loop not configured._",
      ].join("\n");
    }

    const entries = fs.readdirSync(VOICE_DIR, { withFileTypes: true });
    const files = entries
      .filter((e) => e.isFile() && /\.(ts|js)$/.test(e.name))
      .map((e) => e.name)
      .sort();

    const lines: string[] = [
      "## Voice Loop Architecture",
      "",
    ];

    if (files.length === 0) {
      lines.push("Voice directory exists but contains no source files.");
      lines.push("");
      lines.push("The voice loop provides:");
      lines.push("- Speech-to-text (STT) input processing");
      lines.push("- Text-to-speech (TTS) output generation");
      lines.push("- Real-time audio streaming");
      lines.push("- Wake word detection");
      lines.push("");
      return lines.join("\n");
    }

    lines.push("The voice loop is composed of the following modules:");
    lines.push("");
    for (const file of files) {
      lines.push(`- \`src/voice/${file}\` — Voice processing module`);
    }
    lines.push("");
    lines.push("### Architecture");
    lines.push("");
    lines.push("```");
    lines.push("[Audio Input] → [STT] → [LLM Processing] → [TTS] → [Audio Output]");
    lines.push("     ↑                                            ↓");
    lines.push("     └──────── [Voice Activity Detector] ←─────────┘");
    lines.push("```");
    lines.push("");

    return lines.join("\n");
  } catch {
    return ["_Unable to inspect voice directory._"].join("\n");
  }
}
