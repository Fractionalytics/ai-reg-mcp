# MCP Directory Submissions

## Anthropic MCP Directory

### Submission Method 1: Official Anthropic Directory

**Submit here**: [Anthropic MCP Directory FAQ](https://support.anthropic.com/en/articles/11596036-anthropic-mcp-directory-faq)

**Submission Details:**

**Server Name**: AI-Reg-MCP Server

**Package Name**: `ai-reg-mcp-server`

**npm URL**: https://www.npmjs.com/package/ai-reg-mcp-server

**Description**:
Structured, queryable US AI and privacy law data via Model Context Protocol. Provides instant access to 9 curated AI regulations including Colorado AI Act, EU AI Act, California ADMT, NYC LL-144, and more. Access 88 structured compliance obligations with plain-language explanations through natural language queries.

**Category**: Legal & Compliance / Data & Research

**Installation Command**:
```bash
npx ai-reg-mcp-server
```

**Claude Desktop Config**:
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

**Tools Provided**:
1. `search_laws` - Search laws by jurisdiction, keyword, status, or effective date
2. `get_obligations` - Get detailed compliance obligations from specific laws
3. `compare_jurisdictions` - Compare requirements across multiple jurisdictions
4. `get_changes` - View regulatory changes over time

**Testing Account**: Not required (public data, no authentication)

**Documentation**: https://github.com/Fractionalytics/ai-reg-mcp#readme

**Support Email**: david@fractionalytics.io

**License**: MIT

**Use Cases**:
- AI developers researching compliance requirements
- Legal teams tracking multi-jurisdiction regulations
- Compliance professionals assessing AI system obligations
- GRC teams managing regulatory risk

### Submission Method 2: Community Registry (mcp.so)

**Submit here**: https://mcp.so/ (click "Submit" button)

Create a GitHub issue with the following:

**Title**: Submit AI-Reg-MCP Server

**Description**:
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

## Features

- 9 curated AI/privacy laws (Colorado, California, EU, NYC, Texas, Utah, Illinois, US)
- 88 structured compliance obligations with plain-language explanations
- Natural language jurisdiction queries (e.g., "Colorado" or "CO")
- Cross-jurisdictional comparisons
- Regulatory change tracking

## Tools

1. `search_laws` - Search by jurisdiction, keyword, status, date
2. `get_obligations` - Get detailed compliance obligations
3. `compare_jurisdictions` - Multi-jurisdiction comparison
4. `get_changes` - View regulatory changes over time

## Links

- **npm**: https://www.npmjs.com/package/ai-reg-mcp-server
- **GitHub**: https://github.com/Fractionalytics/ai-reg-mcp
- **Documentation**: https://github.com/Fractionalytics/ai-reg-mcp#readme

## Tags

ai-regulation, compliance, privacy-law, regulatory-data, legal-tech, colorado-ai-act
```

### Submission Method 3: Automatic Discovery

We've created `/.well-known/mcp/server.json` in the repo. Once pushed to GitHub, the MCP Registry can auto-discover your server.

**Action Required**:
1. Commit and push the `.well-known/mcp/server.json` file to GitHub
2. Wait for registry to crawl (can take 24-48 hours)

---

## Smithery.ai Submission

### Method 1: Smithery CLI Deploy

**Prerequisites**: Install Smithery CLI

```bash
npm install -g @smithery/cli
```

**Create smithery.yaml** (already created in repo root)

**Deploy Command**:
```bash
smithery deploy
```

### Method 2: Manual Submission

**Submit here**: https://smithery.ai/ (look for "Submit Server" or contact via GitHub)

**Submission Details**:

Same as Anthropic submission above, plus:

**Smithery Tags**: `mcp-server`, `legal-tech`, `ai-compliance`, `regulatory-data`

**Integration Type**: stdio (local execution)

**Platform Compatibility**: All platforms (zero native dependencies via sql.js)

---

## Next Steps After Submission

1. **Monitor submissions**: Check for approval emails
2. **Respond promptly**: Answer any questions from directory maintainers
3. **Update directories**: When you publish v0.1.1, update listings
4. **Track discovery**: Monitor npm downloads to see directory impact

## Reference Links

- [Anthropic MCP Directory FAQ](https://support.anthropic.com/en/articles/11596036-anthropic-mcp-directory-faq)
- [MCP Registry Documentation](https://www.gentoro.com/blog/what-is-anthropics-new-mcp-registry)
- [mcp.so Community Registry](https://mcp.so/)
- [Smithery CLI Documentation](https://smithery.ai/docs/concepts/cli)
- [Smithery Platform](https://smithery.ai/)
