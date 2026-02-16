#!/usr/bin/env node

/**
 * AI-Reg-MCP Server (v0.2.0 — Thin Client)
 * Structured, queryable US AI and privacy law data via Model Context Protocol.
 * Connects to the AI-Reg remote API for data.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { AiRegApiClient } from "../api-client.js";

import {
  searchLawsToolName,
  searchLawsToolConfig,
  createSearchLawsHandler,
} from "./tools/search-laws.js";
import {
  getObligationsToolName,
  getObligationsToolConfig,
  createGetObligationsHandler,
} from "./tools/get-obligations.js";
import {
  compareJurisdictionsToolName,
  compareJurisdictionsToolConfig,
  createCompareJurisdictionsHandler,
} from "./tools/compare-jurisdictions.js";
import {
  getChangesToolName,
  getChangesToolConfig,
  createGetChangesHandler,
} from "./tools/get-changes.js";

const SIGNUP_URL = "https://ai-reg-api.vercel.app";
const API_BASE_URL = process.env.AI_REG_API_URL || "https://ai-reg-api.vercel.app";

async function main() {
  const apiKey = process.env.AI_REG_API_KEY;

  if (!apiKey) {
    console.error(
      `\nError: AI_REG_API_KEY environment variable is required.\n\n` +
      `Get a free API key at: ${SIGNUP_URL}\n\n` +
      `Then add it to your Claude Desktop config:\n\n` +
      `  {\n` +
      `    "mcpServers": {\n` +
      `      "ai-reg-mcp": {\n` +
      `        "command": "npx",\n` +
      `        "args": ["-y", "ai-reg-mcp-server"],\n` +
      `        "env": {\n` +
      `          "AI_REG_API_KEY": "your-key-here"\n` +
      `        }\n` +
      `      }\n` +
      `    }\n` +
      `  }\n`
    );
    process.exit(1);
  }

  const client = new AiRegApiClient(API_BASE_URL, apiKey);

  const server = new McpServer({
    name: "ai-reg-mcp",
    version: "0.2.0",
  });

  // Register all 4 tools
  server.tool(
    searchLawsToolName,
    searchLawsToolConfig.description,
    searchLawsToolConfig.inputSchema,
    createSearchLawsHandler(client)
  );

  server.tool(
    getObligationsToolName,
    getObligationsToolConfig.description,
    getObligationsToolConfig.inputSchema,
    createGetObligationsHandler(client)
  );

  server.tool(
    compareJurisdictionsToolName,
    compareJurisdictionsToolConfig.description,
    compareJurisdictionsToolConfig.inputSchema,
    createCompareJurisdictionsHandler(client)
  );

  server.tool(
    getChangesToolName,
    getChangesToolConfig.description,
    getChangesToolConfig.inputSchema,
    createGetChangesHandler(client)
  );

  // Connect via stdio
  const transport = new StdioServerTransport();
  await server.connect(transport);

  // Graceful shutdown
  process.on("SIGINT", () => process.exit(0));
  process.on("SIGTERM", () => process.exit(0));
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
