# app/models/user_models.py
from sqlalchemy import Column, Integer, String
from app.db.users_db import UsersBase

class User(UsersBase):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    tier = Column(String, index=True)
    credit = Column(Integer)