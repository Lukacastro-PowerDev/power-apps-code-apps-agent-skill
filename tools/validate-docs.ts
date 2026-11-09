import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

function walk(dir: string, files: string[] = []): string[] {
  if (!existsSync(dir)) return files;
  for (const name of readdirSync(dir)) {
    if (name.startsWith(".") || name === "node_modules" || name === "dist") continue;
    const path = join(dir, name);
    statSync(path).isDirectory() ? walk(path, files) : files.push(path);
  }
  return files;
}
const files = walk(".").filter((file) => file.endsWith(".md") || file.endsWith(".json") || file.endsWith(".ts") || file.endsWith(".tsx"));
const failures: string[] = [];
for (const file of files) {
  const content = readFileSync(file, "utf8");
  for (const match of content.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
    const target = match[1].split("#")[0];
    if (!target || target.startsWith("http://") || target.startsWith("https://")) continue;
    if (!existsSync(join(".", target))) failures.push(`${file}: broken link ${target}`);
  }
  if ((file.includes("examples/") || file.includes("templates/")) && !content.includes("EXAMPLE ONLY") && (file.endsWith(".json") || file.endsWith(".ts") || file.endsWith(".tsx"))) {
    failures.push(`${file}: example/template must contain EXAMPLE ONLY`);
  }
  const isValidatorImplementation = file === "tools/validate-docs.ts" || file === "scripts/validate-schema.ts" || file === "evals/run-evals.ts";
  if (!isValidatorImplementation && /(password|client_secret|connectionString|Bearer\s+[A-Za-z0-9._-]{12,})/i.test(content)) failures.push(`${file}: possible secret pattern`);
}
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`Documentation checks OK (${files.length} files).`);
