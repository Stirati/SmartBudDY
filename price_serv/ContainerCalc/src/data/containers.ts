import { ContainerFlavor } from '../types/container';

export const containers: ContainerFlavor[] = [
  {
    id: "masterHA",
    name: "MasterHA",
    cpu: 2,
    ram: 4,
    disk: 40,
    price: 0.05,
    reservations: [
      { term: "1 Month", price: 0.0475 },
      { term: "1 Year", price: 0.045 },
      { term: "3 Years", price: 0.04 }
    ],
    tiers: [
      { category: "Base", minimumUnits: 10, percentDiscount: 5.0 },
      { category: "Partner", minimumUnits: 50, percentDiscount: 10.0 },
      { category: "Premium", minimumUnits: 100, percentDiscount: 15.0 }
    ]
  },
  {
    id: "k12a24",
    name: "K12A24",
    cpu: 12,
    ram: 24,
    disk: 120,
    price: 0.14,
    reservations: [
      { term: "1 Month", price: 0.133 },
      { term: "1 Year", price: 0.126 },
      { term: "3 Years", price: 0.112 }
    ],
    tiers: [
      { category: "Base", minimumUnits: 5, percentDiscount: 3.0 },
      { category: "Partner", minimumUnits: 20, percentDiscount: 8.0 },
      { category: "Premium", minimumUnits: 50, percentDiscount: 12.0 }
    ]
  },
  {
    id: "k16a32",
    name: "K16A32",
    cpu: 16,
    ram: 32,
    disk: 120,
    price: 0.19,
    reservations: [
      { term: "1 Month", price: 0.1805 },
      { term: "1 Year", price: 0.171 },
      { term: "3 Years", price: 0.152 }
    ],
    tiers: [
      { category: "Base", minimumUnits: 5, percentDiscount: 3.0 },
      { category: "Partner", minimumUnits: 20, percentDiscount: 8.0 },
      { category: "Premium", minimumUnits: 50, percentDiscount: 12.0 }
    ]
  },
  {
    id: "k24a48",
    name: "K24A48",
    cpu: 24,
    ram: 48,
    disk: 120,
    price: 0.28,
    reservations: [
      { term: "1 Month", price: 0.266 },
      { term: "1 Year", price: 0.252 },
      { term: "3 Years", price: 0.224 }
    ],
    tiers: [
      { category: "Base", minimumUnits: 5, percentDiscount: 3.0 },
      { category: "Partner", minimumUnits: 20, percentDiscount: 8.0 },
      { category: "Premium", minimumUnits: 50, percentDiscount: 12.0 }
    ]
  },
  {
    id: "k2a4",
    name: "K2A4",
    cpu: 2,
    ram: 4,
    disk: 40,
    price: 0.026,
    reservations: [
      { term: "1 Month", price: 0.0247 },
      { term: "1 Year", price: 0.0234 },
      { term: "3 Years", price: 0.0208 }
    ],
    tiers: [
      { category: "Base", minimumUnits: 10, percentDiscount: 5.0 },
      { category: "Partner", minimumUnits: 50, percentDiscount: 10.0 },
      { category: "Premium", minimumUnits: 100, percentDiscount: 15.0 }
    ]
  },
  {
    id: "k2a8r",
    name: "K2A8R",
    cpu: 2,
    ram: 8,
    disk: 80,
    price: 0.04,
    reservations: [
      { term: "1 Month", price: 0.038 },
      { term: "1 Year", price: 0.036 },
      { term: "3 Years", price: 0.032 }
    ],
    tiers: [
      { category: "Base", minimumUnits: 10, percentDiscount: 5.0 },
      { category: "Partner", minimumUnits: 50, percentDiscount: 10.0 },
      { category: "Premium", minimumUnits: 100, percentDiscount: 15.0 }
    ]
  },
  {
    id: "k32a64",
    name: "K32A64",
    cpu: 32,
    ram: 64,
    disk: 120,
    price: 0.38,
    reservations: [
      { term: "1 Month", price: 0.361 },
      { term: "1 Year", price: 0.342 },
      { term: "3 Years", price: 0.304 }
    ],
    tiers: [
      { category: "Base", minimumUnits: 10, percentDiscount: 5.0 },
      { category: "Partner", minimumUnits: 50, percentDiscount: 10.0 },
      { category: "Premium", minimumUnits: 100, percentDiscount: 15.0 }
    ]
  },
  {
    id: "k4a16r",
    name: "K4A16R",
    cpu: 4,
    ram: 16,
    disk: 120,
    price: 0.074,
    reservations: [
      { term: "1 Month", price: 0.0703 },
      { term: "1 Year", price: 0.0666 },
      { term: "3 Years", price: 0.0592 }
    ],
    tiers: [
      { category: "Base", minimumUnits: 10, percentDiscount: 5.0 },
      { category: "Partner", minimumUnits: 50, percentDiscount: 10.0 },
      { category: "Premium", minimumUnits: 100, percentDiscount: 15.0 }
    ]
  },
  {
    id: "k4a8",
    name: "K4A8",
    cpu: 4,
    ram: 8,
    disk: 80,
    price: 0.05,
    reservations: [
      { term: "1 Month", price: 0.0475 },
      { term: "1 Year", price: 0.045 },
      { term: "3 Years", price: 0.04 }
    ],
    tiers: [
      { category: "Base", minimumUnits: 10, percentDiscount: 5.0 },
      { category: "Partner", minimumUnits: 50, percentDiscount: 10.0 },
      { category: "Premium", minimumUnits: 100, percentDiscount: 15.0 }
    ]
  },
  {
    id: "k8a16",
    name: "K8A16",
    cpu: 8,
    ram: 16,
    disk: 120,
    price: 0.095,
    reservations: [
      { term: "1 Month", price: 0.09025 },
      { term: "1 Year", price: 0.0855 },
      { term: "3 Years", price: 0.076 }
    ],
    tiers: [
      { category: "Base", minimumUnits: 10, percentDiscount: 5.0 },
      { category: "Partner", minimumUnits: 50, percentDiscount: 10.0 },
      { category: "Premium", minimumUnits: 100, percentDiscount: 15.0 }
    ]
  },
  {
    id: "k8a32r",
    name: "K8A32R",
    cpu: 8,
    ram: 32,
    disk: 120,
    price: 0.135,
    reservations: [
      { term: "1 Month", price: 0.12825 },
      { term: "1 Year", price: 0.1215 },
      { term: "3 Years", price: 0.108 }
    ],
    tiers: [
      { category: "Base", minimumUnits: 10, percentDiscount: 5.0 },
      { category: "Partner", minimumUnits: 50, percentDiscount: 10.0 },
      { category: "Premium", minimumUnits: 100, percentDiscount: 15.0 }
    ]
  },
  {
    id: "k16a64r",
    name: "K16A64R",
    cpu: 16,
    ram: 64,
    disk: 120,
    price: 0.26,
    reservations: [
      { term: "1 Month", price: 0.247 },
      { term: "1 Year", price: 0.234 },
      { term: "3 Years", price: 0.208 }
    ],
    tiers: [
      { category: "Base", minimumUnits: 10, percentDiscount: 5.0 },
      { category: "Partner", minimumUnits: 50, percentDiscount: 10.0 },
      { category: "Premium", minimumUnits: 100, percentDiscount: 15.0 }
    ]
  },
  {
    id: "k32a128r",
    name: "K32A128R",
    cpu: 32,
    ram: 128,
    disk: 120,
    price: 0.5,
    reservations: [
      { term: "1 Month", price: 0.475 },
      { term: "1 Year", price: 0.45 },
      { term: "3 Years", price: 0.4 }
    ],
    tiers: [
      { category: "Base", minimumUnits: 10, percentDiscount: 5.0 },
      { category: "Partner", minimumUnits: 50, percentDiscount: 10.0 },
      { category: "Premium", minimumUnits: 100, percentDiscount: 15.0 }
    ]
  }
];