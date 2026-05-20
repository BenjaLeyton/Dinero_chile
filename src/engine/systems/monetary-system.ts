import type { SimulationState } from '@/engine/core/simulation';
import type { SeededRandom } from '@/lib/random';
import {
  TAYLOR_RULE_INFLATION_WEIGHT,
  TAYLOR_RULE_OUTPUT_WEIGHT,
  MAX_INTEREST_RATE,
  MIN_INTEREST_RATE,
} from '@/engine/config/constants';

export function tickMonetarySystem(state: SimulationState, rng: SeededRandom): void {
  const cb = state.centralBank;
  const ind = state.indicators;

  if (state.config.playerRole !== 'central_banker') {
    const inflationGap = ind.inflationRate - cb.targetInflation;
    const outputGap = ind.gdpGrowthRate - 0.03;

    const taylorRate =
      cb.targetInflation +
      0.02 +
      TAYLOR_RULE_INFLATION_WEIGHT * inflationGap +
      TAYLOR_RULE_OUTPUT_WEIGHT * outputGap;

    const newRate = cb.interestRate + (taylorRate - cb.interestRate) * 0.1;
    cb.interestRate = Math.max(MIN_INTEREST_RATE, Math.min(MAX_INTEREST_RATE, newRate));

    if (ind.inflationRate > cb.targetInflation * 3) {
      cb.reserveRequirement = Math.min(0.5, cb.reserveRequirement + 0.01);
    } else if (ind.inflationRate < 0 && cb.reserveRequirement > 0.05) {
      cb.reserveRequirement = Math.max(0.05, cb.reserveRequirement - 0.005);
    }
  }

  const totalDeposits = state.commercialBanks.reduce((s, b) => s + b.deposits, 0);
  const totalReserves = state.commercialBanks.reduce((s, b) => s + b.reserves, 0);
  const totalLoans = state.commercialBanks.reduce(
    (s, b) => s + b.loans.reduce((ls, l) => ls + l.remainingBalance, 0),
    0,
  );

  ind.moneySupply.m0 = cb.moneyPrinted;
  ind.moneySupply.m1 = cb.moneyPrinted + totalDeposits;
  ind.moneySupply.m2 = ind.moneySupply.m1 + totalLoans * 0.5;
}
