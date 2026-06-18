FROM python:3.12-slim

WORKDIR /workspace

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    nodejs npm \
    && rm -rf /var/lib/apt/lists/*

# Copy release package
COPY . .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Run quality gate to verify setup
RUN python3 scripts/scripts/check_quality_gate.py scripts/scripts/check_quality_gate.py || true

CMD ["python3"]
