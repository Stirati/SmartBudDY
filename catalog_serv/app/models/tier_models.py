from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.db.products_db import ProductsBase
from app.models.product_models import Product

class Tier(ProductsBase):
    __tablename__ = "tiers"
    id = Column(Integer, primary_key=True, index=True)
    category = Column(String)
    minimum_units = Column(Integer)
    percent_discount = Column(Float)
    product_id = Column(Integer, ForeignKey("products.id"))
    product = relationship("Product", back_populates="tiers")