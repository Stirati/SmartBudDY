print("Inizializzazione del modulo routes")
try:
    from .product_routes import router as product_router
    print("Importazione di product_router riuscita")
except ImportError as e:
    print("Errore durante l'importazione di product_router:", e)

try:
    from .user_routes import router as user_router
    print("Importazione di user_router riuscita")
except ImportError as e:
    print("Errore durante l'importazione di user_router:", e)