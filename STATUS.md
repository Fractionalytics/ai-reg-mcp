# AI-Reg-MCP Project Status

**Last Updated**: February 16, 2026
**Version**: 0.2.0 (thin client — not yet published to npm)
**Status**: Backend LIVE, MCP client ready to publish

## Architecture (v0.2.0)

```
Claude Desktop  →  MCP Server (npm)  →  AI-Reg API (Vercel Edge)  →  Turso DB
                   [public repo]         [private repo]
```

- **Public repo** (`ai-reg-mcp`): Thin MCP client, reads `AI_REG_API_KEY`, calls remote API
- **Private repo** (`ai-reg-api`): Hono on Vercel Edge Runtime, Turso (libSQL) database
- **Signup**: Email → instant API key at https://ai-reg-api.vercel.app

## Quick Stats

- **Laws**: 9 (all Tier 1 MVP laws)
- **Obligations**: 88 structured requirements
- **Changelog Entries**: 32 tracked changes
- **Tests**: 21/21 passing (10 api-client, 11 tool handlers — all mocked)
- **npm Package**: https://www.npmjs.com/package/ai-reg-mcp-server (v0.1.0 live, v0.2.0 pending)
- **GitHub**: https://github.com/Fractionalytics/ai-reg-mcp (public)
- **API**: https://ai-reg-api.vercel.app (live, all endpoints verified)

## What Changed: v0.1.0 → v0.2.0

| Aspect | v0.1.0 (Feb 13) | v0.2.0 (Feb 16) |
|--------|-----------------|-----------------|
| Data storage | Bundled SQLite (sql.js/WASM) | Remote API (Turso) |
| Dependencies | `sql.js`, `zod`, MCP SDK | `zod`, MCP SDK only |
| Package size | Large (WASM binary + DB) | Minimal (just JS) |
| IP protection | None (data in npm package) | Data behind authenticated API |
| User tracking | None | API key signups + usage |
| Update model | npm republish | Server-side, instant |
| Auth | None | `AI_REG_API_KEY` required |

## Completion Status

### Phase 1: Private Backend (ai-reg-api) — COMPLETE
- [x] GitHub repo created (private)
- [x] Hono API with 4 data endpoints + health + signup
- [x] Auth middleware (Bearer token validation)
- [x] Rate limiting (100/hr, 1000/day, 10000/month)
- [x] Signup page (static HTML, dark mode)
- [x] Turso database created and seeded (9 laws, 88 obligations, 32 changes)
- [x] Deployed to Vercel (Edge Runtime)
- [x] All endpoints tested end-to-end

### Phase 2: Refactor Public MCP (ai-reg-mcp) — COMPLETE
- [x] Created `src/api-client.ts` (HTTP client)
- [x] Created `src/mcp-server/tools/format-error.ts` (shared error handling)
- [x] Refactored `index.ts` (API key + client instead of DB)
- [x] Refactored all 4 tool handlers (client calls instead of queries)
- [x] Deleted local data files (db.ts, queries.ts, schema.ts, jurisdictions.ts, seed data, scripts)
- [x] Removed `sql.js` dependency
- [x] Bumped version to 0.2.0
- [x] Rewrote tests (21 passing, all mocked)
- [x] Updated README, CLAUDE.md, .well-known/mcp/server.json

### Phase 3: Publish & Deprecate — NOT STARTED
- [ ] `npm deprecate ai-reg-mcp-server@0.1.0` with upgrade message
- [ ] `npm publish` v0.2.0
- [ ] Test full E2E: signup → key → Claude Desktop → query
- [ ] Update MCP directory listings

### Phase 4: Distribute — NOT STARTED
- [ ] Reddit (r/ClaudeAI) announcement
- [ ] Smithery.ai deployment
- [ ] Monitor metrics (API signups, usage, npm downloads)

## Live API Endpoints

| Endpoint | Auth | Status |
|----------|------|--------|
| `GET /api/health` | No | Verified |
| `POST /api/auth/signup` | No | Verified |
| `GET /api/v1/laws` | Yes | Verified |
| `GET /api/v1/obligations` | Yes | Verified |
| `GET /api/v1/compare` | Yes | Verified |
| `GET /api/v1/changes` | Yes | Verified |

## Infrastructure

| Service | Details |
|---------|---------|
| **Vercel** | Edge Runtime, team `david-smiths-projects-d3732176` |
| **Turso** | `libsql://ai-reg-laws-dksmith01.aws-us-east-1.turso.io` |
| **npm** | `ai-reg-mcp-server` (v0.1.0 published, v0.2.0 pending) |
| **GitHub (public)** | `Fractionalytics/ai-reg-mcp` |
| **GitHub (private)** | `Fractionalytics/ai-reg-api` |

## Data Quality

### Seeded Laws (9 Tier 1)

1. **CO-SB24-205**: Colorado AI Act (10 obligations)
2. **CA-CCPA-ADMT**: California ADMT Regulations (13 obligations)
3. **CA-FEHA-AI**: California FEHA AI/ADS Employment Regs (7 obligations)
4. **NYC-LL-144**: NYC Automated Employment Decision Tools Law (11 obligations)
5. **IL-AIVIRA**: Illinois AI Video Interview Act (6 obligations)
6. **TX-TRAIGA**: Texas Responsible AI Governance Act (9 obligations)
7. **UT-SB226**: Utah AI Consumer Protection Amendments (8 obligations)
8. **EU-AI-ACT**: EU Artificial Intelligence Act (16 obligations)
9. **US-TAKE-IT-DOWN**: TAKE IT DOWN Act (8 obligations)

**Total**: 88 obligations, 32 changelog entries

## Dependencies (v0.2.0)

**Production:**
- `@modelcontextprotocol/sdk` ^1.12.0 (MCP server)
- `zod` ^3.24.0 (schema validation)

**Development:**
- `typescript` ^5.7.0
- `vitest` ^3.0.0
- `tsx` ^4.19.0
- `@types/node` ^22.10.0

**Removed in v0.2.0:** `sql.js` (no more WASM binary)

## Business Model

### Free Tier (Current)
- 9 Tier 1 laws via MCP
- API key required (instant signup)
- Rate limited: 100/hr, 1000/day, 10000/month
- Community support

### Paid API (Planned Q2 2026)
- 30+ laws (Tier 2 + 3)
- Real-time updates
- Semantic search
- Higher rate limits
- Commercial use license
- **Pricing**: $99-199/mo (estimated)

## Key Metrics to Track

- **API key signups** (demand signal — stronger than waitlist)
- **API usage** (requests per key, endpoint popularity)
- **npm downloads** (installation trend)
- **GitHub stars/issues** (community engagement)

## Project Links

- **npm**: https://www.npmjs.com/package/ai-reg-mcp-server
- **GitHub**: https://github.com/Fractionalytics/ai-reg-mcp
- **API**: https://ai-reg-api.vercel.app
- **Signup**: https://ai-reg-api.vercel.app (email → instant key)
- **Author**: david@fractionalytics.io

---

**Next action**: Phase 3 — `npm deprecate` v0.1.0 + `npm publish` v0.2.0
