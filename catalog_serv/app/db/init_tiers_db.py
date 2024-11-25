# app/db/init_tiers_db.py
from app.db.products_db import products_engine, ProductsBase
from app.models.tier_models import Tier

# Creazione delle tabelle nel database dei tiers
ProductsBase.metadata.create_all(bind=products_engine)