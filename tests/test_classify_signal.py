"""Tests for classify_signal.py"""
from scripts.classify_signal import aggregate, classify


def test_classify_returns_dict():
    result = classify("测试消息")
    assert "message" in result
    assert "signals" in result
    assert "count" in result


def test_classify_negative_insufficient():
    result = classify("分析不够深入")
    assert len(result["signals"]) > 0
    for s in result["signals"]:
        assert "negative" in s["direction"]


def test_classify_positive_appreciation():
    result = classify("分析做得好")
    assert len(result["signals"]) > 0
    directions = [s["direction"] for s in result["signals"]]
    assert any("positive" in d for d in directions) or any(d == "confirm_updated" for d in directions)


def test_classify_claim_validation():
    result = classify("你错了，这个参数不对")
    assert len(result["signals"]) > 0
    dimensions = {s["dimension"] for s in result["signals"]}
    assert "claim_validation" in dimensions


def test_classify_bp_independent():
    result = classify("和BP说的不一样")
    assert len(result["signals"]) > 0
    dimensions = {s["dimension"] for s in result["signals"]}
    assert "independent_analysis" in dimensions


def test_classify_engineering_gap():
    result = classify("这个量产工艺有问题")
    assert len(result["signals"]) > 0
    dimensions = {s["dimension"] for s in result["signals"]}
    assert "engineering_migration_gap" in dimensions


def test_classify_team_gap():
    result = classify("团队缺有经验的人")
    assert len(result["signals"]) > 0
    dimensions = {s["dimension"] for s in result["signals"]}
    assert "team_gap_precision" in dimensions


def test_classify_overview():
    result = classify("概述不够清晰")
    assert len(result["signals"]) > 0
    dimensions = {s["dimension"] for s in result["signals"]}
    assert "overview_page" in dimensions


def test_classify_quantitative_score():
    result = classify("这个评分不合理")
    assert len(result["signals"]) > 0
    dimensions = {s["dimension"] for s in result["signals"]}
    assert "quantitative_score" in dimensions


def test_classify_empty_message():
    result = classify("")
    assert result["count"] == 0


def test_classify_session_end():
    result = classify("今天就到这")
    assert len(result["signals"]) > 0
    for s in result["signals"]:
        assert s["direction"] == "session_end"


def test_aggregate_empty():
    result = aggregate([])
    assert result == {}


def test_aggregate_single():
    signals_list = [classify("分析不够深入")]
    result = aggregate(signals_list)
    assert len(result) > 0
    for dim, data in result.items():
        assert "score" in data
        assert "count" in data


def test_aggregate_positive_then_negative():
    s1 = classify("分析做得好")
    s2 = classify("分析不够深入")
    result = aggregate([s1, s2])
    composite = result.get("composite")
    assert composite is not None
    # Positive (0.5 + 0.10) then negative (0.60 - 0.15) => 0.45
    assert composite["count"] >= 2


def test_aggregate_score_clamped():
    """Multiple negatives should not drive score below 0."""
    very_bad = classify("不够 不够 不够 不够 不够")
    result = aggregate([very_bad])
    for dim, data in result.items():
        assert data["score"] >= 0
        assert data["score"] <= 1


def test_classify_supplier():
    result = classify("供应链成本分析不到位")
    assert len(result["signals"]) > 0
    dimensions = {s["dimension"] for s in result["signals"]}
    assert "supplier_level_analysis" in dimensions


def test_classify_competitor():
    result = classify("竞品对比不充分")
    assert len(result["signals"]) > 0
    dimensions = {s["dimension"] for s in result["signals"]}
    assert "independent_competitor" in dimensions


def test_classify_per_person():
    result = classify("团队履历不够详细")
    assert len(result["signals"]) > 0
    dimensions = {s["dimension"] for s in result["signals"]}
    assert "per_person_assessment" in dimensions
