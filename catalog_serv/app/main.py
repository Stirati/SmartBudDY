import sys
import os
from fastapi import FastAPI

# Aggiungi il percorso del progetto al PYTHONPATH
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Stampa di debug per verificare il PYTHONPATH
print("PYTHONPATH:", sys.path)

# Stampa di debug per verificare se i moduli vengono importati correttamente
try:
    from app.routes import product_router, user_router
    print("Importazione dei router riuscita")
except ImportError as e:
    print("Errore durante l'importazione dei router:", e)

app = FastAPI()

try:
    app.include_router(product_router)
    print("Inclusione del router dei prodotti riuscita")
except NameError as e:
    print("Errore durante l'inclusione del router dei prodotti:", e)

try:
    app.include_router(user_router)
    print("Inclusione del router degli utenti riuscita")
except NameError as e:
    print("Errore durante l'inclusione del router degli utenti:", e)