/**
 * Core query functions — the heart of the product.
 * Shared by MCP tools and future REST API.
 */

import type { Database } from "sql.js";
import type {
  SearchLawsParams,
  GetObligationsParams,
  CompareJurisdictionsParams,
  GetChangesParams,
  Law,
  Obligation,
  ChangeLogEntry,
} from "./types.js";

// ----- Helper to parse JSON columns from law rows -----

function parseLawRow(row: Record<string, unknown>): Law {
  return {
    ...(row as Record<string, unknown>),
    applicability: JSON.parse(row.applicability as string),
    penalties: JSON.parse(row.penalties as string),
    safe_harbors: JSON.parse(row.safe_harbors as string),
    cross_references: JSON.parse(row.cross_references as string),
  } as unknown as Law;
}

function queryAll(
  db: Database,
  sql: string,
  params: unknown[] = []
): Record<string, unknown>[] {
  const stmt = db.prepare(sql);
  if (params.length > 0) {
    stmt.bind(params);
  }
  const rows: Record<string, unknown>[] = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject() as Record<string, unknown>);
  }
  stmt.free();
  return rows;
}

// ----- 1. searchLaws -----

export function searchLaws(db: Database, params: SearchLawsParams): Law[] {
  const conditions: string[] = [];
  const values: unknown[] = [];

  if (params.jurisdiction) {
    conditions.push("l.jurisdiction = ?");
    values.push(params.jurisdiction);
  }
  if (params.status) {
    conditions.push("l.status = ?");
    values.push(params.status);
  }
  if (params.effective_date_after) {
    conditions.push("l.effective_date >= ?");
    values.push(params.effective_date_after);
  }
  if (params.effective_date_before) {
    conditions.push("l.effective_date <= ?");
    values.push(params.effective_date_before);
  }
  if (params.query) {
    conditions.push(
      "(l.common_name LIKE ? OR l.summary LIKE ? OR l.official_citation LIKE ?)"
    );
    const like = `%${params.query}%`;
    values.push(like, like, like);
  }

  // If filtering by applies_to or category, join to obligations
  let joinObligations = false;
  if (params.applies_to) {
    joinObligations = true;
    conditions.push("o.applies_to = ?");
    values.push(params.applies_to);
  }
  if (params.category) {
    joinObligations = true;
    conditions.push("o.category = ?");
    values.push(params.category);
  }

  let sql = "SELECT DISTINCT l.* FROM laws l";
  if (joinObligations) {
    sql += " JOIN obligations o ON l.law_id = o.law_id";
  }
  if (conditions.length > 0) {
    sql += " WHERE " + conditions.join(" AND ");
  }
  sql += " ORDER BY l.effective_date ASC";

  const rows = queryAll(db, sql, values);
  return rows.map(parseLawRow);
}

// ----- 2. getObligations -----

export function getObligations(
  db: Database,
  params: GetObligationsParams
): (Obligation & { law_common_name: string; jurisdiction: string })[] {
  const conditions: string[] = [];
  const values: unknown[] = [];

  if (params.law_id) {
    conditions.push("o.law_id = ?");
    values.push(params.law_id);
  }
  if (params.jurisdiction) {
    conditions.push("l.jurisdiction = ?");
    values.push(params.jurisdiction);
  }
  if (params.applies_to) {
    conditions.push("o.applies_to = ?");
    values.push(params.applies_to);
  }
  if (params.category) {
    conditions.push("o.category = ?");
    values.push(params.category);
  }

  let sql = `
    SELECT o.*, l.common_name AS law_common_name, l.jurisdiction
    FROM obligations o
    JOIN laws l ON o.law_id = l.law_id
  `;
  if (conditions.length > 0) {
    sql += " WHERE " + conditions.join(" AND ");
  }
  sql += " ORDER BY l.jurisdiction ASC, o.category ASC";

  const rows = queryAll(db, sql, values);
  return rows.map((row) => ({
    ...(row as unknown as Obligation & {
      law_common_name: string;
      jurisdiction: string;
    }),
    recurring: Boolean(row.recurring),
  }));
}

// ----- 3. compareJurisdictions -----

export interface JurisdictionComparison {
  category: string;
  jurisdictions: {
    jurisdiction: string;
    law_id: string;
    common_name: string;
    obligations: {
      obligation_id: string;
      applies_to: string;
      requirement_text: string;
      plain_language: string;
      deadline: string | null;
      citation: string;
    }[];
  }[];
}

export function compareJurisdictions(
  db: Database,
  params: CompareJurisdictionsParams
): JurisdictionComparison[] {
  const placeholders = params.jurisdictions.map(() => "?").join(",");
  const conditions: string[] = [
    `l.jurisdiction IN (${placeholders})`,
  ];
  const values: unknown[] = [...params.jurisdictions];

  if (params.category) {
    conditions.push("o.category = ?");
    values.push(params.category);
  }
  if (params.applies_to) {
    conditions.push("o.applies_to = ?");
    values.push(params.applies_to);
  }

  const sql = `
    SELECT o.*, l.common_name, l.jurisdiction
    FROM obligations o
    JOIN laws l ON o.law_id = l.law_id
    WHERE ${conditions.join(" AND ")}
    ORDER BY o.category ASC, l.jurisdiction ASC
  `;

  const rows = queryAll(db, sql, values);

  // Group by category, then by jurisdiction
  const categoryMap = new Map<string, Map<string, { law_id: string; common_name: string; obligations: JurisdictionComparison["jurisdictions"][0]["obligations"] }>>();

  for (const row of rows) {
    const cat = row.category as string;
    const jur = row.jurisdiction as string;

    if (!categoryMap.has(cat)) {
      categoryMap.set(cat, new Map());
    }
    const jurMap = categoryMap.get(cat)!;

    if (!jurMap.has(jur)) {
      jurMap.set(jur, {
        law_id: row.law_id as string,
        common_name: row.common_name as string,
        obligations: [],
      });
    }
    jurMap.get(jur)!.obligations.push({
      obligation_id: row.obligation_id as string,
      applies_to: row.applies_to as string,
      requirement_text: row.requirement_text as string,
      plain_language: row.plain_language as string,
      deadline: (row.deadline as string) || null,
      citation: row.citation as string,
    });
  }

  const result: JurisdictionComparison[] = [];
  for (const [category, jurMap] of categoryMap) {
    const jurisdictions: JurisdictionComparison["jurisdictions"] = [];
    for (const [jurisdiction, data] of jurMap) {
      jurisdictions.push({ jurisdiction, ...data });
    }
    result.push({ category, jurisdictions });
  }
  return result;
}

// ----- 4. getChanges -----

export function getChanges(
  db: Database,
  params: GetChangesParams
): (ChangeLogEntry & { law_common_name: string; jurisdiction: string })[] {
  const conditions: string[] = [];
  const values: unknown[] = [];

  if (params.since) {
    conditions.push("c.date >= ?");
    values.push(params.since);
  }
  if (params.until) {
    conditions.push("c.date <= ?");
    values.push(params.until);
  }
  if (params.law_id) {
    conditions.push("c.law_id = ?");
    values.push(params.law_id);
  }
  if (params.change_type) {
    conditions.push("c.change_type = ?");
    values.push(params.change_type);
  }

  let sql = `
    SELECT c.*, l.common_name AS law_common_name, l.jurisdiction
    FROM change_log c
    JOIN laws l ON c.law_id = l.law_id
  `;
  if (conditions.length > 0) {
    sql += " WHERE " + conditions.join(" AND ");
  }
  sql += " ORDER BY c.date DESC";

  const rows = queryAll(db, sql, values);
  return rows as unknown as (ChangeLogEntry & {
    law_common_name: string;
    jurisdiction: string;
  })[];
}
