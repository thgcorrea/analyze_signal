# Analyze Signal - Monorepo

A full-stack application for analyzing numeric signal data, built with FastAPI (backend) and React TypeScript (frontend).

## Project Structure

```
analyze_signal/
├── backend/          # FastAPI REST API
│   ├── app/         # Application code
│   ├── tests/       # Unit and integration tests
│   ├── Dockerfile   # Docker configuration
│   ├── Makefile     # Development commands
│   └── README.md    # Backend documentation
└── frontend/         # React TypeScript frontend
    ├── src/         # Source code
    │   ├── pages/   # Page components
    │   ├── shared/  # Reusable components
    │   ├── hooks/   # Custom React hooks
    │   ├── services/# API services
    │   ├── utils/   # Utility functions
    │   ├── types/   # TypeScript definitions
    │   └── tests/   # Test files
    ├── .env.example # Environment variables template
    └── craco.config.js # Build configuration
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

### Frontend (React TypeScript)
- **Signal Analysis Interface**: Interactive UI for inputting signal data
- **Results Visualization**: Display of statistical analysis and trend detection
- **Input Validation**: Real-time validation of numeric input arrays
- **Responsive Design**: Mobile-first approach with Material-UI
- **Path Aliases**: Clean imports with "@" aliases (`@/components`, `@/hooks`, etc.)
- **Styled Components**: Emotion-based styled components architecture
- **Comprehensive Testing**: 63+ unit and integration tests with Jest and React Testing Library
- **Code Quality**: ESLint, Prettier formatting
- **Environment Configuration**: Configurable API endpoints via .env files

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

### Frontend Development

1. **Set up environment:**
   ```bash
   cd frontend
   cp .env.example .env
   npm install
   ```

2. **Configure environment variables:**
   Edit `.env` file:
   ```bash
   REACT_APP_API_BASE_URL=http://localhost:8000
   ```

3. **Run the application:**
   ```bash
   npm start
   ```
   Frontend will be available at `http://localhost:3000`

4. **Run tests:**
   ```bash
   npm test           # All tests
   npm run test:coverage  # With coverage report
   ```

5. **Code quality:**
   ```bash
   npm run lint:fix   # Auto-fix linting issues
   npm run format     # Format code with Prettier
   ```

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

### Frontend Commands
```bash
cd frontend

# Environment setup
cp .env.example .env  # Copy environment template
npm install          # Install dependencies

# Development
npm start           # Start development server
npm test            # Run all tests
npm run build       # Build for production
npm run lint:fix    # Fix linting issues
npm run format      # Format code with Prettier
```

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

### Frontend
- **React 19**: Modern UI library
- **TypeScript**: Type-safe JavaScript
- **Material-UI (MUI)**: React component library
- **Emotion**: CSS-in-JS styled components
- **React Testing Library**: Component testing
- **Jest**: Testing framework
- **ESLint + Prettier**: Code quality and formatting
- **CRACO**: Create React App configuration override

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

### Frontend Structure
```
frontend/src/
├── pages/
│   └── SignalAnalyzer/ # Main signal analysis page
├── shared/             # Reusable components
│   ├── InputField/    # Text input component
│   ├── SubmitButton/  # Submit button component
│   └── ResultCard/    # Result display card
├── hooks/
│   └── useSignalAnalysis.ts # Signal analysis API hook
├── services/
│   └── api.ts         # API client configuration
├── utils/
│   └── inputParser.ts # Input parsing and validation
├── types/
│   └── index.ts       # TypeScript type definitions
└── tests/
    ├── unit/          # Unit tests by component
    └── integration/   # Integration tests
```

### Test Structure
```
backend/tests/
├── unit/
│   ├── models/        # Model validation tests
│   └── services/      # Business logic tests
└── integration/
    └── api/          # API endpoint tests

frontend/src/tests/
├── unit/
│   ├── InputField/    # Input component tests
│   ├── SubmitButton/  # Button component tests
│   ├── ResultCard/    # Result card tests
│   ├── SignalAnalyzer/# Main page tests
│   ├── hooks/         # React hooks tests
│   └── utils/         # Utility function tests
└── integration/
    └── signalAnalysis/# End-to-end integration tests
```

## Environment Configuration

### Frontend Environment Variables

The frontend uses environment variables to configure API endpoints and other settings.

**Required Variables:**
- `REACT_APP_API_BASE_URL`: Base URL for the backend API (e.g., `http://localhost:8000`)

**Setup:**
1. Copy the example file: `cp frontend/.env.example frontend/.env`
2. Update the `.env` file with your specific configuration
3. The `.env` file is git-ignored for security

**Example `.env` file:**
```bash
# API Configuration
REACT_APP_API_BASE_URL=http://localhost:8000

# Environment
NODE_ENV=development
```

**Note:** All React environment variables must be prefixed with `REACT_APP_` to be accessible in the browser.

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