import React from 'react';
import { ContainerFlavor } from '../types/container';
import { calculatePrice } from '../utils/pricing';

interface Props {
  selectedFlavor: ContainerFlavor;
  quantity: number;
  term: '1 Hour' | '1 Month' | '1 Year' | '3 Years';
}

export function PricingCalculator({ selectedFlavor, quantity, term }: Props) {
  const { basePrice, discount, finalPrice, discountPercentage } = 
    calculatePrice(selectedFlavor, quantity, term);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Pricing Summary</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Base Price ({quantity} containers)</span>
          <span>€{basePrice.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Volume Discount ({discountPercentage}%)</span>
            <span>-€{discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between font-semibold text-lg pt-2 border-t">
          <span>Total Price ({term})</span>
          <span>€{finalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}