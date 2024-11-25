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
    async with httpx.AsyncClient() as client:
        path = request.url.path
        method = request.method
        headers = dict(request.headers)
        body = await request.body()

        if path.startswith("/catalog"):
            url = f"{CATALOG_SERVICE_URL}{path[len('/catalog'):]}"
        elif path.startswith("/inventory"):
            url = f"{INVENTORY_SERVICE_URL}{path[len('/inventory'):]}"
        elif path.startswith("/pricing"):
            url = f"{PRICING_SERVICE_URL}{path[len('/pricing'):]}"
        elif path.startswith("/sorting"):
            url = f"{SORTING_SERVICE_URL}{path[len('/sorting'):]}"
        elif path.startswith("/instantiation"):
            url = f"{INSTANTIATION_SERVICE_URL}{path[len('/instantiation'):]}"
        elif path.startswith("/active-resources"):
            url = f"{ACTIVE_RESOURCES_SERVICE_URL}{path[len('/active-resources'):]}"
        else:
            return Response("Not Found", status_code=404)

        try:
            response = await client.request(
                method=method,
                url=url,
                headers=headers,
                content=body
            )
            return Response(
                content=response.content,
                status_code=response.status_code,
                headers=dict(response.headers)
            )
        except httpx.RequestError as e:
            return Response(f"Error proxying request: {e}", status_code=500)

@app.get("/")
def read_root():
    return {"message": "API Gateway is running"}