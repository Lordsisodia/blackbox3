# Agents Catalog

All available agents in the Blackbox3 system.

---

## 🤖 B-MAD Agents (Production-Ready)

### Core Agents

**bmad-master** - Master orchestrator
- File: `bmad/core/bmad-master.agent.yaml`
- Purpose: System orchestration and resource management
- Icon: 🧙

### Module Agents

**Mary (Analyst)** - Research & Competitive Analysis
- File: `bmad/modules/analyst.agent.yaml`
- Purpose: Market research, competitor analysis, feature synthesis
- Icon: 📊
- Capabilities:
  - Market research
  - Competitive analysis
  - Feature synthesis
  - Data-driven insights

**John (PM)** - Product Management
- File: `bmad/modules/pm.agent.yaml`
- Purpose: PRD creation, requirements, epic/story breakdown
- Icon: 📋
- Capabilities:
  - Create PRDs
  - Define requirements
  - Break down epics and stories
  - Prioritize features

**Winston (Architect)** - System Architecture
- File: `bmad/modules/architect.agent.yaml`
- Purpose: Architecture design, technical decisions
- Icon: 🏗️
- Capabilities:
  - Design system architecture
  - Make technical decisions
  - Define data models
  - Specify API contracts

**Dev (Developer)** - Implementation
- File: `bmad/modules/dev.agent.yaml`
- Purpose: Write code, implement features
- Icon: 💻
- Capabilities:
  - Implement stories
  - Write clean code
  - Follow patterns
  - Code review

**QA (Quality Assurance)** - Testing
- File: `bmad/modules/qa.agent.yaml`
- Purpose: Test planning, quality validation
- Icon: 🧪
- Capabilities:
  - Create test plans
  - Validate quality
  - Find bugs
  - Ensure standards

**UX Designer** - User Experience
- File: `bmad/modules/ux-designer.agent.yaml`
- Purpose: UX design, user flows
- Icon: 👁️
- Capabilities:
  - Design UX patterns
  - Create user flows
  - Design system
  - User research

**TEA (Test Engineer)** - Test Automation
- File: `bmad/modules/tea.agent.yaml`
- Purpose: Automated testing
- Icon: 🤖
- Capabilities:
  - Generate tests
  - Automate testing
  - Test coverage

**Tech Writer** - Documentation
- File: `bmad/modules/tech-writer.agent.yaml`
- Purpose: Technical documentation
- Icon: 📝
- Capabilities:
  - Write docs
  - Create guides
  - Document APIs

**Quick Flow Solo Dev** - Rapid Development
- File: `bmad/modules/quick-flow-solo-dev.agent.yaml`
- Purpose: Fast solo development
- Icon: ⚡
- Capabilities:
  - Rapid prototyping
  - Solo development
  - Quick iterations

**SM (Scrum Master)** - Sprint Management
- File: `bmad/modules/sm.agent.yaml`
- Purpose: Sprint planning, management
- Icon: 📊
- Capabilities:
  - Plan sprints
  - Manage backlog
  - Facilitate ceremonies

---

## 🎨 Custom Agents

### Context Manager
- File: `custom/context-manager.agent.yaml`
- Purpose: Manage multi-level context
- Icon: 🗂️
- Capabilities:
  - Create context snapshots
  - Restore from snapshots
  - Track context history
  - Delta updates

### Task Master
- File: `custom/task-master.agent.yaml`
- Purpose: Manage kanban tasks
- Icon: ✅
- Capabilities:
  - Create tasks
  - Move tasks between columns
  - Track dependencies
  - Monitor progress

---

## 📋 Agent Manifest

Total Agents: 14
- B-MAD Core: 1
- B-MAD Modules: 11
- Custom: 2

---

## 🚀 How to Use

### Option 1: Direct Load (B-MAD Style)

```bash
# In AI IDE (Claude Code, Cursor):
/load-agent bmad/modules/analyst
*research "Analyze competitor"
```

### Option 2: Via Runtime

```python
from Blackbox3.runtime.python.agent_loader import AgentLoader

loader = AgentLoader("Blackbox3")
mary = loader.load_agent("bmad/modules/analyst")
```

### Option 3: Master Prompt

Load the master system prompt which includes all agents.

---

## 📖 Agent YAML Structure

Each agent follows this structure:

```yaml
agent:
  metadata:
    id: "unique-id"
    name: "Agent Name"
    icon: "🎯"
    module: "module-name"

  persona:
    role: "What they do"
    identity: "Who they are"
    communication_style: "How they talk"

  capabilities:
    - "Capability 1"
    - "Capability 2"

  menu:
    - trigger: "*command"
      action: "execute workflow"
      description: "What it does"
```

---

## ✅ Adding New Agents

1. Create agent YAML file in appropriate directory:
   - B-MAD style: `agents/bmad/modules/`
   - Custom: `agents/custom/`

2. Follow agent structure above

3. Add to this catalog

4. Test loading with runtime or master prompt
