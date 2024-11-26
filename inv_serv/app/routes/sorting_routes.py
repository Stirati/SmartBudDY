# inv_serv/app/routes/sorting_routes.py
from fastapi import APIRouter, Depends, HTTPException
from typing import List
import httpx
from app.schemas.sorting_schemas import SortingInput
from app.schemas.product_schemas import Product

router = APIRouter(
    prefix="/sorting",
    tags=["sorting"],
)

API_GATEWAY_URL = "http://api-gateway-url"  # Sostituisci con l'URL reale dell'API Gateway

@router.post('/filter', response_model=List[Product])
async def filter_products(input: SortingInput):
    async with httpx.AsyncClient() as client:
        response = await client.post(f"{API_GATEWAY_URL}/catalog/filter", json=input.dict())
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail="Error fetching data from catalog service")
        products = response.json()
        return products