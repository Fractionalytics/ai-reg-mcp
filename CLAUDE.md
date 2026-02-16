# CLAUDE.md

## Project: AI-Reg-MCP (v0.2.0 — Thin Client)

Structured, queryable US AI and privacy law data via MCP (Model Context Protocol).

### Architecture

- **Language:** TypeScript + `@modelcontextprotocol/sdk`
- **Pattern:** Thin client — MCP server calls remote API, no local data
- **Distribution:** npm package via stdio transport (`npx ai-reg-mcp-server`)
- **Data flow:** MCP tools → `AiRegApiClient` (fetch) → AI-Reg API (Vercel) → Turso DB
- **Auth:** `AI_REG_API_KEY` env var, Bearer token to API

### Project Structure

```
src/
  api-client.ts    — HTTP client for remote API (AiRegApiClient class)
  data/
    types.ts       — TypeScript interfaces (shared with backend)
  mcp-server/
    index.ts       — Entry point: reads API key, creates client, registers tools
    tools/
      search-laws.ts           — search_laws tool handler
      get-obligations.ts       — get_obligations tool handler
      compare-jurisdictions.ts — compare_jurisdictions tool handler
      get-changes.ts           — get_changes tool handler
      format-error.ts          — Shared error formatting

tests/
  api-client.test.ts     — API client tests (mocked fetch)
  mcp-server/
    tools.test.ts        — Tool handler tests (mocked client)
```

### Key Commands

- `npm run build` — Compile TypeScript
- `npm test` — Run all tests
- `npm start` — Start MCP server (stdio, requires AI_REG_API_KEY)

### Backend (Private Repo: ai-reg-api)

The data lives in a separate private repo (`Fractionalytics/ai-reg-api`):
- Hono on Vercel serverless
- Turso (libSQL) database
- API key auth + rate limiting
- Signup page at root

### Project Status

**See STATUS.md** for current project status, completion tracking, and roadmap.

### Development Workflow

**After successful tests:**
1. Run `npm test` to verify all tests pass
2. If tests pass, commit changes to git with descriptive message
3. Follow git safety protocol (see below)

### What NOT to do:
- Don't bundle data in this package — it's a thin client
- Don't build anything that could be construed as legal advice
- Don't add local database code — queries run server-side

### Git Workflow
- Always commit changes after tests succeed
- Use descriptive commit messages that explain the "why"
- Don't force push to main/master
- Don't commit sensitive files (.env, credentials, API keys)
