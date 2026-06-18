#!/usr/bin/env python3
"""
Deeptechnic × SkillOpt training and evaluation script.

Usage:
    python3 run_skillopt.py --mode train
    python3 run_skillopt.py --mode eval

Configuration is loaded from skillopt-config.yml (project root).
API keys from environment: DEEPSEEK_API_KEY
"""
from __future__ import annotations

import argparse
import os
import sys

# ── Locate project root (relative to this script) ──────────────────────
_PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
_CONFIG_PATH = os.path.join(_PROJECT_ROOT, "skillopt-config.yml")
_DEFAULT_SKILL_INIT = os.path.join(_PROJECT_ROOT, "02-workflow-rules.md")
_DEFAULT_DATA_DIR = os.path.join(os.path.dirname(__file__), "data", "deep_tech_dd")
_DEFAULT_OUT_ROOT = os.path.join(os.path.dirname(__file__), "outputs")
_DEFAULT_SKILLS_DIR = os.path.join(_PROJECT_ROOT, "skills")


def load_config() -> dict:
    """Load config from skillopt-config.yml, with env var overrides."""
    import yaml

    cfg = {
        "model": {
            "backend": "azure_openai",
            "optimizer": "deepseek-chat",
            "optimizer_backend": "openai_chat",
            "reasoning_effort": "low",
            "azure_openai_endpoint": os.environ.get(
                "DEEPSEEK_ENDPOINT", "https://api.deepseek.com/v1"
            ),
            "azure_openai_auth_mode": "openai_compatible",
        },
        "env": {
            "name": "deep_tech_dd",
            "split_mode": "split_dir",
            "split_dir": _DEFAULT_DATA_DIR,
            "skill_init": _DEFAULT_SKILL_INIT,
            "out_root": _DEFAULT_OUT_ROOT,
            "skills_dir": _DEFAULT_SKILLS_DIR,
        },
        "train": {
            "num_epochs": 2,
            "batch_size": 1,
            "seed": 42,
        },
        "gradient": {
            "minibatch_size": 2,
            "analyst_workers": 1,
            "failure_only": False,
        },
        "optimizer": {
            "learning_rate": 4,
            "lr_scheduler": "constant",
            "skill_update_mode": "patch",
            "use_slow_update": False,
            "use_meta_skill": False,
        },
        "evaluation": {
            "use_gate": True,
            "sel_env_num": 1,
            "test_env_num": 1,
            "eval_test": True,
        },
    }

    # Load file config if exists (overrides defaults)
    if os.path.exists(_CONFIG_PATH):
        with open(_CONFIG_PATH) as f:
            file_cfg = yaml.safe_load(f) or {}
            _deep_merge(cfg, file_cfg)

    # API key from environment
    api_key = os.environ.get("DEEPSEEK_API_KEY", "")
    cfg["model"]["azure_openai_api_key"] = api_key

    return cfg


def _deep_merge(base: dict, override: dict) -> None:
    """Recursively merge override into base."""
    for key, value in override.items():
        if key in base and isinstance(base[key], dict) and isinstance(value, dict):
            _deep_merge(base[key], value)
        else:
            base[key] = value


def main():
    parser = argparse.ArgumentParser(description="Deeptechnic × SkillOpt training")
    parser.add_argument("--mode", choices=["train", "eval"], default="train")
    parser.add_argument("--epochs", type=int, default=None,
                        help="Override training epochs")
    parser.add_argument("--batch", type=int, default=None,
                        help="Override batch size")
    args = parser.parse_args()

    cfg = load_config()

    # CLI overrides
    if args.epochs is not None:
        cfg["train"]["num_epochs"] = args.epochs
    if args.batch is not None:
        cfg["train"]["batch_size"] = args.batch

    # Validate API key
    if not cfg["model"].get("azure_openai_api_key"):
        print("[ERROR] DEEPSEEK_API_KEY not set. Export it or add to .env", file=sys.stderr)
        sys.exit(1)

    if args.mode == "eval":
        _run_eval(cfg)
    else:
        _run_train(cfg)


def _run_eval(cfg: dict):
    """Eval-only: score skill against test data."""
    try:
        from skillopt.envs.deep_tech_dd.adapter import DeepTechDDAdapter  # noqa: F401
        from scripts.eval_only import main as eval_main
    except ImportError as e:
        print(f"[ERROR] SkillOpt not installed or adapter missing: {e}", file=sys.stderr)
        sys.exit(1)

    os.environ["DEEPTECH_DD_CFG"] = str(cfg)
    sys.argv = ["eval_only", "--env", "deep_tech_dd"]
    eval_main()


def _run_train(cfg: dict):
    """Full training loop."""
    import tempfile
    import yaml

    try:
        from skillopt.envs.deep_tech_dd.adapter import DeepTechDDAdapter  # noqa: F401
        from scripts.train import main as train_main
    except ImportError as e:
        print(f"[ERROR] SkillOpt not installed or adapter missing: {e}", file=sys.stderr)
        sys.exit(1)

    # Write config to a temp file (not in the configs/ dir to avoid overwriting)
    tmp = tempfile.NamedTemporaryFile(mode="w", suffix=".yaml", delete=False)
    with tmp:
        yaml.dump(cfg, tmp, default_flow_style=False)
    config_path = tmp.name

    try:
        sys.argv = ["train", "--config", config_path]
        train_main()
    finally:
        os.unlink(config_path)


if __name__ == "__main__":
    main()
