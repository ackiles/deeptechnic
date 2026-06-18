"""Tests for check_quality_gate.py"""
import json, os, tempfile
from scripts.check_quality_gate import check, CHECKLIST


def test_checklist_has_10_items():
    assert len(CHECKLIST) == 10


def test_all_items_have_unique_names():
    names = [n for n, _ in CHECKLIST]
    assert len(names) == len(set(names))


def test_passes_good_report():
    text = """
    # 技术分析报告
    ## 概述
    核心结论：本项目技术路线可行。
    
    ## 物理验证
    根据物理公式计算：F = ma，实验数据支持。
    
    ## 团队
    姓名：张三，背景：清华大学博士
    
    ## 竞品
    BP遗漏了关键竞品分析，我们独立发现了3家竞品。
    
    评分：3.5/5
    
    ### 待验证问题
    P0: 核心指标是否达标
    P1: 供应链稳定性
    
    ## 供应链
    供应商：中芯国际，产能：每月5000片
    
    风险等级标记：✅ 通过  🟡 存疑  ❌ 不通过
    
    独立分析：本报告基于独立工程验证。
    """
    with tempfile.NamedTemporaryFile(mode="w", suffix=".md", delete=False) as f:
        f.write(text)
        path = f.name
    try:
        result = check(path)
        assert result["passed"] is True, f"Expected pass but got: {json.dumps(result, ensure_ascii=False, indent=2)}"
        assert result["score"] == 1.0
    finally:
        os.unlink(path)


def test_fails_report_without_physics():
    text = """
    # 技术分析报告
    该项目技术非常先进，团队背景优秀。
    """
    with tempfile.NamedTemporaryFile(mode="w", suffix=".md", delete=False) as f:
        f.write(text)
        path = f.name
    try:
        result = check(path)
        assert result["passed"] is False
        # Claim validation should fail
        claim_item = [d for d in result["details"] if "claim" in d["name"].lower()][0]
        assert claim_item["passed"] is False
    finally:
        os.unlink(path)


def test_fails_without_priority_markers():
    text = """
    # 技术分析报告
    物理公式验证通过。
    ## 供应商
    供应商A，产能充足
    风险等级标记：✅
    概述页内容
    独立分析
    """
    with tempfile.NamedTemporaryFile(mode="w", suffix=".md", delete=False) as f:
        f.write(text)
        path = f.name
    try:
        result = check(path)
        priority_item = [d for d in result["details"] if "优先级" in d["name"]][0]
        assert priority_item["passed"] is False
    finally:
        os.unlink(path)


def test_fails_without_risk_markers():
    text = """
    # 技术分析报告
    物理公式验证通过。
    评分：3.5/5
    P0: 问题一
    概述页内容
    独立分析
    """
    with tempfile.NamedTemporaryFile(mode="w", suffix=".md", delete=False) as f:
        f.write(text)
        path = f.name
    try:
        result = check(path)
        risk_item = [d for d in result["details"] if "等级标记" in d["name"]][0]
        assert risk_item["passed"] is False
    finally:
        os.unlink(path)


def test_fails_without_independent_analysis():
    text = """
    # 技术分析报告
    物理公式验证通过。
    评分：3.5/5
    P0: 问题一
    风险等级标记：✅
    概述页内容
    本项目完全按照BP所述进行转述。
    """
    with tempfile.NamedTemporaryFile(mode="w", suffix=".md", delete=False) as f:
        f.write(text)
        path = f.name
    try:
        result = check(path)
        independent_item = [d for d in result["details"] if "复述" in d["name"]][0]
        assert independent_item["passed"] is False
    finally:
        os.unlink(path)
