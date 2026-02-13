/**
 * SQLite schema definitions.
 * Tables: laws, obligations, change_log.
 * Nested/complex fields (applicability, penalties, safe_harbors, cross_references)
 * stored as JSON columns in the laws table.
 */

export const CREATE_TABLES = `
CREATE TABLE IF NOT EXISTS laws (
  law_id         TEXT PRIMARY KEY,
  jurisdiction   TEXT NOT NULL,
  common_name    TEXT NOT NULL,
  official_citation TEXT NOT NULL,
  status         TEXT NOT NULL CHECK(status IN ('enacted','effective','proposed','amended')),
  effective_date TEXT NOT NULL,
  last_updated   TEXT NOT NULL,
  source_url     TEXT NOT NULL,
  summary        TEXT NOT NULL,
  applicability  TEXT NOT NULL,  -- JSON
  penalties      TEXT NOT NULL,  -- JSON
  safe_harbors   TEXT NOT NULL,  -- JSON array
  cross_references TEXT NOT NULL -- JSON array
);

CREATE TABLE IF NOT EXISTS obligations (
  obligation_id  TEXT PRIMARY KEY,
  law_id         TEXT NOT NULL REFERENCES laws(law_id),
  applies_to     TEXT NOT NULL,
  category       TEXT NOT NULL,
  requirement_text TEXT NOT NULL,
  plain_language TEXT NOT NULL,
  deadline       TEXT,
  recurring      INTEGER NOT NULL DEFAULT 0,
  frequency      TEXT,
  citation       TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS change_log (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  law_id         TEXT NOT NULL REFERENCES laws(law_id),
  date           TEXT NOT NULL,
  change_type    TEXT NOT NULL CHECK(change_type IN ('amendment','delay','guidance','enforcement_action','new_law')),
  description    TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_obligations_law_id ON obligations(law_id);
CREATE INDEX IF NOT EXISTS idx_obligations_category ON obligations(category);
CREATE INDEX IF NOT EXISTS idx_obligations_applies_to ON obligations(applies_to);
CREATE INDEX IF NOT EXISTS idx_change_log_law_id ON change_log(law_id);
CREATE INDEX IF NOT EXISTS idx_change_log_date ON change_log(date);
CREATE INDEX IF NOT EXISTS idx_laws_jurisdiction ON laws(jurisdiction);
CREATE INDEX IF NOT EXISTS idx_laws_status ON laws(status);
CREATE INDEX IF NOT EXISTS idx_laws_effective_date ON laws(effective_date);
`;
