# Product Strategy: AI-Reg-MCP

## Core Principle

**The MVP is a curated dataset, not a data pipeline.** At launch, we don't need real-time automated ingestion. We need a hand-curated, AI-assisted, high-quality structured dataset of the ~15-20 laws that actually matter right now, exposed through an interface developers can query. The pipeline comes later. Data quality and schema design are what matter on day one.

First users won't judge on coverage breadth. They'll judge on whether the data for Colorado SB-205 is accurate, complete, and structured in a way their agent can reason over. One perfectly structured law is worth more than 50 poorly structured ones.

---

## Minimum Viable Data: The "Top 15"

### Tier 1 — Must-have at launch (enforceable or effective H1 2026)
1. **Colorado AI Act (SB 24-205)** — effective June 30, 2026, the bellwether
2. **California ADMT Regulations under CCPA** — effective January 1, 2026
3. **California FEHA AI/ADS employment regulations** — effective October 2025
4. **Texas TRAIGA (HB 149)** — effective January 1, 2026
5. **Illinois AI Video Interview Act (AIVIRA)** — already effective
6. **NYC Local Law 144** — automated employment decision tools — already effective
7. **Utah AI Consumer Protection amendments** — effective May 2025
8. **Federal TAKE IT DOWN Act** — platforms must comply by May 2026
9. **EU AI Act** — full applicability August 2, 2026

### Tier 2 — Add within first month
10. Colorado DOI rules on AI in insurance (3 CCR 702-10) — already effective
11. California SB 942 (AI Transparency Act)
12. California SB 243 (companion chatbot regulation) — effective January 2026
13. New York AI Transparency in Advertising law — effective January 2026
14. Montana right of publicity / AI likeness protections
15. Nevada synthetic media political advertising disclosure

### Tier 3 — Add as pipeline matures
- State consumer privacy laws with automated decision-making opt-out provisions (Rhode Island, Nebraska, Indiana, Kentucky, etc.)
- Federal agency guidance (FTC enforcement actions, SEC AI examination priorities, EEOC guidance, DOJ ECCP updates)
- Pending bills with high likelihood of passage

---

## Schema Design

The **Obligations array** is the killer feature. No one else decomposes laws into discrete, categorized, queryable obligations. This is what lets an agent ask: "Give me all `transparency` obligations that apply to a `deployer` across CO, CA, and TX" — and get structured data it can reason over.

```json
{
  "law": {
    "jurisdiction": "CO | CA | TX | US-federal | EU",
    "law_id": "CO-SB24-205",
    "common_name": "Colorado AI Act",
    "official_citation": "C.R.S. § 6-1-1701 et seq.",
    "status": "enacted | effective | proposed | amended",
    "effective_date": "2026-06-30",
    "last_updated": "2026-02-10",
    "source_url": "https://leg.colorado.gov/...",
    "summary": "Plain-language 2-3 sentence description",

    "applicability": {
      "who_it_applies_to": ["developers", "deployers"],
      "definitions": {
        "developer": "A person that creates or substantially modifies an AI system...",
        "deployer": "A person that deploys a high-risk AI system..."
      },
      "scope_conditions": "Applies to high-risk AI systems used to make consequential decisions in education, employment, financial services, government services, healthcare, housing, insurance, or legal services",
      "exemptions": ["Small businesses under threshold", "NIST AI RMF safe harbor"],
      "geographic_trigger": "Doing business in Colorado OR affecting Colorado consumers"
    },

    "obligations": [
      {
        "obligation_id": "CO-SB24-205-OBL-001",
        "applies_to": "deployer",
        "category": "risk_assessment | transparency | documentation | consumer_rights | bias_testing | human_oversight | incident_reporting | disclosure",
        "requirement_text": "Deployers must use reasonable care to protect consumers from known or foreseeable risks of algorithmic discrimination",
        "plain_language": "You must conduct risk assessments and take steps to prevent your AI from discriminating",
        "deadline": "2026-06-30",
        "recurring": true,
        "frequency": "annual | per-deployment | ongoing",
        "citation": "C.R.S. § 6-1-1702(3)(a)"
      }
    ],

    "penalties": {
      "enforcing_body": "Colorado Attorney General",
      "private_right_of_action": false,
      "penalty_range": "$2,000 - $20,000 per violation",
      "cure_period": true,
      "cure_period_days": 60,
      "notes": "No private right of action. AG enforcement under Colorado Consumer Protection Act"
    },

    "safe_harbors": [
      {
        "description": "Affirmative defense for compliance with NIST AI Risk Management Framework",
        "framework_reference": "NIST AI RMF 1.0",
        "citation": "C.R.S. § 6-1-1706"
      }
    ],

    "cross_references": [
      {
        "related_law": "CA-CCPA-ADMT",
        "relationship": "similar_obligation",
        "category": "risk_assessment",
        "notes": "California ADMT regulations impose similar risk assessment requirements but with different scope definitions"
      }
    ],

    "change_log": [
      {
        "date": "2025-08-15",
        "change_type": "amendment | delay | guidance | enforcement_action",
        "description": "Effective date delayed from Feb 2026 to June 2026 via HB 25-1172"
      }
    ]
  }
}
```

---

## MCP Tools (4 at launch)

### 1. `search_laws`
Query by jurisdiction, status, effective_date range, applicability (developer/deployer), and category. Returns matching laws with summary-level data.

### 2. `get_obligations`
Given a law_id (or set of jurisdictions + a role like "deployer"), return all structured obligations. Primary tool agents will call. Filterable by obligation category.

### 3. `compare_jurisdictions`
Given a list of jurisdictions and an obligation category (e.g., "transparency"), return a cross-jurisdictional comparison showing the most restrictive requirements. Saves compliance teams hours of manual work.

### 4. `get_changes`
Given a date range, return all changes (amendments, delays, enforcement actions, new guidance) across all tracked laws. The "what's new" feed keeping agents current.

---

## Distribution: MCP First, API Second

### Launch with MCP only. Add REST API within 30 days.

**MCP first** because:
- Early adopters building AI agents and compliance tools are already in the MCP ecosystem
- Gets listed on directories (mcp.so, Glama, PulseMCP, Anthropic registry) immediately
- Technically simpler than full REST API with auth, rate limiting, docs, versioning
- Can be backed by a JSON file or SQLite database — shippable in a week

**Add REST API shortly after** because:
- Persona 2 buyers (compliance SaaS) need standard REST endpoint for backend integration
- Need API keys and usage metering for monetization
- Not needed for launch — needed for first paying customers found through MCP channel

**Do NOT build a web dashboard.** That's a trap pulling into competition with Regology and law firm trackers. The product is data infrastructure, not a UI.

---

## Data Sources for Ongoing Pipeline (Post-MVP)

| Source | What It Provides | Access | Cost |
|--------|-----------------|--------|------|
| LegiScan API | Structured JSON for all 50 state legislatures + Congress. Bill status, full text, votes, sponsors. | API key (free registration) | Free: 30K queries/mo. Paid: 100K-250K queries/mo. Push: enterprise pricing. |
| Federal Register API | All federal rulemaking: proposed rules, final rules, notices, executive orders. JSON format. | No auth required | Free |
| Regulations.gov API | Public comment data on federal rulemakings. | API key required | Free |
| eCFR API | Codified text of federal regulations, updated daily. | No auth required | Free |
| State legislature websites | For states LegiScan doesn't cover well. | Scraping | Free (engineering time) |
| Law firm trackers (Orrick, BCLP, IAPP) | Cross-reference for accuracy validation | Public web | Free |

---

## Build Sequence

### Week 1-2: Data Curation
- Manually structure the top 9 Tier 1 laws using Claude as extraction assistant
- Store as JSON files
- Cross-reference against published analyses from Orrick, BCLP, Baker Botts, IAPP
- Build the MCP server with the 4 tools above
- Test with Claude Desktop

### Week 3: Initial Launch
- Publish to MCP directories
- Write focused landing page
- Post on developer communities (HN, r/legaltech, AI compliance Slack/Discord)
- Gather feedback

### Week 4-5: Expand + Monetize
- Add Tier 2 laws
- Implement REST API with API key auth
- Set up usage metering (even if pricing is free initially — track who uses it and how)

### Week 6+: Automate
- Build agentic pipeline using LegiScan + Federal Register API + eCFR
- Shift from manual curation to agentic maintenance
- Monitor, iterate based on user feedback

---

## What We're NOT Building at MVP

- A web dashboard
- Full coverage of all 1,200 AI bills
- International coverage beyond EU AI Act
- A compliance workflow tool
- Any kind of recommendation engine (that's the customer's job)
- Any feature that could be construed as legal advice

We're building a structured, queryable data layer. That's it.
