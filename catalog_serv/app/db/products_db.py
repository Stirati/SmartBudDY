# app/db/products_db.py
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

PRODUCTS_DATABASE_URL = "sqlite:///./products.db"

products_engine = create_engine(
    PRODUCTS_DATABASE_URL, connect_args={"check_same_thread": False}
)
ProductsSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=products_engine)
ProductsBase = declarative_base()