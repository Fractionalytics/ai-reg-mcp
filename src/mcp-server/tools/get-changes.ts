import { z } from "zod";
import type { AiRegApiClient } from "../../api-client.js";
import { formatErrorResponse } from "./format-error.js";

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

export function createGetChangesHandler(client: AiRegApiClient) {
  return async (args: {
    since?: string;
    until?: string;
    law_id?: string;
    change_type?: string;
  }) => {
    try {
      const changes = await client.getChanges(args as any);

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
    } catch (error) {
      return formatErrorResponse(error);
    }
  };
}
