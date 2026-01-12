# `.skills/` (Blackbox3 Skills)

This folder contains **skill files**: small, reusable frameworks the AI can follow to do work consistently.

Each skill is a single `.md` file that defines:
- **When to use it** (trigger)
- **Inputs to collect** (what the AI needs)
- **Artifacts to create** (plans, notes, outputs)
- **A step-by-step process** (with checklists)
- **How to track progress** (ticking off steps as work completes)

Naming:
- Use kebab-case: `deep-research.md`, `ui-triage.md`, `copy-review.md`, etc.

---

## 📁 Skills Directory Structure

```
.skills/
├── Core Skills (9 files)
│   ├── deep-research.md
│   ├── docs-routing.md
│   ├── feedback-triage.md
│   ├── github-cli.md
│   ├── long-run-ops.md
│   ├── notifications-local.md
│   ├── notifications-mobile.md
│   └── notifications-telegram.md
│
└── mcp-skills/ (10 files)
    ├── 1-supabase-skills.md
    ├── 2-shopify-skills.md
    ├── 3-github-skills.md
    ├── 4-serena-skills.md
    ├── 5-chrome-devtools-skills.md
    ├── 6-playwright-skills.md
    ├── 7-filesystem-skills.md
    ├── 8-sequential-thinking-skills.md
    ├── 9-siso-internal-skills.md
    └── README.md
```

---

## 🎯 Core Skills (Blackbox Framework)

### Research & Analysis
- **deep-research.md** - Turn ambiguous questions into documented, executable plans
- **docs-routing.md** - Ensure outputs land in the right place and stay findable
- **feedback-triage.md** - Turn messy feedback into prioritized, actionable backlogs

### GitHub Integration
- **github-cli.md** - GitHub CLI workflows (issues, PRs, repos)

### Operations
- **long-run-ops.md** - Managing long-running AI operations (3+ hour sessions)

### Notifications
- **notifications-local.md** - Local desktop notifications (macOS/Linux)
- **notifications-mobile.md** - Mobile notifications (Pushover, Pushcut)
- **notifications-telegram.md** - Telegram bot notifications

---

## 🔌 MCP Skills (MCP Server Integration)

### Database Skills
- **1-supabase-skills.md** (5.7KB)
  - Supabase database operations
  - Products, orders, users management
  - SQL queries and data manipulation

### E-commerce Skills
- **2-shopify-skills.md** (7.5KB)
  - Shopify store integration
  - Product and order management
  - Customer management and inventory

### GitHub Skills
- **3-github-skills.md** (9.3KB)
  - GitHub MCP server integration
  - Issues, pull requests, repositories
  - Advanced GitHub workflows

### Code Assistance
- **4-serena-skills.md** (7.9KB)
  - Serena MCP for AI code assistance
  - Code analysis, review, optimization
  - Symbol-based operations

### Browser Testing
- **5-chrome-devtools-skills.md** (10KB)
  - Chrome DevTools MCP integration
  - Browser automation and debugging
  - Network analysis and inspection

- **6-playwright-skills.md** (14KB)
  - Playwright E2E testing
  - Browser automation
  - Screenshot and testing workflows

### File Operations
- **7-filesystem-skills.md** (11KB)
  - Filesystem MCP integration
  - File read/write operations
  - Directory management and search

### Enhanced Reasoning
- **8-sequential-thinking-skills.md** (11KB)
  - Sequential thinking MCP
  - Enhanced problem-solving
  - Structured reasoning workflows

### Internal Systems
- **9-siso-internal-skills.md** (14KB)
  - SISO Internal Supabase integration
  - Project and task management
  - Client and partnership tracking

---

## Path Conventions

Blackbox3 uses a flat structure (not nested under `docs/`):
- Plans: `.plans/`
- Knowledge: `.knowledge/`
- Scripts: `scripts/`
- Agents: `agents/`
- Skills: `.skills/`
- Local config: `.local/` (gitignored)

---

## Usage

### Core Skills
When working with AI, reference skills directly:
```
"Use the .skills/deep-research.md skill to investigate X"
"Follow .skills/github-cli.md for this PR workflow"
"Apply .skills/feedback-triage.md to this user feedback"
```

### MCP Skills
When using MCP server capabilities:
```
"Use .skills/mcp-skills/1-supabase-skills.md to query the database"
"Follow .skills/mcp-skills/3-github-skills.md for this PR workflow"
"Apply .skills/mcp-skills/5-chrome-devtools-skills.md to debug this issue"
"Use .skills/mcp-skills/7-filesystem-skills.md for file operations"
```

### Combined Workflows
Skills are designed to be **composable**:
```
"I'll use:
1. .skills/deep-research.md to structure the research
2. .skills/mcp-skills/7-filesystem-skills.md to read source files
3. .skills/mcp-skills/3-github-skills.md to check for related issues
4. .skills/docs-routing.md to organize the findings"
```

---

## MCP Skills Quick Reference

| MCP Server | Skill File | Purpose | Key Capabilities |
|------------|-----------|---------|------------------|
| **Supabase** | `1-supabase-skills.md` | Database operations | SQL, tables, migrations |
| **Shopify** | `2-shopify-skills.md` | E-commerce | Products, orders, customers |
| **GitHub** | `3-github-skills.md` | Repository management | Issues, PRs, code review |
| **Serena** | `4-serena-skills.md` | Code assistance | Analysis, symbols, refactoring |
| **Chrome DevTools** | `5-chrome-devtools-skills.md` | Browser debugging | Inspect, console, network |
| **Playwright** | `6-playwright-skills.md` | E2E testing | Automation, testing, screenshots |
| **Filesystem** | `7-filesystem-skills.md` | File operations | Read, write, search, organize |
| **Sequential Thinking** | `8-sequential-thinking-skills.md` | Enhanced reasoning | Problem-solving, analysis, design |
| **SISO Internal** | `9-siso-internal-skills.md` | Task management | Projects, tasks, clients, issues |

See [`.skills/mcp-skills/README.md`](./mcp-skills/README.md) for complete MCP documentation.

---

## Skill Design Principles

All skills (core and MCP) are designed to be:
- **Composable** - Use multiple skills together
- **Traceable** - Create plans and artifacts
- **Reusable** - Apply to similar future tasks
- **Structured** - Follow consistent frameworks
- **Documented** - Clear triggers, inputs, outputs

---

## Getting Started

### 1. Core Skills (General Workflows)
Start with core skills for everyday tasks:
```bash
# Research task
"Use .skills/deep-research.md to investigate competitor pricing"

# Feedback processing
"Apply .skills/feedback-triage.md to this user feedback"

# Long-running session
"Follow .skills/long-run-ops.md for this 4-hour analysis"
```

### 2. MCP Skills (Server-Specific Workflows)
Use MCP skills when working with MCP servers:
```bash
# Database operations
"Use .skills/mcp-skills/1-supabase-skills.md to add user records"

# GitHub workflows
"Follow .skills/mcp-skills/3-github-skills.md to create this PR"

# Browser testing
"Apply .skills/mcp-skills/6-playwright-skills.md to test this flow"

# File operations
"Use .skills/mcp-skills/7-filesystem-skills.md to organize these files"
```

### 3. Combined Skills (Complex Workflows)
For complex tasks, combine multiple skills:
```bash
"I'll use:
- .skills/deep-research.md (structure)
- .skills/mcp-skills/7-filesystem-skills.md (read files)
- .skills/mcp-skills/4-serena-skills.md (analyze code)
- .skills/docs-routing.md (organize findings)"
```

---

## Total Skills Inventory

**Core Skills:** 9 files (general workflows)
**MCP Skills:** 10 files (MCP server integration)
**Total:** 19 skill files (~100KB of structured workflows)

---

**Blackbox3 now has comprehensive skill coverage for both general workflows and MCP server integration!** 🚀
