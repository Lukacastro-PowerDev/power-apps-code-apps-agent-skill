import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const inputFlag = process.argv.indexOf("--input");
const input = inputFlag >= 0 ? process.argv[inputFlag + 1] : "evals/fixtures/golden";
const files: string[] = [];
const walk = (dir: string): void => {
  if (!existsSync(dir)) return;
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    statSync(path).isDirectory() ? walk(path) : files.push(path);
  }
};
walk(input);
const text = files.map((file) => readFileSync(file, "utf8")).join("\n");
const rules = [
  ["no-invented-sharepoint-fields", !/inventedColumn|UnknownSharePointField/i.test(text)],
  ["display-vs-internal-name", !/displayName\s*===\s*internalName/i.test(text)],
  ["no-direct-fetch-axios", !/\b(fetch|axios)\s*\(/i.test(text)],
  ["no-secrets", !/(client_secret|password\s*[:=]\s*["'][^"']+)/i.test(text)],
  ["ui-states", /loading|empty|error/i.test(text)],
  ["typed-special-fields", /choice|lookup|person/i.test(text)],
  ["least-privilege", /least privilege|read-only|authorization/i.test(text)],
  ["accessibility", /aria-|wcag|accessib/i.test(text)],
  ["build-test-report", /build|test|report/i.test(text)]
] as const;
const passed = rules.filter(([, ok]) => ok).length;
const result = { input, score: Math.round((passed / rules.length) * 100), passed, total: rules.length, rules: Object.fromEntries(rules) };
console.log(JSON.stringify(result, null, 2));
if (passed !== rules.length) process.exit(1);
