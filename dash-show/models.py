from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class RiskAssessment(BaseModel):
    Email: str
    glucose: float
    blood_pressure: float
    bmi: float
    insulin: float
    risk_level: str
    assessment_date: datetime

    class Config:
        orm_mode = True



# this is the last data 
