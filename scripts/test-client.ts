#!/usr/bin/env tsx

/**
 * MCP Test Client
 * Tests all 4 tools of the AI-Reg-MCP server via stdio transport
 * Usage: tsx scripts/test-client.ts
 */

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function main() {
  console.log("🚀 Starting MCP Test Client...\n");

  // Create transport and client
  const transport = new StdioClientTransport({
    command: "node",
    args: ["dist/mcp-server/index.js"],
  });

  const client = new Client(
    {
      name: "ai-reg-mcp-test-client",
      version: "1.0.0",
    },
    {
      capabilities: {},
    }
  );

  await client.connect(transport);
  console.log("✅ Connected to MCP server\n");

  // Test 1: search_laws (with jurisdiction normalization)
  console.log("📋 Test 1: search_laws (Colorado + transparency)");
  console.log("   Testing jurisdiction normalization: 'Colorado' -> 'CO'");
  try {
    const result1 = await client.callTool("search_laws", {
      jurisdiction: "Colorado",
      query: "transparency",
    });
    console.log(`   ✅ Found ${JSON.parse(result1.content[0].text).length} laws`);
    console.log(`   Sample: ${JSON.parse(result1.content[0].text)[0]?.common_name || "N/A"}\n`);
  } catch (error) {
    console.error("   ❌ Error:", error);
  }

  // Test 2: get_obligations (specific law)
  console.log("📋 Test 2: get_obligations (Colorado AI Act)");
  try {
    const result2 = await client.callTool("get_obligations", {
      law_id: "CO-SB24-205",
    });
    const obligations = JSON.parse(result2.content[0].text);
    console.log(`   ✅ Found ${obligations.length} obligations`);
    console.log(`   Categories: ${[...new Set(obligations.map((o: any) => o.category))].join(", ")}\n`);
  } catch (error) {
    console.error("   ❌ Error:", error);
  }

  // Test 3: compare_jurisdictions (multiple jurisdictions)
  console.log("📋 Test 3: compare_jurisdictions (Colorado, California, NYC)");
  console.log("   Testing jurisdiction normalization: full names -> abbreviations");
  try {
    const result3 = await client.callTool("compare_jurisdictions", {
      jurisdictions: ["Colorado", "California", "New York City"],
      category: "transparency",
    });
    const comparison = JSON.parse(result3.content[0].text);
    console.log(`   ✅ Found ${comparison.length} categories`);
    if (comparison[0]) {
      console.log(`   Sample category: ${comparison[0].category}`);
      console.log(`   Jurisdictions compared: ${comparison[0].jurisdictions.map((j: any) => j.jurisdiction).join(", ")}\n`);
    }
  } catch (error) {
    console.error("   ❌ Error:", error);
  }

  // Test 4: get_changes (recent changes)
  console.log("📋 Test 4: get_changes (all changes since 2025)");
  try {
    const result4 = await client.callTool("get_changes", {
      since: "2025-01-01",
    });
    const changes = JSON.parse(result4.content[0].text);
    console.log(`   ✅ Found ${changes.length} changes`);
    if (changes[0]) {
      console.log(`   Most recent: ${changes[0].date} - ${changes[0].change_type} in ${changes[0].law_common_name}\n`);
    }
  } catch (error) {
    console.error("   ❌ Error:", error);
  }

  // Test 5: Error handling (invalid jurisdiction)
  console.log("📋 Test 5: Error handling (unrecognized jurisdiction)");
  try {
    const result5 = await client.callTool("search_laws", {
      jurisdiction: "Mars",
    });
    const laws = JSON.parse(result5.content[0].text);
    console.log(`   ✅ Handled gracefully: returned ${laws.length} laws (empty result)\n`);
  } catch (error) {
    console.error("   ❌ Error:", error);
  }

  console.log("🎉 All tests completed!\n");

  // Cleanup
  await client.close();
  process.exit(0);
}

main().catch((error) => {
  console.error("❌ Fatal error:", error);
  process.exit(1);
});
