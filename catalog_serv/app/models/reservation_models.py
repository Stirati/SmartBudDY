from sqlalchemy import Column, Integer, String, ForeignKey, Float
from sqlalchemy.orm import relationship
from app.db.products_db import ProductsBase
from app.models.product_models import Product

class Reservation(ProductsBase):
    __tablename__ = 'reservations'
    id = Column(Integer, primary_key=True, index=True)
    term = Column(String, index=True)
    price = Column(Float)
    product_id = Column(Integer, ForeignKey('products.id'))
    product = relationship("Product", back_populates="reservations")