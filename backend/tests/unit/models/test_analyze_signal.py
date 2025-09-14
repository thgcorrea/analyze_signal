import pytest
from pydantic import ValidationError

from app.models.analyze_signal.request import SignalRequest
from app.models.analyze_signal.response import SignalAnalysis, TrendEnum


class TestSignalRequest:
    """Unit tests for SignalRequest model"""

    def test_valid_request(self):
        request = SignalRequest(data=[1, 2, 3, 4, 5])
        assert request.data == [1, 2, 3, 4, 5]

    def test_empty_data_validation(self):
        with pytest.raises(ValidationError) as exc_info:
            SignalRequest(data=[])
        assert "Data array cannot be empty" in str(exc_info.value)

    def test_invalid_data_type(self):
        with pytest.raises(ValidationError):
            SignalRequest(data=["a", "b", "c"])

    def test_mixed_types_invalid(self):
        with pytest.raises(ValidationError):
            SignalRequest(data=[1, "abc", 3])

    def test_float_conversion_fails(self):
        with pytest.raises(ValidationError):
            SignalRequest(data=[1.5, 2.5, 3.5])  # Should be integers only


class TestSignalAnalysis:
    """Unit tests for SignalAnalysis response model"""

    def test_valid_response(self):
        response = SignalAnalysis(
            average=3.0, minimum=1, maximum=5, trend=TrendEnum.ASCENDING
        )
        assert response.average == 3.0
        assert response.minimum == 1
        assert response.maximum == 5
        assert response.trend == TrendEnum.ASCENDING

    def test_trend_enum_values(self):
        # Test all valid trend values
        for trend in [
            TrendEnum.ASCENDING,
            TrendEnum.DESCENDING,
            TrendEnum.STABLE,
        ]:
            response = SignalAnalysis(
                average=3.0, minimum=1, maximum=5, trend=trend
            )
            assert response.trend == trend

    def test_serialization(self):
        response = SignalAnalysis(
            average=3.0, minimum=1, maximum=5, trend=TrendEnum.ASCENDING
        )

        data = response.model_dump()
        assert data == {
            "average": 3.0,
            "minimum": 1,
            "maximum": 5,
            "trend": "ascending",
        }

    def test_json_serialization(self):
        response = SignalAnalysis(
            average=3.0, minimum=1, maximum=5, trend=TrendEnum.ASCENDING
        )

        # Test JSON serialization
        json_str = response.model_dump_json()
        assert '"average":3.0' in json_str
        assert '"trend":"ascending"' in json_str
