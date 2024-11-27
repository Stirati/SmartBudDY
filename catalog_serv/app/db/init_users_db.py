from app.db.users_db import users_engine, UsersBase
from app.models.user_models import User

print("Creazione delle tabelle nel database degli utenti")
UsersBase.metadata.create_all(bind=users_engine)
print("Tabelle degli utenti create con successo")