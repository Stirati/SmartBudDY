import { ServerConfiguration } from '../types/server';

// Parse and transform the JSON data into typed configurations
export const serverConfigurations: ServerConfiguration[] = [
  {
    flavor: {
      id: "cfb3b8504a2744eea82a21af0e32de32",
      name: "CSO1A2",
      cpu: "1",
      ram: "2",
      disk: "20",
      osPlatform: "linux"
    },
    unitPrice: 0.013,
    reservations: [
      { term: "1 Month", price: 0.01235 },
      { term: "1 Year", price: 0.0117 },
      { term: "3 Years", price: 0.0104 }
    ],
    tiers: [
      { category: "Base", minimumUnits: 5, percentDiscount: 3.0 },
      { category: "Partner", minimumUnits: 20, percentDiscount: 8.0 },
      { category: "Premium", minimumUnits: 50, percentDiscount: 12.0 }
    ]
  },
  // Add more configurations from the JSON data
  {
    flavor: {
      id: "d4772fcde0814a328e62b25dbb4dd996",
      name: "CSO4A8",
      cpu: "4",
      ram: "8",
      disk: "80",
      osPlatform: "linux"
    },
    unitPrice: 0.05,
    reservations: [
      { term: "1 Month", price: 0.0475 },
      { term: "1 Year", price: 0.045 },
      { term: "3 Years", price: 0.04 }
    ],
    tiers: [
      { category: "Base", minimumUnits: 5, percentDiscount: 3.0 },
      { category: "Partner", minimumUnits: 20, percentDiscount: 8.0 },
      { category: "Premium", minimumUnits: 50, percentDiscount: 12.0 }
    ]
  },
  {
    flavor: {
      id: "58da34aa7de24fab9686ac6d57d8c6d5",
      name: "CSO4A16",
      cpu: "4",
      ram: "16",
      disk: "120",
      osPlatform: "linux"
    },
    unitPrice: 0.074,
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
  }
];