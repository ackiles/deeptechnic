#!/usr/bin/env python3
"""Validate SkillOpt training data integrity."""
import json
import os
import sys

QUALITY_DIMS = [
    "claim_validation", "engineering_migration_gap", "per_person_assessment",
    "independent_competitor", "supplier_level_analysis", "independent_analysis",
    "team_gap_precision", "quantitative_score", "priority_levels", "overview_page",
]


def validate_split(split_dir: str, split_name: str) -> list[str]:
    items_path = os.path.join(split_dir, "items.json")
    if not os.path.exists(items_path):
        return [f"{split_name}/items.json: not found"]

    with open(items_path) as f:
        items = json.load(f)

    errors = []
    seen_ids = set()
    for i, item in enumerate(items):
        item_id = item.get("id", f"item_{i}")

        # Check duplicate IDs
        if item_id in seen_ids:
            errors.append(f"{split_name}[{i}]: duplicate id '{item_id}'")
        seen_ids.add(item_id)

        # Check quality dimension scores
        scores = item.get("quality_dimensions", {})
        for dim in QUALITY_DIMS:
            val = scores.get(dim)
            if val is None:
                errors.append(f"{split_name}[{i}].{dim}: missing")
            elif not isinstance(val, (int, float)) or val < 0 or val > 1:
                errors.append(f"{split_name}[{i}].{dim}: invalid value {val} (must be 0-1)")

        # Check feedback signal
        feedback = item.get("feedback_signal", "")
        if feedback == "无信号":
            errors.append(f"{split_name}[{i}]: feedback_signal is '无信号' (noise)")

    return errors


def main():
    data_root = sys.argv[1] if len(sys.argv) > 1 else os.path.join(
        os.path.dirname(os.path.dirname(__file__)),
        "skillopt-integration", "data", "deep_tech_dd"
    )

    all_errors = []
    for split in ["train", "val", "test", "deep"]:
        split_dir = os.path.join(data_root, split)
        if os.path.exists(split_dir):
            errors = validate_split(split_dir, split)
            all_errors.extend(errors)
            print(f"{split}: {len(errors)} issues")
        else:
            print(f"{split}: not found")

    # Cross-split duplicate check
    all_ids = {}
    for split in ["train", "val", "test", "deep"]:
        items_path = os.path.join(data_root, split, "items.json")
        if not os.path.exists(items_path):
            continue
        with open(items_path) as f:
            for item in json.load(f):
                item_id = item["id"]
                if item_id in all_ids:
                    all_errors.append(
                        f"Cross-split duplicate: '{item_id}' in {split} and {all_ids[item_id]}"
                    )
                all_ids[item_id] = split

    if all_errors:
        print(f"\n{len(all_errors)} total issues:")
        for e in all_errors:
            print(f"  - {e}")
        sys.exit(1)
    else:
        print("All checks passed.")


if __name__ == "__main__":
    main()
