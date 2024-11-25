# app/db/init_categories_db.py
from app.db.products_db import products_engine, ProductsBase
from app.models.category_models import Category

# Creazione delle tabelle nel database delle categories
ProductsBase.metadata.create_all(bind=products_engine)