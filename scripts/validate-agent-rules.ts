import { readFileSync } from "node:fs";

const requiredInAgents = [
  "Never invent SharePoint internal names",
  "Validation commands",
  "Final report format",
  "Stop rules"
];

const agents = readFileSync("AGENTS.md", "utf8");
for (const rule of requiredInAgents) {
  if (!agents.includes(rule)) {
    console.error(`AGENTS.md missing required rule: ${rule}`);
    process.exit(1);
  }
}

console.log("Agent rules validation OK.");
