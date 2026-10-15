import { existsSync, readFileSync } from "node:fs";

type IndexEntry = {
  id: string;
  category: string;
  tags: string[];
  relatedArtifacts: string[];
  validations: string[];
};

type ContextPlan = {
  task: string;
  classification: {
    taskType: "discovery" | "implementation" | "bugfix" | "refactor" | "security-review" | "architecture" | "unknown";
    datasource: "sharepoint" | "dataverse" | "mixed" | "unknown";
    risk: "standard" | "elevated" | "high";
  };
  requiredArtifacts: string[];
  requiredEvidence: string[];
  blockers: string[];
  validations: string[];
  confidence: number;
  unknowns: string[];
};

function parseTaskArg(): string {
  const args = process.argv.slice(2);
  const taskIndex = args.indexOf("--task");
  if (taskIndex >= 0 && args[taskIndex + 1]) return args[taskIndex + 1].trim();

  const fileIndex = args.indexOf("--task-file");
  if (fileIndex >= 0 && args[fileIndex + 1]) {
    const file = args[fileIndex + 1];
    if (!existsSync(file)) {
      console.error(`Task file not found: ${file}`);
      process.exit(1);
    }
    return readFileSync(file, "utf8").trim();
  }

  if (!process.stdin.isTTY) {
    return readFileSync(0, "utf8").trim();
  }

  console.error("Provide task text using --task, --task-file, or stdin.");
  process.exit(1);
}

function hasAny(text: string, terms: string[]): boolean {
  return terms.some((term) => text.includes(term));
}

function classifyTask(task: string): ContextPlan["classification"] {
  const t = task.toLowerCase();

  const datasource = hasAny(t, ["sharepoint"]) && hasAny(t, ["dataverse"])
    ? "mixed"
    : hasAny(t, ["sharepoint", "lista", "list", "internal name"])
      ? "sharepoint"
      : hasAny(t, ["dataverse", "table", "logical name"])
        ? "dataverse"
        : "unknown";

  const taskType = hasAny(t, ["security", "vulnerability", "auth", "authorization"])
    ? "security-review"
    : hasAny(t, ["discover", "discovery", "mapear", "inventário", "inventory"]) 
      ? "discovery"
      : hasAny(t, ["refactor", "refatorar"])
        ? "refactor"
        : hasAny(t, ["bug", "fix", "erro"])
          ? "bugfix"
          : hasAny(t, ["architecture", "arquitetura", "adr"])
            ? "architecture"
            : hasAny(t, ["implement", "implementar", "build", "criar", "crud", "feature"])
              ? "implementation"
              : "unknown";

  const risk = hasAny(t, ["pii", "personal data", "segurança", "security", "permission", "auth", "tenant"])
    ? "high"
    : hasAny(t, ["integration", "graph", "sql", "connector", "automate"])
      ? "elevated"
      : "standard";

  return { taskType, datasource, risk };
}

function planArtifacts(task: string, entries: IndexEntry[], classification: ContextPlan["classification"]): string[] {
  const taskWords = new Set(task.toLowerCase().split(/[^a-z0-9áéíóúãõç_-]+/i).filter(Boolean));

  const scored = entries.map((entry) => {
    let score = 0;
    for (const tag of entry.tags) {
      if (taskWords.has(tag.toLowerCase())) score += 2;
    }
    if (classification.datasource !== "unknown" && entry.tags.includes(classification.datasource)) score += 3;
    if (classification.taskType !== "unknown" && entry.category.includes(classification.taskType.split("-")[0])) score += 2;
    return { entry, score };
  }).sort((a, b) => b.score - a.score);

  const selected = scored.filter((s) => s.score > 0).slice(0, 8);
  const related = new Set<string>([
    "AGENTS.md",
    "library/context-loading-protocol.md",
    "library/decision-tree.md",
    "library/index.json"
  ]);

  for (const item of selected) {
    for (const art of item.entry.relatedArtifacts) related.add(art);
  }

  if (classification.datasource === "sharepoint") {
    related.add("skills/sharepoint/schema-and-internal-names.md");
  }
  if (classification.datasource === "dataverse") {
    related.add("skills/dataverse/entities-relationships-types.md");
  }
  if (classification.datasource === "mixed") {
    related.add("skills/discovery/sharepoint-schema-discovery.md");
    related.add("skills/discovery/dataverse-discovery.md");
  }

  return [...related];
}

function main(): void {
  const task = parseTaskArg();
  if (!task) {
    console.error("Task text cannot be empty.");
    process.exit(1);
  }

  const classification = classifyTask(task);
  const index = JSON.parse(readFileSync("library/index.json", "utf8")) as { entries: IndexEntry[] };
  const requiredArtifacts = planArtifacts(task, index.entries, classification);

  const requiredEvidence = [
    "Observed schema or generated contracts",
    "Authority level and security mode",
    "Documented assumptions and unknowns"
  ];
  if (classification.datasource === "sharepoint") requiredEvidence.push("SharePoint display/internal names mapping evidence");
  if (classification.datasource === "dataverse") requiredEvidence.push("Dataverse display/logical names mapping evidence");

  const blockers: string[] = [];
  const unknowns: string[] = [];

  if (classification.datasource === "unknown") {
    blockers.push("Datasource not identified (sharepoint/dataverse/mixed)");
    unknowns.push("Datasource");
  }
  if (classification.taskType === "unknown") {
    unknowns.push("Task type");
  }

  const validations = [
    "npm run validate",
    "npm test",
    "npm run evals"
  ];

  let confidence = 0.65;
  if (classification.datasource === "unknown") confidence -= 0.25;
  if (classification.taskType === "unknown") confidence -= 0.2;
  if (classification.risk === "high") confidence -= 0.05;
  if (confidence < 0) confidence = 0;

  const plan: ContextPlan = {
    task,
    classification,
    requiredArtifacts,
    requiredEvidence,
    blockers,
    validations,
    confidence: Number(confidence.toFixed(2)),
    unknowns
  };

  console.log(JSON.stringify(plan, null, 2));
}

main();
