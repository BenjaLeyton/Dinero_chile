import type { CommercialBankState } from './types';
import { BANK_NAMES, BASE_BANK_CASH } from '@/engine/config/constants';
import type { SeededRandom } from '@/lib/random';

export function createCommercialBank(index: number, rng: SeededRandom): CommercialBankState {
  const name = BANK_NAMES[index % BANK_NAMES.length];
  const cash = BASE_BANK_CASH * rng.range(0.8, 1.2);

  return {
    id: `bank_${index}`,
    type: 'commercial_bank',
    name,
    cash,
    position: {
      x: 0.2 + (index % 3) * 0.3,
      y: 0.3,
    },
    deposits: cash * 0.7,
    loans: [],
    reserves: cash * 0.3,
    interestRateSpread: rng.range(0.02, 0.05),
    riskTolerance: rng.range(0.3, 0.8),
  };
}
