/**
 * SQLite database connection setup using sql.js (WASM-based).
 * Provides a singleton database instance loaded from the bundled laws.db file.
 */

import initSqlJs, { type Database } from "sql.js";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { CREATE_TABLES } from "./schema.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** Path to the bundled SQLite database file. */
const DB_PATH = resolve(__dirname, "../../data/laws.db");

let db: Database | null = null;

/**
 * Get (or create) the singleton database instance.
 * Loads from data/laws.db if it exists; otherwise creates an empty DB with schema.
 */
export async function getDatabase(): Promise<Database> {
  if (db) return db;

  const SQL = await initSqlJs();

  if (existsSync(DB_PATH)) {
    const buffer = readFileSync(DB_PATH);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }

  // Ensure tables exist (idempotent via IF NOT EXISTS)
  db.run(CREATE_TABLES);

  return db;
}

/**
 * Create a fresh in-memory database with schema applied.
 * Used for testing and seeding.
 */
export async function createMemoryDatabase(): Promise<Database> {
  const SQL = await initSqlJs();
  const memDb = new SQL.Database();
  memDb.run(CREATE_TABLES);
  return memDb;
}

/**
 * Close the singleton database connection.
 */
export function closeDatabase(): void {
  if (db) {
    db.close();
    db = null;
  }
}
