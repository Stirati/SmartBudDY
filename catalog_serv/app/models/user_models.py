# app/models/user_models.py
from sqlalchemy import Column, Integer, String, Boolean
from app.db.users_db import UsersBase

class User(UsersBase):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    is_active = Column(Boolean, default=True)
    hashed_password = Column(String, nullable=False)  # Assicurati di gestire l'hashing delle password