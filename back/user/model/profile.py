import datetime

from pydantic import BaseModel, Field
from typing import Optional

from helpers.password_helper import encrypt


class BaseProfile(BaseModel):
    first_name: str
    role: str = 'USER'
    last_name: str
    gender: str
    date_of_birth: str
    email: str
    phone: str
    zip_code: str = Field(default="0000", description="ZIP Code")
    consent_version: str = Field(default="0.0.0", description="Version of the Terms and conditions that consent was given for")
    height: int = Field(default=0, description="Height in cm")


class ProfileInput(BaseProfile):
    password: str

    def to_storage(self):
        user_id = datetime.datetime.now().strftime("%Y%m%d%H%M%S%f")
        password_hash = encrypt(self.password)
        d = self.dict()
        d["password_hash"] = password_hash
        d["user_id"] = user_id
        return ProfileStorage(**d)


class ProfileStorage(BaseProfile):
    user_id: str
    password_hash: str

    def to_output(self):
        return ProfileOutput(**self.dict())


class ProfileOutput(BaseProfile):
    user_id: str


class SearchProfile(BaseModel):
    user_id: str
    first_name: str
    last_name: str
    email: str
    role: str


class ProfileUpdate(BaseModel):
    user_id: str
    first_name: Optional[str]
    last_name: Optional[str]
    gender: Optional[str]
    date_of_birth: Optional[str]
    email: Optional[str]
    password: Optional[str]
    phone: Optional[str]
    zip_code: Optional[str] = Field(default=None, description="ZIP Code")
    consent_version: Optional[str] = Field(default=None, description="Version of the Terms and conditions that consent was given for")
    height: Optional[int] = Field(default=None, description="Height in cm")
