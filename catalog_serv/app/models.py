# catalog_service/app/models.py

# Tipi di dati e chiavi per le colonne
from sqlalchemy import Column, Integer, String, Float, ForeignKey
#Definisce le relazioni tra le tabelle
from sqlalchemy.orm import relationship
#Base da cui i modelli ereditano
from .database import Base

class Category(Base):
    __tablename__ = 'categories'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    products = relationship('Product', back_populates='category')

class Product(Base):
    __tablename__ = 'products'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    description = Column(String)
    price = Column(Float, nullable=False)
    category_id = Column(Integer, ForeignKey('categories.id'))
    category = relationship('Category', back_populates='products')