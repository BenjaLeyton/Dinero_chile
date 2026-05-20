import type { ConsumerState } from './types';
import type { EntityId } from '@/types/economy';
import { CONSUMER_NAMES, BASE_CONSUMER_SAVINGS, BASE_WAGE } from '@/engine/config/constants';
import type { SeededRandom } from '@/lib/random';

export function createConsumer(
  index: number,
  employerId: EntityId,
  rng: SeededRandom,
): ConsumerState {
  const name = CONSUMER_NAMES[index % CONSUMER_NAMES.length];
  const savings = BASE_CONSUMER_SAVINGS * rng.range(0.2, 3.0);

  return {
    id: `consumer_${index}`,
    type: 'consumer',
    name,
    cash: savings * 0.3,
    position: {
      x: 0.05 + (index % 10) * 0.1,
      y: 0.8,
    },
    income: BASE_WAGE * rng.range(0.7, 1.3),
    savings,
    debt: 0,
    consumptionRate: rng.range(0.5, 0.9),
    satisfaction: rng.range(50, 80),
    employed: true,
    employerId,
  };
}
