# Market Analysis: AI/Privacy Regulatory Compliance Data

## The Regulatory Landscape — Genuine Chaos

### By the Numbers (2025-2026)
- **1,200+ AI-related bills** introduced across all 50 states in 2025 (up from <200 in 2023)
- **38 states** adopted **100+ AI-related laws** by late 2025
- **No comprehensive federal AI law** — current administration trying to preempt state laws via executive order but hasn't succeeded, creating more uncertainty, not less

### 2026 Inflection Point — Laws Becoming Enforceable
| Law | Jurisdiction | Effective Date | Significance |
|-----|-------------|---------------|--------------|
| Colorado AI Act (SB 24-205) | CO | June 30, 2026 | Bellwether state-level AI law, risk-based framework |
| California ADMT Regulations | CA | January 1, 2026 | Under CCPA, risk assessments + opt-out rights |
| Texas TRAIGA (HB 149) | TX | January 1, 2026 | Prohibits discriminatory AI deployment |
| EU AI Act | EU | August 2, 2026 | Full applicability, comprehensive risk framework |
| California SB 243 (companion chatbot) | CA | January 2026 | AI chatbot-specific regulation |
| New York AI Transparency in Advertising | NY | January 2026 | Disclosure requirements |

### Core Pain Point
Nobody knows what rules apply to them, and the answer changes every month. Companies operating across multiple states face an N-dimensional compliance matrix that is fundamentally a computational problem, not a human-reading-reports problem.

---

## Competitive Landscape

### Tier 1: Enterprise GRC Platforms (NOT our lane)
These sell to CPOs for $50K-200K+/year through enterprise sales teams:

- **Regology**: Most direct competitor conceptually. AI-powered regulatory intelligence with "Smart Law Library," regulatory change agent, GenAI assistant (Reggi), covers global jurisdictions. Has spent years building proprietary data ingestion pipeline + legal experts validating AI interpretation. Enterprise sales model.
- **Compliance.ai (now Archer Evolv)**: API-accessible regulatory change management, financial services focused, has developer program. Narrowly scoped.
- **Drata, AuditBoard, Sprinto**: GRC platforms including regulatory tracking as one feature among many. Not data infrastructure.
- **FairNow**: AI compliance software specifically for AI governance. Narrow.

### Tier 2: Existing Data Sources (raw, unstructured)
- **Federal Register API**: Free, no auth, JSON format. All federal rules/proposed rules/notices. Well-documented. Good foundation.
- **Regulations.gov API**: Free with API key. Public comment data on federal rulemakings.
- **eCFR API**: Codified federal regulations, updated daily.
- **LegiScan API**: Structured JSON for state legislation across all 50 states + Congress. Free tier: 30K queries/month. Bill status, full text, vote records, sponsors. Push API available for paid subscribers (real-time updates every 15 min to 4 hours).
- **Apify Regulatory Intelligence API**: Community-built scraper covering Federal Register + regulations.gov. RAG-ready output. Cheap. Closest existing "MCP-native" regulatory data product but limited to federal sources only.

### Tier 3: Law Firm Trackers (free, static, human-readable)
- Orrick, BCLP, Baker Botts, MultiState, IAPP all publish free AI law trackers
- Web pages and PDFs, NOT structured data, NOT queryable by agents, NOT continuously updated in real time
- Exist because demand is so intense that law firms publish them as marketing/thought leadership
- Prove the market exists but don't serve the developer buyer

### Key Insight: The Gap
Nobody provides the transformation layer that turns raw legal text into structured, machine-queryable data optimized for AI agents. Law firm trackers tell you "Colorado passed SB-205." Our data service tells an agent: "Here are 14 specific obligations applying to a deployer of high-risk AI system in Colorado, with effective dates, penalty structures, definitions of key terms, cross-references to similar obligations in 7 other states, structured as machine-readable JSON with citation links."

---

## Buyer Personas

### Persona 1: Chief Privacy Officer / AI Compliance Officer
- **Who**: CPOs at mid-to-large companies, 68% have acquired AI governance responsibilities (IAPP 2025)
- **Pain**: Burned out (42% considering role changes), drowning in regulatory changes
- **Current tools**: Regology, Drata, FairNow ($50K-200K+/year)
- **NOT the MCP buyer**: Not developers, not building AI workflows, using web dashboards/email alerts
- **Relevance**: They are the end-users of the tools built by Persona 2 and 3

### Persona 2: Compliance/GRC SaaS Companies — THE KEY BUYER
- **Who**: Startups building AI compliance tools (Norm AI, FairNow, Drata, Sprinto, Vanta, Scytale, YC compliance cohort, dozens more)
- **Pain**: All independently building same underlying data pipeline from scratch before they can build their actual product
- **What they need**: Current text of every relevant AI/privacy law, structured by jurisdiction, with change tracking, effective dates, penalty structures, applicability criteria
- **Why they buy**: Time to market (saves 3-6 months), data pipeline isn't where they win (their value is the workflow/analysis on top), maintenance is the hard part
- **The Daloopa analogy**: We don't compete with hedge funds using the data — we provide data infrastructure making their analysis possible

#### Build vs. Buy Tips in Our Favor for Persona 2
1. **Time to market**: Colorado AI Act effective June 2026. Every month a startup spends building data pipeline is a month not shipping product while compliance deadlines tick.
2. **Data pipeline isn't their moat**: Norm AI's customer pays for the AI agent mapping regulation to policies, not the raw text. FairNow's customer pays for testing/monitoring workflow, not which states have AI laws.
3. **Maintenance is the hard part**: Any team can scrape 10 laws in a few weeks. Six months later, 3 laws amended, 2 new states passed legislation, 4 enforcement actions clarify interpretation. Maintaining an agentic data maintenance system permanently is a brutal tax on a startup with 8 engineers.

#### Who Won't Buy
- Companies that already invested heavily in proprietary data ingestion as competitive moat (Regology, Compliance.ai)
- The buyer is not the incumbent — it's the **next 50 companies** entering the market

### Persona 3: Engineering/Product Teams Deploying AI
- **Who**: Any company using AI in hiring, lending, healthcare, insurance, customer-facing decisions
- **Pain**: Need to programmatically check "What laws apply to this AI system, in this jurisdiction, for this use case?" at deployment time
- **What they need**: API/MCP call embedded in CI/CD pipelines, model deployment workflows, product review processes
- **Why they buy**: Can't justify $100K GRC platform for a compliance check; need simple API call

---

## Distribution Strategy: MCP as the Marketplace

### Why MCP First
- MCP (Model Context Protocol) IS the marketplace-native distribution for data businesses targeting AI systems
- Daloopa and CarbonArc have proven the model: MCP servers deliver structured data directly into Claude, ChatGPT, Cursor, and agentic coding environments
- Distribution through MCP directories (mcp.so has 17,000+ servers, Glama, PulseMCP, official Anthropic registry) plus API marketplaces like RapidAPI
- Developers discover and integrate without sales calls
- Consumption-based pricing model

### No Sales Calls Required
This directly addresses the founder's weakness (marketing/sales). The distribution channels are:
1. MCP directories (mcp.so, Glama, PulseMCP, Anthropic registry)
2. API marketplaces (RapidAPI)
3. Developer communities (HN, r/legaltech, AI compliance Slack/Discord)
4. Content from authority in the space (optional but helpful)

---

## Market Structure Summary

```
TOP:      Enterprise GRC (Regology, Drata, Archer) → CPOs, $50-200K/yr, sales teams
          NOT OUR LANE

MIDDLE:   Compliance SaaS startups (Norm AI, FairNow, Sprinto, YC cohort)
          → All building own data pipelines independently
          → THESE ARE OUR CUSTOMERS (Persona 2)

BOTTOM:   Engineering teams building compliance checks into products
          → Need simple API/MCP call, not $100K platform
          → ALSO OUR CUSTOMERS (Persona 3)
```

---

## Risk: Commoditization
If data itself becomes freely available in structured form, moat erodes. Currently IAPP, Orrick, etc. publish free trackers but as web pages/PDFs. If someone like IAPP published a free structured API, that's a threat.

**Defense** (same as Daloopa's): Raw data availability isn't the threat — value is in structuring, normalization, entity resolution, cross-jurisdictional mapping, and continuous maintenance. The transformation layer is the product.
