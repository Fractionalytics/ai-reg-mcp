# Launch Checklist - Distribution Actions

## Architecture (v0.2.0)

**Two-repository setup:**
- **ai-reg-mcp** (public): Thin MCP client on npm, calls remote API
- **ai-reg-api** (private): Hono API on Vercel Edge, Turso database, API key auth

Users get instant API key at https://ai-reg-api.vercel.app

## ✅ Completed (v0.1.0)

- [x] Published to npm (ai-reg-mcp-server v0.1.0)
- [x] Created MCP registry files (.well-known/mcp/server.json, smithery.yaml)
- [x] Wrote submission content for directories
- [x] Wrote Reddit post for r/ClaudeAI

## ✅ Completed (v0.2.0)

- [x] Built private backend API (ai-reg-api)
- [x] Deployed to Vercel with Turso database
- [x] Implemented API key authentication
- [x] Created signup page with instant key generation
- [x] Refactored MCP client to call remote API
- [x] Updated all documentation for two-repo architecture

## 🎯 Action Items (v0.2.0 Launch)

### 0. Pre-Launch Tasks
- [ ] `npm deprecate ai-reg-mcp-server@0.1.0 "Upgrade to v0.2.0 with API key support..."`
- [ ] `npm publish` v0.2.0
- [ ] Test E2E: signup → API key → Claude Desktop → query all 4 tools
- [ ] Verify all 6 API endpoints working live

### 1. Anthropic MCP Directory (Choose ONE method)

**Option A: Official Submission**
- [ ] Go to: https://support.anthropic.com/en/articles/11596036-anthropic-mcp-directory-faq
- [ ] Fill out submission form with details from `docs/mcp-directory-submission.md`
- [ ] Submit and wait for approval email

**Option B: Community Registry (mcp.so)**
- [ ] Go to: https://mcp.so/
- [ ] Click "Submit" button
- [ ] Create GitHub issue with content from `docs/mcp-directory-submission.md`
- [ ] Submit and monitor issue for acceptance

**Option C: Auto-Discovery**
- [ ] Commit `.well-known/mcp/server.json` to GitHub
- [ ] Push to main branch
- [ ] Wait 24-48 hours for registry crawl

### 2. Smithery.ai Submission

**Option A: CLI Deploy (Recommended)**
```bash
npm install -g @smithery/cli
cd C:\Users\dksmi\Dropbox\GitHub\ai-reg-mcp
smithery deploy
```

**Option B: Manual Submission**
- [ ] Go to: https://smithery.ai/
- [ ] Look for "Submit Server" or "Add to Directory"
- [ ] Use details from `docs/mcp-directory-submission.md`

### 3. Reddit Post (r/ClaudeAI)

- [ ] Go to: https://reddit.com/r/ClaudeAI
- [ ] Click "Create Post"
- [ ] Choose title from `docs/reddit-post.md` (3 options provided)
- [ ] Copy post body from `docs/reddit-post.md`
- [ ] Select flair: "Tools & Resources" or "Project Showcase"
- [ ] **Best time**: Weekday morning (8-10am ET) or evening (6-8pm ET)
- [ ] Post!
- [ ] Monitor comments for first hour
- [ ] Use response templates from `docs/reddit-post.md` for common questions

## 📊 Monitoring After Launch

### Daily (First Week)
- [ ] Check npm downloads: `npm view ai-reg-mcp-server`
- [ ] Check API key signups (Turso `api_keys` table)
- [ ] Check API usage metrics (Turso `rate_limits` table)
- [ ] Respond to Reddit comments
- [ ] Check GitHub issues/stars

### Weekly
- [ ] Review API usage patterns (which endpoints are popular?)
- [ ] Track which laws people query most
- [ ] Engage with users who have questions
- [ ] Monitor Vercel/Turso metrics

### Monthly
- [ ] Update laws server-side (instant propagation to all users)
- [ ] Send update to API key holders
- [ ] Assess traction: npm downloads + API signups + usage

## 📦 Before You Start (Git)

Commit and push the new files first:

```bash
cd C:\Users\dksmi\Dropbox\GitHub\ai-reg-mcp
git add .well-known/mcp/server.json
git add smithery.yaml
git add docs/mcp-directory-submission.md
git add docs/reddit-post.md
git add docs/launch-checklist.md
git add README.md
git add package.json
git add LICENSE
git commit -m "chore: Add MCP directory configs and launch docs"
git push origin main
```

This ensures:
- Auto-discovery can find your server.json
- Directory submissions link to correct files
- GitHub shows professional, complete project

## 🎉 Quick Wins Checklist

1. **Right now** (5 min): Git commit & push
2. **Today** (15 min): Submit to Anthropic + Smithery
3. **Today** (10 min): Post to Reddit (choose best time)
4. **Tomorrow**: Check responses, engagement, downloads
5. **This week**: Monitor traction, gather feedback
6. **This month**: Decide next steps based on data

---

**Current Status**: Ready to launch 🚀

All content prepared. Just execute the actions above!
