# Deeptechnic — AI-Powered Technical Due Diligence Framework

A structured system for conducting independent technology due diligence on hard-tech startup investments.

## Quick Start

**This is a meta-skill for AI agents.** Load it into your agent workspace to enable deep-tech DD capabilities.

```
1. Load this release into your agent's workspace
2. Start with SKILL.md as the entry point
3. Follow the Quick Start in SKILL.md to load phase-appropriate sub-skills
```

## Requirements

- Python 3.11+
- npm (for docx generation, optional)

### Python dependencies

```bash
pip install -r requirements.txt
```

## Structure

```
release/v1.0.0/
├── SKILL.md                        # Meta-skill entry point
├── 01-deeptechnic-definition.md    # Agent identity & capabilities
├── 02-workflow-rules.md            # 4-round DD workflow
├── evaluation-framework.md         # Evaluation criteria
├── requirements.txt                # Python dependencies
├── scripts/                        # Automation scripts
│   └── scripts/
│       ├── check_quality_gate.py   # 10-item quality gate
│       └── classify_signal.py      # User signal classification
├── references/                     # Knowledge base
│   ├── skills-index.md             # Skill index
│   ├── skills/                     # Core skills (12)
│   ├── agents/                     # Expert personas (4)
│   ├── scientific-skills/          # Domain skills (47)
│   ├── data/                       # BP claim-rebuttal rules
│   └── knowledge/                  # Knowledge artifacts
└── projects/example/               # Project template
```

## 4-Round Workflow

| Round | Activity | Output |
|-------|----------|--------|
| 1 | Public info collection + tech assessment | Preliminary report + team questions |
| 2 | Team feedback analysis | Expert interview outline + supply chain inquiries |
| 3 | External interviews | Cross-validated interview compilation |
| 4 | Synthesis | Comprehensive DD report |

## License

MIT
