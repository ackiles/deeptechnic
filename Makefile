.PHONY: test lint format clean install

# Run all tests
test:
	PYTHONPATH="." python3 -m pytest tests/ -v

# Lint all Python files
lint:
	ruff check scripts/ tests/ generate_report.py generate_improved_report.py

# Auto-format all Python files
format:
	ruff check --fix scripts/ tests/ generate_report.py generate_improved_report.py

# Clean up cache and build artifacts
clean:
	rm -rf __pycache__ .pytest_cache *.egg-info
	find . -name "__pycache__" -type d -exec rm -rf {} + 2>/dev/null || true
	find . -name "*.pyc" -delete

# Install dependencies
install:
	pip3 install -r requirements.txt

# Run quality gate on a report
check-report:
	python3 scripts/check_quality_gate.py $(REPORT)
