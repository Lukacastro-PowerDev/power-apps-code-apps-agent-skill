import { readFileSync } from "node:fs";

const checks: Array<[string, string]> = [
  ["AGENTS.md", "Never invent SharePoint internal names"],
  ["skills/sharepoint/schema-and-internal-names.md", "MUST NOT invent columns"],
  ["tests/prompt-evaluations/rubric.md", "Passing threshold"],
  ["README.md", "verify against current official documentation"]
];

for (const [file, mustContain] of checks) {
  const content = readFileSync(file, "utf8");
  if (!content.includes(mustContain)) {
    console.error(`${file} missing required content: ${mustContain}`);
    process.exit(1);
  }
}

console.log("Test suite passed.");
