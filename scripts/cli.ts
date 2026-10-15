#!/usr/bin/env node
import { spawnSync } from "node:child_process";

function run(command: string, args: string[]): number {
  const res = spawnSync(command, args, { stdio: "inherit" });
  return res.status ?? 1;
}

function runNodeScript(script: string, args: string[] = []): number {
  return run("node", [script, ...args]);
}

const [cmd, ...rest] = process.argv.slice(2);

switch (cmd) {
  case "inspect": {
    const target = rest[0] ?? ".";
    process.exit(runNodeScript("dist/scripts/inspect-project.js", [target]));
  }
  case "context": {
    process.exit(runNodeScript("dist/scripts/context-plan.js", rest));
  }
  case "validate": {
    const commands: Array<[string, string[]]> = [
      ["node", ["dist/scripts/inspect-project.js", "."]],
      ["node", ["dist/scripts/validate-agent-rules.js"]],
      ["node", ["dist/scripts/validate-library.js"]],
      ["node", ["dist/scripts/validate-schema.js"]],
      ["node", ["dist/scripts/validate-docs.js"]],
      ["node", ["dist/scripts/quality-gates.js", "--mode", "standard"]],
      ["node", ["dist/scripts/generate-context-index.js"]]
    ];

    for (const [command, args] of commands) {
      const code = run(command, args);
      if (code !== 0) process.exit(code);
    }
    process.exit(0);
  }
  case "pack": {
    process.exit(runNodeScript("dist/scripts/pack-skill.js", rest));
  }
  case "report": {
    process.exit(runNodeScript("dist/scripts/validate-report.js", rest));
  }
  default: {
    console.log("Usage: node dist/scripts/cli.js <inspect|context|validate|pack|report> [options]");
    process.exit(cmd ? 1 : 0);
  }
}
