# agent-skills × Deeptechnic 整合分析

> 分析对象：[addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) — 生产级工程技能集合
> 整合目标：与 Deeptechnic 技术研判系统 + SkillOpt 持续优化流程融合

## 一、agent-skills 的结构精华（可直接采用）

agent-skills 24个 skill 遵循统一的 SKILL.md 结构，包含以下核心组件：

### 1.1 Skill 文档结构

```markdown
---
name: lowercase-hyphen-name
description: Guides agents through [task]. Use when…
---

# Skill Name

## Overview → 该 skill 做什么

## When to Use → 触发条件（何时启用、何时不用）

## The Process → 分步骤工作流（Checklist 驱动）

## Rationalizations → 常见借口 + 反驳（Anti-rationalization Table）

## Red Flags → 不对劲的信号

## Verification → 验收标准（证据要求）
```

### 1.2 对 Deeptechnic 的直接价值

| agent-skills 组件 | Deeptechnic 对应 | 整合价值 |
|---|---|---|
| **Process（步骤+Checklist）** | 02-workflow-rules.md（四轮流程） | 现有流程偏叙述，agent-skills 的 checklist 格式更清晰可执行 |
| **Anti-rationalization（借口-反驳表）** | 不存在 | **全新引入**—对 BP 常见话术的反驳清单，是 SkillOpt 训练的重要负样本 |
| **Verification（验收标准）** | 3.1.4 质量检查清单 | 概念一致，agent-skills 的"证据要求"表述更简洁 |
| **Red Flags（红旗信号）** | 项目评估思维导图.md "需规避类型" | 概念一致，可整合 |
| **When to Use（触发条件）** | 各轮次定义（初评/反馈分析/…） | 可统一为 Machine-readable 条件 |

### 1.3 Slack Commands 映射

agent-skills 有 7 个 slash command（/spec → /ship），对应开发周期。我们可以建立类似映射：

| 当前 Deeptechnic 动作 | 建议的 Slash Command | 含义 |
|---|---|---|
| 收到BP开始初评 | `/初评` | 启动第一轮：公开信息采集 + 技术研判 |
| 需要向团队提问 | `/提问` | 生成向团队提问清单 |
| 收到团队反馈 | `/复核` | 认知刷新分析 |
| 需要找专家 | `/访谈` | 生成专家/供应链/客户访谈提纲 |
| 输出最终报告 | `/终评` | 形成综合尽调意见 |

---

## 二、可以直接拿来用的 Skill（需修改）

### 2.1 `doubt-driven-development` → `质疑驱动分析`

**原始用途：** 对每个非平凡决策做对抗性审查

**Deeptechnic 适配方案：**
- CLAIM → EXTRACT → DOUBT → RECONCILE → STOP 流程完全适用于核心技术 claim 验证
- 替换为中文：声明 → 隔离 → 质疑 → 调和 → 停止
- DOUBT 步骤的对抗性提示词可直接翻译使用
- 跨模型升级机制：当单模型审查不确定时，邀请用户用其他模型交叉验证

**修改量：** 低（翻译 + 替换示例为技术研判场景）
**优先级：** ★★★★★（最直接可用的技能）

### 2.2 `interview-me` → `需求挖掘`

**原始用途：** 逐个问题采访用户直到 ~95% 置信度

**Deeptechnic 适配方案：**
- 在初评开始时，用来采访投资团队"你们到底想看什么"——比直接要 BP 更高效
- 也可用于对团队的反向采访策略设计
- Step 1 的「假设+置信度」机制 + 逐个提问模式直接可用

**修改量：** 低（语言翻译 + 场景替换）
**优先级：** ★★★★☆（提升初评前需求对齐度）

### 2.3 `code-review-and-quality` → `技术评审质量门控`

**原始用途：** 五轴代码审查

**Deeptechnic 适配方案：**
- 五轴改为：正确性(Correctness) → 参数量化(Quantification) → 工程可行性(Feasibility) → 独立性(Independence) → 团队匹配(Team Fit)
- Review Output Template 格式转型为「评审意见输出模板」
- 保留 Critical / Important / Suggestion 三级标签

**修改量：** 中（保留结构，替换审查轴和模板）
**优先级：** ★★★★☆（提升初评报告的评审质量）

### 2.4 `context-engineering` → `上下文工程`

**原始用途：** 在正确的时间给 agent 正确的上下文

**Deeptechnic 适配方案：**
- 定义每个尽调轮次的"上下文包"：哪些文件必须加载、哪些可选、哪些应该打包压缩
- 定义 skill 间传递数据的格式
- 可用于优化 SkillOpt 训练时的上下文管理

**修改量：** 中（保留框架，内容重写为尽调场景）
**优先级：** ★★★☆☆（优化系统效率但不直接影响产出质量）

---

## 三、需要从零或深度修改的 Skill

### 3.1 `anti-rationalization-skill`（全新）

**来源：** 受 agent-skills 的 Rationalizations 部分启发

**用途：** BP 常见话术的反驳清单。每次初评时自动参照。

格式：

```markdown
## BP 常见话术与标准反驳

| BP 话术 | 背后的标准反驳 | 评分扣分 |
|---------|---------------|---------|
| "我们的指标达到了国际领先水平" | "请提供第三方测试报告和对比数据，否则视为不可验证的自述" | claim_validation -0.2 |
| "团队有多年相关经验" | "请列出每个核心成员的具体履历和对应能力，否则视为泛泛而谈" | per_person_assessment -0.2 |
| "我们的技术路径是独创的" | "请提供专利检索证明和竞品对标分析，独创性需验证" | independent_competitor -0.2 |
| "成本可以降到现在的1/10" | "请提供BOM成本拆解或供应商正式报价" | supplier_level_analysis -0.2 |
| "市场空间有XX亿" | "请给出计算方法+数据来源，二手引用需追溯" | independent_analysis -0.2 |
| "我们的技术可以用于XX领域" | "请给出该领域的实际客户反馈或POC结果" | team_gap_precision -0.1 |
```

**这个 skill 的特殊价值：** 它既是工作中直接使用的工具，也是 **SkillOpt 训练数据的核心组成部分**——每个反诘直接对应 3.1.4 质量检查清单的一个维度。

**修改量：** 从零创建
**优先级：** ★★★★★（填补关键空白）

### 3.2 `expert-personas-deep-tech`（全新 Agent 集合）

**来源：** 受 agents/code-reviewer.md、agents/security-auditor.md 等启发

**用途：** 在第三轮专家访谈中，作为独立的专家角色对技术/供应链/团队做针对性审查

建议创建的 Persona：

| Persona | 对应 agent-skills 原型 | 专长领域 | 启用的审查轴 |
|---------|----------------------|----------|-------------|
| 技术评审专家 | code-reviewer | 核心技术 claim 验证、工程可行性 | claim_validation, engineering_migration_gap |
| 产业链分析师 | security-auditor | 供应链依赖、国产替代、产能评估 | supplier_level_analysis |
| 团队评估师 | — | 团队能力缺口、外部协作风险、履历核验 | per_person_assessment, team_gap_precision |
| 竞争格局分析师 | — | 竞品技术对标、BP遗漏发现、市场定位 | independent_competitor |

每个 Persona 的 Markdown 文件格式：

```markdown
---
name: 技术评审专家
description: 对硬科技项目的核心技术 claim 进行独立物理验证
skills: [deep-tech-dd-analysis, claim-validation-with-formula]
---

# 技术评审专家（Technical Reviewer）

你是一个拥有20年+经验的半导体/光学/材料科学领域技术专家。
你的角色是对项目的核心技术 claim 进行严苛的物理可行性验证。

## 审查框架

### 1. 物理定量验证
- 每个 claim 是否有对应的物理公式？
- 代入数值后，结果是否自洽？
- 是否存在多个无法同时满足的约束条件？

### 2. 工程迁移可行性
- 原理样机 → 工程样机 → 量产各阶段的差距
- 每个环节的已知瓶颈和突破路径

### 3. 核心竞争力判断
- 真正的壁垒 vs 参数改进 vs 通用技术
- 可替代性分析
```

**修改量：** 从零创建（4个 persona 文件）
**优先级：** ★★★★☆（大幅提升评估深度）

---

## 四、与 SkillOpt 的整合路径

### 4.1 anti-rationalization 作为 SkillOpt 的负样本数据

agent-skills 的 Rationalizations 表格天然适配 SkillOpt 的 reflect 阶段：

```
SkillOpt Reflect 阶段:
  当前 skill 对 BP 话术的应对是否充分？
  → 对比 anti-rationalization skill 的条目覆盖率
  → 低覆盖维度 → 建议编辑 skill (add anti-rationalization entries)
  → 验证门控: 新 skill 能否比旧 skill 识别更多话术漏洞
```

### 4.2 Slash Commands 作为 SkillOpt Benchmark 的任务入口

当我们用 SkillOpt 训练优化规则时，每个 slash command 对应一个 benchmark task：

| Command | Task | Evaluator | 
|---|---|---|
| `/初评` | 在给定项目 BP 下，遵循当前规则生成初评报告 | 3.1.4 质量清单 |
| `/质疑` | 对给定的 claim 做独立验证 | Doubt-Driven 流程完整性 |
| `/复核` | 根据新信息更新判断 | 4.2 信息融合规则遵守度 |

### 4.3 Persona → SkillOpt 的多目标优化

每个 expert persona 相当于 SkillOpt 的一个"评估维度"。可以同时训练：
- 技术评审专家 skill（优化 claim_validation 分）
- 团队评估师 skill（优化 per_person_assessment 分）
- 然后合并为一个主 skill（02-workflow-rules.md）

---

## 五、实施路线图

| 阶段 | 工作 | 依赖 |
|------|------|------|
| 1. 格式转化 | 将现有 01/02 号文件转为 agent-skills 格式（Frontmatter + Process + Anti-rationalization + Verification） | 已完成 |
| 2. 创建 anti-rationalization | 编写 BP 话术反驳清单，作为独立 skill | 10条以上话术 |
| 3. 创建 Persona | 编写 4 个专家 persona 文件（技术/供应链/团队/竞品） | agent-skills 模板参考 |
| 4. 创建 Slash Command 映射 | 定义 `/初评` `/质疑` `/复核` 等命令的触发规则 | 阶段 1-3 |
| 5. 整合 SkillOpt | 将 anti-rationalization 和 Persona 评估结果接入 SkillOpt 训练数据 | 阶段 2-3 |
| 6. 持续积累 | 每个项目交付后自动更新 Persona 的审查经验 | 持续 |
