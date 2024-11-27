from app.db.products_db import products_engine, ProductsBase
from app.models.tier_models import Tier

print("Creazione delle tabelle nel database dei tiers")
ProductsBase.metadata.create_all(bind=products_engine)
print("Tabelle dei tiers create con successo")