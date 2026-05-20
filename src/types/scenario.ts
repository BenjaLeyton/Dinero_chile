import type { EconomicIndicators, Tick } from './economy';
import type { SimulationSnapshot, Difficulty } from './game';

export interface ScenarioDefinition {
  id: string;
  name: string;
  description: string;
  difficulty: Difficulty;
  historicalBasis?: string;
  icon: string;
  overrides: ScenarioOverrides;
  events: ScriptedEvent[];
  objectives: Objective[];
  failConditions: FailCondition[];
  educationalNotes: EducationalNote[];
}

export interface ScenarioOverrides {
  initialMoneySupply?: number;
  initialInterestRate?: number;
  initialInflation?: number;
  initialGovernmentDebt?: number;
  initialUnemployment?: number;
  moneyPrintingMultiplier?: number;
  consumptionMultiplier?: number;
}

export interface ScriptedEvent {
  id: string;
  trigger: EventTrigger;
  title: string;
  description: string;
  effects: EventEffect[];
  educational: string;
  fired?: boolean;
}

export type EventTrigger =
  | { type: 'tick'; tick: Tick }
  | { type: 'condition'; indicator: keyof EconomicIndicators; operator: '>' | '<' | '>='; value: number }
  | { type: 'random'; probability: number; afterTick: Tick };

export type EventEffect =
  | { type: 'multiply_indicator'; field: string; factor: number }
  | { type: 'set_indicator'; field: string; value: number }
  | { type: 'add_consumers'; count: number; wealth: number }
  | { type: 'remove_businesses'; count: number }
  | { type: 'trigger_panic'; severity: number };

export interface Objective {
  id: string;
  description: string;
  condition: ObjectiveCondition;
  completed: boolean;
}

export type ObjectiveCondition =
  | { type: 'indicator_below'; indicator: keyof EconomicIndicators; value: number; forTicks: number }
  | { type: 'indicator_above'; indicator: keyof EconomicIndicators; value: number; forTicks: number }
  | { type: 'survive_ticks'; ticks: number };

export interface FailCondition {
  description: string;
  condition: ObjectiveCondition;
}

export interface EducationalNote {
  triggerTick?: Tick;
  triggerCondition?: { indicator: keyof EconomicIndicators; operator: '>' | '<'; value: number };
  title: string;
  content: string;
  concept: string;
}
