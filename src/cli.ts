#!/usr/bin/env node
/**
 * cli.ts — J.A.R.V.I.S. CLI entry point.
 *
 * Usage:
 *   jarvis self-knowledge --render
 *   jarvis self-knowledge --refresh
 *   jarvis self-knowledge --check
 *   jarvis self-knowledge --check --strict
 */

import { runCLI } from "./self-knowledge/orchestrator.js";

function main() {
  const args = process.argv.slice(2);

  if (args[0] === "self-knowledge") {
    runCLI(args.slice(1));
  } else {
    console.log(`
J.A.R.V.I.S. — Just A Rather Very Intelligent System

Commands:
  self-knowledge   Manage the self-knowledge document
    --render       Preview the rendered doc
    --refresh      Write to disk
    --check        Soft drift check
    --check --strict  Strict drift check (CI)
`);
    process.exit(1);
  }
}

main();
