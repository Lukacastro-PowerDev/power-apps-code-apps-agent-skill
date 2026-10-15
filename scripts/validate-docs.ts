import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

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

function ensureExists(path: string): void {
  if (!existsSync(path)) {
    console.error(`Missing required file: ${path}`);
    process.exit(1);
  }
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

function validateOfficialUrlHints(content: string, file: string): void {
  if (!content.includes("verify against current official documentation")) return;

  const urls = [...content.matchAll(/https?:\/\/[^\s)]+/g)].map((m) => m[0]);
  for (const url of urls) {
    const allowed = [
      "https://learn.microsoft.com/",
      "https://github.com/microsoft/",
      "https://github.com/"
    ];
    if (!allowed.some((prefix) => url.startsWith(prefix))) {
      console.error(`Non-official mutable URL in ${file}: ${url}`);
      process.exit(1);
    }
  }
}

ensureExists("skill-manifest.json");
ensureExists("domains/registry.json");
ensureExists("core/planning/execution-report.schema.json");

const markdownFiles = ["README.md", "AGENTS.md", "ARCHITECTURE.md", "SECURITY.md", "GOVERNANCE.md", "CONTRIBUTING.md", "CHANGELOG.md", "CODE_OF_CONDUCT.md"]
  .concat(walk("library"), walk("skills"), walk("templates"), walk("examples"), walk("tests"), walk("adapters"), walk("docs"), walk("core"))
  .filter((f) => f.endsWith(".md"));

for (const file of markdownFiles) {
  const content = readFileSync(file, "utf8");
  validateInternalLinks(file, content);
  validateOfficialUrlHints(content, file);
}

const manifest = JSON.parse(readFileSync("skill-manifest.json", "utf8")) as {
  mandatoryReads: string[];
  validationCommands: string[];
};
for (const p of manifest.mandatoryReads) ensureExists(p);
if (!manifest.validationCommands.includes("npm run validate")) {
  console.error("skill-manifest.json must include npm run validate command");
  process.exit(1);
}

const domainRegistry = JSON.parse(readFileSync("domains/registry.json", "utf8")) as { packs: Array<{ artifacts: string[] }> };
for (const pack of domainRegistry.packs) {
  for (const artifact of pack.artifacts) ensureExists(artifact);
}

console.log(`Docs validation OK. Markdown files checked: ${markdownFiles.length}`);
