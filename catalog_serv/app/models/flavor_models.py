from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.db.products_db import ProductsBase

class Flavor(ProductsBase):
    __tablename__ = "flavors"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    code = Column(String, index=True)
    os_platform = Column(String)
    cpu = Column(Integer)
    ram = Column(Integer)
    disk = Column(Integer)
    product = relationship("Product", back_populates="flavor")