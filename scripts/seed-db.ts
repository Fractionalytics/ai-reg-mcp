/**
 * Reads data/seed/*.json and populates (or rebuilds) the SQLite database.
 * Usage: npm run seed
 */

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import initSqlJs from "sql.js";
import { CREATE_TABLES } from "../src/data/schema.js";
import type { LawSeedData } from "../src/data/types.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SEED_DIR = resolve(__dirname, "../data/seed");
const DB_PATH = resolve(__dirname, "../data/laws.db");

async function main() {
  const SQL = await initSqlJs();
  const db = new SQL.Database();

  // Create tables
  db.run(CREATE_TABLES);

  // Read all seed files
  const files = readdirSync(SEED_DIR).filter((f) => f.endsWith(".json"));
  console.log(`Found ${files.length} seed file(s) in data/seed/`);

  for (const file of files) {
    const filePath = resolve(SEED_DIR, file);
    const raw = readFileSync(filePath, "utf-8");
    const data: LawSeedData = JSON.parse(raw);
    const law = data.law;

    console.log(`  Seeding: ${law.law_id} (${law.common_name})`);

    // Insert law
    db.run(
      `INSERT INTO laws (law_id, jurisdiction, common_name, official_citation, status, effective_date, last_updated, source_url, summary, applicability, penalties, safe_harbors, cross_references)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        law.law_id,
        law.jurisdiction,
        law.common_name,
        law.official_citation,
        law.status,
        law.effective_date,
        law.last_updated,
        law.source_url,
        law.summary,
        JSON.stringify(law.applicability),
        JSON.stringify(law.penalties),
        JSON.stringify(law.safe_harbors),
        JSON.stringify(law.cross_references),
      ]
    );

    // Insert obligations
    for (const obl of law.obligations) {
      db.run(
        `INSERT INTO obligations (obligation_id, law_id, applies_to, category, requirement_text, plain_language, deadline, recurring, frequency, citation)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          obl.obligation_id,
          law.law_id,
          obl.applies_to,
          obl.category,
          obl.requirement_text,
          obl.plain_language,
          obl.deadline ?? null,
          obl.recurring ? 1 : 0,
          obl.frequency ?? null,
          obl.citation,
        ]
      );
    }

    // Insert change log entries
    for (const entry of law.change_log) {
      db.run(
        `INSERT INTO change_log (law_id, date, change_type, description)
         VALUES (?, ?, ?, ?)`,
        [law.law_id, entry.date, entry.change_type, entry.description]
      );
    }
  }

  // Export to file
  const dataDir = dirname(DB_PATH);
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }
  const buffer = db.export();
  writeFileSync(DB_PATH, Buffer.from(buffer));
  db.close();

  console.log(`\nDatabase written to ${DB_PATH}`);

  // Summary
  const verifyDb = new SQL.Database(readFileSync(DB_PATH));
  const lawCount = verifyDb.exec("SELECT COUNT(*) FROM laws")[0].values[0][0];
  const oblCount = verifyDb.exec("SELECT COUNT(*) FROM obligations")[0].values[0][0];
  const changeCount = verifyDb.exec("SELECT COUNT(*) FROM change_log")[0].values[0][0];
  verifyDb.close();

  console.log(`  Laws: ${lawCount}`);
  console.log(`  Obligations: ${oblCount}`);
  console.log(`  Change log entries: ${changeCount}`);
}

main().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
