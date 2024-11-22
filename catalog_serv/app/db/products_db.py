# app/database/products_db.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

PRODUCTS_DATABASE_URL = "sqlite:///./products.db"  # Sostituisci con il tuo DB se necessario

products_engine = create_engine(
    PRODUCTS_DATABASE_URL, connect_args={"check_same_thread": False}
)
ProductsSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=products_engine)
ProductsBase = declarative_base()