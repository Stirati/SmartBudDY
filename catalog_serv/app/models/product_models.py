from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.db.products_db import ProductsBase  # Usa la classe base comune

class Category(ProductsBase):
    __tablename__ = 'categories'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    products = relationship("Product", back_populates="category")

class Product(ProductsBase):
    __tablename__ = 'products'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    category_id = Column(Integer, ForeignKey('categories.id'))
    category = relationship("Category", back_populates="products")
    tiers = relationship("Tier", back_populates="product")
    reservations = relationship("Reservation", back_populates="product")