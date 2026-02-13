# Competitive Intelligence

## Direct Competitors & Adjacent Players

### Enterprise GRC / Regulatory Intelligence

#### Regology
- **What**: AI-powered regulatory intelligence platform with "Smart Law Library," regulatory change agent, GenAI assistant (Reggi)
- **Coverage**: Global jurisdictions, industry-agnostic
- **Moat**: Years of proprietary data ingestion pipeline + legal experts validating AI interpretation
- **Pricing**: Enterprise ($50K-200K+/year estimated)
- **Distribution**: Enterprise sales
- **Threat level**: LOW — different market segment entirely. They sell to CPOs through sales teams. We sell to developers through MCP directories.
- **Key insight**: They will never be our customer (already built their own data), but the companies trying to compete with them WILL be our customers.

#### Compliance.ai (now Archer Evolv)
- **What**: API-accessible regulatory change management
- **Coverage**: Federal/state agencies/enforcements/publications, financial services focused
- **Moat**: ML-powered regulatory parsing engine, developer program
- **Threat level**: LOW-MEDIUM — narrowly scoped to financial services, has API but not MCP-native

#### Drata / Sprinto / Vanta / AuditBoard
- **What**: GRC platforms where regulatory tracking is one feature among many (SOC 2, ISO 27001, etc.)
- **Relevance**: Potential customers if they want to add AI regulatory coverage without building own data team
- **Threat level**: LOW — they're platforms, not data infrastructure

#### FairNow
- **What**: AI compliance software specifically for AI governance
- **Relevance**: Potential customer — needs regulatory data to power their platform
- **Threat level**: LOW

#### Norm AI
- **What**: Turns regulations into AI agents for financial institutions. Backed by Blackstone/New York Life advisors.
- **Relevance**: Strong potential customer — needs structured regulatory data as input to their AI agents
- **Threat level**: LOW — they build the intelligence layer, we provide the data layer

### Data Sources (Potential Upstream Partners)

#### LegiScan
- **What**: Impartial legislative tracking across all 50 states + Congress
- **API**: Structured JSON, bill details, status, sponsors, full text, roll calls
- **Free tier**: 30K queries/month (Pull API)
- **Paid**: Pull (100-250K queries/month), Push (real-time updates every 15 min - 4 hours)
- **Coverage**: 165,000+ pieces of legislation tracked in active biennium
- **Key**: This is our backbone for tracking new bills and amendments at the state level
- **Licensing**: Need to verify terms of use re: commercial redistribution of derived data

#### Federal Register API
- **What**: All daily Federal Register content since 1994
- **Access**: Free, no API key needed, JSON format
- **Endpoints**: Search, fetch single/multiple documents, public inspection, agency data
- **Pagination**: Up to 2,000 results per query
- **Key**: Foundation for federal rulemaking tracking (proposed rules, final rules, notices, EOs)

#### Regulations.gov API
- **What**: Public comment data on federal rulemakings
- **Access**: Free with API key (register at api.data.gov)
- **Endpoints**: Documents, comments, dockets
- **Rate limits**: Per-hour limits based on API key

#### eCFR API
- **What**: Electronic Code of Federal Regulations, updated daily
- **Access**: Free, no auth
- **Key**: Codified text of current federal regulations

#### GovInfo API
- **What**: GPO's API for government publications including Federal Register, Congressional Record, CFR
- **Access**: Free with api.data.gov key
- **Endpoints**: Collections, packages, granules

### Closest Existing "MCP-Native" Product

#### Apify Regulatory Intelligence API
- **What**: Community-built scraper on Apify marketplace
- **Coverage**: Federal Register + regulations.gov only
- **Output**: RAG-ready
- **Pricing**: Cheap
- **Threat level**: LOW — extremely limited scope, no state coverage, no structured obligation decomposition
- **Key insight**: Proves the concept works on marketplace infrastructure but only scratches the surface

### Law Firm Trackers (Free, Static)

These prove demand exists but don't serve the developer buyer:

| Firm | Tracker | Format | Limitation |
|------|---------|--------|------------|
| Orrick | State AI legislation tracker | Web page | Not structured data, not queryable |
| BCLP | AI regulatory tracker | Web/PDF | Static, periodic updates |
| Baker Botts | AI law summary | Web/PDF | Not machine-readable |
| MultiState | State AI legislation map | Interactive web | No API |
| IAPP | AI governance resource center | Web/PDF | Comprehensive but not structured data |

---

## Why This Gap Exists

Three structural reasons nobody has built what we're building:

1. **State-level data is genuinely hard**: No equivalent of the Federal Register for state regulations. Each state has own administrative code, publication process, update cadence. Some publish electronically in structured formats, others PDFs or don't digitize.

2. **Existing players optimized for different buyers**: Regology built for CPOs using web dashboards. LexisNexis built for lawyers using search interfaces. Neither optimized for AI agents querying programmatically through MCP.

3. **The MCP ecosystem is new**: The distribution channel (MCP directories, agent-native integration) didn't exist until recently. Existing data companies haven't adapted because their enterprise sales motion still works. But new entrants building AI-native tools need AI-native data infrastructure.

---

## Analogies

| Company | What They Did | Our Equivalent |
|---------|---------------|----------------|
| **Daloopa** | Structured financial data from SEC filings → API/MCP for hedge funds and fintech. Goldman has own analysts; Daloopa serves the next 200 funds. | Structured regulatory data from statutes → MCP/API for compliance startups and engineering teams. Regology has own pipeline; we serve the next 50 compliance companies. |
| **Twilio** | Before Twilio, every company built own telecom integration. Now they call an API. | Before us, every compliance startup builds own regulatory data pipeline. We give them an MCP call. |
