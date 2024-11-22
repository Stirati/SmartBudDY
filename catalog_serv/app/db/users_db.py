# app/database/users_db.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

USERS_DATABASE_URL = "sqlite:///./users.db"  # Sostituisci con il tuo DB se necessario

users_engine = create_engine(
    USERS_DATABASE_URL, connect_args={"check_same_thread": False}
)
UsersSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=users_engine)
UsersBase = declarative_base()