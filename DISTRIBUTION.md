# Distribution Guide - How to Submit Your MCP Server

**Goal**: Get your MCP server listed on Anthropic MCP Directory, Smithery.ai, and promoted on r/ClaudeAI.

**Time Required**: ~30 minutes total

---

## STEP 0: Commit Files to GitHub (Required First)

These new config files need to be on GitHub for the directories to find them:

```bash
cd C:\Users\dksmi\Dropbox\GitHub\ai-reg-mcp
git add .
git commit -m "Add MCP directory configs and launch materials"
git push origin main
```

Wait for push to complete, then proceed.

---

## STEP 1: Anthropic MCP Directory

**Choose ONE of these three methods** (easiest to hardest):

### Method A: Auto-Discovery (Easiest - Just Wait)

**What happens**: The MCP Registry automatically discovers your server via the `.well-known/mcp/server.json` file we created.

**Steps**:
1. ✅ Already done - you pushed the file to GitHub in Step 0
2. Wait 24-48 hours for the registry to crawl GitHub
3. Check if listed: https://www.pulsemcp.com/servers or search for "ai-reg-mcp"

**Pros**: Zero effort, automatic
**Cons**: Takes 24-48 hours

---

### Method B: Community Registry (mcp.so)

**Steps**:
1. Go to: **https://mcp.so/**
2. Click the **"Submit"** button (top navigation)
3. This opens a GitHub issue template
4. Fill in these details:

**Title**: `Submit: AI-Reg-MCP Server`

**Description**: Copy this entire block:

```markdown
## Server Information

**Name**: AI-Reg-MCP Server
**npm Package**: ai-reg-mcp-server
**Version**: 0.1.0
**Author**: David Smith / Fractionalytics
**License**: MIT

## Description

Structured, queryable US AI and privacy law data via MCP. Access 9 curated laws with 88 compliance obligations through natural language queries.

## Installation

```bash
npx ai-reg-mcp-server
```

## Claude Desktop Config

```json
{
  "mcpServers": {
    "ai-reg-mcp": {
      "command": "npx",
      "args": ["-y", "ai-reg-mcp-server"]
    }
  }
}
```

## Features

- 9 curated AI/privacy laws (Colorado AI Act, EU AI Act, California ADMT, NYC LL-144, Illinois AIVIRA, Texas TRAIGA, Utah SB226, California FEHA, US TAKE IT DOWN Act)
- 88 structured compliance obligations with plain-language explanations
- 32 tracked regulatory changes with dates and impact descriptions
- Natural language jurisdiction queries (e.g., "Colorado" or "CO" both work)
- Cross-jurisdictional comparisons
- Zero native dependencies (works on all platforms via sql.js)

## Tools Provided

1. **search_laws** - Search by jurisdiction, keyword, status, or effective date
2. **get_obligations** - Get detailed compliance obligations from specific laws
3. **compare_jurisdictions** - Compare requirements across multiple jurisdictions
4. **get_changes** - View regulatory changes over time

## Use Cases

- AI developers researching compliance requirements
- Legal teams tracking multi-jurisdiction regulations
- Compliance professionals assessing AI system obligations
- GRC teams managing regulatory risk

## Links

- **npm**: https://www.npmjs.com/package/ai-reg-mcp-server
- **GitHub**: https://github.com/Fractionalytics/ai-reg-mcp
- **Documentation**: https://github.com/Fractionalytics/ai-reg-mcp#readme

## Tags

ai-regulation, compliance, privacy-law, regulatory-data, legal-tech, colorado-ai-act, mcp-server
```

5. Click **"Submit Issue"**
6. Monitor the issue for approval (usually within 24-48 hours)

**Pros**: Faster than auto-discovery, community-driven
**Cons**: Requires GitHub account, manual submission

---

### Method C: Official Anthropic Directory

**Steps**:
1. Go to: **https://support.anthropic.com/en/articles/11596036-anthropic-mcp-directory-faq**
2. Look for submission form or "Submit a Server" link
3. Fill in these details:

**Field** | **Value**
---|---
**Server Name** | AI-Reg-MCP Server
**Package Name** | ai-reg-mcp-server
**npm URL** | https://www.npmjs.com/package/ai-reg-mcp-server
**GitHub URL** | https://github.com/Fractionalytics/ai-reg-mcp
**Description** | Structured, queryable US AI and privacy law data via MCP. Provides instant access to 9 curated AI regulations including Colorado AI Act, EU AI Act, California ADMT, NYC LL-144, and more. Access 88 structured compliance obligations with plain-language explanations through natural language queries.
**Category** | Legal & Compliance / Data & Research
**Installation Command** | `npx ai-reg-mcp-server`
**Testing Account Required?** | No (public data, no authentication)
**Support Email** | david@fractionalytics.io
**License** | MIT

4. Submit form
5. Wait for approval email from Anthropic team

**Pros**: Official listing, high visibility
**Cons**: May take longer, more formal process

---

## STEP 2: Smithery.ai

**Choose ONE of these two methods**:

### Method A: CLI Deploy (Recommended)

**Steps**:

1. Install Smithery CLI globally:
```bash
npm install -g @smithery/cli
```

2. Navigate to your project:
```bash
cd C:\Users\dksmi\Dropbox\GitHub\ai-reg-mcp
```

3. Deploy to Smithery:
```bash
smithery deploy
```

4. Follow CLI prompts (it will read from your `smithery.yaml` file)

5. Confirm deployment

**Pros**: Fastest, automated, uses config file we created
**Cons**: Requires CLI installation

---

### Method B: Manual Web Submission

**Steps**:

1. Go to: **https://smithery.ai/**
2. Look for **"Submit Server"**, **"Add Server"**, or similar button
3. If you don't see it, go to their GitHub: **https://github.com/smithery-ai/mcp-servers** and create an issue
4. Fill in these details:

**Server Name**: AI-Reg-MCP Server
**Package**: ai-reg-mcp-server
**Version**: 0.1.0
**Description**: Structured, queryable US AI and privacy law data via MCP
**Installation**: `npx ai-reg-mcp-server`
**GitHub**: https://github.com/Fractionalytics/ai-reg-mcp
**License**: MIT
**Tags**: mcp-server, ai-regulation, compliance, privacy-law, regulatory-data, legal-tech

5. Submit

**Pros**: No CLI needed
**Cons**: Manual process, may take longer

---

## STEP 3: Reddit Post (r/ClaudeAI)

**Timing**: Post on a **weekday between 8-10am ET or 6-8pm ET** for best visibility.

**Steps**:

1. Go to: **https://reddit.com/r/ClaudeAI**

2. Click **"Create Post"**

3. Choose **title** (pick ONE):
   - Option A: `I built an MCP server for AI regulations – Claude can now answer compliance questions instantly`
   - Option B: `Just launched: AI-Reg-MCP – Get instant answers about AI regulations through Claude`
   - Option C: `Built an MCP server for AI regulation data – Claude can now answer compliance questions`

4. **Post body** - Copy this:

---

Hey everyone! I just published my first MCP server and thought this community might find it useful.

## What I Built

**AI-Reg-MCP Server** – A Model Context Protocol server that gives Claude instant access to structured data about US AI regulations and privacy laws.

**npm**: `npx ai-reg-mcp-server`
**Source**: https://github.com/Fractionalytics/ai-reg-mcp

## The Problem

If you're building AI products, you've probably tried asking Claude:
- "What are the disclosure requirements in Colorado's AI Act?"
- "Do I need to do impact assessments in California?"
- "What's the difference between NYC and California employment AI rules?"

Claude can give you *general* guidance, but the details matter – and laws change constantly.

## The Solution

This MCP server provides Claude with **structured, queryable regulatory data**:

- ✅ **9 curated laws**: Colorado AI Act, EU AI Act, California ADMT, NYC LL-144, Illinois AIVIRA, Texas TRAIGA, Utah SB226, California FEHA AI, US TAKE IT DOWN Act
- ✅ **88 compliance obligations** with plain-language explanations
- ✅ **32 tracked regulatory changes** with dates and impact
- ✅ **Natural language queries** (e.g., "Colorado" or "CO" both work)
- ✅ **Cross-jurisdictional comparisons** (e.g., "Compare transparency requirements across CO, CA, and NYC")

## What You Can Ask Claude

Once installed, try questions like:

> "What are the transparency requirements in Colorado's AI Act?"

> "Compare disclosure requirements across Colorado, California, and NYC"

> "What obligations apply to AI deployers in California?"

> "Show me recent enforcement actions in AI regulations"

> "What are the deadlines for EU AI Act compliance?"

Claude will query the MCP server and give you **precise, cited answers** from the actual law text.

## Installation (30 seconds)

1. Install via npx:
```bash
npx ai-reg-mcp-server
```

2. Add to your Claude Desktop config (`claude_desktop_config.json`):

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "ai-reg-mcp": {
      "command": "npx",
      "args": ["-y", "ai-reg-mcp-server"]
    }
  }
}
```

3. Restart Claude Desktop

That's it! Look for the 🔌 icon to confirm it's connected.

## Tech Details (for the curious)

- **Storage**: SQLite via sql.js (zero native dependencies, works everywhere)
- **Transport**: MCP stdio (local, secure)
- **Data**: Hand-curated from official sources, validated against Zod schemas
- **Tests**: 45/45 passing
- **License**: MIT (free to use)

## Limitations & Roadmap

**Current version (v0.1.0):**
- 9 laws (Tier 1 only)
- Snapshot-based (updated monthly via npm)
- Keyword search only

**Coming soon** (paid API, not free MCP):
- 30+ laws
- Real-time updates
- Semantic search
- REST API access

If you want early access to the paid version, there's a [waitlist here](https://tally.so/r/Y5W7Vv).

## Why I Built This

I'm building compliance tools for AI companies and kept running into the same problem: regulatory data is scattered across PDFs, law firm blogs, and paywalled platforms. I wanted machine-readable, structured data that Claude (and eventually other agents) could query programmatically.

This is the MVP – 9 laws, free, open source. If it's useful, I'll expand it.

## Try It & Let Me Know

I'd love feedback:
- What laws are you most interested in?
- What queries would you want to run?
- Any bugs or issues?

Drop a comment or open a GitHub issue. Happy to answer questions!

---

**Links:**
- npm: https://www.npmjs.com/package/ai-reg-mcp-server
- GitHub: https://github.com/Fractionalytics/ai-reg-mcp
- Waitlist (paid API): https://tally.so/r/Y5W7Vv

---

5. Select **Flair**: "Tools & Resources" or "Project Showcase" (if available)

6. Click **"Post"**

7. **IMPORTANT**: Monitor comments for the first hour and respond quickly using these templates:

**If asked "Why not just use ChatGPT?"**
> Great question! Claude with MCP has a big advantage: the data stays local and up-to-date. Plus, MCP servers can be chained together. You could combine this with a contracts MCP server to check if your existing agreements comply with new regs. That workflow is harder with ChatGPT plugins.

**If asked about pricing**
> The MCP server is 100% free and open source (MIT license). The paid API I mentioned is for folks who need 30+ laws, real-time updates, and REST access (not just MCP). Think of the MCP as the free tier, API as the pro tier.

**If someone reports a bug**
> Thanks for reporting! Can you open a GitHub issue with details? I'll investigate ASAP. Also, what law were you querying? Want to make sure the data is correct.

**If someone asks for a law not included**
> Great suggestion! That's on my roadmap. I'm prioritizing based on demand, so this helps. In the meantime, you can join the waitlist and mention this law – I'm tracking requests to prioritize v0.2.

---

## Summary Checklist

- [ ] **Step 0**: Git commit & push (required first)
- [ ] **Step 1**: Submit to Anthropic (choose easiest method)
- [ ] **Step 2**: Submit to Smithery (CLI recommended)
- [ ] **Step 3**: Post to Reddit (weekday 8-10am or 6-8pm ET)

**Total time**: ~30 minutes
**Expected results**: Listings live within 24-48 hours, Reddit feedback immediate

---

## After Submission - Monitoring

### Daily (First Week)
- Check npm downloads: `npm view ai-reg-mcp-server`
- Check waitlist signups: https://tally.so/r/Y5W7Vv
- Respond to Reddit comments
- Check GitHub issues/stars

### Weekly
- Review waitlist feedback
- Track which laws people request most
- Engage with users

### Monthly
- Publish data update (v0.1.1) if laws changed
- Assess traction: Build v0.2 or start paid API?

---

**You're ready to launch! 🚀**

All content is written. Just follow the steps above in order.
