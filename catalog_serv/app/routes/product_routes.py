from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.products_db import ProductsSessionLocal, products_engine, ProductsBase
from app.models.product_models import Category, Product
from app.models.tier_models import Tier
from app.schemas.product_schemas import CategoryCreate, Category as CategorySchema, ProductCreate, Product as ProductSchema

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