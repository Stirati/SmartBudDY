from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from app.db.products_db import ProductsSessionLocal, products_engine, ProductsBase
from app.models.product_models import Category, Product
from app.models.tier_models import Tier
from app.schemas.product_schemas import CategoryCreate, Category as CategorySchema, ProductCreate, Product as ProductSchema
from app.schemas.sorting_schemas import SortingInput
import json

# Creazione delle tabelle
ProductsBase.metadata.create_all(bind=products_engine)

router = APIRouter(
    prefix="/products",
    tags=["products"],
)

def get_products_db():
    db = ProductsSessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post('/categories', response_model=CategorySchema)
def add_category(category: CategoryCreate, db: Session = Depends(get_products_db)):
    db_category = Category(name=category.name)
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

@router.post('/items', response_model=ProductSchema)
def add_product(product: ProductCreate, db: Session = Depends(get_products_db)):
    category = db.query(Category).filter(Category.id == product.category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    db_product = Product(**product.model_dump())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

def load_json_data(file_path: str) -> List[Dict[str, Any]]:
    with open(file_path, 'r') as file:
        return json.load(file)

@router.post('/filter', response_model=List[Dict[str, Any]])
def filter_products(input: SortingInput):
    files = [
        "SmartBudDY/PRODOTTI/Catalogo/catalog_computing.json",
        "SmartBudDY/PRODOTTI/Catalogo/catalog_storage.json",
        "SmartBudDY/PRODOTTI/Catalogo/catalog_networking.json",
        "SmartBudDY/PRODOTTI/Catalogo/catalog_container.json"
    ]
    
    all_products = []
    for file in files:
        all_products.extend(load_json_data(file))
    
    filtered_products = []
    for product in all_products:
        flavor = product.get("flavor", {})
        cpu = int(flavor.get("cpu", 0))
        ram = int(flavor.get("ram", 0))
        disk = int(flavor.get("disk", 0))
        
        if input.cpu_min is not None and cpu < input.cpu_min:
            continue
        if input.cpu_max is not None and cpu > input.cpu_max:
            continue
        if input.ram_min is not None and ram < input.ram_min:
            continue
        if input.ram_max is not None and ram > input.ram_max:
            continue
        if input.disk_min is not None and disk < input.disk_min:
            continue
        if input.disk_max is not None and disk > input.disk_max:
            continue
        
        filtered_products.append(product)
    
    return filtered_products