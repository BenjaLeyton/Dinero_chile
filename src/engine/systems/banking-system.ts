import type { SimulationState } from '@/engine/core/simulation';
import type { MoneyFlow, Loan } from '@/types/economy';

type AddFlow = (from: string, to: string, amount: number, type: MoneyFlow['type']) => void;

export function tickBankingSystem(state: SimulationState, addFlow: AddFlow): void {
  const cb = state.centralBank;

  for (const bank of state.commercialBanks) {
    const lendingRate = cb.interestRate + bank.interestRateSpread;

    processLoanPayments(state, bank, addFlow);
    processNewLoans(state, bank, lendingRate, addFlow);
    payDepositInterest(state, bank, cb.interestRate, addFlow);
    ensureReserves(state, bank, cb);
  }
}

function processLoanPayments(
  state: SimulationState,
  bank: typeof state.commercialBanks[0],
  addFlow: AddFlow,
): void {
  const expiredLoans: string[] = [];

  for (const loan of bank.loans) {
    const borrower =
      state.businesses.find(b => b.id === loan.borrowerId) ??
      state.consumers.find(c => c.id === loan.borrowerId);

    if (!borrower) {
      expiredLoans.push(loan.id);
      continue;
    }

    const payment = Math.min(loan.monthlyPayment, borrower.cash);
    if (payment > 0) {
      borrower.cash -= payment;

      const interestPortion = loan.remainingBalance * (loan.interestRate / 12);
      const principalPortion = payment - Math.min(interestPortion, payment);

      loan.remainingBalance = Math.max(0, loan.remainingBalance - principalPortion);
      bank.cash += payment;
      bank.reserves += payment;

      addFlow(borrower.id, bank.id, payment, 'interest');
    }

    loan.termRemaining--;
    if (loan.termRemaining <= 0 || loan.remainingBalance <= 0) {
      expiredLoans.push(loan.id);
    }
  }

  bank.loans = bank.loans.filter(l => !expiredLoans.includes(l.id));
}

function processNewLoans(
  state: SimulationState,
  bank: typeof state.commercialBanks[0],
  lendingRate: number,
  addFlow: AddFlow,
): void {
  const requiredReserves = bank.deposits * state.centralBank.reserveRequirement;
  const excessReserves = bank.reserves - requiredReserves;
  const maxLendable = Math.max(0, excessReserves) * bank.riskTolerance;

  if (maxLendable < 1000) return;

  const needyBusinesses = state.businesses.filter(
    b => b.cash < b.wage * b.employees * 2 && b.debt < b.revenue * 12,
  );

  for (const biz of needyBusinesses) {
    if (maxLendable < 5000) break;

    const loanAmount = Math.min(maxLendable * 0.3, biz.wage * biz.employees * 3);
    if (loanAmount < 1000) continue;

    const term = 60;
    const monthlyRate = lendingRate / 12;
    const monthlyPayment =
      (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));

    const loan: Loan = {
      id: `loan_${state.tick}_${bank.id}_${biz.id}`,
      bankId: bank.id,
      borrowerId: biz.id,
      principal: loanAmount,
      remainingBalance: loanAmount,
      interestRate: lendingRate,
      termRemaining: term,
      monthlyPayment,
    };

    bank.loans.push(loan);
    bank.reserves -= loanAmount;
    bank.deposits += loanAmount;
    biz.cash += loanAmount;
    biz.debt += loanAmount;

    addFlow(bank.id, biz.id, loanAmount, 'loan');
    break;
  }
}

function payDepositInterest(
  state: SimulationState,
  bank: typeof state.commercialBanks[0],
  baseRate: number,
  addFlow: AddFlow,
): void {
  const depositRate = Math.max(0, baseRate - 0.01);
  const interestPayable = bank.deposits * (depositRate / 12);

  if (interestPayable > 0 && bank.cash >= interestPayable) {
    bank.cash -= interestPayable;
    bank.deposits += interestPayable;
  }
}

function ensureReserves(
  state: SimulationState,
  bank: typeof state.commercialBanks[0],
  cb: typeof state.centralBank,
): void {
  const requiredReserves = bank.deposits * cb.reserveRequirement;
  const deficit = requiredReserves - bank.reserves;

  if (deficit > 0 && cb.cash >= deficit) {
    cb.cash -= deficit;
    bank.reserves += deficit;
    bank.cash += deficit;
  }
}
