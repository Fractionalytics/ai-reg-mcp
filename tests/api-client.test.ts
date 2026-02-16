import { describe, it, expect, vi, beforeEach } from "vitest";
import { AiRegApiClient, ApiError } from "../src/api-client.js";

const BASE_URL = "https://ai-reg-api.vercel.app";
const API_KEY = "aireg_live_test1234567890abcdef1234567890abcdef";

let client: AiRegApiClient;

beforeEach(() => {
  client = new AiRegApiClient(BASE_URL, API_KEY);
  vi.restoreAllMocks();
});

function mockFetch(data: unknown, status = 200) {
  return vi.spyOn(globalThis, "fetch").mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(data),
  } as Response);
}

describe("AiRegApiClient", () => {
  describe("searchLaws", () => {
    it("builds correct URL with params", async () => {
      const spy = mockFetch({ data: [], meta: { count: 0, api_version: "v1" } });

      await client.searchLaws({ jurisdiction: "CO", status: "enacted" });

      expect(spy).toHaveBeenCalledOnce();
      const url = new URL(spy.mock.calls[0][0] as string);
      expect(url.pathname).toBe("/api/v1/laws");
      expect(url.searchParams.get("jurisdiction")).toBe("CO");
      expect(url.searchParams.get("status")).toBe("enacted");
    });

    it("omits undefined params from URL", async () => {
      const spy = mockFetch({ data: [], meta: { count: 0, api_version: "v1" } });

      await client.searchLaws({ jurisdiction: "CO" });

      const url = new URL(spy.mock.calls[0][0] as string);
      expect(url.searchParams.has("status")).toBe(false);
      expect(url.searchParams.has("query")).toBe(false);
    });

    it("sends Authorization header", async () => {
      const spy = mockFetch({ data: [], meta: { count: 0, api_version: "v1" } });

      await client.searchLaws({});

      const headers = spy.mock.calls[0][1]?.headers as Record<string, string>;
      expect(headers.Authorization).toBe(`Bearer ${API_KEY}`);
    });

    it("returns data array from response", async () => {
      const laws = [{ law_id: "CO-SB24-205", common_name: "Colorado AI Act" }];
      mockFetch({ data: laws, meta: { count: 1, api_version: "v1" } });

      const result = await client.searchLaws({});
      expect(result).toEqual(laws);
    });
  });

  describe("getObligations", () => {
    it("builds correct URL", async () => {
      const spy = mockFetch({ data: [], meta: { count: 0, api_version: "v1" } });

      await client.getObligations({ law_id: "CO-SB24-205", category: "transparency" });

      const url = new URL(spy.mock.calls[0][0] as string);
      expect(url.pathname).toBe("/api/v1/obligations");
      expect(url.searchParams.get("law_id")).toBe("CO-SB24-205");
      expect(url.searchParams.get("category")).toBe("transparency");
    });
  });

  describe("compareJurisdictions", () => {
    it("joins jurisdictions with comma", async () => {
      const spy = mockFetch({ data: [], meta: { count: 0, api_version: "v1" } });

      await client.compareJurisdictions({ jurisdictions: ["CO", "CA"] });

      const url = new URL(spy.mock.calls[0][0] as string);
      expect(url.pathname).toBe("/api/v1/compare");
      expect(url.searchParams.get("jurisdictions")).toBe("CO,CA");
    });
  });

  describe("getChanges", () => {
    it("builds correct URL with date params", async () => {
      const spy = mockFetch({ data: [], meta: { count: 0, api_version: "v1" } });

      await client.getChanges({ since: "2025-01-01", law_id: "CO-SB24-205" });

      const url = new URL(spy.mock.calls[0][0] as string);
      expect(url.pathname).toBe("/api/v1/changes");
      expect(url.searchParams.get("since")).toBe("2025-01-01");
      expect(url.searchParams.get("law_id")).toBe("CO-SB24-205");
    });
  });

  describe("error handling", () => {
    it("throws ApiError on 401", async () => {
      mockFetch(
        { error: { code: "UNAUTHORIZED", message: "Missing API key", status: 401 } },
        401
      );

      await expect(client.searchLaws({})).rejects.toThrow(ApiError);
      await expect(client.searchLaws({})).rejects.toMatchObject({
        code: "UNAUTHORIZED",
        status: 401,
      });
    });

    it("throws ApiError on 429 rate limit", async () => {
      mockFetch(
        { error: { code: "RATE_LIMITED", message: "Too many requests", status: 429 } },
        429
      );

      await expect(client.searchLaws({})).rejects.toThrow(ApiError);
      await expect(client.searchLaws({})).rejects.toMatchObject({
        code: "RATE_LIMITED",
        status: 429,
      });
    });

    it("handles non-JSON error responses", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValue({
        ok: false,
        status: 500,
        json: () => Promise.reject(new Error("not json")),
      } as Response);

      await expect(client.searchLaws({})).rejects.toThrow(ApiError);
      await expect(client.searchLaws({})).rejects.toMatchObject({
        code: "API_ERROR",
        status: 500,
      });
    });
  });
});
