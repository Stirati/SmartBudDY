import React from 'react';
import { WorkloadRequirements } from '../types/server';
import { Calculator, Shield, Users } from 'lucide-react';

interface AutomaticModeProps {
  workload: WorkloadRequirements;
  onWorkloadChange: (workload: WorkloadRequirements) => void;
  onCalculate: () => void;
}

export default function AutomaticMode({ workload, onWorkloadChange, onCalculate }: AutomaticModeProps) {
  return (
    <div className="px-6 py-6 space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          <Users className="inline-block mr-2 h-5 w-5" />
          Concurrent Users
        </label>
        <input
          type="number"
          value={workload.concurrentUsers}
          onChange={(e) =>
            onWorkloadChange({
              ...workload,
              concurrentUsers: parseInt(e.target.value) || 0
            })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          <Calculator className="inline-block mr-2 h-5 w-5" />
          Data Size (GB)
        </label>
        <input
          type="number"
          value={workload.dataSize}
          onChange={(e) =>
            onWorkloadChange({
              ...workload,
              dataSize: parseInt(e.target.value) || 0
            })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Applications
        </label>
        <div className="mt-2 space-y-2">
          {['webserver', 'database', 'cache', 'queue'].map((app) => (
            <label key={app} className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                checked={workload.applications.includes(app)}
                onChange={(e) =>
                  onWorkloadChange({
                    ...workload,
                    applications: e.target.checked
                      ? [...workload.applications, app]
                      : workload.applications.filter((a) => a !== app)
                  })
                }
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700 capitalize">{app}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          <Shield className="inline-block mr-2 h-5 w-5" />
          Security Level
        </label>
        <select
          value={workload.securityLevel}
          onChange={(e) =>
            onWorkloadChange({
              ...workload,
              securityLevel: e.target.value as 'basic' | 'medium' | 'high'
            })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="basic">Basic</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <button
        onClick={onCalculate}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Calculate Recommended Configuration
      </button>
    </div>
  );
}