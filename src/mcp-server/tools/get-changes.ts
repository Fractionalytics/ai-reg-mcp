import { z } from "zod";
import type { Database } from "sql.js";
import { getChanges } from "../../data/queries.js";

export const getChangesToolName = "get_changes";

export const getChangesToolConfig = {
  description:
    "Get recent changes (amendments, delays, enforcement actions, new guidance) across tracked AI/privacy laws. The 'what's new' feed for staying current on regulatory changes.",
  inputSchema: {
    since: z
      .string()
      .optional()
      .describe("Only changes on or after this date (YYYY-MM-DD)"),
    until: z
      .string()
      .optional()
      .describe("Only changes on or before this date (YYYY-MM-DD)"),
    law_id: z
      .string()
      .optional()
      .describe("Filter to changes for a specific law"),
    change_type: z
      .enum(["amendment", "delay", "guidance", "enforcement_action", "new_law"])
      .optional()
      .describe("Filter by type of change"),
  },
};

export function createGetChangesHandler(db: Database) {
  return async (args: {
    since?: string;
    until?: string;
    law_id?: string;
    change_type?: string;
  }) => {
    const changes = getChanges(
      db,
      args as Parameters<typeof getChanges>[1]
    );

    if (changes.length === 0) {
      return {
        content: [
          {
            type: "text" as const,
            text: "No changes found for the specified criteria.",
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(changes, null, 2),
        },
      ],
    };
  };
}
