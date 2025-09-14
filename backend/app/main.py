from fastapi import FastAPI

from app.api.routers import analyze_signal_router

app = FastAPI(
    title="Signal Analysis API",
    description="A simple API to analyze numeric signals",
    version="1.0.0",
)

# Include routers
app.include_router(analyze_signal_router)


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}


@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "message": "Signal Analysis API",
        "version": "1.0.0",
        "endpoints": {
            "analyze_signal": "/analyze_signal/analisar_sinal",
            "health": "/health",
            "docs": "/docs",
        },
    }
