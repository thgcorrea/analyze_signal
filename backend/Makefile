.PHONY: install install-dev format lint test run docker-up docker-down clean help

# Variables
VENV = venv
PYTHON = $(VENV)/bin/python
PIP = $(VENV)/bin/pip

help:
	@echo "Available commands:"
	@echo "  install       - Create virtual environment and install production dependencies"
	@echo "  install-dev   - Create virtual environment and install development dependencies"
	@echo "  install-hooks - Install pre-commit hooks for auto-formatting on commit"
	@echo "  format        - Format code with black and isort (auto-fix)"
	@echo "  lint          - Run flake8 linting"
	@echo "  lint-fix      - Auto-fix linting issues (format + lint check)"
	@echo "  test          - Run all tests (unit + integration)"
	@echo "  test-unit     - Run unit tests only"
	@echo "  test-integration - Run integration tests only"
	@echo "  run           - Run the application locally"
	@echo "  docker-up     - Start application with docker-compose"
	@echo "  docker-down   - Stop docker-compose services"
	@echo "  clean         - Remove virtual environment and cache files"

install:
	python3 -m venv $(VENV)
	$(PIP) install --upgrade pip
	$(PIP) install -r requirements.txt
	@echo "Production environment ready. Activate with: source $(VENV)/bin/activate"

install-dev:
	python3 -m venv $(VENV)
	$(PIP) install --upgrade pip
	$(PIP) install -r requirements-dev.txt
	@echo "Development environment ready. Activate with: source $(VENV)/bin/activate"

install-hooks:
	@if [ ! -d "$(VENV)" ]; then echo "Virtual environment not found. Run 'make install-dev' first."; exit 1; fi
	cd .. && backend/$(VENV)/bin/pre-commit install
	@echo "Pre-commit hooks installed. Code will be auto-formatted on commit."

format:
	@if [ ! -d "$(VENV)" ]; then echo "Virtual environment not found. Run 'make install-dev' first."; exit 1; fi
	$(VENV)/bin/black app/ tests/
	$(VENV)/bin/isort app/ tests/
	@echo "Code formatting complete"

lint:
	@if [ ! -d "$(VENV)" ]; then echo "Virtual environment not found. Run 'make install-dev' first."; exit 1; fi
	$(VENV)/bin/flake8 app/ tests/
	@echo "Linting complete"

lint-fix:
	@if [ ! -d "$(VENV)" ]; then echo "Virtual environment not found. Run 'make install-dev' first."; exit 1; fi
	@echo "Auto-fixing code formatting..."
	$(VENV)/bin/black app/ tests/
	$(VENV)/bin/isort app/ tests/
	@echo "Running lint check after auto-fix..."
	$(VENV)/bin/flake8 app/ tests/
	@echo "Lint fix complete"

test:
	@if [ ! -d "$(VENV)" ]; then echo "Virtual environment not found. Run 'make install-dev' first."; exit 1; fi
	$(VENV)/bin/pytest tests/ -v
	@echo "Tests complete"

test-unit:
	@if [ ! -d "$(VENV)" ]; then echo "Virtual environment not found. Run 'make install-dev' first."; exit 1; fi
	$(VENV)/bin/pytest tests/unit/ -v
	@echo "Unit tests complete"

test-integration:
	@if [ ! -d "$(VENV)" ]; then echo "Virtual environment not found. Run 'make install-dev' first."; exit 1; fi
	$(VENV)/bin/pytest tests/integration/ -v
	@echo "Integration tests complete"

run:
	@if [ ! -d "$(VENV)" ]; then echo "Virtual environment not found. Run 'make install' first."; exit 1; fi
	$(VENV)/bin/uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

docker-up:
	docker-compose up --build

docker-down:
	docker-compose down

clean:
	rm -rf $(VENV)
	find . -type d -name "__pycache__" -delete
	find . -type f -name "*.pyc" -delete
	find . -type d -name "*.egg-info" -delete
	@echo "Cleanup complete"