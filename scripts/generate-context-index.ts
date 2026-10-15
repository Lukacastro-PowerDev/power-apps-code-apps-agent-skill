import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

function walk(dir: string, base = ""): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith(".")) continue;
    const full = join(dir, entry);
    const rel = base ? `${base}/${entry}` : entry;
    const st = statSync(full);
    if (st.isDirectory()) out.push(...walk(full, rel));
    else if (entry.endsWith(".md") || entry.endsWith(".json")) out.push(rel);
  }
  return out;
}

const files = ["library", "core", "domains", "skills", "templates", "examples", "adapters", "docs"].flatMap((d) => walk(d)).sort();
writeFileSync("library/context-index.generated.json", JSON.stringify({ files }, null, 2) + "\n");
console.log(`Generated deterministic context index with ${files.length} files.`);
