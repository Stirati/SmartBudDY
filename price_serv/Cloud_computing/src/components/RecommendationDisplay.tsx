import React from 'react';
import { ServerConfiguration } from '../types/server';

interface RecommendationDisplayProps {
  recommendation: ServerConfiguration;
}

export default function RecommendationDisplay({ recommendation }: RecommendationDisplayProps) {
  return (
    <div className="px-6 py-6 bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">Recommended Configuration</h2>
      <div className="bg-white p-4 rounded-lg border">
        <h3 className="text-lg font-medium">{recommendation.flavor.name}</h3>
        <div className="mt-2 space-y-2">
          <p>CPU: {recommendation.flavor.cpu} Cores</p>
          <p>RAM: {recommendation.flavor.ram} GB</p>
          <p>Disk: {recommendation.flavor.disk} GB</p>
          <p>OS Platform: {recommendation.flavor.osPlatform}</p>
          <p className="font-medium">Base Price: €{recommendation.unitPrice.toFixed(3)}/hour</p>
          
          <div className="mt-4">
            <h4 className="font-medium">Reservation Options:</h4>
            <ul className="mt-2 space-y-1">
              {recommendation.reservations.map((res) => (
                <li key={res.term}>
                  {res.term}: €{res.price.toFixed(3)}/hour
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h4 className="font-medium">Volume Discounts:</h4>
            <ul className="mt-2 space-y-1">
              {recommendation.tiers.map((tier) => (
                <li key={tier.category}>
                  {tier.category}: {tier.percentDiscount}% off ({tier.minimumUnits}+ units)
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}