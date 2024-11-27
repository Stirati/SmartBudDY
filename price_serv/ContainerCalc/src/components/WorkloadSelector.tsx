import React from 'react';
import { WorkloadType } from '../types/container';
import { workloadTypes } from '../data/workloadTypes';

interface Props {
  onSelect: (workload: WorkloadType) => void;
  selectedWorkloadId?: string;
}

export function WorkloadSelector({ onSelect, selectedWorkloadId }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {workloadTypes.map((workload) => (
        <button
          key={workload.id}
          onClick={() => onSelect(workload)}
          className={`p-6 rounded-lg transition-all ${
            selectedWorkloadId === workload.id
              ? 'bg-blue-50 border-2 border-blue-500 shadow-md'
              : 'bg-white border-2 border-transparent shadow hover:shadow-md'
          }`}
        >
          <h3 className="text-lg font-semibold mb-2">{workload.name}</h3>
          <p className="text-gray-600 mb-4 text-sm">{workload.description}</p>
          <div className="text-sm text-gray-500">
            <p>Min CPU: {workload.recommendedSpecs.minCPU} vCPUs</p>
            <p>Min RAM: {workload.recommendedSpecs.minRAM} GB</p>
            <p>Min Disk: {workload.recommendedSpecs.minDisk} GB</p>
          </div>
        </button>
      ))}
    </div>
  );
}