import type { SimulationState } from '@/engine/core/simulation';
import type { SeededRandom } from '@/lib/random';
import { PRICE_ADJUSTMENT_SPEED } from '@/engine/config/constants';

export function tickMarketSystem(state: SimulationState, rng: SeededRandom): void {
  const totalDemand = state.consumers.reduce((s, c) => {
    const spendable = (c.cash + c.income) * c.consumptionRate;
    return s + Math.max(0, spendable);
  }, 0);

  const totalSupply = state.businesses.reduce(
    (s, b) => s + b.inventory * b.price,
    0,
  );

  const demandSupplyRatio = totalSupply > 0 ? totalDemand / totalSupply : 2;

  for (const biz of state.businesses) {
    if (demandSupplyRatio > 1.1) {
      biz.price *= 1 + PRICE_ADJUSTMENT_SPEED * (demandSupplyRatio - 1);
    } else if (demandSupplyRatio < 0.9) {
      biz.price *= 1 - PRICE_ADJUSTMENT_SPEED * (1 - demandSupplyRatio) * 0.5;
    }

    biz.price = Math.max(1, biz.price);

    const production = biz.employees * (biz.productionCapacity / Math.max(biz.employees, 1));
    biz.inventory += production * 0.1;

    const maxSales = biz.inventory;
    const demandForBiz = (totalDemand / Math.max(state.businesses.length, 1)) / biz.price;
    const unitsSold = Math.min(maxSales, demandForBiz);

    biz.revenue = unitsSold * biz.price;
    biz.costs = biz.wage * biz.employees + biz.inventory * 0.01 + biz.monthlyFixedCosts;
    biz.inventory = Math.max(0, biz.inventory - unitsSold);

    biz.cash += biz.revenue;

    if (biz.revenue > biz.costs && rng.next() < biz.investmentRate) {
      const investment = (biz.revenue - biz.costs) * biz.investmentRate;
      biz.productionCapacity += investment * 0.001;
      biz.cash -= investment;
    }
  }

  for (const resource of state.resources) {
    const demandPressure = demandSupplyRatio;
    resource.marketPrice *= 1 + (demandPressure - 1) * 0.02;
    resource.marketPrice = Math.max(resource.extractionCost * 0.5, resource.marketPrice);

    const extracted = Math.min(resource.extractionRate, resource.totalReserves);
    resource.totalReserves -= extracted;
    resource.depletion = 1 - resource.totalReserves / 100000;
    resource.cash += extracted * resource.marketPrice;
  }
}
