# app/main.py
from fastapi import FastAPI
from app.routes.product_routes import router as product_router
from app.routes.user_routes import router as user_router

app = FastAPI()

app.include_router(product_router)
app.include_router(user_router)