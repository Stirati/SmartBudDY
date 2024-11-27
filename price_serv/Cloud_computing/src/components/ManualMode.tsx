import React from 'react';
import { ServerConfiguration } from '../types/server';

interface ManualModeProps {
  configurations: ServerConfiguration[];
  onSelect: (config: ServerConfiguration) => void;
}

export default function ManualMode({ configurations, onSelect }: ManualModeProps) {
  return (
    <div className="px-6 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {configurations.map((config) => (
          <div
            key={config.flavor.id}
            onClick={() => onSelect(config)}
            className="border rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-colors"
          >
            <h3 className="text-lg font-semibold">{config.flavor.name}</h3>
            <div className="mt-2 space-y-2">
              <p>CPU: {config.flavor.cpu} Cores</p>
              <p>RAM: {config.flavor.ram} GB</p>
              <p>Disk: {config.flavor.disk} GB</p>
              <p>OS Platform: {config.flavor.osPlatform}</p>
              <p className="font-medium">Price: €{config.unitPrice.toFixed(3)}/hour</p>
              <div className="mt-2">
                <p className="text-sm text-gray-600">Available terms:</p>
                <ul className="text-sm">
                  {config.reservations.map((res) => (
                    <li key={res.term}>
                      {res.term}: €{res.price.toFixed(3)}/hour
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}