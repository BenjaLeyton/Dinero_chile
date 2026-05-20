export type Currency = number;
export type EntityId = string;
export type Tick = number;

export type EntityType =
  | 'central_bank'
  | 'commercial_bank'
  | 'business'
  | 'consumer'
  | 'government'
  | 'resource';

export type FlowType =
  | 'loan'
  | 'deposit'
  | 'tax'
  | 'wage'
  | 'purchase'
  | 'interest'
  | 'money_creation'
  | 'government_spending'
  | 'debt_payment'
  | 'transfer'
  | 'reserve';

export type ResourceType = 'gold' | 'oil' | 'agriculture' | 'minerals';

export type BusinessSector =
  | 'agriculture'
  | 'manufacturing'
  | 'services'
  | 'technology'
  | 'energy';

export interface MoneyFlow {
  id: string;
  from: EntityId;
  to: EntityId;
  amount: Currency;
  type: FlowType;
  tick: Tick;
}

export interface EconomicIndicators {
  gdp: Currency;
  gdpGrowthRate: number;
  inflationRate: number;
  cpi: number;
  unemploymentRate: number;
  interestRate: number;
  moneySupply: MoneySupply;
  debtToGdpRatio: number;
  giniCoefficient: number;
  governmentDebt: Currency;
  averageWage: Currency;
  averagePrice: Currency;
  velocityOfMoney: number;
  totalLoans: Currency;
  totalDeposits: Currency;
}

export interface MoneySupply {
  m0: Currency;
  m1: Currency;
  m2: Currency;
}

export interface HistoryEntry {
  tick: Tick;
  indicators: EconomicIndicators;
}

export interface Bond {
  id: string;
  issuerId: EntityId;
  holderId: EntityId;
  faceValue: Currency;
  interestRate: number;
  maturityTick: Tick;
}

export interface Loan {
  id: string;
  bankId: EntityId;
  borrowerId: EntityId;
  principal: Currency;
  remainingBalance: Currency;
  interestRate: number;
  termRemaining: number;
  monthlyPayment: Currency;
}
