# SkillOpt × Deeptechnic 技术研判系统整合设计方案

## 一、为什么 SkillOpt 适合我们

Deeptechnic 系统的核心资产是两篇 Markdown 文档：
- [`01-deeptechnic-definition.md`](../01-deeptechnic-definition.md) — 身份、能力、对话规则、输出原则（~200 行）
- [`02-workflow-rules.md`](../02-workflow-rules.md) — 四轮流程、9+1 项研判维度、质量清单（~500 行）

SkillOpt 的核心论点是：**Skill 文档是可以被自动优化的**（bounded text edits + validation gating）。

我们有天然的训练数据：
- 4 份历史报告（脉冲红外 = 正例，Micro-OLED/无人机/普瑞达 = 负例）
- 对应的项目 BP 描述
- 你的评分反馈（"脉冲红外写得好，其他不稳定"）

## 二、整合架构

```
SkillOpt 训练循环                          Deeptechnic 生产环境
┌──────────────────────┐                  ┌────────────────────┐
│  Rollout             │                  │  新项目 BP 输入     │
│  (冻结agent+当前skill │  best_skill.md  │  ↓                 │
│   生成报告)           │ ──────────────→  │  加载优化后的       │
│  ↓                   │                  │  流程规则           │
│  Reflect             │                  │  ↓                 │
│  (分析失败/成功轨迹)   │                  │  生成初评报告       │
│  ↓                   │                  │  ↓                 │
│  Edit (有界编辑)      │                  │  用户反馈           │
│  ↓                   │                  │  ↓                 │
│  Gate (验证门控)      │                  │  新轨迹 → 下一轮    │
│  ↓                   │                  │  SkillOpt 训练      │
│  best_skill.md       │                  └────────────────────┘
└──────────────────────┘
```

## 三、分阶段实施方案

### 阶段 0：环境准备（预计 1-2 天）
- [ ] 0.1 安装 SkillOpt（pip install skillopt）
- [ ] 0.2 确认本地 Python 3.10+ 环境
- [ ] 0.3 验证 SkillOpt 基础功能（跑一次 demo）

### 阶段 1：构建自定义 Benchmark（预计 2-3 天）
- [ ] 1.1 确定 Benchmark 名称：`deep-tech-dd`
- [ ] 1.2 设计任务格式（Task schema）
- [ ] 1.3 将历史项目数据格式化为 training/validation/test 任务
- [ ] 1.4 编写 rolloute（生成方法）
- [ ] 1.5 编写 evaluator（评分函数）
- [ ] 1.6 编写初始 skill 文档
- [ ] 1.7 配置 benchmark YAML

### 阶段 2：首次训练循环（预计 2-3 天）
- [ ] 2.1 运行第一次训练
- [ ] 2.2 检查训练输出和 skill 演变
- [ ] 2.3 评估优化后的 skill vs 原始 skill
- [ ] 2.4 手动审查 SkillOpt 发现的编辑规律

### 阶段 3：SkillOpt-Sleep 持续复盘（持续进行）
- [ ] 3.1 配置 SkillOpt-Sleep
- [ ] 3.2 将历史项目对话作为输入
- [ ] 3.3 定期跑 nightly consolidation

## 四、任务格式设计（Task Schema）

每个 SkillOpt task item 对应一个项目初评任务：

```json
{
  "id": "proj-001",
  "project_name": "脉冲红外石化视觉",
  "bp_summary": "团队声称... (简要BP核心叙事)",
  "domain": "半导体/红外/光学",
  "stage": "初评",
  "expected_quality": "good",
  "quality_flags": [
    "claim_validation_with_formulas",
    "engineering_migration_gap",
    "per_person_team_assessment",
    "supplier_level_chain_analysis",
    "independent_competitor_discovery"
  ],
  "feedback_notes": "用户评价：技术分析透彻，能在第一次交流前做到，其他报告不稳定"
}
```

## 五、Evaluator 设计（评分函数）

基于 [质量检查清单（3.1.4节）](../02-workflow-rules.md#314-初评报告生成前的质量检查清单) 的 10 项指标，定义为自动/半自动评分：

| 指标 | 评分方式 | 权重 |
|------|----------|------|
| claim_validation | 检查报告是否包含物理公式+数值计算 | 0.20 |
| engineering_migration_gap | 检查是否列出具体工程鸿沟环节 | 0.15 |
| per_person_assessment | 检查是否逐人列出姓名/背景/匹配度 | 0.15 |
| independent_competitor | 检查是否发现BP遗漏的竞品 | 0.10 |
| quantitative_score | 评分是否带小数位数 | 0.05 |
| priority_levels | 待验证问题是否分P0/P1/P2 | 0.05 |
| supplier_level_analysis | 供应链分析是否有具体供应商名称 | 0.10 |
| overview_page | 是否有概述页 | 0.05 |
| independent_analysis | 是否有独立分析（非BP复述） | 0.10 |
| team_gap_precision | 是否识别了结构性能缺口 | 0.05 |

**评分说明：**
- 完全自动化的指标（checklist 存在性检查）可直接用 regex/text parser 评分
- 质量判断（claim 验证深度）可能需要 LLM-as-Judge 进行半自动化评分
- 用户反馈可以作为 ground-truth label（脉冲红外=1.0，其他=0.6-0.7）

## 六、Rollout 适配策略

SkillOpt 的标准 rollout 方式是让 target model 执行任务、evalutor 自动评分。

对于 Deeptechnic，rollout 的边界条件：
1. **无法全自动化** — 生成一份真正的技术初评报告需要大量检索（scholarclaw、technology-news-search 等），不适合在 SkillOpt 的自动循环中重复执行
2. **替代方案**：用历史报告 + 用户评分作为 rollout 数据，跳过大模型生成环节，直接在**工作流程规则文档**上做编辑优化
3. **Skill 文档就是工作流程规则**（02-workflow-rules.md），不是 agent 的 system prompt

这意味着我们的用法更接近 **SkillOpt 的 skill 编辑能力**（reflect → edit → gate），而不是完整的 rollout loop。

## 七、风险与边界

| 风险 | 可能的影响 | 缓解措施 |
|------|-----------|----------|
| SkillOpt 默认假设 rollout 可全自动化，但我们的报告需要人工+工具配合 | 标准 rollout 循环不适用 | 使用"编辑-only"模式，用历史数据代替 rollout |
| 评估函数需要 LLM-as-Judge | 评分成本高、偏差可能 | 混合使用：自动检查结构化指标 + 人工标注 |
| 4 份历史报告的样本量太小 | 验证结果不可靠 | 用合成数据扩展，或在真实项目执行中逐步积累 |
| SkillOpt 默认配置面向问答/代码任务 | 需要自定义 benchmark 适配器 | 从 SearchQA 适配器复制并修改 |

## 八、快速启动路径（推荐）

不追求 SkillOpt 全流程自动化，先验证核心假设：

**Step 1**：格式化历史数据为 SkillOpt 兼容格式 → 确认 pipelines 能跑通
**Step 2**：写一个自定义 evaluator → 跑一次 eval-only 模式，看评分是否合理
**Step 3**：用最小的 learning rate 跑一次 1 epoch 训练 → 观察 skill 是否朝脉冲红外的方向演进
**Step 4**：审查 SkillOpt 自动发现的编辑规律 → 人工决定哪些纳入工作流程规则
