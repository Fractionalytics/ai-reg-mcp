/**
 * Validates curated JSON files in data/seed/ against the schema.
 * Usage: npm run validate
 */

import { readFileSync, readdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SEED_DIR = resolve(__dirname, "../data/seed");

// ----- Zod schemas matching types.ts -----

const ApplicabilitySchema = z.object({
  who_it_applies_to: z.array(z.string()).min(1),
  definitions: z.record(z.string()),
  scope_conditions: z.string().min(1),
  exemptions: z.array(z.string()),
  geographic_trigger: z.string().min(1),
});

const ObligationSchema = z.object({
  obligation_id: z.string().min(1),
  applies_to: z.string().min(1),
  category: z.enum([
    "risk_assessment", "transparency", "documentation", "consumer_rights",
    "bias_testing", "human_oversight", "incident_reporting", "disclosure",
    "governance", "data_protection", "other",
  ]),
  requirement_text: z.string().min(1),
  plain_language: z.string().min(1),
  deadline: z.string().nullable(),
  recurring: z.boolean(),
  frequency: z.enum(["annual", "per-deployment", "ongoing"]).nullable(),
  citation: z.string().min(1),
});

const PenaltySchema = z.object({
  enforcing_body: z.string().min(1),
  private_right_of_action: z.boolean(),
  penalty_range: z.string().min(1),
  cure_period: z.boolean(),
  cure_period_days: z.number().nullable(),
  notes: z.string(),
});

const SafeHarborSchema = z.object({
  description: z.string().min(1),
  framework_reference: z.string().min(1),
  citation: z.string().min(1),
});

const CrossReferenceSchema = z.object({
  related_law: z.string().min(1),
  relationship: z.string().min(1),
  category: z.string().min(1),
  notes: z.string(),
});

const ChangeLogEntrySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  change_type: z.enum(["amendment", "delay", "guidance", "enforcement_action", "new_law"]),
  description: z.string().min(1),
});

const LawSeedSchema = z.object({
  law: z.object({
    law_id: z.string().min(1),
    jurisdiction: z.string().min(1),
    common_name: z.string().min(1),
    official_citation: z.string().min(1),
    status: z.enum(["enacted", "effective", "proposed", "amended"]),
    effective_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    last_updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    source_url: z.string().url(),
    summary: z.string().min(10),
    applicability: ApplicabilitySchema,
    obligations: z.array(ObligationSchema).min(1),
    penalties: PenaltySchema,
    safe_harbors: z.array(SafeHarborSchema),
    cross_references: z.array(CrossReferenceSchema),
    change_log: z.array(ChangeLogEntrySchema),
  }),
});

// ----- Validation -----

function main() {
  const files = readdirSync(SEED_DIR).filter((f) => f.endsWith(".json"));
  console.log(`Validating ${files.length} seed file(s) in data/seed/\n`);

  let errors = 0;

  for (const file of files) {
    const filePath = resolve(SEED_DIR, file);
    const raw = readFileSync(filePath, "utf-8");

    let data: unknown;
    try {
      data = JSON.parse(raw);
    } catch (e) {
      console.error(`  FAIL ${file}: Invalid JSON - ${e}`);
      errors++;
      continue;
    }

    const result = LawSeedSchema.safeParse(data);
    if (result.success) {
      const law = result.data.law;
      console.log(`  OK   ${file} (${law.law_id}: ${law.obligations.length} obligations, ${law.change_log.length} changelog entries)`);
    } else {
      console.error(`  FAIL ${file}:`);
      for (const issue of result.error.issues) {
        console.error(`       ${issue.path.join(".")}: ${issue.message}`);
      }
      errors++;
    }
  }

  console.log(`\n${files.length - errors}/${files.length} passed validation.`);

  if (errors > 0) {
    process.exit(1);
  }
}

main();
