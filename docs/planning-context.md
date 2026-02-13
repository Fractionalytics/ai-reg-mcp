# Planning Context: Where We Left Off

## Summary

We've completed extensive strategic planning for AI-Reg-MCP — a structured, queryable data layer providing machine-readable US AI and privacy law data via MCP and REST API. The business analysis, market research, product strategy, competitive analysis, and legal liability framework are all documented in the `docs/` and `research/` folders.

**Technical architecture is implemented.** The MCP server skeleton, SQLite data layer, 4 MCP tools, seed data pipeline, and test suite are built and working. The project is now in the data curation phase.

---

## Decisions Already Made

These were discussed and decided during planning. Don't re-litigate unless the founder explicitly wants to revisit:

1. **Product**: Structured regulatory data as developer infrastructure (not a compliance tool, not a dashboard, not a newsletter)
2. **Vertical scope**: US state AI/privacy laws only at launch (most chaotic, fastest-changing, highest-demand, most underserved)
3. **MVP data**: 9 Tier 1 laws, expanding to 15 within first month (see `docs/product-strategy.md` for full list)
4. **Schema**: Obligation-level decomposition with categories, applicability, penalties, safe harbors, cross-references, change log (see `docs/product-strategy.md` for full schema)
5. **Distribution**: MCP-first (marketplace-native, no sales calls), REST API added within 30 days
6. **4 MCP tools**: search_laws, get_obligations, compare_jurisdictions, get_changes
7. **No web dashboard** — data infrastructure only
8. **Legal framework**: "As is" data, not legal advice. Need lawyer for ToS ($1-3K). Optional one-time dataset review ($2-5K). No licensing or registration required.

---

## Open Questions / Next Steps

These are the things that need to happen next, roughly in priority order:

### Completed

1. **Technical architecture** (DONE):
   - Storage: SQLite via `sql.js` (WASM-based, zero native deps, bundles with npm)
   - Language: TypeScript + `@modelcontextprotocol/sdk` v1.26
   - Hosting: Local npm package via stdio at launch; remote (Streamable HTTP) at weeks 4-5
   - MCP/REST: Shared data layer in `src/data/`, separate entry points
   - Schema: `laws`, `obligations`, `change_log` tables with JSON columns for nested fields
   - All 4 MCP tools implemented and tested (34 tests passing)
   - Seed pipeline: `data/seed/*.json` → `scripts/seed-db.ts` → `data/laws.db`
   - 2 example laws seeded: Colorado AI Act, California ADMT Regulations

### Immediate (Next Steps)

1. **Data curation workflow design**:
   - Detailed process for extracting obligations from statutory text using Claude
   - Validation checklist for each structured law entry
   - Sources to cross-reference against (Orrick tracker, BCLP tracker, IAPP resources, Drata's guides)
   - Template/tooling for the curation process

2. **Curate remaining Tier 1 laws** (7 more needed):
   - California FEHA AI/ADS employment regulations
   - Texas TRAIGA (HB 149)
   - Illinois AIVIRA
   - NYC Local Law 144
   - Utah AI Consumer Protection amendments
   - Federal TAKE IT DOWN Act
   - EU AI Act

3. **Naming and identity**:
   - Project/product name (AI-Reg-MCP is a working title)
   - Domain registration
   - GitHub organization/repo setup

### Implementation Phase

4. **Curate Tier 1 data** (the actual structured JSON for 9 laws):
   - Colorado AI Act (SB 24-205)
   - California ADMT Regulations
   - California FEHA AI/ADS employment regulations
   - Texas TRAIGA (HB 149)
   - Illinois AIVIRA
   - NYC Local Law 144
   - Utah AI Consumer Protection amendments
   - Federal TAKE IT DOWN Act
   - EU AI Act

5. **Build MCP server** with 4 tools (search_laws, get_obligations, compare_jurisdictions, get_changes)

6. **Test** with an MCP client 

7. **Publish** to MCP directories (mcp.so, Glama, PulseMCP)

8. **Build REST API** with API key auth and usage metering

### Post-Launch

9. **Add Tier 2 laws** (6 more, see product-strategy.md)
10. **Build agentic pipeline** for automated monitoring via LegiScan API + Federal Register API
11. **Pricing strategy** (consumption-based, freemium tier for discovery)
12. **Get ToS drafted by a lawyer**
13. **Optional**: One-time legal review of initial dataset

---

## Key Strategic Constraints

- **Founder is solo operator** with business/data science/coding skills. No marketing/sales team. Uses Windows 11 laptop for development.
- **Passive income goal**: Build once, maintain with agentic workflows. Avoid anything requiring ongoing sales calls or relationship management.
- **MCP ecosystem is the distribution channel**: Discovery through directories and developer communities, not outbound marketing.
- **Speed matters**: Colorado AI Act effective June 2026, EU AI Act August 2026. The compliance deadline pressure creates urgency for buyers, which creates urgency for us to be in market.

---

## Reference: How Other MCP Data Products Work

The Daloopa/CarbonArc model that inspired this:
- MCP servers deliver structured data directly into Claude, ChatGPT, Cursor, and agentic coding environments
- Listed on MCP directories (mcp.so has 17,000+ servers)
- Developers discover and integrate without sales calls
- Consumption-based pricing
- The MCP server is essentially a thin interface over a structured dataset with query tools

---

## Files in This Project

```
ai-reg-mcp/
├── README.md                      # Project overview and status
├── docs/
│   ├── market-analysis.md         # Competitive landscape, buyer personas, market dynamics
│   ├── product-strategy.md        # MVP scope, schema, data sources, build sequence
│   ├── legal-liability.md         # Disclaimers, UPL analysis, regulatory obligations
│   └── planning-context.md        # THIS FILE — where we left off, what's next
└── research/
    └── competitors.md             # Detailed competitive intelligence
```

When implementation begins, expected additional structure:
```
├── data/
│   └── laws/                      # Structured JSON files for each law
├── src/
│   ├── mcp-server/                # MCP server implementation
│   └── api/                       # REST API (added later)
├── scripts/
│   └── curation/                  # Tooling for data extraction and validation
└── tests/
```
