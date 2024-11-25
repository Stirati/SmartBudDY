# app/db/init_flavors_db.py
from app.db.products_db import products_engine, ProductsBase
from app.models.flavor_models import Flavor

# Creazione delle tabelle nel database dei flavors
ProductsBase.metadata.create_all(bind=products_engine)