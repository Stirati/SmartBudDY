export interface Reservation {
  term: string;
  price: number;
}

export interface Tier {
  category: string;
  minimumUnits: number;
  percentDiscount: number;
}

export interface Resource {
  resourceName: string;
  resourceCategory: string;
  currencyCode: string;
  unitOfMeasure: string;
  unitPrice: number;
  productName: string;
  flavor?: string;
  reservations: Reservation[];
  tiers: Tier[];
}

export interface CostDetails {
  unitPrice: number;
  discount: number;
  costPerUnit: number;
  totalCost: number;
}

export interface CalculationRequest {
  resourceName: string;
  quantity: number;
  reservation_term: string;
  user_tier: string;
}

export interface CalculationResponse {
  resourceName: string;
  quantity: number;
  reservationTerm: string;
  userTier: string;
  costDetails: CostDetails;
}