import { describe, it, expect, vi } from "vitest";
import { AiRegApiClient, ApiError } from "../../src/api-client.js";
import { createSearchLawsHandler } from "../../src/mcp-server/tools/search-laws.js";
import { createGetObligationsHandler } from "../../src/mcp-server/tools/get-obligations.js";
import { createCompareJurisdictionsHandler } from "../../src/mcp-server/tools/compare-jurisdictions.js";
import { createGetChangesHandler } from "../../src/mcp-server/tools/get-changes.js";

function createMockClient(overrides: Partial<AiRegApiClient> = {}): AiRegApiClient {
  return {
    searchLaws: vi.fn().mockResolvedValue([]),
    getObligations: vi.fn().mockResolvedValue([]),
    compareJurisdictions: vi.fn().mockResolvedValue([]),
    getChanges: vi.fn().mockResolvedValue([]),
    ...overrides,
  } as unknown as AiRegApiClient;
}

describe("search_laws tool handler", () => {
  it("returns JSON text content for matching laws", async () => {
    const mockClient = createMockClient({
      searchLaws: vi.fn().mockResolvedValue([
        { law_id: "CO-SB24-205", common_name: "Colorado AI Act" },
      ]),
    });
    const handler = createSearchLawsHandler(mockClient);
    const result = await handler({ jurisdiction: "CO" });

    expect(result.content).toHaveLength(1);
    expect(result.content[0].type).toBe("text");
    const parsed = JSON.parse(result.content[0].text);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].law_id).toBe("CO-SB24-205");
  });

  it("returns 'no laws found' message for no matches", async () => {
    const mockClient = createMockClient();
    const handler = createSearchLawsHandler(mockClient);
    const result = await handler({ jurisdiction: "TX" });

    expect(result.content[0].text).toContain("No laws found");
  });

  it("returns error response for API errors", async () => {
    const mockClient = createMockClient({
      searchLaws: vi.fn().mockRejectedValue(
        new ApiError("UNAUTHORIZED", "Missing API key", 401)
      ),
    });
    const handler = createSearchLawsHandler(mockClient);
    const result = await handler({});

    expect(result.content[0].text).toContain("UNAUTHORIZED");
    expect((result as any).isError).toBe(true);
  });

  it("handles network errors gracefully", async () => {
    const mockClient = createMockClient({
      searchLaws: vi.fn().mockRejectedValue(new Error("fetch failed")),
    });
    const handler = createSearchLawsHandler(mockClient);
    const result = await handler({});

    expect(result.content[0].text).toContain("fetch failed");
    expect((result as any).isError).toBe(true);
  });
});

describe("get_obligations tool handler", () => {
  it("returns obligations as JSON", async () => {
    const mockClient = createMockClient({
      getObligations: vi.fn().mockResolvedValue([
        { obligation_id: "CO-SB24-205-OBL-001", category: "risk_assessment" },
      ]),
    });
    const handler = createGetObligationsHandler(mockClient);
    const result = await handler({ law_id: "CO-SB24-205" });

    const parsed = JSON.parse(result.content[0].text);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].obligation_id).toBe("CO-SB24-205-OBL-001");
  });

  it("returns empty message for no matches", async () => {
    const mockClient = createMockClient();
    const handler = createGetObligationsHandler(mockClient);
    const result = await handler({ law_id: "NONEXISTENT" });

    expect(result.content[0].text).toContain("No obligations found");
  });
});

describe("compare_jurisdictions tool handler", () => {
  it("returns comparison data as JSON", async () => {
    const mockClient = createMockClient({
      compareJurisdictions: vi.fn().mockResolvedValue([
        { category: "transparency", jurisdictions: ["CO", "CA"] },
      ]),
    });
    const handler = createCompareJurisdictionsHandler(mockClient);
    const result = await handler({ jurisdictions: ["CO", "CA"] });

    const parsed = JSON.parse(result.content[0].text);
    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed[0].category).toBe("transparency");
  });

  it("returns empty message for non-matching jurisdictions", async () => {
    const mockClient = createMockClient();
    const handler = createCompareJurisdictionsHandler(mockClient);
    const result = await handler({ jurisdictions: ["TX", "NY"] });

    expect(result.content[0].text).toContain("No obligations found");
  });
});

describe("get_changes tool handler", () => {
  it("returns changes as JSON", async () => {
    const mockClient = createMockClient({
      getChanges: vi.fn().mockResolvedValue([
        { change_type: "delay", description: "Effective date delayed" },
      ]),
    });
    const handler = createGetChangesHandler(mockClient);
    const result = await handler({});

    const parsed = JSON.parse(result.content[0].text);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].change_type).toBe("delay");
  });

  it("returns empty message for no matches", async () => {
    const mockClient = createMockClient();
    const handler = createGetChangesHandler(mockClient);
    const result = await handler({ since: "2026-01-01" });

    expect(result.content[0].text).toContain("No changes found");
  });

  it("returns error for rate limit", async () => {
    const mockClient = createMockClient({
      getChanges: vi.fn().mockRejectedValue(
        new ApiError("RATE_LIMITED", "Too many requests", 429)
      ),
    });
    const handler = createGetChangesHandler(mockClient);
    const result = await handler({});

    expect(result.content[0].text).toContain("RATE_LIMITED");
    expect((result as any).isError).toBe(true);
  });
});
