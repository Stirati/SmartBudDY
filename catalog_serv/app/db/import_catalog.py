import json
from sqlalchemy.orm import Session
from app.db.products_db import ProductsSessionLocal
from app.models.product_models import Product, Category
from app.models.flavor_models import Flavor
from app.models.reservation_models import Reservation
from app.models.tier_models import Tier

def import_catalog(file_paths: list):
    db: Session = ProductsSessionLocal()
    try:
        for file_path in file_paths:
            with open(file_path, 'r', encoding='utf-8') as jsonfile:
                data = json.load(jsonfile)
                for item in data:
                    category_name = item.get('resourceCategory', 'Uncategorized')
                    category = db.query(Category).filter(Category.name == category_name).first()
                    if not category:
                        category = Category(name=category_name)
                        db.add(category)
                        db.commit()
                        db.refresh(category)
                    flavor_data = item.get('flavor')
                    flavor = None
                    if flavor_data:
                        flavor = Flavor(
                            name=flavor_data['name'],
                            code=flavor_data['code'],
                            os_platform=flavor_data['osPlatform'],
                            cpu=flavor_data['cpu'],
                            ram=flavor_data['ram'],
                            disk=flavor_data['disk']
                        )
                        db.add(flavor)
                        db.commit()
                        db.refresh(flavor)
                    product = Product(
                        name=item['productName'],
                        category_id=category.id
                    )
                    db.add(product)
                    db.commit()
                    db.refresh(product)
                    for reservation_data in item['reservations']:
                        reservation = Reservation(
                            term=reservation_data['term'],
                            price=reservation_data['price'],
                            product_id=product.id
                        )
                        db.add(reservation)
                    for tier_data in item['tiers']:
                        tier = Tier(
                            category=tier_data['category'],
                            minimum_units=tier_data['minimumUnits'],
                            percent_discount=tier_data['percentDiscount'],
                            product_id=product.id
                        )
                        db.add(tier)
                db.commit()
    finally:
        db.close()

if __name__ == "__main__":
    import_catalog([
        'catalog_computing.json',
        'catalog_storage.json',
        'catalog_container.json',
        'catalog_networking.json'
    ])