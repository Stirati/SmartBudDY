from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.users_db import UsersSessionLocal, users_engine, UsersBase
from app.models.user_models import User
from app.schemas.user_schemas import UserCreate, User as UserSchema
from passlib.context import CryptContext

# Creazione delle tabelle
UsersBase.metadata.create_all(bind=users_engine)

router = APIRouter(
    prefix="/users",
    tags=["users"],
)

def get_users_db():
    db = UsersSessionLocal()
    try:
        yield db
    finally:
        db.close()

# Configurazione per l'hashing delle password
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

@router.post('/', response_model=UserSchema)
def create_user(user: UserCreate, db: Session = Depends(get_users_db)):
    hashed_password = get_password_hash(user.password)
    db_user = User(username=user.username, email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user