# AI Regulations MCP

Structured, queryable US AI and privacy law data via Model Context Protocol (MCP).

## What is this?

AI Regulations MCP (`ai-reg-mcp`) is an MCP server that provides Claude (and other MCP clients) with instant access to structured data about US AI regulations, privacy laws, and compliance requirements. No more searching through PDFs or legal websites — get precise regulatory information through natural language queries.

## Features

- **48 curated AI/privacy laws across 24 jurisdictions** including the EU AI Act, Colorado ADMT, California ADMT, NYC LL-144, and more
- **281 structured compliance obligations** with plain-language explanations
- **160 tracked regulatory changes** with dates and impact descriptions
- **Natural language jurisdiction queries** (e.g., "Colorado" or "CO" both work)
- **Cross-jurisdictional comparisons** to find the most restrictive requirements
- **Zero native dependencies** — works on all platforms

## Quick Start

### 1. Get a Free API Key

Visit **[ai-reg-api.vercel.app](https://ai-reg-api.vercel.app)** and sign in with GitHub. You'll get an API key instantly.

### 2. Configure Claude Desktop

Add to your Claude Desktop config (`claude_desktop_config.json`):

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "ai-reg-mcp": {
      "command": "npx",
      "args": ["-y", "ai-reg-mcp-server"],
      "env": {
        "AI_REG_API_KEY": "aireg_live_your_key_here"
      }
    }
  }
}
```

### 3. Restart Claude Desktop

You should see the MCP server connected. Now ask Claude about AI regulations.

## Usage

Once connected, you can ask Claude questions like:

- "What are the transparency requirements in Colorado's AI Act?"
- "Compare disclosure requirements across Colorado, California, and NYC"
- "What are the deadlines for compliance with the EU AI Act?"
- "Show me recent changes to AI regulations since 2025"
- "What obligations apply to AI deployers in California?"

## Available Tools

### 1. `search_laws`
Search for laws by jurisdiction, keyword, status, or effective date.

### 2. `get_obligations`
Get detailed compliance obligations from specific laws.

### 3. `compare_jurisdictions`
Compare requirements across multiple jurisdictions.

### 4. `get_changes`
View regulatory changes over time.

## Coverage

**48 laws across 24 jurisdictions** — US federal, the EU, and US states including
CA, CO, NY, WA, TX, IL, CT, and more — with **281 structured obligations** and
**160 tracked changes**. Coverage grows with monthly regulatory refreshes.

> The full, always-current list is available live (no key required) at
> **[ai-reg-api.vercel.app/status](https://ai-reg-api.vercel.app/status)** or via
> `GET /api/coverage`.

**Categories covered**: high-risk AI governance · automated employment decisions ·
automated decision-making & profiling · AI in healthcare & insurance · companion &
mental-health chatbots · frontier-model transparency · digital likeness & deepfakes ·
election synthetic media · surveillance pricing · content provenance.

**Flagship laws**: Colorado ADMT (SB 26-189) · EU AI Act · California ADMT (CCPA),
FEHA AI, SB 53 (frontier), SB 942 · NYC Local Law 144 · Texas TRAIGA · NY RAISE Act ·
US TAKE IT DOWN Act · Tennessee ELVIS Act.

## Configuration

| Environment Variable | Required | Default | Description |
|---------------------|----------|---------|-------------|
| `AI_REG_API_KEY` | Yes | — | Your API key from [ai-reg-api.vercel.app](https://ai-reg-api.vercel.app) |
| `AI_REG_API_URL` | No | `https://ai-reg-api.vercel.app` | API base URL (for self-hosting) |

## Rate Limits (Free Tier)

- 100 requests/hour
- 1,000 requests/day
- 10,000 requests/month

## Data Quality

All data is:
- Hand-curated by legal/compliance experts
- Validated against official sources
- Structured for programmatic access
- Updated with regulatory changes
- Includes plain-language explanations

## Architecture

v0.2.0 is a **thin client** — no data is bundled in the package. All law data is served from a private API, keeping intellectual property protected while keeping the MCP interface identical.

```
Claude Desktop  →  MCP Server (this package)  →  AI-Reg API (private)  →  Turso DB
```

## Development

```bash
git clone https://github.com/Fractionalytics/ai-reg-mcp.git
cd ai-reg-mcp
npm install
npm test
npm run build
```

## Upgrading from v0.1.0

v0.2.0 requires an API key. If you were using v0.1.0:

1. Get a free API key at [ai-reg-api.vercel.app](https://ai-reg-api.vercel.app)
2. Add the `env` block to your Claude Desktop config (see Quick Start above)
3. Restart Claude Desktop

The MCP tool interface is unchanged — all your existing prompts will work the same.

## Limitations

- **Not legal advice**: This is reference data, not legal guidance
- **US-focused**: Currently covers US laws + EU AI Act
- **Growing coverage**: new and amended laws are added with monthly regulatory refreshes
- **API key required**: Free signup, instant key

## License

MIT License — see [LICENSE](LICENSE) for details

## Support & Contact

- **Bug reports**: [GitHub Issues](https://github.com/Fractionalytics/ai-reg-mcp/issues)
- **Email**: david@fractionalytics.io

## Disclaimer

This software provides reference information about AI regulations and should not be considered legal advice. For compliance questions, consult with a qualified attorney familiar with your specific situation and jurisdiction.
