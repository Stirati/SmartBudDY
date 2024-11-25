from app.db.products_db import products_engine, ProductsBase
from app.models.product_models import Product, Category
from app.models.flavor_models import Flavor
from app.models.reservation_models import Reservation
from app.models.tier_models import Tier

# Creazione delle tabelle nel database dei prodotti
ProductsBase.metadata.create_all(bind=products_engine)