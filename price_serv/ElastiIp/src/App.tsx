import React, { useState } from 'react';
import { Resource, CalculationResponse } from './types';
import { Catalog } from './components/Catalog';
import { Calculator } from './components/Calculator';
import { api } from './services/api';

function App() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [calculationResult, setCalculationResult] = useState<CalculationResponse | null>(null);

  const loadCatalog = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getCatalog();
      setResources(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load catalog');
    } finally {
      setIsLoading(false);
    }
  };

  const calculateCost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      resourceName: formData.get('resourceName') as string,
      quantity: parseInt(formData.get('quantity') as string),
      reservation_term: formData.get('reservation_term') as string,
      user_tier: formData.get('user_tier') as string,
    };

    setIsLoading(true);
    setError(null);
    try {
      const result = await api.calculateCost(data);
      setCalculationResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Calculation failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Cloud Capacity Calculator
        </h1>

        {error && (
          <div className="mb-8 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Catalog
            resources={resources}
            isLoading={isLoading}
            onLoadCatalog={loadCatalog}
          />
          <Calculator
            resources={resources}
            isLoading={isLoading}
            onCalculate={calculateCost}
            calculationResult={calculationResult}
          />
        </div>
      </div>
    </div>
  );
}

export default App;