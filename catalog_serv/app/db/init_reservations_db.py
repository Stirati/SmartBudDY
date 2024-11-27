from app.db.products_db import products_engine, ProductsBase
from app.models.reservation_models import Reservation

print("Creazione delle tabelle nel database delle reservations")
ProductsBase.metadata.create_all(bind=products_engine)
print("Tabelle delle reservations create con successo")