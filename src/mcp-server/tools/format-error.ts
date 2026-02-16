/**
 * Shared error formatting for MCP tool responses.
 */

import { ApiError } from "../../api-client.js";

export function formatErrorResponse(error: unknown) {
  if (error instanceof ApiError) {
    return {
      content: [
        {
          type: "text" as const,
          text: `API Error (${error.code}): ${error.message}`,
        },
      ],
      isError: true,
    };
  }
  return {
    content: [
      {
        type: "text" as const,
        text: `Error: ${error instanceof Error ? error.message : "Unknown error connecting to AI-Reg API"}`,
      },
    ],
    isError: true,
  };
}
