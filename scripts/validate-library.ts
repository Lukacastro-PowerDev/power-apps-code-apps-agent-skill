import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

type Entry = {
  id: string;
  category: string;
  whenToUse: string[];
  prerequisites: string[];
  relatedArtifacts: string[];
  risks: string[];
  validations: string[];
  tags: string[];
};

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    if (name.startsWith(".")) continue;
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function validateInternalLinks(file: string, content: string): void {
  const linkMatches = [...content.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)];
  for (const m of linkMatches) {
    const href = m[1];
    if (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("#")) continue;
    const normalized = href.split("#")[0];
    if (!normalized) continue;
    const target = join(process.cwd(), normalized);
    if (!existsSync(target)) {
      console.error(`Broken internal link in ${file}: ${href}`);
      process.exit(1);
    }
  }
}

const raw = JSON.parse(readFileSync("library/index.json", "utf8")) as { entries: Entry[] };
const ids = new Set<string>();

for (const e of raw.entries) {
  for (const field of ["id", "category"]) {
    if (!(e as Record<string, unknown>)[field]) {
      console.error(`Entry missing field: ${field}`);
      process.exit(1);
    }
  }
  for (const arrField of ["whenToUse", "prerequisites", "relatedArtifacts", "risks", "validations", "tags"] as const) {
    if (!Array.isArray(e[arrField]) || e[arrField].length === 0) {
      console.error(`Entry ${e.id} missing non-empty array field: ${arrField}`);
      process.exit(1);
    }
  }
  if (ids.has(e.id)) {
    console.error(`Duplicate id: ${e.id}`);
    process.exit(1);
  }
  ids.add(e.id);

  for (const artifact of e.relatedArtifacts) {
    if (!existsSync(artifact)) {
      console.error(`Entry ${e.id} references missing artifact: ${artifact}`);
      process.exit(1);
    }
  }
}

const markdownFiles = ["README.md", "AGENTS.md", "ARCHITECTURE.md", "SECURITY.md", "GOVERNANCE.md", "CONTRIBUTING.md", "CHANGELOG.md", "CODE_OF_CONDUCT.md"]
  .concat(walk("library"), walk("skills"), walk("templates"), walk("examples"), walk("tests"), walk("adapters"), walk("docs"), walk("core"), walk(".agent"))
  .filter((f) => f.endsWith(".md"));
for (const file of markdownFiles) {
  const content = readFileSync(file, "utf8");
  validateInternalLinks(file, content);
}

const templateCodeFiles = walk("templates").filter((f) => f.endsWith(".ts") || f.endsWith(".tsx"));
for (const file of templateCodeFiles) {
  const content = readFileSync(file, "utf8");
  if (!content.includes("EXAMPLE ONLY") && !content.includes("TODO:")) {
    console.error(`Template code file must keep placeholder marker (EXAMPLE ONLY or TODO:): ${file}`);
    process.exit(1);
  }
}

const registry = JSON.parse(readFileSync("domains/registry.json", "utf8")) as { packs: Array<{ artifacts: string[] }> };
for (const pack of registry.packs) {
  for (const artifact of pack.artifacts) {
    if (!existsSync(artifact)) {
      console.error(`Domain registry references missing artifact: ${artifact}`);
      process.exit(1);
    }
  }
}

console.log(`Library validation OK with ${raw.entries.length} entries.`);
