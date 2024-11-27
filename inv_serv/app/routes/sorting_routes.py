from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
import httpx
from app.schemas.sorting_schemas import SortingInput

router = APIRouter(
    prefix="/sorting",
    tags=["sorting"],
)

API_GATEWAY_URL = "http://api-gateway-url"  # Sostituisci con l'URL reale dell'API Gateway

@router.post('/filter', response_model=List[Dict[str, Any]])
async def filter_products(input: SortingInput):
    async with httpx.AsyncClient() as client:
        response = await client.post(f"{API_GATEWAY_URL}/products/filter", json=input.dict())
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail="Error fetching data from catalog service")
        products = response.json()
        return products