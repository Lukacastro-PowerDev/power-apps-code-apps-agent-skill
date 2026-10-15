import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

type EvalCase = {
  id: string;
  prompt: string;
  required: string[];
  forbidden: string[];
};

type EvalResult = {
  id: string;
  passed: boolean;
  score: number;
  missing: string[];
  violations: string[];
};

function parseArg(name: string, fallback: string): string {
  const args = process.argv.slice(2);
  const idx = args.indexOf(name);
  return idx >= 0 && args[idx + 1] ? args[idx + 1] : fallback;
}

const fixturesDir = parseArg("--fixtures", "evals/fixtures");
const outputPath = parseArg("--output", "evals/results/latest-score.json");

const taskDir = join(fixturesDir, "tasks");
const responseDir = join(fixturesDir, "responses");
if (!existsSync(taskDir) || !existsSync(responseDir)) {
  console.error("Missing eval fixtures directories.");
  process.exit(1);
}

const taskFiles = readdirSync(taskDir).filter((f) => f.endsWith(".json")).sort();
const results: EvalResult[] = [];

for (const tf of taskFiles) {
  const task = JSON.parse(readFileSync(join(taskDir, tf), "utf8")) as EvalCase;
  const responsePath = join(responseDir, `${task.id}.md`);
  if (!existsSync(responsePath)) {
    results.push({ id: task.id, passed: false, score: 0, missing: ["response"], violations: [] });
    continue;
  }

  const response = readFileSync(responsePath, "utf8").toLowerCase();
  const missing = task.required.filter((term) => !response.includes(term.toLowerCase()));
  const violations = task.forbidden.filter((term) => response.includes(term.toLowerCase()));

  const maxPoints = task.required.length + task.forbidden.length;
  const achieved = (task.required.length - missing.length) + (task.forbidden.length - violations.length);
  const score = maxPoints > 0 ? Number(((achieved / maxPoints) * 100).toFixed(2)) : 100;

  results.push({
    id: task.id,
    passed: missing.length === 0 && violations.length === 0,
    score,
    missing,
    violations
  });
}

const finalScore = results.length > 0
  ? Number((results.reduce((acc, item) => acc + item.score, 0) / results.length).toFixed(2))
  : 0;

mkdirSync(join(outputPath, ".."), { recursive: true });
writeFileSync(outputPath, JSON.stringify({ generatedAt: new Date().toISOString(), finalScore, results }, null, 2) + "\n");

console.log(`Eval runner complete. Cases: ${results.length}. Final score: ${finalScore}`);
if (results.some((r) => !r.passed)) process.exit(1);
