# app/schemas/user_schemas.py
from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str  # Gestione della password (hashing) necessaria

class User(UserBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True