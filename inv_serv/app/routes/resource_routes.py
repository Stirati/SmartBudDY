from fastapi import APIRouter, HTTPException
import httpx
from typing import List
from app.schemas.resource_schemas import ResourceCreate, Resource as ResourceSchema

router = APIRouter(
    prefix="/resources",
    tags=["resources"],
)

API_GATEWAY_URL = "http://api-gateway:80"

@router.post('/', response_model=ResourceSchema)
async def create_resource(resource: ResourceCreate):
    async with httpx.AsyncClient() as client:
        response = await client.post(f"{API_GATEWAY_URL}/catalog/resources", json=resource.dict())
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)
        return response.json()

@router.get('/', response_model=List[ResourceSchema])
async def read_resources(skip: int = 0, limit: int = 10):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{API_GATEWAY_URL}/catalog/resources", params={"skip": skip, "limit": limit})
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)
        return response.json()