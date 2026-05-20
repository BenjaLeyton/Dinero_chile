import type { SimulationState } from '@/engine/core/simulation';
import type { MoneyFlow } from '@/types/economy';

type AddFlow = (from: string, to: string, amount: number, type: MoneyFlow['type']) => void;

export function tickTradeSystem(state: SimulationState, addFlow: AddFlow): void {
  for (const biz of state.businesses) {
    const laborCost = biz.wage * biz.employees;
    const payable = Math.min(laborCost, biz.cash);
    if (payable > 0) {
      biz.cash -= payable;

      const employees = state.consumers.filter(c => c.employerId === biz.id);
      if (employees.length > 0) {
        const perEmployee = payable / employees.length;
        for (const emp of employees) {
          emp.cash += perEmployee;
        }
        addFlow(biz.id, employees[0].id, payable, 'wage');
      }
    }
  }

  for (const consumer of state.consumers) {
    const spendBudget = consumer.cash * consumer.consumptionRate * 0.3;
    if (spendBudget <= 0) continue;

    const targetBiz = state.businesses[
      Math.floor(Math.abs(consumer.cash * 7) % state.businesses.length)
    ];
    if (!targetBiz || targetBiz.inventory <= 0) continue;

    const unitsToBuy = Math.min(
      Math.floor(spendBudget / targetBiz.price),
      targetBiz.inventory,
    );
    const cost = unitsToBuy * targetBiz.price;

    if (cost > 0 && consumer.cash >= cost) {
      consumer.cash -= cost;
      targetBiz.cash += cost;
      targetBiz.inventory -= unitsToBuy;
      consumer.satisfaction = Math.min(100, consumer.satisfaction + unitsToBuy * 0.5);
      addFlow(consumer.id, targetBiz.id, cost, 'purchase');
    }
  }

  for (const consumer of state.consumers) {
    const savingsTarget = consumer.income * 3;
    const excessCash = consumer.cash - savingsTarget * 0.5;
    if (excessCash > 100) {
      const toDeposit = excessCash * 0.2;
      const bank = state.commercialBanks[
        Math.floor(Math.abs(consumer.cash * 13) % state.commercialBanks.length)
      ];
      if (bank) {
        consumer.cash -= toDeposit;
        consumer.savings += toDeposit;
        bank.deposits += toDeposit;
        bank.reserves += toDeposit;
        addFlow(consumer.id, bank.id, toDeposit, 'deposit');
      }
    }
  }
}
