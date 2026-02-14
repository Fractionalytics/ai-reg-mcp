# AI-Reg-MCP

Structured, queryable US AI and privacy law data via Model Context Protocol (MCP).

## What is this?

AI-Reg-MCP is an MCP server that provides Claude (and other MCP clients) with instant access to structured data about US AI regulations, privacy laws, and compliance requirements. No more searching through PDFs or legal websites—get precise regulatory information through natural language queries.

## Features

- **9 curated AI/privacy laws** including Colorado AI Act, EU AI Act, California ADMT, NYC LL-144, and more
- **88 structured compliance obligations** with plain-language explanations
- **32 tracked regulatory changes** with dates and impact descriptions
- **Natural language jurisdiction queries** (e.g., "Colorado" or "CO" both work)
- **Cross-jurisdictional comparisons** to find the most restrictive requirements
- **Zero native dependencies** (works on all platforms via sql.js)

> 🚀 **Want more?** This free version includes 9 Tier 1 laws. For 30+ laws, real-time updates, semantic search, and API access, [**join the waitlist**](https://tally.so/r/Y5W7Vv) for our paid API (launching soon).

## Installation

### Prerequisites

- Node.js 18+ (tested on v24.11.0)
- Claude Desktop or any MCP-compatible client

### Using with Claude Desktop

1. Install the server (it will be available via npx, no global install needed):

```bash
# Test that it works
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

4. You should see the 🔌 icon indicating MCP servers are connected

## Usage

Once connected, you can ask Claude questions like:

- "What are the transparency requirements in Colorado's AI Act?"
- "Compare disclosure requirements across Colorado, California, and NYC"
- "What are the deadlines for compliance with the EU AI Act?"
- "Show me recent changes to AI regulations since 2025"
- "What obligations apply to AI deployers in California?"

## Available Tools

The server provides 4 MCP tools:

### 1. `search_laws`
Search for laws by jurisdiction, keyword, status, or effective date.

**Example**: Find all laws about "algorithmic discrimination" in Colorado

### 2. `get_obligations`
Get detailed compliance obligations from specific laws.

**Example**: Show all transparency obligations in the Colorado AI Act

### 3. `compare_jurisdictions`
Compare requirements across multiple jurisdictions.

**Example**: Compare risk assessment requirements in CO, CA, and NYC

### 4. `get_changes`
View regulatory changes over time.

**Example**: Show all enforcement actions since January 2025

## Supported Laws (v0.1.0)

- **Colorado AI Act (SB24-205)** - High-risk AI systems, algorithmic discrimination
- **California ADMT Regulations (CCPA)** - Automated decision-making technology
- **California FEHA AI Regs** - AI/ADS in employment decisions
- **NYC Local Law 144** - Automated employment decision tools
- **Illinois AIVIRA** - AI video interviews
- **Texas TRAIGA** - Responsible AI governance
- **Utah SB226** - AI consumer protection
- **EU AI Act** - High-risk AI systems (EU)
- **US TAKE IT DOWN Act** - NCII removal requirements

## Data Quality

All data is:
- ✅ Hand-curated by legal/compliance experts
- ✅ Validated against official sources
- ✅ Structured for programmatic access
- ✅ Updated with regulatory changes
- ✅ Includes plain-language explanations

**Last Updated**: February 13, 2026

## Updates & Data Freshness

**Current version**: v0.1.0 (snapshot-based data)

- 📅 **Data is updated monthly** via new npm releases
- ⚡ **Always get the latest**: Use `npx -y ai-reg-mcp-server` in your Claude config (the `-y` flag fetches the newest version)
- 🔔 **Critical updates** (new major laws, significant amendments) published immediately
- 📊 **Check for updates**: `npm view ai-reg-mcp-server version` shows latest available

**Want automatic real-time updates?** [Join the waitlist](https://tally.so/r/Y5W7Vv) for our paid API with live data and no manual updates required.

## Development

```bash
# Clone the repo
git clone https://github.com/yourusername/ai-reg-mcp.git
cd ai-reg-mcp

# Install dependencies
npm install

# Build database from seed data
npm run seed

# Run tests
npm test

# Run integration tests
npm run test:integration

# Start MCP server
npm start

# Test with MCP Inspector
npm run inspect
```

## Architecture

- **Storage**: SQLite via sql.js (WASM-based, zero native deps)
- **Transport**: MCP stdio (local, secure)
- **Data**: Curated JSON → SQL → MCP tools
- **Schema**: Structured for cross-law queries

## Limitations

- **Not legal advice**: This is reference data, not legal guidance
- **US-focused**: Currently covers US laws + EU AI Act
- **Tier 1 laws only (v0.1)**: Additional laws coming in future versions
- **No semantic search yet**: Keyword-based search only (embeddings coming later)

## Roadmap

### Free MCP Server
- **v0.2**: Add Tier 2 laws (Virginia VCDPA, Washington My Health My Data, etc.)
- **v0.3**: Auto-update mechanism for fresh data
- **v1.0**: 30+ laws covered

### Paid API (Launching Q2 2026)
Want early access? [**Join the waitlist**](https://tally.so/r/Y5W7Vv)

- ✅ **30+ laws** (all US AI/privacy laws + international)
- ✅ **Real-time updates** (no manual reinstalls)
- ✅ **Semantic search** (find requirements by meaning, not just keywords)
- ✅ **REST API** (use outside of MCP)
- ✅ **Compliance checklists** (automated based on your use case)
- ✅ **Usage tracking & analytics**
- ✅ **Commercial use license**
- 💰 **Pricing**: Starting at $99/mo (estimated)

## License

MIT License - see [LICENSE](LICENSE) for details

## Support & Contact

- 🐛 **Bug reports**: [GitHub Issues](https://github.com/Fractionalytics/ai-reg-mcp/issues)
- 💡 **Feature requests**: [GitHub Discussions](https://github.com/Fractionalytics/ai-reg-mcp/discussions)
- 📧 **Email**: david@fractionalytics.io
- 🚀 **Paid API waitlist**: [Join here](https://tally.so/r/Y5W7Vv)

## Disclaimer

This software provides reference information about AI regulations and should not be considered legal advice. For compliance questions, consult with a qualified attorney familiar with your specific situation and jurisdiction.

---

Built with ❤️ for the AI compliance community | [**Join the API waitlist**](https://tally.so/r/Y5W7Vv)
