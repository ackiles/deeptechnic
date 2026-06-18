#!/usr/bin/env python3
"""Check report against 10-item quality gate. Returns pass/fail per item."""
import json
import os
import re
import sys

CHECKLIST = [
    ("Claim验证完整性", "每个核心技术claim是否有独立物理定量验证"),
    ("工程迁移鸿沟", "是否分析了原理->产品的具体鸿沟"),
    ("逐人团队评估", "是否逐人列出姓名/背景/匹配度"),
    ("独立竞品发现", "是否主动发现BP遗漏的竞品"),
    ("定量评分", "评分是否带小数位(如3.5/5)"),
    ("优先级区分", "待验证问题是否分P0/P1/P2"),
    ("供应商级别分析", "是否有具体供应商名称和产能判断"),
    ("风险等级标记", "是否使用结构化标记(✅/🟡/❌)标注风险等级"),
    ("概述页", "第一页是否是核心结论概述"),
    ("非BP复述", "报告是否独立分析而非转述BP"),
]


def check(report_path: str) -> dict:
    with open(report_path) as f:
        text = f.read()
    results = []
    for i, (name, desc) in enumerate(CHECKLIST, 1):
        passed = True
        if "claim" in name.lower() and ("物理" not in text and "公式" not in text):
            passed = False
        if "逐人" in name and ("姓名" not in text and "背景" not in text):
            passed = False
        if "竞品" in name and "遗漏" not in text and "BP未" not in text:
            passed = False
        if "小数" in name and all(c not in text for c in ["3.5", "4.5", "2.5"]):
            passed = False
        if "优先级" in name and not re.search(r"P[0-2]", text):
            passed = False
        if "供应商" in name and "供应商" not in text:
            passed = False
        if "等级标记" in name and not re.search(r"[✅🟡❌]", text):
            passed = False
        if "概述" in name and "概述" not in text:
            passed = False
        if "复述" in name and "独立" not in text:
            passed = False
        results.append({"item": i, "name": name, "passed": passed})
    return {
        "passed": all(r["passed"] for r in results),
        "details": results,
        "score": round(sum(1 for r in results if r["passed"]) / len(results), 2)
    }


if __name__ == "__main__":
    if len(sys.argv) > 1:
        report_path = sys.argv[1]
        if not os.path.exists(report_path):
            print(json.dumps({"error": f"File not found: {report_path}"}, ensure_ascii=False))
            sys.exit(1)
        r = check(report_path)
        print(json.dumps(r, ensure_ascii=False, indent=2))
        sys.exit(0 if r["passed"] else 1)
    else:
        print("Usage: check_quality_gate.py <report_path>", file=sys.stderr)
        sys.exit(1)
