#!/usr/bin/env node

/**
 * AI-Reg-MCP Server
 * Structured, queryable US AI and privacy law data via Model Context Protocol.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { getDatabase, closeDatabase } from "../data/db.js";

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

async function main() {
  const db = await getDatabase();

  const server = new McpServer({
    name: "ai-reg-mcp",
    version: "0.1.0",
  });

  // Register all 4 tools
  server.tool(
    searchLawsToolName,
    searchLawsToolConfig.description,
    searchLawsToolConfig.inputSchema,
    createSearchLawsHandler(db)
  );

  server.tool(
    getObligationsToolName,
    getObligationsToolConfig.description,
    getObligationsToolConfig.inputSchema,
    createGetObligationsHandler(db)
  );

  server.tool(
    compareJurisdictionsToolName,
    compareJurisdictionsToolConfig.description,
    compareJurisdictionsToolConfig.inputSchema,
    createCompareJurisdictionsHandler(db)
  );

  server.tool(
    getChangesToolName,
    getChangesToolConfig.description,
    getChangesToolConfig.inputSchema,
    createGetChangesHandler(db)
  );

  // Connect via stdio
  const transport = new StdioServerTransport();
  await server.connect(transport);

  // Graceful shutdown
  process.on("SIGINT", () => {
    closeDatabase();
    process.exit(0);
  });
  process.on("SIGTERM", () => {
    closeDatabase();
    process.exit(0);
  });
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
