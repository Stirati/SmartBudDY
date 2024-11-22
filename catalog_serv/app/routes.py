# catalog_service/app/routes.py
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from .database import get_db, engine, Base
from .models import Category, Product

app = FastAPI()

Base.metadata.create_all(bind=engine)

@app.post('/categories')
def add_category(name: str, db: Session = Depends(get_db)):
    new_category = Category(name=name)
    db.add(new_category)
    db.commit()
    db.refresh(new_category)
    return new_category

@app.post('/products')
def add_product(name: str, description: str, price: float, category_id: int, db: Session = Depends(get_db)):
    category = db.query(Category).filter(Category.id == category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    new_product = Product(name=name, description=description, price=price, category=category)
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

@app.get('/categories')
def get_categories(db: Session = Depends(get_db)):
    return db.query(Category).all()

@app.get('/products')
def get_products(db: Session = Depends(get_db)):
    return db.query(Product).all()

@app.get('/products/{product_id}')
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product