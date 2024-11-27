import { ContainerFlavor } from '../types/container';
import { containers } from '../data/containers';

export function findBestContainer(requirements: {
  cpu: number;
  ram: number;
  disk: number;
}): ContainerFlavor | null {
  return containers.find(container => 
    container.cpu >= requirements.cpu &&
    container.ram >= requirements.ram &&
    container.disk >= requirements.disk
  ) || null;
}

export function getSavingsSuggestion(quantity: number): string {
  if (quantity >= 95 && quantity < 100) {
    return "Increase to 100 containers for 15% discount!";
  } else if (quantity >= 45 && quantity < 50) {
    return "Increase to 50 containers for 10% discount!";
  } else if (quantity >= 8 && quantity < 10) {
    return "Increase to 10 containers for 5% discount!";
  }
  return "";
}