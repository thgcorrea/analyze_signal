from fastapi import APIRouter

from app.api.endpoints.analyze_signal import analyze_signal
from app.models.analyze_signal.response import SignalAnalysis

analyze_signal_router = APIRouter(
    prefix="/analyze_signal", tags=["Signal Analysis"]
)

analyze_signal_router.post("/analisar_sinal", response_model=SignalAnalysis)(
    analyze_signal
)
