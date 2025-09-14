# Analyze Signal - Monorepo

A full-stack application for analyzing numeric signal data, built with FastAPI (backend) and a modern frontend framework.

## Project Structure

```
analyze_signal/
├── backend/          # FastAPI REST API
│   ├── app/         # Application code
│   ├── tests/       # Unit and integration tests
│   ├── Dockerfile   # Docker configuration
│   ├── Makefile     # Development commands
│   └── README.md    # Backend documentation
└── frontend/         # Frontend application (to be implemented)
    └── ...
```

## Features

### Backend (FastAPI)
- **Signal Analysis API**: REST endpoint that accepts arrays of integers
- **Statistical Analysis**: Calculates average, min/max values
- **Trend Detection**: Determines if signal is ascending, descending, or stable
- **Comprehensive Testing**: Unit tests for business logic, integration tests for API
- **Code Quality**: Black formatting, isort, flake8 linting
- **Docker Support**: Containerized deployment with docker-compose
- **Development Tools**: Makefile with common commands

### API Endpoint
```
POST /analyze_signal/analisar_sinal
Content-Type: application/json

{
  "data": [1, 2, 3, 4, 5]
}

Response:
{
  "average": 3.0,
  "minimum": 1,
  "maximum": 5,
  "trend": "ascending"
}
```

## Quick Start

### Backend Development

1. **Set up development environment:**
   ```bash
   cd backend
   make install-dev
   ```

2. **Run the application:**
   ```bash
   make run
   ```
   API will be available at `http://localhost:8000`

3. **Run tests:**
   ```bash
   make test           # All tests
   make test-unit      # Unit tests only
   make test-integration # Integration tests only
   ```

4. **Code quality:**
   ```bash
   make lint-fix       # Auto-fix formatting issues
   make lint           # Check code quality
   ```

### Docker Deployment

```bash
cd backend
make docker-up
```

## Development Workflow

### Backend Commands
```bash
cd backend

# Environment setup
make install-dev      # Install development dependencies
make install-hooks    # Set up pre-commit hooks

# Development
make run             # Run application locally
make test            # Run all tests
make lint-fix        # Format and fix linting issues

# Docker
make docker-up       # Start with docker-compose
make docker-down     # Stop docker services
```

## API Documentation

Once the backend is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Technology Stack

### Backend
- **FastAPI**: Modern, fast web framework
- **Pydantic**: Data validation and serialization
- **Pytest**: Testing framework
- **Black + isort**: Code formatting
- **Flake8**: Code linting
- **Docker**: Containerization

### Frontend (Planned)
- To be implemented with modern frontend framework

## Project Architecture

### Backend Structure
```
backend/app/
├── api/
│   ├── endpoints/      # API endpoint functions
│   └── routers.py      # FastAPI router configuration
├── models/
│   └── analyze_signal/ # Pydantic models for request/response
├── services/
│   └── analyze_signal.py # Business logic
└── main.py            # FastAPI application entry point
```

### Test Structure
```
backend/tests/
├── unit/
│   ├── models/        # Model validation tests
│   └── services/      # Business logic tests
└── integration/
    └── api/          # API endpoint tests
```

## Signal Analysis Algorithm

The trend detection algorithm works by:
1. Comparing each value with the previous one
2. Summing all positive differences (increases)
3. Summing all negative differences (decreases)
4. Determining trend based on which sum is larger:
   - `sum_increasing > sum_decreasing` → **ASCENDING**
   - `sum_decreasing > sum_increasing` → **DESCENDING**
   - `sum_increasing = sum_decreasing` → **STABLE**

## Contributing

1. Clone the repository
2. Set up development environment (see Quick Start)
3. Make changes and add tests
4. Run tests and linting: `make test && make lint-fix`
5. Commit and push changes

## License

This project is part of an assessment and is for educational/evaluation purposes.