import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

type Entry = { id: string; relatedArtifacts: string[]; validations: string[]; tags: string[]; prerequisites: string[] };
type Index = { entries: Entry[] };

const args = process.argv.slice(2);
const taskFlag = args.indexOf("--task");
let task = taskFlag >= 0 ? args.slice(taskFlag + 1).join(" ") : "";
const fileFlag = args.indexOf("--file");
if (fileFlag >= 0 && args[fileFlag + 1]) task = readFileSync(resolve(args[fileFlag + 1]), "utf8").trim();
if (!task && !process.stdin.isTTY) task = readFileSync(0, "utf8").trim();
if (!task) {
  console.error("Usage: context-plan --task <text> [--output <path>]");
  process.exit(2);
}

const index = JSON.parse(readFileSync("library/index.json", "utf8")) as Index;
const normalized = task.toLowerCase();
const rules: Array<[string, string[]]> = [
  ["sharepoint", ["sharepoint", "list", "internal name", "column"]],
  ["dataverse", ["dataverse", "logical name", "table", "choice", "lookup"]],
  ["security", ["security", "permission", "authorization", "secret", "role"]],
  ["ui", ["ui", "form", "table", "dialog", "accessibility", "wcag", "loading", "empty", "error"]],
  ["architecture", ["architecture", "module", "react", "typescript"]],
  ["quality", ["test", "build", "quality", "validation", "report"]]
];
const tags = rules.filter(([, words]) => words.some((word) => normalized.includes(word))).map(([tag]) => tag);
if (tags.length === 0) tags.push("discovery");
const selected = index.entries.filter((entry) => entry.tags.some((tag) => tags.includes(tag)));
const documents = [...new Set(selected.flatMap((entry) => entry.relatedArtifacts))];
const validations = [...new Set(selected.flatMap((entry) => entry.validations))];
const requiredEvidence = tags.includes("sharepoint")
  ? ["Observed SharePoint list schema with internal names", "Generated service/model or documented project contract"]
  : tags.includes("dataverse")
    ? ["Observed Dataverse table metadata with logical names", "Generated service/model or documented project contract"]
    : ["Task-specific project evidence and current official documentation where behavior is mutable"];
const unknowns = tags.includes("sharepoint") && !/schema|internal name|column/.test(normalized)
  ? ["Exact SharePoint list and field schema is not supplied by the task"]
  : [];
const blocks = unknowns.length > 0 ? ["Do not implement datasource fields until required evidence is collected"] : [];
const confidence = tags.length >= 2 && unknowns.length === 0 ? "high" : unknowns.length ? "low" : "medium";
const output = { task, tags, documents, requiredEvidence, blocks, validations, confidence, unknowns };
const outputFlag = args.indexOf("--output");
if (outputFlag >= 0 && args[outputFlag + 1]) {
  writeFileSync(resolve(args[outputFlag + 1]), `${JSON.stringify(output, null, 2)}\n`);
} else {
  console.log(JSON.stringify(output, null, 2));
}
