import type { GovernmentState } from './types';
import { BASE_GOVERNMENT_CASH } from '@/engine/config/constants';

export function createGovernment(): GovernmentState {
  return {
    id: 'government',
    type: 'government',
    name: 'Gobierno',
    cash: BASE_GOVERNMENT_CASH,
    position: { x: 0.85, y: 0.5 },
    incomeTaxRate: 0.15,
    corporateTaxRate: 0.20,
    spendingRate: 0.8,
    debt: 200_000,
    bonds: [],
    revenue: 0,
    spending: 0,
    deficit: 0,
  };
}
