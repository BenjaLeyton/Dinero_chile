import type { SimulationState } from '@/engine/core/simulation';
import type { EconomicIndicators } from '@/types/economy';

export function calculateIndicators(
  state: SimulationState,
  prevGdp: number,
  prevCpi: number,
): EconomicIndicators {
  const totalRevenue = state.businesses.reduce((s, b) => s + b.revenue, 0);
  const totalWages = state.consumers.reduce((s, c) => s + (c.employed ? c.income : 0), 0);
  const govSpending = state.government.spending;
  const gdp = totalRevenue + govSpending;

  const gdpGrowthRate = prevGdp > 0 ? (gdp - prevGdp) / prevGdp : 0;

  const avgPrice = state.businesses.length > 0
    ? state.businesses.reduce((s, b) => s + b.price, 0) / state.businesses.length
    : 10;
  const cpi = avgPrice * 10;
  const inflationRate = prevCpi > 0 ? (cpi - prevCpi) / prevCpi : 0;

  const employed = state.consumers.filter(c => c.employed).length;
  const unemploymentRate = state.consumers.length > 0
    ? 1 - employed / state.consumers.length
    : 0;

  const totalDeposits = state.commercialBanks.reduce((s, b) => s + b.deposits, 0);
  const totalLoans = state.commercialBanks.reduce(
    (s, b) => s + b.loans.reduce((ls, l) => ls + l.remainingBalance, 0),
    0,
  );

  const m0 = state.centralBank.moneyPrinted;
  const m1 = m0 + totalDeposits;
  const m2 = m1 + totalLoans * 0.5;

  const velocityOfMoney = m1 > 0 ? (gdp * 12) / m1 : 1;

  const wealths = state.consumers.map(c => c.cash + c.savings);
  const gini = calculateGini(wealths);

  const averageWage = state.businesses.length > 0
    ? state.businesses.reduce((s, b) => s + b.wage, 0) / state.businesses.length
    : 0;

  return {
    gdp,
    gdpGrowthRate,
    inflationRate,
    cpi,
    unemploymentRate,
    interestRate: state.centralBank.interestRate,
    moneySupply: { m0, m1, m2 },
    debtToGdpRatio: gdp > 0 ? state.government.debt / (gdp * 12) : 0,
    giniCoefficient: gini,
    governmentDebt: state.government.debt,
    averageWage,
    averagePrice: avgPrice,
    velocityOfMoney,
    totalLoans,
    totalDeposits,
  };
}

function calculateGini(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const n = sorted.length;
  const sum = sorted.reduce((s, v) => s + v, 0);
  if (sum === 0) return 0;

  let numerator = 0;
  for (let i = 0; i < n; i++) {
    numerator += (2 * (i + 1) - n - 1) * sorted[i];
  }
  return numerator / (n * sum);
}
