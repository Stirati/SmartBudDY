# inv_serv/app/main.py
from fastapi import FastAPI
from app.routes import sorting_routes

app = FastAPI()

app.include_router(sorting_routes.router)

@app.get("/")
def read_root():
    return {"message": "inv_serv is running"}