from typing import List

from app.models.analyze_signal.request import SignalRequest
from app.models.analyze_signal.response import SignalAnalysis, TrendEnum


class AnalyzeSignalService:
    @staticmethod
    def analyze(request: SignalRequest) -> SignalAnalysis:
        data = request.data

        average = sum(data) / len(data)
        minimum = min(data)
        maximum = max(data)

        trend = AnalyzeSignalService._determine_trend(data)

        return SignalAnalysis(
            average=average, minimum=minimum, maximum=maximum, trend=trend
        )

    @staticmethod
    def _determine_trend(arr: List[int]) -> TrendEnum:
        if not arr or len(arr) < 2:
            return TrendEnum.STABLE

        sum_increasing = 0
        sum_decreasing = 0

        for i in range(1, len(arr)):
            difference = arr[i] - arr[i - 1]
            if difference > 0:
                sum_increasing += difference
            elif difference < 0:
                sum_decreasing += abs(difference)

        if sum_increasing > sum_decreasing:
            return TrendEnum.ASCENDING
        elif sum_decreasing > sum_increasing:
            return TrendEnum.DESCENDING
        else:
            return TrendEnum.STABLE
