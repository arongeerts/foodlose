from pydantic import BaseModel, Field
from typing import List


class Intake(BaseModel):
    description: str
    calories: int


class Sport(BaseModel):
    description: str


class BaseRecord(BaseModel):
    record_date: str
    weight: float
    perimeter_arm: int
    perimeter_cut: int
    perimeter_belly: int
    perimeter_leg: int
    perimeter_hips: int
    intake_score: int = Field(default=None, description="A score out of 5 on intake health")
    sports_score: int = Field(default=None, description="A score out of 5 on sports practiced")


class Record(BaseRecord):
    intakes: List[Intake] = []
    sports: List[Sport] = []

    def to_base(self):
        return BaseRecord(**self.dict())
