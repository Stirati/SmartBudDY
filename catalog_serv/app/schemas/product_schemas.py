from pydantic import BaseModel

class CategoryBase(BaseModel):
    name: str

class CategoryCreate(CategoryBase):
    pass

class Category(CategoryBase):
    id: int

    class Config:
        from_attributes = True 

class FlavorBase(BaseModel):
    name: str
    code: str
    os_platform: str
    cpu: int
    ram: int
    disk: int

class FlavorCreate(FlavorBase):
    pass

class Flavor(FlavorBase):
    id: int

    class Config:
        from_attributes = True  

class ReservationBase(BaseModel):
    term: str
    price: float

class ReservationCreate(ReservationBase):
    pass

class Reservation(ReservationBase):
    id: int

    class Config:
        from_attributes = True 

class TierBase(BaseModel):
    category: str
    minimum_units: int
    percent_discount: float

class TierCreate(TierBase):
    pass

class Tier(TierBase):
    id: int

    class Config:
        from_attributes = True  

class ProductBase(BaseModel):
    resource_name: str
    resource_category: str
    currency_code: str
    unit_of_measure: str
    unit_price: float
    product_name: str
    flavor_id: int
    category_id: int

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    id: int
    name: str
    category_id: int

    class Config:
        from_attributes = True 