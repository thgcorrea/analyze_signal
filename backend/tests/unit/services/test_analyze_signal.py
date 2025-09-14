from app.models.analyze_signal.request import SignalRequest
from app.models.analyze_signal.response import TrendEnum
from app.services.analyze_signal import AnalyzeSignalService


class TestAnalyzeSignalService:
    """Unit tests for the AnalyzeSignalService business logic"""

    def test_analyze_ascending_trend(self):
        request = SignalRequest(data=[1, 2, 3, 4, 5])
        result = AnalyzeSignalService.analyze(request)

        assert result.average == 3.0
        assert result.minimum == 1
        assert result.maximum == 5
        assert result.trend == TrendEnum.ASCENDING

    def test_analyze_descending_trend(self):
        request = SignalRequest(data=[5, 4, 3, 2, 1])
        result = AnalyzeSignalService.analyze(request)

        assert result.average == 3.0
        assert result.minimum == 1
        assert result.maximum == 5
        assert result.trend == TrendEnum.DESCENDING

    def test_analyze_stable_trend(self):
        request = SignalRequest(data=[3, 3, 3, 3, 3])
        result = AnalyzeSignalService.analyze(request)

        assert result.average == 3.0
        assert result.minimum == 3
        assert result.maximum == 3
        assert result.trend == TrendEnum.STABLE

    def test_analyze_mixed_trend(self):
        request = SignalRequest(data=[1, 5, 2, 4, 3])
        result = AnalyzeSignalService.analyze(request)

        assert result.average == 3.0
        assert result.minimum == 1
        assert result.maximum == 5
        assert result.trend == TrendEnum.ASCENDING

    def test_single_value(self):
        request = SignalRequest(data=[42])
        result = AnalyzeSignalService.analyze(request)

        assert result.average == 42.0
        assert result.minimum == 42
        assert result.maximum == 42
        assert result.trend == TrendEnum.STABLE

    def test_determine_trend_edge_cases(self):
        # Test empty array
        result = AnalyzeSignalService._determine_trend([])
        assert result == TrendEnum.STABLE

        # Test single value
        result = AnalyzeSignalService._determine_trend([5])
        assert result == TrendEnum.STABLE

        # Test identical values - no changes
        result = AnalyzeSignalService._determine_trend([3, 3, 3, 3])
        assert result == TrendEnum.STABLE

        # sum_increasing = 1, sum_decreasing = 1 -> STABLE
        result = AnalyzeSignalService._determine_trend([1, 2, 1])
        assert result == TrendEnum.STABLE

        # sum_increasing = 1, sum_decreasing = 3 -> DESCENDING
        result = AnalyzeSignalService._determine_trend([4, 5, 2])
        assert result == TrendEnum.DESCENDING

        # sum_increasing = 4, sum_decreasing = 1 -> ASCENDING
        result = AnalyzeSignalService._determine_trend([1, 3, 2, 4])
        assert result == TrendEnum.ASCENDING
