from typing import List

from pydantic import BaseModel, Field, validator


class SignalRequest(BaseModel):
    data: List[int] = Field(
        ..., description="Array of integer values to analyze"
    )

    @validator("data")
    def validate_data_not_empty(cls, v):
        if not v:
            raise ValueError("Data array cannot be empty")
        return v

    class Config:
        schema_extra = {"example": {"data": [1, 3, 2, 5, 4, 6, 7]}}
