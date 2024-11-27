# inv_serv/app/routes/sorting_routes.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.products_db import ProductsSessionLocal
from app.models.product_models import Product
from app.schemas.product_schemas import Product as ProductSchema
from app.schemas.sorting_schemas import SortingInput

router = APIRouter(
    prefix="/sorting",
    tags=["sorting"],
)

def get_products_db():
    db = ProductsSessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post('/filter', response_model=List[ProductSchema])
def filter_products(input: SortingInput, db: Session = Depends(get_products_db)):
    query = db.query(Product)
    
    if input.cpu_min is not None:
        query = query.filter(Product.flavor.has(cpu__gte=input.cpu_min))
    if input.cpu_max is not None:
        query = query.filter(Product.flavor.has(cpu__lte=input.cpu_max))
    if input.ram_min is not None:
        query = query.filter(Product.flavor.has(ram__gte=input.ram_min))
    if input.ram_max is not None:
        query = query.filter(Product.flavor.has(ram__lte=input.ram_max))
    if input.disk_min is not None:
        query = query.filter(Product.flavor.has(disk__gte=input.disk_min))
    if input.disk_max is not None:
        query = query.filter(Product.flavor.has(disk__lte=input.disk_max))
    
    products = query.all()
    return products