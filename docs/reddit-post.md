# r/ClaudeAI Post

## Title Options (Choose One)

1. **I built an MCP server for AI regulations – Claude can now answer compliance questions instantly**
2. **Just launched: AI-Reg-MCP – Get instant answers about AI regulations through Claude**
3. **MCP Server for AI Compliance: Colorado AI Act, EU AI Act, California ADMT, and more**

## Post Body

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

## Posting Tips

1. **Best time to post**: Weekday mornings (8-10am ET) or evenings (6-8pm ET)
2. **Flair**: Use "Tools & Resources" or "Project Showcase" if available
3. **Engage quickly**: Respond to comments within first hour for visibility
4. **Cross-post**: Consider posting to r/LocalLLaMA and r/MachineLearning too
5. **Be helpful**: Focus on value to community, not self-promotion

## Response Templates

**If someone asks "Why not just use ChatGPT?"**
> Great question! Claude with MCP has a big advantage: the data stays local and up-to-date. Plus, MCP servers can be chained together. You could combine this with a contracts MCP server to check if your existing agreements comply with new regs. That workflow is harder with ChatGPT plugins.

**If someone asks about pricing**
> The MCP server is 100% free and open source (MIT license). The paid API I mentioned is for folks who need 30+ laws, real-time updates, and REST access (not just MCP). Think of the MCP as the free tier, API as the pro tier.

**If someone reports a bug**
> Thanks for reporting! Can you open a GitHub issue with details? I'll investigate ASAP. Also, what law were you querying? Want to make sure the data is correct.

**If someone asks for a law not included**
> Great suggestion! That's on my roadmap. I'm prioritizing based on demand, so this helps. In the meantime, you can join the [waitlist](https://tally.so/r/Y5W7Vv) and mention this law – I'm tracking requests to prioritize v0.2.

## Alternative: Simpler Post (if you want less promotional)

---

**Title**: Built an MCP server for AI regulation data – Claude can now answer compliance questions

**Body**:

I built an MCP server that gives Claude access to structured AI regulation data (Colorado AI Act, EU AI Act, California ADMT, NYC LL-144, etc.).

Install: `npx ai-reg-mcp-server`

Now I can ask Claude things like "Compare transparency requirements across Colorado and California" and get cited answers from the actual law text.

Free, MIT licensed, 9 laws so far: https://github.com/Fractionalytics/ai-reg-mcp

Let me know if it's useful – happy to add more laws based on feedback.

---

(This version is less salesy, more community-focused. May get better reception depending on sub culture.)
