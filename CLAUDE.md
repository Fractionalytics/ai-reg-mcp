# CLAUDE.md

## Project: AI-Reg-MCP

Structured, queryable US AI and privacy law data via MCP (Model Context Protocol).

### Architecture

- **Language:** TypeScript + `@modelcontextprotocol/sdk`
- **Storage:** SQLite via `sql.js` (WASM-based, zero native dependencies)
- **Distribution:** Local npm package via stdio transport (`npx @ai-reg-mcp/server`)
- **Data flow:** Curated JSON in `data/seed/` → `npm run seed` → `data/laws.db` → MCP tools

### Project Structure

```
src/
  data/
    db.ts          — SQLite connection setup (singleton, file or in-memory)
    schema.ts      — CREATE TABLE statements
    queries.ts     — Core query functions (searchLaws, getObligations, compareJurisdictions, getChanges)
    types.ts       — TypeScript interfaces matching product-strategy schema
  mcp-server/
    index.ts       — Entry point: McpServer + stdio transport
    tools/         — One file per MCP tool (search-laws, get-obligations, compare-jurisdictions, get-changes)

data/
  seed/            — Curated JSON files (authoritative source, one per law)
  laws.db          — Built artifact (gitignored), ships with npm package

scripts/
  seed-db.ts       — Reads data/seed/*.json → populates SQLite
  validate-data.ts — Validates seed JSON against Zod schemas

tests/
  data/            — Query function tests
  mcp-server/      — MCP tool handler tests
```

### Key Commands

- `npm run validate` — Validate seed data against schema
- `npm run seed` — Build laws.db from seed JSON
- `npm run build` — Compile TypeScript
- `npm test` — Run all tests
- `npm start` — Start MCP server (stdio)

### Strategic Context

Read these for background (don't re-litigate decisions):
1. `docs/planning-context.md` — Project status and next steps
2. `docs/product-strategy.md` — MVP scope, schema design, data sources
3. `docs/market-analysis.md` — Market dynamics, buyer personas
4. `docs/legal-liability.md` — Legal framework and risk mitigation
5. `research/competitors.md` — Competitive intelligence

### What NOT to do:
- Don't build a web dashboard or UI — this is data infrastructure
- Don't build anything that could be construed as legal advice
- Don't over-engineer — MVP is a curated dataset + simple MCP server
- Don't add REST API yet — that's weeks 4-5
