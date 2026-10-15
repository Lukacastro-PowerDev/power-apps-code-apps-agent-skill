import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

type Severity = "warn" | "error";

type Finding = {
  file: string;
  message: string;
  severity: Severity;
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

function scanFiles(files: string[], mode: string): Finding[] {
  const findings: Finding[] = [];

  const secretPatterns: RegExp[] = [
    /AKIA[0-9A-Z]{16}/,
    /-----BEGIN (RSA|EC|OPENSSH) PRIVATE KEY-----/,
    /(?:password|passwd|token|secret)\s*[:=]\s*['\"]?[A-Za-z0-9_\-]{8,}/i,
    /xox[baprs]-[A-Za-z0-9-]+/
  ];

  for (const file of files) {
    const content = readFileSync(file, "utf8");

    for (const pattern of secretPatterns) {
      if (pattern.test(content)) {
        findings.push({ file, message: "Potential secret detected", severity: "error" });
      }
    }

    if (/(https:\/\/[a-z0-9-]+\.sharepoint\.com\/sites\/)/i.test(content) && !content.includes("EXAMPLE ONLY")) {
      findings.push({ file, message: "Tenant-bound URL found outside EXAMPLE ONLY context", severity: "error" });
    }

    if ((file.includes("sharepoint") || file.includes("SharePoint")) && /\b(fetch|axios)\b/.test(content)) {
      findings.push({ file, message: "Direct fetch/axios detected in SharePoint-focused artifact", severity: "error" });
    }
  }

  if (mode === "strict" || mode === "regulated") {
    const readmes = files.filter((f) => f.startsWith("examples/") && f.endsWith("README.md"));
    for (const file of readmes) {
      const content = readFileSync(file, "utf8").toLowerCase();
      for (const requiredTerm of ["loading", "empty", "error", "security", "accessibility"]) {
        if (!content.includes(requiredTerm)) {
          findings.push({ file, message: `Missing required state/review term: ${requiredTerm}`, severity: "error" });
        }
      }
    }
  }

  return findings;
}

const modeArgIndex = process.argv.indexOf("--mode");
const mode = modeArgIndex >= 0 ? process.argv[modeArgIndex + 1] : "standard";

if (!["advisory", "standard", "strict", "regulated"].includes(mode)) {
  console.error(`Invalid mode: ${mode}`);
  process.exit(1);
}

const files = ["README.md", "AGENTS.md", ...walk("core"), ...walk("library"), ...walk("skills"), ...walk("templates"), ...walk("examples"), ...walk("docs")]
  .filter((f) => /\.(md|json|ya?ml|ts|tsx)$/i.test(f));

const findings = scanFiles(files, mode);
for (const finding of findings) {
  const prefix = finding.severity === "error" ? "ERROR" : "WARN";
  console.error(`[${prefix}] ${finding.file}: ${finding.message}`);
}

if (mode === "advisory") {
  console.log(`Security gates advisory mode complete. Findings: ${findings.length}`);
  process.exit(0);
}

const errors = findings.filter((f) => f.severity === "error");
if (errors.length > 0) {
  console.error(`Security gates failed with ${errors.length} error(s).`);
  process.exit(1);
}

console.log(`Security gates (${mode}) passed.`);
