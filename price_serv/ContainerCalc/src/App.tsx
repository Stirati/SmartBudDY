import React, { useState } from 'react';
import { Server } from 'lucide-react';
import { WorkloadSelector } from './components/WorkloadSelector';
import { PricingCalculator } from './components/PricingCalculator';
import { ContainerFlavor, WorkloadType } from './types/container';
import { containers } from './data/containers';

function App() {
  const [selectedWorkload, setSelectedWorkload] = useState<WorkloadType | null>(null);
  const [selectedContainer, setSelectedContainer] = useState<ContainerFlavor | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [term, setTerm] = useState<'1 Hour' | '1 Month' | '1 Year' | '3 Years'>('1 Hour');

  const handleWorkloadSelect = (workload: WorkloadType) => {
    setSelectedWorkload(workload);
    const recommended = containers.find(container => 
      container.cpu >= workload.recommendedSpecs.minCPU &&
      container.ram >= workload.recommendedSpecs.minRAM &&
      container.disk >= workload.recommendedSpecs.minDisk
    );
    setSelectedContainer(recommended || null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Server className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Container Calculator</h1>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-semibold mb-4">1. Select Your Workload Type</h2>
              <WorkloadSelector 
                onSelect={handleWorkloadSelect}
                selectedWorkloadId={selectedWorkload?.id}
              />
            </div>

            {selectedContainer && (
              <>
                <div>
                  <h2 className="text-lg font-semibold mb-4">2. Configure Your Container</h2>
                  <div className="bg-blue-50 p-4 rounded-md mb-4">
                    <h3 className="font-semibold text-blue-700 mb-2">Recommended Configuration</h3>
                    <p className="text-blue-600">
                      {selectedContainer.name}: {selectedContainer.cpu} vCPU, {selectedContainer.ram}GB RAM, 
                      {selectedContainer.disk}GB Disk
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Number of Containers
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="1000"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Billing Term
                      </label>
                      <select
                        value={term}
                        onChange={(e) => setTerm(e.target.value as typeof term)}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="1 Hour">Hourly</option>
                        <option value="1 Month">Monthly</option>
                        <option value="1 Year">Yearly</option>
                        <option value="3 Years">3 Years</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-4">3. Review Pricing</h2>
                  <PricingCalculator
                    selectedFlavor={selectedContainer}
                    quantity={quantity}
                    term={term}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;