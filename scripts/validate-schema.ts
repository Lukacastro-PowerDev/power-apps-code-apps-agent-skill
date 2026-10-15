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
  const parsed = JSON.parse(raw);
  if (!String(parsed.note || "").toLowerCase().includes("example")) {
    console.error(`${file} must include an explicit example note.`);
    process.exit(1);
  }
  for (const rx of forbiddenSecrets) {
    if (rx.test(raw)) {
      console.error(`${file} appears to contain sensitive content.`);
      process.exit(1);
    }
  }
}

console.log("Schema validation OK.");
