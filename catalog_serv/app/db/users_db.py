# app/db/users_db.py
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

USERS_DATABASE_URL = "sqlite:///./users.db"

users_engine = create_engine(
    USERS_DATABASE_URL, connect_args={"check_same_thread": False}
)
UsersSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=users_engine)
UsersBase = declarative_base()