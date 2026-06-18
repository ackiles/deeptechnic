<div align="center">
  <h1>🔬 Deeptechnic（技研）</h1>
  <p><em>AI-Powered Technical Due Diligence Framework for Deep-Tech Investments</em></p>

  <p>
    <a href="https://github.com/ackiles/deeptechnic/blob/main/LICENSE">
      <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License">
    </a>
    <a href="https://python.org">
      <img src="https://img.shields.io/badge/python-3.11+-blue.svg" alt="Python">
    </a>
    <a href="https://github.com/ackiles/deeptechnic/actions">
      <img src="https://github.com/ackiles/deeptechnic/actions/workflows/test.yml/badge.svg" alt="CI">
    </a>
  </p>
</div>

---

Deeptechnic is a structured, skill-based framework for conducting **independent technology due diligence** on hard-tech startup investments. It acts as a technical co-pilot for investment teams, helping them ask the right questions, find the right experts, and identify risks before capital is committed.

---

## 📋 Table of Contents

- [Why Deeptechnic](#-why-deeptechnic)
- [The 4-Round Workflow](#-the-4-round-workflow)
- [10 Quality Dimensions](#-10-quality-dimensions)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Core Skills](#-core-skills)
- [Evaluation Framework](#-evaluation-framework)
- [Continuous Improvement](#-continuous-improvement)
- [Configuration](#-configuration)
- [Development](#-development)
- [License](#-license)

---

## 🎯 Why Deeptechnic

Investment decisions in deep-tech are plagued by **asymmetric information**. Founders know their technology intimately; investors have limited time and domain expertise. Deeptechnic closes this gap by:

- **Validating claims independently** — Every technical claim in a BP gets physics-based verification, not just qualitative review
- **Finding what BPs hide** — Active discovery of omitted competitors, supply chain risks, and team gaps
- **Structuring the unknown** — Turning vague technical assertions into testable P0/P1/P2 questions
- **Learning from every project** — User feedback is captured automatically and fed into a continuous optimization loop

---

## 🔄 The 4-Round Workflow

```
Round 1 ──► Public Info Collection + Tech Assessment
                  │
                  ▼
Round 2 ──► Team Feedback Analysis + Interview Prep
                  │
                  ▼
Round 3 ──► Expert / Supply Chain / Customer Interviews
                  │
                  ▼
Round 4 ──► Synthesis → Comprehensive DD Report
```

| Round | Activity | Key Skills | Output |
|-------|----------|------------|--------|
| **1** | Extract & verify 4-6 core tech claims with physics calculations. Assess team per-person. Discover BP-omitted competitors. | `deep-tech-dd-analysis`, `anti-rationalization`, `team-assessment` | Preliminary report + P0/P1/P2 question list |
| **2** | Refresh cognitive model with team's responses. Generate structured interview outlines. | `iteration-merge`, `doubt-driven-analysis` | Expert interview template + supply chain inquiries |
| **3** | Cross-validate findings across multiple independent sources. | `supply-chain-audit`, `competitor-discovery` | Interview compilation + validation table |
| **4** | Synthesize all evidence into conclusive investment recommendation. | `report-generation`, `quality-gate` | Comprehensive DD report |

---

## 📊 10 Quality Dimensions

Every report is auto-scored across these dimensions (0.0–1.0):

| # | Dimension | Weight | What It Checks |
|---|-----------|--------|----------------|
| 1 | `claim_validation` | **0.20** | Independent physics formula + calculation for each core claim |
| 2 | `engineering_migration_gap` | 0.15 | Lab-to-product gap analysis |
| 3 | `per_person_assessment` | 0.15 | Each team member named with capability matching |
| 4 | `independent_competitor` | 0.10 | Active discovery of BP-omitted competitors |
| 5 | `supplier_level_analysis` | 0.10 | Specific supplier names + capacity assessment |
| 6 | `independent_analysis` | 0.10 | Independent reasoning vs BP paraphrasing |
| 7 | `team_gap_precision` | 0.05 | Precision of structural team gaps |
| 8 | `quantitative_score` | 0.05 | Decimal-precision scoring (e.g., 3.5/5) |
| 9 | `priority_levels` | 0.05 | P0/P1/P2 question prioritization |
| 10 | `overview_page` | 0.05 | Executive summary on page one |

All outputs must pass the **quality gate** (`scripts/check_quality_gate.py`) before delivery.

---

## 🚀 Quick Start

### Prerequisites

- Python 3.11+
- Node.js 18+ (optional, for DOCX generation)

### Installation

```bash
# Clone the repository
git clone https://github.com/ackiles/deeptechnic.git
cd deeptechnic

# Install Python dependencies
pip install -r requirements.txt

# Run tests to verify
make test
```

### Running a Quality Gate Check

```bash
python3 scripts/check_quality_gate.py path/to/report.md
```

### Classifying User Feedback Signals

```bash
echo "技术分析不够深入" | python3 scripts/classify_signal.py
```

### Validating Training Data

```bash
python3 scripts/validate_training_data.py
```

---

## 📁 Project Structure

```
├── 01-deeptechnic-definition.md   # Agent identity, capabilities, phase guide
├── 02-workflow-rules.md           # Complete 4-round workflow (657 lines)
├── evaluation-framework.md        # Investment evaluation criteria
├── skills-index.md                # Master index of all skills
├── AGENTS.md                      # AI agent operating manual
├── SOUL.md                        # Core personality principles
├── IDENTITY.md                    # Agent identity
├── MEMORY.md                      # Long-term curated memory
│
├── skills/                        # Core skills (12 SKILL.md files)
│   ├── deep-tech-dd-analysis/     # Physics-based claim validation
│   ├── anti-rationalization/      # BP rhetoric rebuttal
│   ├── doubt-driven-analysis/     # Adversarial tech review
│   ├── team-assessment/           # Per-person capability matching
│   ├── supply-chain-audit/        # Supplier-level analysis
│   ├── competitor-discovery/      # Active competitor search
│   ├── interview-me/              # Requirements elicitation
│   ├── quality-gate/              # 10-item output checklist
│   ├── report-generation/         # DOCX report assembly
│   ├── iteration-merge/           # Q&A information fusion
│   ├── feedback-collection/       # Zero-ops feedback capture
│   └── signal-classifier/         # Real-time message classification
│
├── agents/                        # Expert personas (4)
│   ├── tech-reviewer.md           # Physical feasibility expert
│   ├── competition-analyst.md     # Competitive strategy expert
│   ├── supply-chain-analyst.md    # Supply chain expert
│   └── team-evaluator.md          # Talent organization expert
│
├── references/                    # Knowledge base
│   ├── scientific-skills/         # 47 domain-specific skills (8 domains)
│   └── data/bp_claims.json        # 15 BP claim-rebuttal rules
│
├── scripts/                       # Automation
│   ├── check_quality_gate.py      # 10-item quality gate checker
│   ├── classify_signal.py         # User feedback signal classifier
│   └── validate_training_data.py  # Training data integrity check
│
├── projects/                      # Active project contexts
│   └── 项目注册表.md              # Cross-dialogue project registry
│
├── skillopt-integration/          # Continuous optimization pipeline
│   ├── run_skillopt.py            # SkillOpt training launcher
│   ├── data/deep_tech_dd/         # Training data (train/val/test)
│   └── 系统深度融合方案.md        # Architecture design doc
│
├── memory/                        # Daily session logs
├── .learnings/                    # Cross-session learnings
├── tests/                         # 25 unit tests
├── release/v1.0.0/                # Distributable meta-skill package
│
├── pyproject.toml
├── requirements.txt
├── Makefile
└── Dockerfile
```

---

## 🧠 Core Skills

Each skill is a standalone `SKILL.md` with a standard template:

```
Frontmatter → Overview → When to Use → Process (Checklist) → 
Rationalizations → Red Flags → Verification
```

| Skill | Purpose | When |
|-------|---------|------|
| **deep-tech-dd-analysis** | Extract 4-6 claims, run physics formula + calculation | Round 1-2 |
| **anti-rationalization** | 15 BP claim-rebuttal pairs (P0/P1/P2) | Round 1-2 |
| **doubt-driven-analysis** | CLAIM→EXTRACT→DOUBT→RECONCILE adversarial review | Round 1-2 |
| **interview-me** | Elicit technical specs from vague BPs | Round 1 |
| **team-assessment** | Per-person background + capability matching | Round 1-2 |
| **supply-chain-audit** | BOM decomposition + per-supplier analysis | Round 2-3 |
| **competitor-discovery** | BP-independent competitor search | Round 1, 3 |
| **quality-gate** | 10-item pre-output checklist | All rounds |
| **report-generation** | Structured DOCX report assembly | All rounds |
| **iteration-merge** | Q&A info fusion with change log | Iteration |
| **feedback-collection** | Auto signal aggregation → SkillOpt data | Post-delivery |
| **signal-classifier** | Real-time message→quality dimension mapping | Always active |

---

## 🧪 Evaluation Framework

Projects are classified into two categories and evaluated across **6 dimensions**:

### New Tech / New Market (≥30% market growth)
| Dimension | Key Questions |
|-----------|---------------|
| **Technology** | Is it truly advanced? Feasible? Well-suited to the problem? |
| **Market** | IPO-scale? Real demand? Right competitive niche? |
| **Team** | Sustained tech capability? Commercial talent? Full-time commitment? |
| **Business Model** | Early orders/POC? Cash flow sustainable? |
| **Strategy & Policy** | Aligned with national priorities? Strategic value? |
| **Risk** | Can big tech replicate it? Is the pain point real? |

### Existing Replacement (mature markets)
Same dimensions, with additional focus on cost reduction (30%+), migration path clarity, and switching cost analysis.

### Projects to Avoid
- Pseudo-innovations (unclear principles, buzzword engineering)
- Lab-stage without clear production path
- Red oceans (chip design, pure SaaS)
- Teams without sustained domain capability
- No commercial validation (zero orders/POC)

---

## 🔄 Continuous Improvement

Deeptechnic has a built-in **optimization loop**:

```
User message → signal-classifier (real-time)
     ↓
Session end → feedback-collection (auto-aggregate)
     ↓
Append to SkillOpt training data
     ↓
≥20 records → retrain → generate optimized skill patches
     ↓
Manual review → merge into workflow rules
```

**Current status:** 13 training records (target: 20), 4 data splits (train/val/test/deep).

---

## ⚙️ Configuration

Copy and edit the config file for project-level settings:

```bash
cp skillopt-config.yml skillopt-config.local.yml
# Edit skillopt-config.local.yml as needed
```

Environment variables:

| Variable | Required | Description |
|----------|----------|-------------|
| `DEEPSEEK_API_KEY` | For SkillOpt training | DeepSeek API key |
| `DEEPSEEK_ENDPOINT` | No | API endpoint (default: `https://api.deepseek.com/v1`) |

---

## 🛠 Development

```bash
# Install dev dependencies
pip install -r requirements.txt

# Run all 25 tests
make test

# Lint code
make lint

# Auto-format
make format

# Clean cache
make clean
```

### Adding a New Skill

1. Create `skills/<skill-name>/SKILL.md` following the standard template
2. Add an entry in `skills-index.md`
3. Reference it from the relevant phase in `02-workflow-rules.md`

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>
    Built with 🔬 for investors who need to see past the pitch deck.
  </p>
  <p>
    <a href="https://github.com/ackiles/deeptechnic/issues">Report Issue</a> ·
    <a href="https://github.com/ackiles/deeptechnic/discussions">Discussion</a>
  </p>
</div>
