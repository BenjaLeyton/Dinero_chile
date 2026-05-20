import type { ResourceState } from './types';
import type { ResourceType } from '@/types/economy';

const RESOURCE_CONFIG: Record<ResourceType, { name: string; reserves: number; cost: number; price: number }> = {
  gold: { name: 'Mina de Oro', reserves: 10000, cost: 50, price: 200 },
  oil: { name: 'Pozo Petrolero', reserves: 50000, cost: 30, price: 80 },
  agriculture: { name: 'Tierras Agrícolas', reserves: 100000, cost: 5, price: 15 },
  minerals: { name: 'Cantera de Minerales', reserves: 30000, cost: 20, price: 60 },
};

export function createResource(index: number, resourceType: ResourceType): ResourceState {
  const config = RESOURCE_CONFIG[resourceType];

  return {
    id: `resource_${index}`,
    type: 'resource',
    name: config.name,
    cash: 0,
    position: {
      x: 0.15 + index * 0.35,
      y: 0.95,
    },
    resourceType,
    totalReserves: config.reserves,
    extractionRate: 100,
    extractionCost: config.cost,
    marketPrice: config.price,
    depletion: 0,
  };
}
