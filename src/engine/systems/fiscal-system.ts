import type { SimulationState } from '@/engine/core/simulation';
import type { MoneyFlow } from '@/types/economy';

type AddFlow = (from: string, to: string, amount: number, type: MoneyFlow['type']) => void;

export function tickFiscalSystem(state: SimulationState, addFlow: AddFlow): void {
  const gov = state.government;
  let totalTaxRevenue = 0;

  for (const consumer of state.consumers) {
    if (consumer.income > 0) {
      const incomeTax = consumer.income * gov.incomeTaxRate;
      const payable = Math.min(incomeTax, consumer.cash);
      if (payable > 0) {
        consumer.cash -= payable;
        totalTaxRevenue += payable;
        addFlow(consumer.id, gov.id, payable, 'tax');
      }
    }
  }

  for (const biz of state.businesses) {
    const profit = Math.max(0, biz.revenue - biz.costs);
    if (profit > 0) {
      const corpTax = profit * gov.corporateTaxRate;
      const payable = Math.min(corpTax, biz.cash);
      if (payable > 0) {
        biz.cash -= payable;
        totalTaxRevenue += payable;
        addFlow(biz.id, gov.id, payable, 'tax');
      }
    }
  }

  gov.revenue = totalTaxRevenue;
  gov.cash += totalTaxRevenue;

  const totalSpending = gov.revenue * gov.spendingRate;
  gov.spending = totalSpending;

  if (totalSpending > 0 && state.consumers.length > 0) {
    const perCapita = totalSpending / state.consumers.length;
    for (const consumer of state.consumers) {
      consumer.cash += perCapita;
      if (perCapita > 0) {
        addFlow(gov.id, consumer.id, perCapita, 'government_spending');
      }
    }
    gov.cash -= totalSpending;
  }

  gov.deficit = gov.spending - gov.revenue;
  if (gov.deficit > 0) {
    gov.debt += gov.deficit;
  }
}
