# CLAUDE.md — AI-Reg-MCP (Public Repo)

## Overview

This is the **public MCP client** for AI-Reg. This repo contains:
- MCP server implementation (thin client)
- npm package distribution (`ai-reg-mcp-server`)
- Client-side tool handlers
- Tests (21 passing)
- Marketing-focused README

**For development, data, and product strategy**, see the private `ai-reg-api` repository.

## Architecture

This is a **thin client** — no data is bundled here. The MCP server calls a remote API.

```
Claude Desktop → MCP Server (this repo) → AI-Reg API (private) → Turso DB
```

## Project Structure

```
src/
  api-client.ts          — HTTP client for remote API
  data/
    types.ts             — TypeScript interfaces (shared with backend)
  mcp-server/
    index.ts             — Entry point, reads API key, registers tools
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

## Key Commands

- `npm test` — Run all tests (21 tests, must pass before publish)
- `npm run build` — Compile TypeScript
- `npm start` — Start MCP server (requires `AI_REG_API_KEY`)
- `npm publish` — Publish to npm (after tests pass)

## Development Workflow

### Making Changes to MCP Tools
1. Modify tool handlers in `src/mcp-server/tools/*.ts`
2. Update corresponding tests in `tests/`
3. Run `npm test` — all tests must pass
4. Commit changes with descriptive message
5. Bump version in `package.json`
6. Run `npm publish`
7. Update MCP directory listings

### Testing
- All tests use mocked API responses (no real API calls)
- Test both success and error cases
- Verify error handling and formatting

### Git Workflow
- Commit after tests pass
- Descriptive commit messages
- Never force push to main
- Never commit `.env` or API keys

## What This Repo Does

- **Exposes 4 MCP tools** to Claude Desktop
- **Validates input parameters** using Zod schemas
- **Calls remote API** via `AiRegApiClient`
- **Formats responses** for Claude
- **Handles errors gracefully** with user-friendly messages

## What This Repo Does NOT Do

- ❌ Store or bundle law data (data is server-side)
- ❌ Contain product strategy or business docs (private repo only)
- ❌ Implement database queries (API handles that)
- ❌ Provide legal advice (reference data only)

## Environment Variables

- `AI_REG_API_KEY` (required) — Get free key at https://ai-reg-api.vercel.app
- `AI_REG_API_URL` (optional) — API base URL (defaults to production)

## Dependencies

**Production:**
- `@modelcontextprotocol/sdk` ^1.12.0
- `zod` ^3.24.0

**Development:**
- `typescript` ^5.7.0
- `vitest` ^3.0.0
- `tsx` ^4.19.0
- `@types/node` ^22.10.0

## Links

- **npm**: https://www.npmjs.com/package/ai-reg-mcp-server
- **API Signup**: https://ai-reg-api.vercel.app
- **Issues**: https://github.com/Fractionalytics/ai-reg-mcp/issues
- **Contact**: david@fractionalytics.io

## For Proprietary Information

See the private `ai-reg-api` repository for:
- Backend API implementation
- Database schema and queries
- Data curation and seeding
- Product strategy and roadmap
- Business model and pricing
- Launch materials and marketing
