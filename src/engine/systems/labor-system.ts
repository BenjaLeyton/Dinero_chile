import type { SimulationState } from '@/engine/core/simulation';
import type { SeededRandom } from '@/lib/random';
import { WAGE_ADJUSTMENT_SPEED } from '@/engine/config/constants';

export function tickLaborSystem(state: SimulationState, rng: SeededRandom): void {
  for (const biz of state.businesses) {
    const laborCost = biz.wage * biz.employees;
    const revenuePerWorker = biz.employees > 0 ? biz.revenue / biz.employees : 0;
    const profitMargin = biz.revenue > 0 ? (biz.revenue - biz.costs) / biz.revenue : 0;

    if (profitMargin > 0.2 && biz.cash > laborCost * 3) {
      const unemployed = state.consumers.filter(c => !c.employed);
      if (unemployed.length > 0 && rng.next() < 0.3) {
        const hire = unemployed[0];
        hire.employed = true;
        hire.employerId = biz.id;
        hire.income = biz.wage;
        biz.employees++;
      }
    }

    if (profitMargin < -0.1 && biz.employees > 1 && rng.next() < 0.2) {
      const employees = state.consumers.filter(c => c.employerId === biz.id);
      if (employees.length > 1) {
        const fired = employees[employees.length - 1];
        fired.employed = false;
        fired.employerId = null;
        fired.income = 0;
        biz.employees--;
      }
    }

    const inflation = state.indicators.inflationRate;
    const unemployment = state.indicators.unemploymentRate;

    if (unemployment < 0.05 && profitMargin > 0.1) {
      biz.wage *= 1 + WAGE_ADJUSTMENT_SPEED;
    } else if (unemployment > 0.15 && profitMargin < 0) {
      biz.wage *= 1 - WAGE_ADJUSTMENT_SPEED * 0.5;
    } else if (inflation > 0.05) {
      biz.wage *= 1 + inflation * 0.3;
    }

    biz.wage = Math.max(500, biz.wage);

    for (const consumer of state.consumers) {
      if (consumer.employerId === biz.id) {
        consumer.income = biz.wage;
      }
    }
  }
}
