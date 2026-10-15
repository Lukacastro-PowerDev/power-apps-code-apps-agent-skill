import { readFileSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";

const checks: Array<[string, string]> = [
  ["AGENTS.md", "Never invent SharePoint internal names"],
  ["skill-manifest.json", "\"protocolVersion\""],
  ["core/evidence/evidence-model.md", "observed"],
  ["core/policies/security-modes.md", "regulated"],
  ["README.md", "verify against current official documentation"]
];

for (const [file, mustContain] of checks) {
  const content = readFileSync(file, "utf8");
  if (!content.includes(mustContain)) {
    console.error(`${file} missing required content: ${mustContain}`);
    process.exit(1);
  }
}

if (!existsSync("evals/fixtures/tasks/sharepoint-no-invented-columns.json")) {
  console.error("Missing eval fixture for sharepoint invented columns.");
  process.exit(1);
}

const contextPlan = spawnSync("node", ["dist/scripts/context-plan.js", "--task", "Implement SharePoint CRUD with validation"], { encoding: "utf8" });
if ((contextPlan.status ?? 1) !== 0) {
  console.error("Context plan command failed:", contextPlan.stderr || contextPlan.stdout);
  process.exit(1);
}

const parsedPlan = JSON.parse(contextPlan.stdout) as { classification: { datasource: string } };
if (parsedPlan.classification.datasource !== "sharepoint") {
  console.error("Context planner did not classify datasource as sharepoint.");
  process.exit(1);
}

const reportValidation = spawnSync("node", ["dist/scripts/validate-report.js", "--input", "templates/agent-report/final-report-template.json"], { encoding: "utf8" });
if ((reportValidation.status ?? 1) !== 0) {
  console.error("Report validation command failed:", reportValidation.stderr || reportValidation.stdout);
  process.exit(1);
}

console.log("Test suite passed.");
