import { existsSync, readFileSync } from "node:fs";

function requiredObject(value: unknown, path: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`Expected object at ${path}`);
  }
  return value as Record<string, unknown>;
}

const args = process.argv.slice(2);
const inputIndex = args.indexOf("--input");
const inputPath = inputIndex >= 0 ? args[inputIndex + 1] : "";

if (!inputPath) {
  console.error("Usage: node dist/scripts/validate-report.js --input <path>");
  process.exit(1);
}
if (!existsSync(inputPath)) {
  console.error(`Report file not found: ${inputPath}`);
  process.exit(1);
}

const report = JSON.parse(readFileSync(inputPath, "utf8")) as unknown;
const root = requiredObject(report, "root");

for (const section of ["taskSummary", "evidenceUsed", "changes", "validation", "securityAccessibility"]) {
  requiredObject(root[section], section);
}

for (const arrSection of ["risksLimitations", "nextSteps"]) {
  if (!Array.isArray(root[arrSection])) {
    throw new Error(`Expected array at ${arrSection}`);
  }
}

console.log("Report validation OK.");
