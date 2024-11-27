import { WorkloadType } from '../types/container';

export const workloadTypes: WorkloadType[] = [
  {
    id: "web-app",
    name: "Web Application",
    description: "Standard web applications, CMS, or static websites",
    recommendedSpecs: {
      minCPU: 2,
      minRAM: 4,
      minDisk: 40
    }
  },
  {
    id: "api",
    name: "API Service",
    description: "REST/GraphQL APIs with moderate traffic",
    recommendedSpecs: {
      minCPU: 4,
      minRAM: 8,
      minDisk: 80
    }
  },
  {
    id: "database",
    name: "Database",
    description: "Relational or NoSQL databases",
    recommendedSpecs: {
      minCPU: 8,
      minRAM: 16,
      minDisk: 120
    }
  },
  {
    id: "ml",
    name: "Machine Learning",
    description: "ML model training and inference",
    recommendedSpecs: {
      minCPU: 16,
      minRAM: 32,
      minDisk: 120
    }
  },
  {
    id: "big-data",
    name: "Big Data Processing",
    description: "Data processing and analytics workloads",
    recommendedSpecs: {
      minCPU: 32,
      minRAM: 64,
      minDisk: 120
    }
  },
  {
    id: "memory-intensive",
    name: "Memory Intensive",
    description: "Applications requiring high memory capacity",
    recommendedSpecs: {
      minCPU: 16,
      minRAM: 64,
      minDisk: 120
    }
  },
  {
    id: "high-performance",
    name: "High Performance Computing",
    description: "CPU-intensive workloads and batch processing",
    recommendedSpecs: {
      minCPU: 32,
      minRAM: 128,
      minDisk: 120
    }
  }
];