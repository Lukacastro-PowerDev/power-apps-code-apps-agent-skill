import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const output = process.argv[2] ?? "dist/power-apps-code-apps-skill";
const root = process.cwd();
const excluded = new Set([".git", "node_modules", "dist", "coverage", ".env"]);
const copy = (source: string, target: string): void => {
  for (const name of readdirSync(source)) {
    if (excluded.has(name) || name.endsWith(".tgz")) continue;
    const from = join(source, name);
    const to = join(target, name);
    if (statSync(from).isDirectory()) { mkdirSync(to, { recursive: true }); copy(from, to); }
    else cpSync(from, to);
  }
};
if (existsSync(output)) rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });
copy(root, output);
console.log(`Packed skill at ${relative(root, output)}`);
