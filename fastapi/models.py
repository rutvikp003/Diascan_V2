from pydantic import BaseModel, field_validator
from typing import Optional
from datetime import datetime, timezone,date

class DetectionResult(BaseModel):
    Email: str
    age: int
    bmi: float
    fasting_glucose: float
    hba1c: float
    c_peptide: float
    insulin_level: float
    autoantibody_presence: int
    diabetes_type: str
    heart_disease: str
    kidney_issues: str
    nerve_damage: str
    eye_problems: str
    diabetes_complications: str
    overall_damage_probability: str
    timestamp: Optional[datetime] = datetime.now(timezone.utc)
    saved: Optional[bool] = False  # ✅ Now optional

    @field_validator("autoantibody_presence", mode="before")
    @classmethod
    def convert_autoantibody(cls, value):
        """Ensure autoantibody_presence is always stored as 0 or 1."""
        if isinstance(value, bool):  # Convert bool to int
            return int(value)
        if isinstance(value, str):  # Convert "0" or "1" string to int
            if value in ("0", "1"):
                return int(value)
        if isinstance(value, int) and value in (0, 1):  # Allow valid int values
            return value
        raise ValueError("autoantibody_presence must be 0 or 1")