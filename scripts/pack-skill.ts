import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const includeRoots = [
  "AGENTS.md",
  "README.md",
  "ARCHITECTURE.md",
  "SECURITY.md",
  "GOVERNANCE.md",
  "CONTRIBUTING.md",
  "CHANGELOG.md",
  "skill-manifest.json",
  "power-apps-skill.config.example.yaml",
  "power-apps-skill.config.example.json",
  "core",
  "library",
  "domains",
  "registry",
  "skills",
  "templates",
  "adapters",
  "docs",
  "evals"
];

function collectFiles(root: string, out: string[] = []): string[] {
  const st = statSync(root);
  if (st.isDirectory()) {
    for (const name of readdirSync(root)) {
      if (["node_modules", ".git", "dist"].includes(name)) continue;
      collectFiles(join(root, name), out);
    }
  } else {
    out.push(root);
  }
  return out;
}

const manifest = JSON.parse(readFileSync("skill-manifest.json", "utf8")) as { version: string };
const outBase = resolve("dist/pack");
const outDir = resolve(outBase, `power-apps-code-apps-agent-skill-v${manifest.version}`);

mkdirSync(outBase, { recursive: true });
if (existsSync(outDir)) rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

for (const item of includeRoots) {
  if (!existsSync(item)) continue;
  cpSync(item, join(outDir, item), { recursive: true });
}

const includedFiles = includeRoots.flatMap((root) => (existsSync(root) ? collectFiles(root) : [])).sort();
writeFileSync(join(outDir, "pack-manifest.json"), JSON.stringify({ version: manifest.version, includedFiles }, null, 2) + "\n");

console.log(`Pack completed: ${outDir}`);
console.log(`Included files: ${includedFiles.length}`);
