from fastapi import FastAPI
from app.routes.resource_routes import router as resource_router

app = FastAPI()

app.include_router(resource_router)

@app.get("/")
def read_root():
    return {"message": "inv_serv is running"}