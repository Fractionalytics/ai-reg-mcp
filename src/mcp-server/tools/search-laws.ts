import { z } from "zod";
import type { Database } from "sql.js";
import { searchLaws } from "../../data/queries.js";

export const searchLawsToolName = "search_laws";

export const searchLawsToolConfig = {
  description:
    "Search US AI and privacy laws by jurisdiction, status, effective date range, applicability, and category. Returns matching laws with summary-level data.",
  inputSchema: {
    jurisdiction: z
      .string()
      .optional()
      .describe("Filter by jurisdiction (e.g. 'CO', 'CA', 'TX', 'US-federal', 'EU')"),
    status: z
      .enum(["enacted", "effective", "proposed", "amended"])
      .optional()
      .describe("Filter by law status"),
    effective_date_after: z
      .string()
      .optional()
      .describe("Only laws effective on or after this date (YYYY-MM-DD)"),
    effective_date_before: z
      .string()
      .optional()
      .describe("Only laws effective on or before this date (YYYY-MM-DD)"),
    applies_to: z
      .string()
      .optional()
      .describe("Filter to laws with obligations applying to this role (e.g. 'deployer', 'developer')"),
    category: z
      .enum([
        "risk_assessment", "transparency", "documentation", "consumer_rights",
        "bias_testing", "human_oversight", "incident_reporting", "disclosure",
        "governance", "data_protection", "other",
      ])
      .optional()
      .describe("Filter to laws with obligations in this category"),
    query: z
      .string()
      .optional()
      .describe("Free-text search across law name, summary, and citation"),
  },
};

export function createSearchLawsHandler(db: Database) {
  return async (args: {
    jurisdiction?: string;
    status?: string;
    effective_date_after?: string;
    effective_date_before?: string;
    applies_to?: string;
    category?: string;
  }) => {
    const laws = searchLaws(db, args as Parameters<typeof searchLaws>[1]);

    if (laws.length === 0) {
      return {
        content: [
          {
            type: "text" as const,
            text: "No laws found matching the specified criteria.",
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(laws, null, 2),
        },
      ],
    };
  };
}
