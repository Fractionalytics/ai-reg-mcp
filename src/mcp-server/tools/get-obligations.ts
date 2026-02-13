import { z } from "zod";
import type { Database } from "sql.js";
import { getObligations } from "../../data/queries.js";

export const getObligationsToolName = "get_obligations";

export const getObligationsToolConfig = {
  description:
    "Get structured obligations from AI/privacy laws. Filter by law, jurisdiction, role, or obligation category. Returns discrete, categorized obligations that agents can reason over.",
  inputSchema: {
    law_id: z
      .string()
      .optional()
      .describe("Specific law ID (e.g. 'CO-SB24-205')"),
    jurisdiction: z
      .string()
      .optional()
      .describe("Filter by jurisdiction (e.g. 'CO', 'CA')"),
    applies_to: z
      .string()
      .optional()
      .describe("Filter by who the obligation applies to (e.g. 'deployer', 'developer')"),
    category: z
      .enum([
        "risk_assessment", "transparency", "documentation", "consumer_rights",
        "bias_testing", "human_oversight", "incident_reporting", "disclosure",
        "governance", "data_protection", "other",
      ])
      .optional()
      .describe("Filter by obligation category"),
  },
};

export function createGetObligationsHandler(db: Database) {
  return async (args: {
    law_id?: string;
    jurisdiction?: string;
    applies_to?: string;
    category?: string;
  }) => {
    const obligations = getObligations(
      db,
      args as Parameters<typeof getObligations>[1]
    );

    if (obligations.length === 0) {
      return {
        content: [
          {
            type: "text" as const,
            text: "No obligations found matching the specified criteria.",
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(obligations, null, 2),
        },
      ],
    };
  };
}
