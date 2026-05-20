import type {
  Currency,
  EntityId,
  EntityType,
  BusinessSector,
  ResourceType,
  Loan,
  Bond,
} from '@/types/economy';

export interface Position {
  x: number;
  y: number;
}

export interface BaseEntity {
  id: EntityId;
  type: EntityType;
  name: string;
  cash: Currency;
  position: Position;
}

export interface CentralBankState extends BaseEntity {
  type: 'central_bank';
  interestRate: number;
  reserveRequirement: number;
  targetInflation: number;
  moneyPrinted: Currency;
  bondsHeld: Currency;
}

export interface CommercialBankState extends BaseEntity {
  type: 'commercial_bank';
  deposits: Currency;
  loans: Loan[];
  reserves: Currency;
  interestRateSpread: number;
  riskTolerance: number;
}

export interface BusinessState extends BaseEntity {
  type: 'business';
  sector: BusinessSector;
  industryId: string | null;
  employees: number;
  wage: Currency;
  productionCapacity: number;
  inventory: number;
  price: Currency;
  revenue: Currency;
  costs: Currency;
  debt: Currency;
  investmentRate: number;
  monthlyFixedCosts: number;
  ownerId: EntityId | null;
}

export interface ConsumerState extends BaseEntity {
  type: 'consumer';
  income: Currency;
  savings: Currency;
  debt: Currency;
  consumptionRate: number;
  satisfaction: number;
  employed: boolean;
  employerId: EntityId | null;
}

export interface GovernmentState extends BaseEntity {
  type: 'government';
  incomeTaxRate: number;
  corporateTaxRate: number;
  spendingRate: number;
  debt: Currency;
  bonds: Bond[];
  revenue: Currency;
  spending: Currency;
  deficit: Currency;
}

export interface ResourceState extends BaseEntity {
  type: 'resource';
  resourceType: ResourceType;
  totalReserves: number;
  extractionRate: number;
  extractionCost: Currency;
  marketPrice: Currency;
  depletion: number;
}

export type AnyEntity =
  | CentralBankState
  | CommercialBankState
  | BusinessState
  | ConsumerState
  | GovernmentState
  | ResourceState;
