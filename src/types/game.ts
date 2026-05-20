import type {
  EconomicIndicators,
  MoneyFlow,
  Tick,
  HistoryEntry,
} from './economy';
import type {
  CentralBankState,
  CommercialBankState,
  BusinessState,
  ConsumerState,
  GovernmentState,
  ResourceState,
} from '@/engine/entities/types';

export type PlayerRole =
  | 'central_banker'
  | 'business_owner'
  | 'government'
  | 'investor'
  | 'citizen';

export type GameSpeed = 0 | 1 | 2 | 5 | 10;

export type GameStatus = 'menu' | 'loading' | 'playing' | 'paused' | 'ended';

export type SimulationScale = 'pueblo' | 'ciudad' | 'metropolis' | 'pais' | 'mundial';

export interface ScaleConfig {
  id: SimulationScale;
  name: string;
  description: string;
  bankCount: number;
  businessCount: number;
  consumerCount: number;
  hasTradeExterior: boolean;
  countryCount: number;
}

export const SCALE_CONFIGS: Record<SimulationScale, ScaleConfig> = {
  pueblo: {
    id: 'pueblo',
    name: 'Pueblo',
    description: 'Economía básica — ideal para aprender',
    bankCount: 2,
    businessCount: 3,
    consumerCount: 10,
    hasTradeExterior: false,
    countryCount: 1,
  },
  ciudad: {
    id: 'ciudad',
    name: 'Ciudad',
    description: 'Más sectores y competencia',
    bankCount: 4,
    businessCount: 8,
    consumerCount: 30,
    hasTradeExterior: false,
    countryCount: 1,
  },
  metropolis: {
    id: 'metropolis',
    name: 'Metrópolis',
    description: 'Mercado laboral complejo y desigualdad',
    bankCount: 6,
    businessCount: 15,
    consumerCount: 50,
    hasTradeExterior: false,
    countryCount: 1,
  },
  pais: {
    id: 'pais',
    name: 'País',
    description: 'Comercio exterior y tipo de cambio',
    bankCount: 10,
    businessCount: 30,
    consumerCount: 100,
    hasTradeExterior: true,
    countryCount: 1,
  },
  mundial: {
    id: 'mundial',
    name: 'Mundial',
    description: 'Múltiples economías y globalización',
    bankCount: 6,
    businessCount: 15,
    consumerCount: 50,
    hasTradeExterior: true,
    countryCount: 3,
  },
};

export interface SimulationSnapshot {
  tick: Tick;
  phase: EconomyPhase;
  centralBank: CentralBankState;
  commercialBanks: CommercialBankState[];
  businesses: BusinessState[];
  consumers: ConsumerState[];
  government: GovernmentState;
  resources: ResourceState[];
  indicators: EconomicIndicators;
  moneyFlows: MoneyFlow[];
  events: EconomicEvent[];
}

export interface SimulationConfig {
  scale: SimulationScale;
  playerRole: PlayerRole;
  scenarioId: string | null;
  difficulty: Difficulty;
  seed: number;
  ticksPerSecond: number;
  genesisMode: boolean;
}

export type Difficulty = 'facil' | 'normal' | 'dificil' | 'realista';

export type EconomyPhase =
  | 'barter'           // Trueque puro — sin dinero
  | 'commodity_money'  // Dinero mercancía (sal, ganado, conchas)
  | 'coinage'          // Monedas acuñadas
  | 'banking'          // Bancos comerciales + reserva fraccionaria
  | 'central_banking'  // Banco central + política monetaria
  | 'fiat'             // Dinero fiat + gobierno fiscal completo
  | 'modern';          // Sistema completo moderno

export interface PhaseDefinition {
  id: EconomyPhase;
  name: string;
  era: string;
  description: string;
  narrative: string;
  unlocks: string[];
  hasBanks: boolean;
  hasCentralBank: boolean;
  hasGovernment: boolean;
  hasTaxes: boolean;
  hasLoans: boolean;
  moneyName: string;
}

export const PHASE_DEFINITIONS: Record<EconomyPhase, PhaseDefinition> = {
  barter: {
    id: 'barter',
    name: 'Trueque',
    era: '~10,000 AC',
    description: 'Los habitantes intercambian bienes directamente entre sí.',
    narrative: 'Tu pueblo acaba de formarse. No existe el dinero. Las personas intercambian lo que producen: trigo por carne, pieles por herramientas. Pero hay un problema... ¿qué pasa cuando el granjero quiere zapatos, pero el zapatero no necesita trigo?',
    unlocks: ['Intercambio directo entre productores'],
    hasBanks: false,
    hasCentralBank: false,
    hasGovernment: false,
    hasTaxes: false,
    hasLoans: false,
    moneyName: 'bienes',
  },
  commodity_money: {
    id: 'commodity_money',
    name: 'Dinero Mercancía',
    era: '~3,000 AC',
    description: 'Se adopta un bien común como medio de intercambio.',
    narrative: 'Los problemas del trueque son evidentes. La gente decide usar un bien que todos aceptan como pago: sal, conchas o ganado. ¡Acabas de inventar el dinero! Ahora cualquiera puede vender su producto por "dinero" y comprar lo que necesite.',
    unlocks: ['Medio de intercambio universal', 'Precios expresados en mercancía'],
    hasBanks: false,
    hasCentralBank: false,
    hasGovernment: false,
    hasTaxes: false,
    hasLoans: false,
    moneyName: 'sal',
  },
  coinage: {
    id: 'coinage',
    name: 'Monedas',
    era: '~600 AC',
    description: 'Se acuñan monedas estandarizadas de metal precioso.',
    narrative: 'La sal se pudre, el ganado se muere. El pueblo descubre el oro y la plata — son duraderos, divisibles y escasos. Se acuñan monedas con un peso y valor estandarizado. El comercio se expande enormemente.',
    unlocks: ['Monedas estandarizadas', 'Ahorro a largo plazo', 'Comercio expandido'],
    hasBanks: false,
    hasCentralBank: false,
    hasGovernment: true,
    hasTaxes: true,
    hasLoans: false,
    moneyName: 'monedas',
  },
  banking: {
    id: 'banking',
    name: 'Banca',
    era: '~1400s',
    description: 'Nacen los bancos — guardan dinero y hacen préstamos.',
    narrative: 'Guardar monedas en casa es peligroso. Algunos comerciantes ricos ofrecen guardarlas a cambio de un recibo. Pronto descubren algo revolucionario: no todos retiran su dinero al mismo tiempo. Pueden prestar parte de los depósitos y cobrar interés. ¡Acaban de inventar la reserva fraccionaria y la creación de dinero!',
    unlocks: ['Depósitos y préstamos', 'Reserva fraccionaria', 'Multiplicador monetario', 'Intereses'],
    hasBanks: true,
    hasCentralBank: false,
    hasGovernment: true,
    hasTaxes: true,
    hasLoans: true,
    moneyName: 'monedas',
  },
  central_banking: {
    id: 'central_banking',
    name: 'Banco Central',
    era: '1694',
    description: 'Se crea un banco central para regular el sistema.',
    narrative: 'Los bancos a veces prestan demasiado y quiebran. Se necesita un regulador. El pueblo crea un Banco Central que controla cuánto pueden prestar los bancos (requisito de reserva), fija la tasa de interés base, y puede crear dinero nuevo si es necesario.',
    unlocks: ['Tasa de interés base', 'Requisitos de reserva', 'Impresión de dinero', 'Política monetaria'],
    hasBanks: true,
    hasCentralBank: true,
    hasGovernment: true,
    hasTaxes: true,
    hasLoans: true,
    moneyName: 'pesos',
  },
  fiat: {
    id: 'fiat',
    name: 'Dinero Fiat',
    era: '1971',
    description: 'El dinero ya no está respaldado por oro — su valor viene de la confianza.',
    narrative: 'El pueblo abandona el respaldo en oro. Ahora el dinero vale porque todos confían en que vale. El banco central puede crear tanto dinero como considere necesario. Esto da mucha flexibilidad... pero también mucho peligro. Si se imprime demasiado, viene la inflación.',
    unlocks: ['Dinero sin respaldo metálico', 'Flexibilización cuantitativa', 'Riesgo de hiperinflación'],
    hasBanks: true,
    hasCentralBank: true,
    hasGovernment: true,
    hasTaxes: true,
    hasLoans: true,
    moneyName: 'pesos',
  },
  modern: {
    id: 'modern',
    name: 'Economía Moderna',
    era: 'Hoy',
    description: 'Sistema financiero completo con todos los instrumentos.',
    narrative: 'Bienvenido a la economía moderna. Tienes bancos, banco central, gobierno, impuestos, deuda pública, mercado laboral, y todos los instrumentos de política. Lo que hagas con ellos determinará si tu pueblo prospera o colapsa.',
    unlocks: ['Todos los controles disponibles', 'Escenarios avanzados'],
    hasBanks: true,
    hasCentralBank: true,
    hasGovernment: true,
    hasTaxes: true,
    hasLoans: true,
    moneyName: 'pesos',
  },
};

export interface EconomicEvent {
  id: string;
  tick: Tick;
  title: string;
  description: string;
  impact: 'positive' | 'negative' | 'neutral';
  category: 'monetary' | 'fiscal' | 'market' | 'crisis' | 'growth';
}

export type PlayerAction =
  | { type: 'set_interest_rate'; value: number }
  | { type: 'set_reserve_requirement'; value: number }
  | { type: 'print_money'; amount: number }
  | { type: 'set_tax_rate'; taxType: 'income' | 'corporate'; value: number }
  | { type: 'set_government_spending'; value: number }
  | { type: 'set_price'; entityId: string; value: number }
  | { type: 'hire'; entityId: string; count: number }
  | { type: 'fire'; entityId: string; count: number }
  | { type: 'take_loan'; entityId: string; amount: number }
  | { type: 'set_speed'; ticksPerSecond: number }
  | { type: 'advance_phase' }
  | { type: 'citizen_change_job'; businessId: string }
  | { type: 'citizen_start_business'; sector: string; industryId?: string }
  | { type: 'citizen_save'; amount: number }
  | { type: 'citizen_withdraw'; amount: number }
  | { type: 'citizen_take_loan'; amount: number }
  | { type: 'citizen_pay_loan'; amount: number }
  | { type: 'citizen_set_consumption'; rate: number }
  | { type: 'pause' }
  | { type: 'resume' };

export interface MoneyOriginStep {
  entityId: string;
  entityName: string;
  entityType: string;
  action: string;
  amount: number;
}

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  why: string;
  action: PlayerAction | null;
  category: 'empleo' | 'negocio' | 'ahorro' | 'deuda' | 'inversion';
  urgency: 'alta' | 'media' | 'baja';
}

export type WorkerCommand =
  | { type: 'INIT'; config: SimulationConfig }
  | { type: 'TICK' }
  | { type: 'SET_SPEED'; ticksPerSecond: number }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'PLAYER_ACTION'; action: PlayerAction }
  | { type: 'SAVE' }
  | { type: 'LOAD'; snapshot: SimulationSnapshot };

export type WorkerEvent =
  | { type: 'TICK_COMPLETE'; snapshot: SimulationSnapshot }
  | { type: 'EVENT'; event: EconomicEvent }
  | { type: 'INITIALIZED' }
  | { type: 'ERROR'; message: string };
