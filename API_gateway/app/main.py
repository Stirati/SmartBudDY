import os
from fastapi import FastAPI, Request, Response
import httpx
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# URL dei servizi esistenti
CATALOG_SERVICE_URL = os.getenv("CATALOG_SERVICE_URL")
INVENTORY_SERVICE_URL = os.getenv("INVENTORY_SERVICE_URL")
PRICING_SERVICE_URL = os.getenv("PRICING_SERVICE_URL")

# URL dei nuovi servizi
SORTING_SERVICE_URL = os.getenv("SORTING_SERVICE_URL")
INSTANTIATION_SERVICE_URL = os.getenv("INSTANTIATION_SERVICE_URL")
ACTIVE_RESOURCES_SERVICE_URL = os.getenv("ACTIVE_RESOURCES_SERVICE_URL")

@app.middleware("http")
async def proxy_requests(request: Request, call_next):
    path = request.url.path
    print(f"Ricevuta richiesta per il percorso: {path}")
    if path.startswith("/catalog"):
        url = f"{CATALOG_SERVICE_URL}{path}"
    elif path.startswith("/inventory"):
        url = f"{INVENTORY_SERVICE_URL}{path}"
    elif path.startswith("/pricing"):
        url = f"{PRICING_SERVICE_URL}{path}"
    elif path.startswith("/sorting"):
        url = f"{SORTING_SERVICE_URL}{path}"
    elif path.startswith("/instantiation"):
        url = f"{INSTANTIATION_SERVICE_URL}{path}"
    elif path.startswith("/active-resources"):
        url = f"{ACTIVE_RESOURCES_SERVICE_URL}{path}"
    else:
        return await call_next(request)

    print(f"Inoltro della richiesta a: {url}")
    async with httpx.AsyncClient() as client:
        response = await client.request(
            method=request.method,
            url=url,
            headers=request.headers,
            content=await request.body()
        )
        print(f"Ricevuta risposta con status code: {response.status_code}")
        return Response(content=response.content, status_code=response.status_code, headers=dict(response.headers))

@app.get("/")
def read_root():
    print("Endpoint root chiamato")
    return {"message": "API Gateway is running"}