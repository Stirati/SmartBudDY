export interface ContainerFlavor {
  id: string;
  name: string;
  cpu: number;
  ram: number;
  disk: number;
  price: number;
  reservations?: Reservation[];
  tiers?: Tier[];
}

export interface Reservation {
  term: string;
  price: number;
}

export interface Tier {
  category: string;
  minimumUnits: number;
  percentDiscount: number;
}

export interface WorkloadType {
  id: string;
  name: string;
  description: string;
  recommendedSpecs: {
    minCPU: number;
    minRAM: number;
    minDisk: number;
  };
}