import { describe, it, expect } from "vitest";
import {
  normalizeJurisdiction,
  normalizeJurisdictions,
  getValidJurisdictions,
} from "../../src/data/jurisdictions.js";

describe("Jurisdiction normalization", () => {
  describe("normalizeJurisdiction", () => {
    it("should normalize US state full names", () => {
      expect(normalizeJurisdiction("Colorado")).toBe("CO");
      expect(normalizeJurisdiction("California")).toBe("CA");
      expect(normalizeJurisdiction("Illinois")).toBe("IL");
      expect(normalizeJurisdiction("Texas")).toBe("TX");
      expect(normalizeJurisdiction("Utah")).toBe("UT");
    });

    it("should handle abbreviations (already canonical)", () => {
      expect(normalizeJurisdiction("CO")).toBe("CO");
      expect(normalizeJurisdiction("CA")).toBe("CA");
      expect(normalizeJurisdiction("IL")).toBe("IL");
    });

    it("should be case-insensitive", () => {
      expect(normalizeJurisdiction("colorado")).toBe("CO");
      expect(normalizeJurisdiction("COLORADO")).toBe("CO");
      expect(normalizeJurisdiction("CoLoRaDo")).toBe("CO");
    });

    it("should handle whitespace", () => {
      expect(normalizeJurisdiction("  Colorado  ")).toBe("CO");
      expect(normalizeJurisdiction(" co ")).toBe("CO");
    });

    it("should handle city jurisdictions", () => {
      expect(normalizeJurisdiction("New York City")).toBe("NYC");
      expect(normalizeJurisdiction("NYC")).toBe("NYC");
      expect(normalizeJurisdiction("nyc")).toBe("NYC");
    });

    it("should handle federal/international", () => {
      expect(normalizeJurisdiction("United States")).toBe("US");
      expect(normalizeJurisdiction("US")).toBe("US");
      expect(normalizeJurisdiction("Federal")).toBe("US");
      expect(normalizeJurisdiction("European Union")).toBe("EU");
      expect(normalizeJurisdiction("EU")).toBe("EU");
    });

    it("should return undefined for unrecognized jurisdictions", () => {
      expect(normalizeJurisdiction("Mars")).toBeUndefined();
      expect(normalizeJurisdiction("")).toBeUndefined();
    });
  });

  describe("normalizeJurisdictions", () => {
    it("should normalize multiple jurisdictions", () => {
      const result = normalizeJurisdictions(["Colorado", "California", "NYC"]);
      expect(result).toEqual(["CO", "CA", "NYC"]);
    });

    it("should filter out unrecognized jurisdictions", () => {
      const result = normalizeJurisdictions(["Colorado", "Mars", "California"]);
      expect(result).toEqual(["CO", "CA"]);
    });

    it("should handle empty array", () => {
      const result = normalizeJurisdictions([]);
      expect(result).toEqual([]);
    });
  });

  describe("getValidJurisdictions", () => {
    it("should return unique sorted list", () => {
      const jurisdictions = getValidJurisdictions();
      expect(jurisdictions).toContain("CO");
      expect(jurisdictions).toContain("CA");
      expect(jurisdictions).toContain("NYC");
      expect(jurisdictions).toContain("EU");
      expect(jurisdictions).toContain("US");

      // Should be sorted
      const sorted = [...jurisdictions].sort();
      expect(jurisdictions).toEqual(sorted);

      // Should be unique (no duplicates)
      expect(new Set(jurisdictions).size).toBe(jurisdictions.length);
    });
  });
});
