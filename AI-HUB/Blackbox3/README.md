# Blackbox3

**Multi-agent AI development system** combining BMAD Method with custom innovations.

**Status:** ✅ **FUNCTIONAL**

---

## What is Blackbox3?

Blackbox3 is a **manual convention-based system** for organizing AI-assisted development work.

**It provides:**
- 📁 Standard file/folder structure
- 📝 Plan templates for organized execution
- 🤖 BMAD agents (10+ specialized roles)
- 🔄 Context management
- 📋 Task tracking

**It does NOT:**
- ❌ Automatically execute workflows
- ❌ Make API calls to AI services
- ❌ Require complex runtime

**How it works:**
1. Create a plan folder with `./scripts/new-plan.sh`
2. Work with AI in chat (Claude Code, Cursor, Windsurf, etc.)
3. Save outputs to your plan folder

---

## Quick Start

### 1. Validate Installation

```bash
./scripts/check-blackbox.sh
```

Should output: `All checks passed! Blackbox3 is ready to use.`

### 2. Create Your First Plan

```bash
./scripts/new-plan.sh "research competitors"
```

This creates a timestamped plan folder:
```
.plans/2026-01-11_1400_research-competitors/
├── README.md          # Goal, context, approach
├── checklist.md       # Step-by-step tasks
├── status.md          # Current state, blockers
├── artifacts/         # Outputs and results
└── context/           # Context for long runs
```

### 3. Work with AI

1. Read `protocol.md` - defines how the system works
2. Read `context.md` - current project state
3. Read `agents/_core/prompt.md` - core operating rules
4. Open your AI chat (Claude Code, Cursor, etc.)
5. Paste agent prompts and execute work
6. Save outputs to your plan folder's `artifacts/`

---

## Directory Structure

```
Blackbox3/
├── protocol.md           # How the system works
├── context.md            # Current project state
├── tasks.md              # Project backlog
├── manifest.yaml         # File/agent/workflow index
├── README.md             # This file
├── scripts/              # Bash helper scripts
│   ├── lib.sh            # Shared utilities
│   ├── new-plan.sh       # Create plan folders
│   └── check-blackbox.sh # Validate system
├── .plans/               # Execution plans
│   └── _template/        # Plan templates
├── agents/               # Agent definitions
│   ├── _core/            # Core operating rules
│   ├── _template/        # Agent templates
│   ├── bmad/             # BMAD agents (10+)
│   └── custom/           # Custom agents
├── workflows-bmm/        # BMAD workflows (25+)
├── data/                 # Data storage
│   ├── context/          # Project-level context
│   ├── kanban/           # Task boards
│   ├── decisions/        # Decision log
│   └── research/         # Research outputs
└── runtime/              # Optional runtime scripts
```

---

## Core Protocol

### The Blackbox Loop

When using Blackbox3:

1. **READ** `context.md` - Understand current state
2. **CHECK** `tasks.md` - See what needs doing
3. **PLAN** - Create execution folder (if multi-step)
4. **EXECUTE** - Work with AI in chat
5. **CAPTURE** - Save outputs to plan folder
6. **LOG** - Update `tasks.md` with progress

### Agent Workflow

All agents follow this staged workflow:

1. **Align** - Restate goal, list constraints
2. **Plan** - Create plan folder if needed
3. **Execute** - Produce artifacts in small batches
4. **Verify** - Run validation or manual checks
5. **Wrap** - Update tasks, provide summary

See `agents/_core/prompt.md` for details.

---

## Available Agents

### BMAD Agents (Production-Ready)

Located in `agents-bmm/`:

- **analyst** - Research & competitive analysis
- **pm** - Product requirements & PRDs
- **architect** - System architecture & design
- **dev** - Implementation & coding
- **qa** - Testing & validation
- **sm** - Sprint management
- **ux-designer** - User experience design
- **tech-writer** - Documentation

### Custom Agents

Located in `agents/custom/`:

- **orchestrator** - Master coordination
- **context-manager** - Multi-level context
- **task-master** - Kanban & task tracking
- **fp-analyst** - First-principles reasoning

---

## Scripts

### new-plan.sh

Create a new timestamped plan folder:

```bash
./scripts/new-plan.sh "your goal here"
```

Creates: `.plans/<timestamp>_<slug>/` with template files.

### check-blackbox.sh

Validate Blackbox3 structure:

```bash
./scripts/check-blackbox.sh
```

Checks all required files, directories, and permissions.

---

## Design Principles

1. **Keep It Simple** - Files over code, bash over Python
2. **Proven Patterns** - Use BMAD as-is
3. **Manual Execution** - Humans work with AI in chat
4. **Convention-Based** - Standard file names and locations
5. **Incremental** - Add complexity only if validated need

---

## Configuration

Edit `manifest.yaml` to customize:

- File paths
- Agent locations
- Workflow locations
- Data directories
- Execution mode (default: manual)
- Context limits

---

## What's Next?

### Immediate

1. Create your first plan: `./scripts/new-plan.sh "test workflow"`
2. Read `protocol.md` to understand the system
3. Read `agents/_core/prompt.md` for agent rules
4. Work with AI to complete a task

### Short-term

1. Add custom agents for your workflows
2. Integrate research database (102 competitors, workflows, OSS catalog)
3. Create project-specific templates
4. Test with real workflows

### Long-term (Optional)

1. Add Python runtime for automation (if needed)
2. Integrate BMAD workflows more deeply
3. Build custom tooling
4. Add advanced context features

**Only add complexity if validated need exists!**

---

## Documentation

- **protocol.md** - How Blackbox3 works
- **context.md** - Current project state
- **tasks.md** - Project backlog
- **IMPLEMENTATION-TASKS.md** - Build documentation
- **BLACKBOX1-ANALYSIS.md** - Technical analysis
- **ARCHITECTURE.md** - System architecture

---

## Contributing

Blackbox3 is designed to be **simple** and **manual**.

When adding features:
1. Start with files (not code)
2. Use bash scripts (not Python)
3. Follow existing patterns
4. Test thoroughly
5. Document clearly

**Avoid over-engineering!**

---

## License

MIT License - See LICENSE file for details

---

**Blackbox3: Simple, manual, AI-assisted development.**

---

## Skills System

Blackbox3 includes **9 MCP skill files** for structured workflows:

- **deep-research.md** - Research with traceable plans
- **docs-routing.md** - Organize knowledge outputs
- **feedback-triage.md** - Process feedback into backlogs
- **github-cli.md** - GitHub workflows
- **long-run-ops.md** - Manage multi-hour sessions
- **notifications-*.md** - Local, mobile, and Telegram alerts

See `.skills/README.md` for complete documentation.

**Usage:** Reference skills when working with AI:
```
"Use .skills/deep-research.md to investigate competitors"
"Apply .skills/feedback-triage.md to this user feedback"
```

---

## 🔌 MCP Skills Integration

Blackbox3 now includes **19 total skills** (9 core + 10 MCP-specific):

### Core Skills (9 files)
- Deep Research, Docs Routing, Feedback Triage
- GitHub CLI, Long-run Operations
- Local/Mobile/Telegram Notifications

### MCP Skills (10 files in `.skills/mcp-skills/`)
- **Supabase** (5.7KB) - Database operations
- **Shopify** (7.5KB) - E-commerce integration
- **GitHub** (9.3KB) - Repository management
- **Serena** (7.9KB) - AI code assistance
- **Chrome DevTools** (10KB) - Browser debugging
- **Playwright** (14KB) - E2E testing
- **Filesystem** (11KB) - File operations
- **Sequential Thinking** (11KB) - Enhanced reasoning
- **SISO Internal** (14KB) - Task management

**Usage:**
```
"Use .skills/mcp-skills/3-github-skills.md to manage this PR"
"Apply .skills/mcp-skills/7-filesystem-skills.md to organize files"
"Follow .skills/mcp-skills/6-playwright-skills.md to test this flow"
```

See `.skills/README.md` for complete documentation.

**Total:** 19 skills, 164KB of structured workflows
