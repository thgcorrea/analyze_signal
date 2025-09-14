from enum import Enum

from pydantic import BaseModel


class TrendEnum(str, Enum):
    ASCENDING = "ascending"
    DESCENDING = "descending"
    STABLE = "stable"


class SignalAnalysis(BaseModel):
    average: float
    minimum: int
    maximum: int
    trend: TrendEnum

    class Config:
        schema_extra = {
            "example": {
                "average": 4.0,
                "minimum": 1,
                "maximum": 7,
                "trend": "ascending",
            }
        }
