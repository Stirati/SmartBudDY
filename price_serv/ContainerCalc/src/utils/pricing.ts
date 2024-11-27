import { ContainerFlavor } from '../types/container';

export function calculatePrice(
  container: ContainerFlavor,
  quantity: number,
  term: '1 Hour' | '1 Month' | '1 Year' | '3 Years'
): {
  basePrice: number;
  discount: number;
  finalPrice: number;
  discountPercentage: number;
} {
  const termPrice = getTermPrice(container, term);
  const termMultiplier = getTermMultiplier(term);
  const basePrice = termPrice * quantity * termMultiplier;
  const { discount, percentage } = calculateDiscount(container, quantity, basePrice);
  
  return {
    basePrice,
    discount,
    finalPrice: basePrice - discount,
    discountPercentage: percentage
  };
}

function getTermPrice(container: ContainerFlavor, term: string): number {
  if (term === '1 Hour') return container.price;
  
  const reservation = container.reservations?.find(r => r.term === term);
  return reservation?.price || container.price;
}

function getTermMultiplier(term: string): number {
  switch (term) {
    case '1 Month': return 720; // 30 days * 24 hours
    case '1 Year': return 8760; // 365 days * 24 hours
    case '3 Years': return 26280; // 3 * 365 days * 24 hours
    default: return 1;
  }
}

function calculateDiscount(
  container: ContainerFlavor,
  quantity: number,
  basePrice: number
): { discount: number; percentage: number } {
  if (!container.tiers) {
    return { discount: 0, percentage: 0 };
  }

  const applicableTier = container.tiers
    .filter(tier => quantity >= tier.minimumUnits)
    .sort((a, b) => b.percentDiscount - a.percentDiscount)[0];

  if (!applicableTier) {
    return { discount: 0, percentage: 0 };
  }

  return {
    discount: (basePrice * applicableTier.percentDiscount) / 100,
    percentage: applicableTier.percentDiscount
  };
}