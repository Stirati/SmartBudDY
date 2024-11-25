from .products_db import products_engine, ProductsBase
from .users_db import users_engine, UsersBase

# Creazione delle tabelle nel database dei prodotti
ProductsBase.metadata.create_all(bind=products_engine)

# Creazione delle tabelle nel database degli utenti
UsersBase.metadata.create_all(bind=users_engine)