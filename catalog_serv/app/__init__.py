# app/__init__.py
from fastapi import FastAPI
from app.routes import product_router, user_router

app = FastAPI(
    title="Catalog Service",
    description="API per la gestione di prodotti e utenti con due database separati.",
    version="1.0.0"
)

# Inclusione dei router
app.include_router(product_router)
app.include_router(user_router)