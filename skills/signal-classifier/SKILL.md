---
name: signal-classifier
description: 零操作隐式反馈采集。每次收到用户消息自动运行 scripts/classify_signal.py 分类为质量维度信号。
aliases: [信号分类, 自动侦听, 隐式反馈]
---

# Signal Classifier

自动运行：`python3 scripts/classify_signal.py "用户消息"`

## 映射逻辑

| 用户说了 | 映射为 |
|---------|--------|
| "再分析竞品" / "XX不够" | 对应维度 负向 -0.15 |
| "写得好" / "透彻" | 综合正向 +0.10 |
| "和BP/之前说的不一样" | independent_analysis 正向 |
| "你错了" / "不对" | claim_validation 负向 -0.20 |
| 未提某个维度 | 标记 null 不扣分 |
| "好"/"行"（改后确认）| 综合正向 +0.15（修正信号） |

## 信号累积

同一维度多次信号：
- 负向累计：每加一条 weight 增加
- 正向可修正（"这次可以了" → 反转）
- 最终汇总公式：从 0.50 开始 ± 累计信号 × weight

## 触发写入

- 用户说"先这样吧"/对话结束 → 汇总
- 版本从 vN → vN+1 → 汇总
- 汇总结果自动写入用户反馈与自评记录.md + SkillOpt 训练数据
