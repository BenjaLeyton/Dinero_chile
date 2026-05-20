import type { CentralBankState } from './types';
import {
  BASE_INTEREST_RATE,
  TARGET_INFLATION,
  BASE_RESERVE_REQUIREMENT,
  BASE_MONEY_SUPPLY,
} from '@/engine/config/constants';

export function createCentralBank(): CentralBankState {
  return {
    id: 'central_bank',
    type: 'central_bank',
    name: 'Banco Central',
    cash: BASE_MONEY_SUPPLY,
    position: { x: 0.5, y: 0.1 },
    interestRate: BASE_INTEREST_RATE,
    reserveRequirement: BASE_RESERVE_REQUIREMENT,
    targetInflation: TARGET_INFLATION,
    moneyPrinted: BASE_MONEY_SUPPLY,
    bondsHeld: 0,
  };
}
