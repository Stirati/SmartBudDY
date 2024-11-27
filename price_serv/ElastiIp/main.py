from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional
import json
import uvicorn

app = FastAPI()

# Enable CORS with more specific configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],  # Vite default ports
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load catalog from JSON file
def load_catalog():
    try:
        with open("catalog_networking.json", "r") as file:
            data = json.load(file)
            return data.get("resources", [])
    except FileNotFoundError:
        print("File not found. Ensure 'catalog_networking.json' exists in the same directory.")
        return []
    except json.JSONDecodeError:
        print("Invalid JSON format. Ensure the file contains valid JSON.")
        return []

# Load the catalog at the start
catalog_data = load_catalog()

# Data Models
class Reservation(BaseModel):
    term: str
    price: float

class Tier(BaseModel):
    category: str
    minimumUnits: int
    percentDiscount: float

class Resource(BaseModel):
    resourceName: str
    resourceCategory: str
    currencyCode: str
    unitOfMeasure: str
    unitPrice: float
    productName: str
    flavor: Optional[str]
    reservations: List[Reservation]
    tiers: List[Tier]

# Utility Function to Calculate Costs
def calculate_cost(resource: dict, quantity: int, reservation_term: str, user_tier: str):
    # Find reservation price
    reservation_price = next(
        (res["price"] for res in resource["reservations"] if res["term"] == reservation_term),
        resource["unitPrice"]
    )
    
    # Find tier discount
    tier_discount = next(
        (tier["percentDiscount"] for tier in resource["tiers"] if tier["category"] == user_tier and quantity >= tier["minimumUnits"]),
        0
    )
    
    # Calculate final cost
    cost_per_unit = reservation_price * (1 - tier_discount / 100)
    total_cost = cost_per_unit * quantity
    return {
        "unitPrice": reservation_price,
        "discount": tier_discount,
        "costPerUnit": cost_per_unit,
        "totalCost": total_cost,
    }

# API Endpoints
@app.get("/")
def read_root():
    return {"message": "Welcome to the Cloud Capacity Calculator!"}

@app.get("/catalog")
async def get_catalog():
    if not catalog_data:
        raise HTTPException(status_code=500, detail="Catalog data not available")
    return JSONResponse(content=catalog_data)

@app.post("/calculate")
async def calculate(resourceName: str, quantity: int, reservation_term: str, user_tier: str):
    try:
        # Find the resource in the catalog
        resource = next((item for item in catalog_data if item["resourceName"] == resourceName), None)
        
        if not resource:
            raise HTTPException(status_code=404, detail="Resource not found")
        
        cost_details = calculate_cost(resource, quantity, reservation_term, user_tier)
        return JSONResponse(content={
            "resourceName": resource["resourceName"],
            "quantity": quantity,
            "reservationTerm": reservation_term,
            "userTier": user_tier,
            "costDetails": cost_details,
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)