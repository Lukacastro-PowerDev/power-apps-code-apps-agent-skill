import { readFileSync } from "node:fs";

const schemaFiles = [
  "examples/sharepoint-crud/src/schema.example.json",
  "examples/dataverse-crud/src/schema.example.json"
];

const forbiddenSecrets = [
  /AKIA[0-9A-Z]{16}/,
  /-----BEGIN (RSA|EC|OPENSSH) PRIVATE KEY-----/,
  /password\s*[:=]/i
];

for (const file of schemaFiles) {
  const raw = readFileSync(file, "utf8");
  const parsed = JSON.parse(raw) as Record<string, unknown>;
  if (!String(parsed.note || "").toLowerCase().includes("example only")) {
    console.error(`${file} must include an explicit EXAMPLE ONLY note.`);
    process.exit(1);
  }
  for (const rx of forbiddenSecrets) {
    if (rx.test(raw)) {
      console.error(`${file} appears to contain sensitive content.`);
      process.exit(1);
    }
  }
}

const requiredSchemas = [
  "core/evidence/evidence.schema.json",
  "core/evidence/field-contract.schema.json",
  "core/evidence/sharepoint-datasource-map.schema.json",
  "core/evidence/dataverse-datasource-map.schema.json",
  "core/evidence/permission-matrix.schema.json",
  "core/planning/context-plan.schema.json",
  "core/planning/decision-record.schema.json",
  "core/planning/execution-report.schema.json"
];

for (const schemaPath of requiredSchemas) {
  const schema = JSON.parse(readFileSync(schemaPath, "utf8")) as Record<string, unknown>;
  if (!schema["$schema"] || !schema["title"] || !schema["type"]) {
    console.error(`Schema missing required metadata fields: ${schemaPath}`);
    process.exit(1);
  }
}

console.log("Schema validation OK.");
