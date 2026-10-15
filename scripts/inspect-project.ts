import { readdirSync, existsSync } from "node:fs";

const requiredRoots = ["AGENTS.md", "README.md", "library", "skills", "templates", "examples", "scripts", "tests", "adapters"];
const missing = requiredRoots.filter((p) => !existsSync(p));

if (missing.length) {
  console.error("Missing required project entries:", missing);
  process.exit(1);
}

const top = readdirSync(".").filter((n: string) => !n.startsWith("."));
console.log("Project inspection OK. Top-level entries:", top.length);
