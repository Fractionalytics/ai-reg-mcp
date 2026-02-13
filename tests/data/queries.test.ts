import { describe, it, expect, beforeAll, afterAll } from "vitest";
import initSqlJs, { type Database } from "sql.js";
import { CREATE_TABLES } from "../../src/data/schema.js";
import {
  searchLaws,
  getObligations,
  compareJurisdictions,
  getChanges,
} from "../../src/data/queries.js";

let db: Database;

beforeAll(async () => {
  const SQL = await initSqlJs();
  db = new SQL.Database();
  db.run(CREATE_TABLES);

  // Seed two test laws
  db.run(
    `INSERT INTO laws VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      "CO-SB24-205",
      "CO",
      "Colorado AI Act",
      "C.R.S. § 6-1-1701 et seq.",
      "enacted",
      "2026-06-30",
      "2026-02-10",
      "https://leg.colorado.gov/bills/sb24-205",
      "Colorado AI Act summary",
      JSON.stringify({ who_it_applies_to: ["developer", "deployer"] }),
      JSON.stringify({ enforcing_body: "CO AG", penalty_range: "$2K-$20K" }),
      JSON.stringify([]),
      JSON.stringify([]),
    ]
  );

  db.run(
    `INSERT INTO laws VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      "CA-CCPA-ADMT",
      "CA",
      "California ADMT Regulations (CCPA)",
      "Cal. Code Regs. tit. 11, §§ 7030-7034",
      "effective",
      "2026-01-01",
      "2026-02-10",
      "https://cppa.ca.gov/regulations/admt.html",
      "California ADMT summary",
      JSON.stringify({ who_it_applies_to: ["business"] }),
      JSON.stringify({ enforcing_body: "CPPA", penalty_range: "$2,500" }),
      JSON.stringify([]),
      JSON.stringify([]),
    ]
  );

  // Seed obligations
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
      "C.R.S. § 6-1-1702(3)(a)",
    ]
  );

  db.run(
    `INSERT INTO obligations VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      "CO-SB24-205-OBL-004",
      "CO-SB24-205",
      "deployer",
      "transparency",
      "Notify consumer of AI use...",
      "Tell consumers about AI decisions",
      "2026-06-30",
      1,
      "per-deployment",
      "C.R.S. § 6-1-1703(1)",
    ]
  );

  db.run(
    `INSERT INTO obligations VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      "CO-SB24-205-OBL-007",
      "CO-SB24-205",
      "developer",
      "documentation",
      "Make available documentation...",
      "Provide documentation to deployers",
      "2026-06-30",
      1,
      "per-deployment",
      "C.R.S. § 6-1-1704(1)",
    ]
  );

  db.run(
    `INSERT INTO obligations VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      "CA-CCPA-ADMT-OBL-001",
      "CA-CCPA-ADMT",
      "business",
      "transparency",
      "Provide pre-use notice...",
      "Notify consumers before using ADMT",
      "2026-01-01",
      1,
      "per-deployment",
      "Cal. Code Regs. tit. 11, § 7031(a)",
    ]
  );

  db.run(
    `INSERT INTO obligations VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      "CA-CCPA-ADMT-OBL-004",
      "CA-CCPA-ADMT",
      "business",
      "risk_assessment",
      "Conduct risk assessment...",
      "Risk assess ADMT for significant decisions",
      "2026-01-01",
      1,
      "annual",
      "Cal. Code Regs. tit. 11, § 7033(a)",
    ]
  );

  // Seed change log
  db.run(
    `INSERT INTO change_log (law_id, date, change_type, description) VALUES (?, ?, ?, ?)`,
    ["CO-SB24-205", "2025-04-14", "delay", "Effective date delayed to June 2026"]
  );

  db.run(
    `INSERT INTO change_log (law_id, date, change_type, description) VALUES (?, ?, ?, ?)`,
    ["CA-CCPA-ADMT", "2025-11-01", "guidance", "CPPA published guidance"]
  );
});

afterAll(() => {
  db.close();
});

// ----- searchLaws tests -----

describe("searchLaws", () => {
  it("returns all laws with no filters", () => {
    const results = searchLaws(db, {});
    expect(results).toHaveLength(2);
  });

  it("filters by jurisdiction", () => {
    const results = searchLaws(db, { jurisdiction: "CO" });
    expect(results).toHaveLength(1);
    expect(results[0].law_id).toBe("CO-SB24-205");
  });

  it("filters by status", () => {
    const results = searchLaws(db, { status: "effective" });
    expect(results).toHaveLength(1);
    expect(results[0].law_id).toBe("CA-CCPA-ADMT");
  });

  it("filters by effective_date_after", () => {
    const results = searchLaws(db, { effective_date_after: "2026-03-01" });
    expect(results).toHaveLength(1);
    expect(results[0].law_id).toBe("CO-SB24-205");
  });

  it("filters by applies_to via obligations join", () => {
    const results = searchLaws(db, { applies_to: "deployer" });
    expect(results).toHaveLength(1);
    expect(results[0].law_id).toBe("CO-SB24-205");
  });

  it("filters by category via obligations join", () => {
    const results = searchLaws(db, { category: "transparency" });
    expect(results).toHaveLength(2);
  });

  it("free-text query searches common_name", () => {
    const results = searchLaws(db, { query: "Colorado" });
    expect(results).toHaveLength(1);
    expect(results[0].common_name).toBe("Colorado AI Act");
  });

  it("returns empty array for no matches", () => {
    const results = searchLaws(db, { jurisdiction: "TX" });
    expect(results).toHaveLength(0);
  });

  it("parses JSON columns correctly", () => {
    const results = searchLaws(db, { jurisdiction: "CO" });
    expect(results[0].applicability).toEqual({
      who_it_applies_to: ["developer", "deployer"],
    });
  });
});

// ----- getObligations tests -----

describe("getObligations", () => {
  it("returns all obligations with no filters", () => {
    const results = getObligations(db, {});
    expect(results).toHaveLength(5);
  });

  it("filters by law_id", () => {
    const results = getObligations(db, { law_id: "CO-SB24-205" });
    expect(results).toHaveLength(3);
    expect(results.every((o) => o.law_id === "CO-SB24-205")).toBe(true);
  });

  it("filters by jurisdiction", () => {
    const results = getObligations(db, { jurisdiction: "CA" });
    expect(results).toHaveLength(2);
  });

  it("filters by applies_to", () => {
    const results = getObligations(db, { applies_to: "developer" });
    expect(results).toHaveLength(1);
    expect(results[0].obligation_id).toBe("CO-SB24-205-OBL-007");
  });

  it("filters by category", () => {
    const results = getObligations(db, { category: "risk_assessment" });
    expect(results).toHaveLength(2);
  });

  it("includes law_common_name and jurisdiction", () => {
    const results = getObligations(db, { law_id: "CO-SB24-205" });
    expect(results[0].law_common_name).toBe("Colorado AI Act");
    expect(results[0].jurisdiction).toBe("CO");
  });

  it("recurring is a boolean", () => {
    const results = getObligations(db, { law_id: "CO-SB24-205" });
    expect(typeof results[0].recurring).toBe("boolean");
    expect(results[0].recurring).toBe(true);
  });
});

// ----- compareJurisdictions tests -----

describe("compareJurisdictions", () => {
  it("compares across two jurisdictions", () => {
    const results = compareJurisdictions(db, {
      jurisdictions: ["CO", "CA"],
    });
    expect(results.length).toBeGreaterThan(0);
    // Should have categories that appear in both
    const categories = results.map((r) => r.category);
    expect(categories).toContain("risk_assessment");
    expect(categories).toContain("transparency");
  });

  it("filters by category", () => {
    const results = compareJurisdictions(db, {
      jurisdictions: ["CO", "CA"],
      category: "transparency",
    });
    expect(results).toHaveLength(1);
    expect(results[0].category).toBe("transparency");
    expect(results[0].jurisdictions).toHaveLength(2);
  });

  it("filters by applies_to", () => {
    const results = compareJurisdictions(db, {
      jurisdictions: ["CO", "CA"],
      applies_to: "deployer",
    });
    // Only CO has deployer obligations
    for (const cat of results) {
      const jurisdictions = cat.jurisdictions.map((j) => j.jurisdiction);
      expect(jurisdictions).toContain("CO");
      expect(jurisdictions).not.toContain("CA");
    }
  });

  it("returns empty for non-existent jurisdictions", () => {
    const results = compareJurisdictions(db, {
      jurisdictions: ["TX", "NY"],
    });
    expect(results).toHaveLength(0);
  });
});

// ----- getChanges tests -----

describe("getChanges", () => {
  it("returns all changes with no filters", () => {
    const results = getChanges(db, {});
    expect(results).toHaveLength(2);
  });

  it("filters by since date", () => {
    const results = getChanges(db, { since: "2025-10-01" });
    expect(results).toHaveLength(1);
    expect(results[0].law_id).toBe("CA-CCPA-ADMT");
  });

  it("filters by law_id", () => {
    const results = getChanges(db, { law_id: "CO-SB24-205" });
    expect(results).toHaveLength(1);
  });

  it("filters by change_type", () => {
    const results = getChanges(db, { change_type: "delay" });
    expect(results).toHaveLength(1);
    expect(results[0].description).toContain("delayed");
  });

  it("includes law_common_name and jurisdiction", () => {
    const results = getChanges(db, { law_id: "CO-SB24-205" });
    expect(results[0].law_common_name).toBe("Colorado AI Act");
    expect(results[0].jurisdiction).toBe("CO");
  });

  it("orders by date descending", () => {
    const results = getChanges(db, {});
    expect(results[0].date >= results[1].date).toBe(true);
  });
});
