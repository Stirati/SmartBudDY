# app/db/init_products_db.py
from app.db.products_db import products_engine, ProductsBase
from app.models.product_models import Product, Category

# Creazione delle tabelle nel database dei prodotti
ProductsBase.metadata.create_all(bind=products_engine)