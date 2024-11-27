import React, { useState } from 'react';
import { ServerConfiguration, WorkloadRequirements } from '../types/server';
import { calculateRequiredResources, findOptimalConfiguration } from '../utils/serverCalculator';
import { Calculator, Server } from 'lucide-react';
import { serverConfigurations } from '../data/serverConfigurations';
import AutomaticMode from './AutomaticMode';
import ManualMode from './ManualMode';
import RecommendationDisplay from './RecommendationDisplay';

export default function CapacityCalculator() {
  const [mode, setMode] = useState<'auto' | 'manual'>('auto');
  const [workload, setWorkload] = useState<WorkloadRequirements>({
    concurrentUsers: 10,
    dataSize: 50,
    applications: [],
    securityLevel: 'basic'
  });

  const [recommendation, setRecommendation] = useState<ServerConfiguration | null>(null);

  const calculateConfiguration = () => {
    const requirements = calculateRequiredResources(workload);
    console.log('Calculated requirements:', requirements);
    const optimal = findOptimalConfiguration(requirements, serverConfigurations);
    console.log('Found optimal configuration:', optimal);
    setRecommendation(optimal);
  };

  const handleManualSelect = (config: ServerConfiguration) => {
    setRecommendation(config);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="px-6 py-8 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">
                Cloud Server Capacity Calculator
              </h1>
              <div className="flex space-x-4">
                <button
                  onClick={() => setMode('auto')}
                  className={`px-4 py-2 rounded-md ${
                    mode === 'auto'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <Calculator className="inline-block mr-2 h-5 w-5" />
                  Automatic
                </button>
                <button
                  onClick={() => setMode('manual')}
                  className={`px-4 py-2 rounded-md ${
                    mode === 'manual'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <Server className="inline-block mr-2 h-5 w-5" />
                  Manual
                </button>
              </div>
            </div>
          </div>

          {mode === 'auto' && (
            <AutomaticMode
              workload={workload}
              onWorkloadChange={setWorkload}
              onCalculate={calculateConfiguration}
            />
          )}

          {mode === 'manual' && (
            <ManualMode
              configurations={serverConfigurations}
              onSelect={handleManualSelect}
            />
          )}

          {recommendation && <RecommendationDisplay recommendation={recommendation} />}
        </div>
      </div>
    </div>
  );
}