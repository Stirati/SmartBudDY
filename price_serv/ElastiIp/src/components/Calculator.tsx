import React from 'react';
import { Calculator as CalculatorIcon } from 'lucide-react';
import { Resource, CostDetails } from '../types';

interface CalculatorProps {
  resources: Resource[];
  isLoading: boolean;
  onCalculate: (event: React.FormEvent<HTMLFormElement>) => void;
  calculationResult: {
    resourceName: string;
    quantity: number;
    reservationTerm: string;
    userTier: string;
    costDetails: CostDetails;
  } | null;
}

export function Calculator({ resources, isLoading, onCalculate, calculationResult }: CalculatorProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <CalculatorIcon className="h-6 w-6" />
        Cost Calculator
      </h2>

      <form onSubmit={onCalculate} className="space-y-6">
        <div>
          <label htmlFor="resourceName" className="block text-sm font-medium text-gray-700">
            Resource Name
          </label>
          <select
            id="resourceName"
            name="resourceName"
            required
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            {resources.map((resource) => (
              <option key={resource.resourceName} value={resource.resourceName}>
                {resource.resourceName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="reservation_term" className="block text-sm font-medium text-gray-700">
            Reservation Term
          </label>
          <select
            id="reservation_term"
            name="reservation_term"
            required
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="1 Year">1 Year</option>
            <option value="3 Years">3 Years</option>
            <option value="5 Years">5 Years</option>
          </select>
        </div>

        <div>
          <label htmlFor="user_tier" className="block text-sm font-medium text-gray-700">
            User Tier
          </label>
          <select
            id="user_tier"
            name="user_tier"
            required
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="Basic">Basic</option>
            <option value="Premium">Premium</option>
            <option value="Enterprise">Enterprise</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading || resources.length === 0}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isLoading ? 'Calculating...' : 'Calculate Cost'}
        </button>
      </form>

      {calculationResult && (
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Calculation Results</h3>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Total Cost</dt>
              <dd className="mt-1 text-lg font-semibold text-gray-900">
                ${calculationResult.costDetails.totalCost.toFixed(2)}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Cost Per Unit</dt>
              <dd className="mt-1 text-lg font-semibold text-gray-900">
                ${calculationResult.costDetails.costPerUnit.toFixed(2)}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Discount Applied</dt>
              <dd className="mt-1 text-lg font-semibold text-gray-900">
                {calculationResult.costDetails.discount}%
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Unit Price</dt>
              <dd className="mt-1 text-lg font-semibold text-gray-900">
                ${calculationResult.costDetails.unitPrice.toFixed(2)}
              </dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
}