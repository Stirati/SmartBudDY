import { ServerConfiguration, WorkloadRequirements } from '../types/server';

export function calculateRequiredResources(workload: WorkloadRequirements): {
  minCPU: number;
  minRAM: number;
  minDisk: number;
} {
  // Base requirements per user
  const baseRAMPerUser = 0.5; // GB
  const baseCPUPerUser = 0.2; // Cores
  
  // Calculate base requirements
  let minRAM = workload.concurrentUsers * baseRAMPerUser;
  let minCPU = workload.concurrentUsers * baseCPUPerUser;
  let minDisk = Math.max(50, workload.dataSize); // Minimum 50GB

  // Adjust for applications
  if (workload.applications.includes('database')) {
    minRAM += 4;
    minCPU += 2;
  }
  if (workload.applications.includes('webserver')) {
    minRAM += 2;
    minCPU += 1;
  }
  if (workload.applications.includes('cache')) {
    minRAM += 2;
  }
  if (workload.applications.includes('queue')) {
    minRAM += 1;
    minCPU += 0.5;
  }

  // Security overhead
  switch (workload.securityLevel) {
    case 'high':
      minRAM *= 1.3;
      minCPU *= 1.3;
      break;
    case 'medium':
      minRAM *= 1.15;
      minCPU *= 1.15;
      break;
    default:
      // No additional overhead for basic security
      break;
  }

  return {
    minCPU: Math.ceil(minCPU),
    minRAM: Math.ceil(minRAM),
    minDisk: Math.ceil(minDisk)
  };
}

export function findOptimalConfiguration(
  requirements: { minCPU: number; minRAM: number; minDisk: number },
  configurations: ServerConfiguration[]
): ServerConfiguration | null {
  const validConfigs = configurations.filter(config => {
    const cpu = parseInt(config.flavor.cpu);
    const ram = parseInt(config.flavor.ram);
    const disk = parseInt(config.flavor.disk);
    
    return cpu >= requirements.minCPU &&
           ram >= requirements.minRAM &&
           disk >= requirements.minDisk;
  });

  if (validConfigs.length === 0) {
    return null;
  }

  // Sort by price and return the cheapest option that meets requirements
  return validConfigs.sort((a, b) => a.unitPrice - b.unitPrice)[0];
}