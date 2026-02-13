import { z } from "zod";
import type { Database } from "sql.js";
import { compareJurisdictions } from "../../data/queries.js";

export const compareJurisdictionsToolName = "compare_jurisdictions";

export const compareJurisdictionsToolConfig = {
  description:
    "Compare AI/privacy law obligations across jurisdictions. Given a list of jurisdictions and optional filters, returns a side-by-side comparison grouped by obligation category.",
  inputSchema: {
    jurisdictions: z
      .array(z.string())
      .min(2)
      .describe("List of jurisdictions to compare (e.g. ['CO', 'CA', 'TX'])"),
    category: z
      .enum([
        "risk_assessment", "transparency", "documentation", "consumer_rights",
        "bias_testing", "human_oversight", "incident_reporting", "disclosure",
        "governance", "data_protection", "other",
      ])
      .optional()
      .describe("Filter comparison to a specific obligation category"),
    applies_to: z
      .string()
      .optional()
      .describe("Filter to obligations applying to this role (e.g. 'deployer')"),
  },
};

export function createCompareJurisdictionsHandler(db: Database) {
  return async (args: {
    jurisdictions: string[];
    category?: string;
    applies_to?: string;
  }) => {
    const comparison = compareJurisdictions(
      db,
      args as Parameters<typeof compareJurisdictions>[1]
    );

    if (comparison.length === 0) {
      return {
        content: [
          {
            type: "text" as const,
            text: "No obligations found for the specified jurisdictions and criteria.",
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(comparison, null, 2),
        },
      ],
    };
  };
}
