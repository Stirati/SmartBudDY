export interface ServerFlavor {
  id: string;
  name: string;
  cpu: string;
  ram: string;
  disk: string;
  osPlatform: string;
}

export interface PricingTier {
  category: string;
  minimumUnits: number;
  percentDiscount: number;
}

export interface Reservation {
  term: string;
  price: number;
}

export interface ServerConfiguration {
  flavor: ServerFlavor;
  unitPrice: number;
  reservations: Reservation[];
  tiers: PricingTier[];
}

export interface WorkloadRequirements {
  concurrentUsers: number;
  dataSize: number;
  applications: string[];
  securityLevel: 'basic' | 'medium' | 'high';
}