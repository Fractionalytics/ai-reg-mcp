import { describe, it, expect, beforeAll, afterAll } from "vitest";
import initSqlJs, { type Database } from "sql.js";
import { CREATE_TABLES } from "../../src/data/schema.js";
import { createSearchLawsHandler } from "../../src/mcp-server/tools/search-laws.js";
import { createGetObligationsHandler } from "../../src/mcp-server/tools/get-obligations.js";
import { createCompareJurisdictionsHandler } from "../../src/mcp-server/tools/compare-jurisdictions.js";
import { createGetChangesHandler } from "../../src/mcp-server/tools/get-changes.js";

let db: Database;

beforeAll(async () => {
  const SQL = await initSqlJs();
  db = new SQL.Database();
  db.run(CREATE_TABLES);

  // Seed minimal test data
  db.run(
    `INSERT INTO laws VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      "CO-SB24-205",
      "CO",
      "Colorado AI Act",
      "C.R.S. § 6-1-1701",
      "enacted",
      "2026-06-30",
      "2026-02-10",
      "https://example.com",
      "Colorado AI Act summary",
      JSON.stringify({ who_it_applies_to: ["developer", "deployer"] }),
      JSON.stringify({ enforcing_body: "CO AG" }),
      JSON.stringify([]),
      JSON.stringify([]),
    ]
  );

  db.run(
    `INSERT INTO obligations VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      "CO-SB24-205-OBL-001",
      "CO-SB24-205",
      "deployer",
      "risk_assessment",
      "Use reasonable care...",
      "Conduct risk assessments",
      "2026-06-30",
      1,
      "ongoing",
      "C.R.S. § 6-1-1702",
    ]
  );

  db.run(
    `INSERT INTO change_log (law_id, date, change_type, description) VALUES (?, ?, ?, ?)`,
    ["CO-SB24-205", "2025-04-14", "delay", "Effective date delayed"]
  );
});

afterAll(() => {
  db.close();
});

describe("search_laws tool handler", () => {
  it("returns JSON text content for matching laws", async () => {
    const handler = createSearchLawsHandler(db);
    const result = await handler({ jurisdiction: "CO" });
    expect(result.content).toHaveLength(1);
    expect(result.content[0].type).toBe("text");
    const parsed = JSON.parse(result.content[0].text);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].law_id).toBe("CO-SB24-205");
  });

  it("returns 'no laws found' message for no matches", async () => {
    const handler = createSearchLawsHandler(db);
    const result = await handler({ jurisdiction: "TX" });
    expect(result.content[0].text).toContain("No laws found");
  });
});

describe("get_obligations tool handler", () => {
  it("returns obligations as JSON", async () => {
    const handler = createGetObligationsHandler(db);
    const result = await handler({ law_id: "CO-SB24-205" });
    const parsed = JSON.parse(result.content[0].text);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].obligation_id).toBe("CO-SB24-205-OBL-001");
  });

  it("returns empty message for no matches", async () => {
    const handler = createGetObligationsHandler(db);
    const result = await handler({ law_id: "NONEXISTENT" });
    expect(result.content[0].text).toContain("No obligations found");
  });
});

describe("compare_jurisdictions tool handler", () => {
  it("returns comparison data as JSON", async () => {
    const handler = createCompareJurisdictionsHandler(db);
    const result = await handler({ jurisdictions: ["CO", "CA"] });
    const parsed = JSON.parse(result.content[0].text);
    expect(Array.isArray(parsed)).toBe(true);
  });

  it("returns empty message for non-matching jurisdictions", async () => {
    const handler = createCompareJurisdictionsHandler(db);
    const result = await handler({ jurisdictions: ["TX", "NY"] });
    expect(result.content[0].text).toContain("No obligations found");
  });
});

describe("get_changes tool handler", () => {
  it("returns changes as JSON", async () => {
    const handler = createGetChangesHandler(db);
    const result = await handler({});
    const parsed = JSON.parse(result.content[0].text);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].change_type).toBe("delay");
  });

  it("filters by date range", async () => {
    const handler = createGetChangesHandler(db);
    const result = await handler({ since: "2026-01-01" });
    expect(result.content[0].text).toContain("No changes found");
  });
});
