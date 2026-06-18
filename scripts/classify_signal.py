#!/usr/bin/env python3
"""Classify user utterance as quality signal. Zero-ops feedback extraction."""
import json
import re
import sys

SIGNAL_RULES = [
    # Pattern, dimension, direction, weight
    (r"再分析|再看|不够|不足|欠缺|缺少", "composite", "negative", 0.15),
    (r"这个写得|分析做得好|透彻|到位|认同|正确", "composite", "positive", 0.10),
    (r"和BP说的不一样|不是BP说的|独立", "independent_analysis", "positive", 0.10),
    (r"你错了|不对|错了|误解了|理解错", "claim_validation", "negative", 0.20),
    (r"竞品|竞争对手|对比|对标", "independent_competitor", "negative", 0.15),
    (r"团队|背景|履历|经历", "per_person_assessment", "negative", 0.15),
    (r"供应链|供应商|成本|bom|BOM|物料", "supplier_level_analysis", "negative", 0.15),
    (r"技术指标|参数|数据|测试|实验", "claim_validation", "negative", 0.12),
    (r"和上次比|比之前差|质量不稳定", "composite", "negative_compare", 0.10),
    (r"按刚才|按讨论|改一下|重写|重做", "composite", "implicit_reject", 0.05),
    (r"先这样|今天就到这|下次再", None, "session_end", 0),
    (r"好\b|行\b|可以\b|没问题|ok|OK", "composite", "confirm_updated", 0.15),
    (r"不错|很好|棒|厉害", "composite", "positive", 0.10),
    # Missing dimensions from quality gate
    (r"量产|工程化|工艺|良率|成品率", "engineering_migration_gap", "negative", 0.15),
    (r"缺.*人|没有.*经验|团队.*缺口|结构性", "team_gap_precision", "negative", 0.10),
    (r"评分|打分|评级|分数", "quantitative_score", "negative", 0.10),
    (r"概述|一页|摘要一眼|第一页|executive.summary", "overview_page", "negative", 0.10),
]


def classify(message: str) -> dict:
    """Classify a single user message into signals."""
    signals = []
    for pattern, dim, direction, weight in SIGNAL_RULES:
        if re.search(pattern, message, re.IGNORECASE):
            signals.append({
                "dimension": dim or "signal_only",
                "direction": direction,
                "weight": weight,
                "matched": pattern,
            })
    return {"message": message[:100], "signals": signals, "count": len(signals)}


def aggregate(signals_list: list) -> dict:
    """Aggregate multiple signal entries into dimension scores."""
    dims = {}
    for entry in signals_list:
        for s in entry.get("signals", []):
            d = s["dimension"]
            direction = s.get("direction", "")
            if d not in dims:
                dims[d] = {"score": 0.5, "count": 0, "signals": []}
            delta = s["weight"] * (1 if direction and "positive" in direction else -1)
            dims[d]["score"] = max(0, min(1, dims[d]["score"] + delta))
            dims[d]["count"] += 1
            dims[d]["signals"].append(direction)

    result = {}
    for d, v in dims.items():
        result[d] = {"score": round(v["score"], 3), "count": v["count"]}
    return result


if __name__ == "__main__":
    msg = sys.argv[1] if len(sys.argv) > 1 else sys.stdin.read().strip()
    if msg:
        print(json.dumps(classify(msg), ensure_ascii=False, indent=2))
    else:
        print(json.dumps({"error": "No input message"}, ensure_ascii=False))
