# api_gateway/app/main.py
from fastapi import FastAPI, Request, Response
import httpx

app = FastAPI()

CATALOG_SERVICE_URL = "http://catalog-service:80"
INVENTORY_SERVICE_URL = "http://inventory-service:80"
PRICING_SERVICE_URL = "http://pricing-service:80"

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