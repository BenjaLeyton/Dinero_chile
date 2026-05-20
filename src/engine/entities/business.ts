import type { BusinessState } from './types';
import type { BusinessSector } from '@/types/economy';
import { BUSINESS_NAMES, BASE_BUSINESS_CASH, BASE_WAGE, BASE_PRICE } from '@/engine/config/constants';
import type { SeededRandom } from '@/lib/random';

export function createBusiness(
  index: number,
  sector: BusinessSector,
  rng: SeededRandom,
): BusinessState {
  const names = BUSINESS_NAMES[sector];
  const name = names[index % names.length];
  const cash = BASE_BUSINESS_CASH * rng.range(0.6, 1.4);

  return {
    id: `biz_${index}`,
    type: 'business',
    name,
    cash,
    position: {
      x: 0.1 + (index % 5) * 0.2,
      y: 0.55,
    },
    sector,
    industryId: null,
    employees: 0,
    wage: BASE_WAGE * rng.range(0.8, 1.3),
    productionCapacity: rng.range(50, 150),
    inventory: rng.range(20, 80),
    price: BASE_PRICE * rng.range(0.7, 1.5),
    revenue: 0,
    costs: 0,
    debt: 0,
    investmentRate: rng.range(0.1, 0.3),
    monthlyFixedCosts: 0,
    ownerId: null,
  };
}
