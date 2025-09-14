from fastapi import HTTPException

from app.models.analyze_signal.request import SignalRequest
from app.models.analyze_signal.response import SignalAnalysis
from app.services.analyze_signal import AnalyzeSignalService


async def analyze_signal(request: SignalRequest) -> SignalAnalysis:
    """
    Analyze a signal array and return statistics and trend information.

    - **data**: Array of integer values to analyze

    Returns:
    - **average**: Average of all values
    - **minimum**: Minimum value in the array
    - **maximum**: Maximum value in the array
    - **trend**: Overall trend (ascending, descending, or stable)
    """
    try:
        result = AnalyzeSignalService.analyze(request)
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
