import { existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const target = resolve(process.argv[2] ?? ".");

const requiredRoots = [
  "AGENTS.md",
  "README.md",
  "library",
  "skills",
  "templates",
  "examples",
  "scripts",
  "tests",
  "adapters",
  "skill-manifest.json"
];

const missing = requiredRoots.filter((p) => !existsSync(resolve(target, p)));
if (missing.length) {
  console.error("Missing required project entries:", missing);
  process.exit(1);
}

const top = readdirSync(target).filter((n: string) => !n.startsWith("."));
console.log("Project inspection OK. Top-level entries:", top.length);
