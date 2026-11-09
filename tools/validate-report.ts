import { readFileSync } from "node:fs";
const input = process.argv[process.argv.indexOf("--input") + 1];
if (!input) { console.error("Usage: report --input <path>"); process.exit(2); }
const report = JSON.parse(readFileSync(input, "utf8")) as Record<string, unknown>;
const required = ["version", "status", "objective", "evidence", "changes", "validation", "unknowns"];
const missing = required.filter((key) => !(key in report));
if (report.version !== "0.2") missing.push("version must be 0.2");
if (!["completed", "blocked", "partial", "failed"].includes(String(report.status))) missing.push("valid status");
if (missing.length) { console.error(`Invalid report: ${missing.join(", ")}`); process.exit(1); }
console.log("Execution report valid.");
