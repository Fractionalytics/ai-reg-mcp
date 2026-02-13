/**
 * Jurisdiction normalization and validation
 * Maps common name variations to canonical abbreviations
 */

export const JURISDICTION_MAP: Record<string, string> = {
  // US States - full names
  "california": "CA",
  "colorado": "CO",
  "illinois": "IL",
  "texas": "TX",
  "utah": "UT",

  // US States - abbreviations (canonical)
  "ca": "CA",
  "co": "CO",
  "il": "IL",
  "tx": "TX",
  "ut": "UT",

  // Cities
  "new york city": "NYC",
  "nyc": "NYC",

  // Federal/International
  "united states": "US",
  "us": "US",
  "federal": "US",
  "us-federal": "US",
  "european union": "EU",
  "eu": "EU",
};

/**
 * Normalize a jurisdiction string to its canonical abbreviation
 * Case-insensitive matching, returns undefined if not recognized
 */
export function normalizeJurisdiction(jurisdiction: string): string | undefined {
  const normalized = JURISDICTION_MAP[jurisdiction.toLowerCase().trim()];
  return normalized;
}

/**
 * Get all valid jurisdiction abbreviations
 */
export function getValidJurisdictions(): string[] {
  return Array.from(new Set(Object.values(JURISDICTION_MAP))).sort();
}

/**
 * Normalize multiple jurisdictions for comparison queries
 */
export function normalizeJurisdictions(jurisdictions: string[]): string[] {
  return jurisdictions
    .map(j => normalizeJurisdiction(j))
    .filter((j): j is string => j !== undefined);
}
