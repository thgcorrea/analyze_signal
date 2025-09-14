# Signal Analysis API

A FastAPI-based REST API for analyzing numeric signals. This API accepts arrays of integers and returns statistical analysis including average, minimum, maximum values, and trend direction.

## Features

- **Signal Analysis**: Analyze arrays of integers to determine statistical properties
- **Trend Detection**: Determine if signal trend is ascending, descending, or stable
- **FastAPI**: Modern, fast web framework with automatic API documentation
- **Docker Support**: Easy containerized deployment
- **Unit Tests**: Comprehensive test coverage
- **Code Quality**: Black formatting, isort imports, and flake8 linting

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                          # FastAPI application entry point
│   ├── api/
│   │   ├── __init__.py
│   │   └── analyze_signal.py            # API router with endpoints
│   ├── models/
│   │   ├── __init__.py
│   │   └── analyze_signal/
│   │       ├── __init__.py
│   │       ├── request.py               # Request models (SignalRequest)
│   │       └── response.py              # Response models (SignalAnalysis)
│   └── services/
│       ├── __init__.py
│       └── analyze_signal.py            # Business logic
├── tests/
│   ├── __init__.py
│   └── test_analyze_signal.py           # Unit tests
├── requirements.txt                     # Production dependencies
├── requirements-dev.txt                 # Development dependencies
├── pyproject.toml                       # Code formatting configuration
├── Dockerfile                           # Docker image configuration
├── docker-compose.yml                   # Docker compose configuration
├── Makefile                            # Development commands
├── .gitignore                          # Git ignore file
└── README.md                           # This file
```

## API Endpoints

### POST /analyze_signal/analisar_sinal

Analyzes a signal array and returns statistics.

**Request Body:**
```json
{
  "data": [1, 2, 3, 4, 5]
}
```

**Response:**
```json
{
  "average": 3.0,
  "minimum": 1,
  "maximum": 5,
  "trend": "ascending"
}
```

**Trend Values:**
- `"ascending"`: Signal has an upward trend
- `"descending"`: Signal has a downward trend
- `"stable"`: Signal is relatively stable

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "healthy"
}
```

### GET /

Root endpoint with API information.

### GET /docs

Automatic API documentation (Swagger UI).

## Setup and Installation

### Option 1: Local Development with Virtual Environment

1. **Install development dependencies:**
   ```bash
   make install-dev
   ```

2. **Activate virtual environment:**
   ```bash
   source venv/bin/activate
   ```

3. **Run the application:**
   ```bash
   make run
   ```

The API will be available at `http://localhost:8000`

### Option 2: Docker

1. **Start with docker-compose:**
   ```bash
   make docker-up
   ```

The API will be available at `http://localhost:8000`

## Development Commands

The project includes a Makefile with useful commands:

```bash
make help          # Show available commands
make install       # Install production dependencies only
make install-dev   # Install development dependencies
make format        # Format code with black and isort
make lint          # Run flake8 linting
make test          # Run unit tests
make run           # Run application locally
make docker-up     # Start with docker-compose
make docker-down   # Stop docker services
make clean         # Remove virtual environment and cache
```

## Testing

Run the test suite:

```bash
make test
```

Or manually:

```bash
source venv/bin/activate
pytest tests/ -v
```

## Code Quality

Format code:
```bash
make format
```

Run linting:
```bash
make lint
```

## API Documentation

Once the application is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Example Usage

### Using curl

```bash
curl -X POST "http://localhost:8000/analyze_signal/analisar_sinal" \
     -H "Content-Type: application/json" \
     -d '{"data": [1, 3, 2, 5, 4, 7, 6]}'
```

### Using Python requests

```python
import requests

response = requests.post(
    "http://localhost:8000/analyze_signal/analisar_sinal",
    json={"data": [1, 3, 2, 5, 4, 7, 6]}
)

print(response.json())
# Output: {"average": 4.0, "minimum": 1, "maximum": 7, "trend": "ascending"}
```

## Trend Detection Algorithm

The trend detection uses the following logic:

1. Calculate the range: `range = max - min`
2. If range is very small relative to average (`range < 0.01 * avg`) or zero, return "stable"
3. Calculate position parameter: `p = (average - minimum) / range`
4. Apply threshold with epsilon (0.05):
   - If `p > 0.55`: ascending trend
   - If `p < 0.45`: descending trend
   - Otherwise: stable trend

## Requirements

- Python 3.8+
- FastAPI
- Uvicorn
- Pydantic

## License

This project is part of an assessment and is for educational/evaluation purposes.