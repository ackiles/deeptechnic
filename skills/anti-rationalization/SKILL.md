---
name: anti-rationalization
description: BP 常见话术反驳清单。15条标准反驳，按P0/P1/P2优先级分。数据保存在 references/data/bp_claims.json。
aliases: [BP话术反驳, 团队应答鉴别]
---

# Anti-Rationalization — BP 话术反驳

## 数据文件

`references/data/bp_claims.json` — 15 条话术-反驳对，每条含：
- claim: 话术原文
- rebuttal: 标准反驳
- dim: 对应的质量维度（用于 SkillOpt 评分）
- level: 优先级（P0=必须回答/P1=建议/P2=可暂缓）

## The Process

### Step 1: 扫描话术
用怀疑的态度阅读 BP，识别以下 6 类信号：

1. **绝对性措辞** — 唯一/首创/独家/颠覆性/革命性
2. **模糊量化** — 很多客户/行业领先/显著提升
3. **避实就虚** — 这个参数在优化中/关注整体方案而非指标
4. **不完整对比** — 只比好了不比差了
5. **过度承诺** — 同时满足物理上矛盾的约束
6. **指代不明** — 通过独家工艺/核心算法（不展开）

### Step 2: 匹配 references/data/bp_claims.json

找到匹配的话术，记录到评估文档。

### Step 3: 转化为追问

P0 → 必须回答，否则项目不可推进
P1 → 建议回答
P2 → 可暂缓

## Red Flags

1. BP 中没有一张实测数据截图/测试报告
2. 拒绝在签 TS 前提供核心数据
3. 把未来目标当现在成就说（预计/目标 vs 已实现混用）
4. 团队全部非全职
