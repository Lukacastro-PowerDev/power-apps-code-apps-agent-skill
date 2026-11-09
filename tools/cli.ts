#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

const [command, ...args] = process.argv.slice(2);
const commands: Record<string, string> = {
  inspect: "scripts/inspect-project.js",
  context: "tools/context-plan.js",
  validate: "scripts/validate-library.js",
  pack: "tools/pack-skill.js",
  report: "tools/validate-report.js"
};
if (!command || !commands[command]) {
  console.error("Usage: power-apps-skill <inspect|context|validate|pack|report> [options]");
  process.exit(2);
}
const result = spawnSync(process.execPath, [resolve("dist", commands[command]), ...args], { stdio: "inherit" });
process.exit(result.status ?? 1);
