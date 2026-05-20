import type { MoneyFlow, EconomicIndicators, Tick } from '@/types/economy';
import type {
  SimulationConfig,
  SimulationSnapshot,
  EconomicEvent,
  PlayerAction,
  EconomyPhase,
} from '@/types/game';
import { SCALE_CONFIGS, PHASE_DEFINITIONS } from '@/types/game';
import type {
  CentralBankState,
  CommercialBankState,
  BusinessState,
  ConsumerState,
  GovernmentState,
  ResourceState,
} from '@/engine/entities/types';
import { createCentralBank } from '@/engine/entities/central-bank';
import { createCommercialBank } from '@/engine/entities/commercial-bank';
import { createBusiness } from '@/engine/entities/business';
import { createConsumer } from '@/engine/entities/consumer';
import { createGovernment } from '@/engine/entities/government';
import { createResource } from '@/engine/entities/resource';
import { tickMonetarySystem } from '@/engine/systems/monetary-system';
import { tickBankingSystem } from '@/engine/systems/banking-system';
import { tickMarketSystem } from '@/engine/systems/market-system';
import { tickLaborSystem } from '@/engine/systems/labor-system';
import { tickFiscalSystem } from '@/engine/systems/fiscal-system';
import { tickTradeSystem } from '@/engine/systems/trade-system';
import { calculateIndicators } from '@/engine/economy/indicators';
import { SeededRandom } from '@/lib/random';
import { EventBus } from './event-bus';
import { getIndustryById } from '@/engine/config/industries';

export interface SimulationState {
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
  config: SimulationConfig;
}

const PHASE_ORDER: EconomyPhase[] = [
  'barter', 'commodity_money', 'coinage', 'banking', 'central_banking', 'fiat', 'modern',
];

export class SimulationEngine {
  private state: SimulationState;
  private rng: SeededRandom;
  private bus: EventBus;
  private flowCounter = 0;

  constructor(config: SimulationConfig) {
    this.rng = new SeededRandom(config.seed);
    this.bus = new EventBus();
    this.state = this.initializeState(config);
  }

  private initializeState(config: SimulationConfig): SimulationState {
    const scale = SCALE_CONFIGS[config.scale];
    const isGenesis = config.genesisMode;
    const startPhase: EconomyPhase = isGenesis ? 'barter' : 'modern';

    const centralBank = createCentralBank();
    if (isGenesis) {
      centralBank.cash = 0;
      centralBank.moneyPrinted = 0;
    }

    const commercialBanks: CommercialBankState[] = [];
    if (!isGenesis) {
      for (let i = 0; i < scale.bankCount; i++) {
        commercialBanks.push(createCommercialBank(i, this.rng));
      }
    }

    const sectors = ['agriculture', 'manufacturing', 'services'] as const;
    const businesses: BusinessState[] = [];
    const bizCount = isGenesis ? Math.min(scale.businessCount, 3) : scale.businessCount;
    for (let i = 0; i < bizCount; i++) {
      const sector = isGenesis ? sectors[i % sectors.length] : (['agriculture', 'manufacturing', 'services', 'technology', 'energy'] as const)[i % 5];
      const biz = createBusiness(i, sector, this.rng);
      if (isGenesis) {
        biz.cash = 0;
        biz.price = 0;
        biz.inventory = this.rng.range(20, 60);
        biz.revenue = 0;
      }
      businesses.push(biz);
    }

    const consumers: ConsumerState[] = [];
    const conCount = isGenesis ? Math.min(scale.consumerCount, 10) : scale.consumerCount;
    for (let i = 0; i < conCount; i++) {
      const employerIdx = i % businesses.length;
      const consumer = createConsumer(i, businesses[employerIdx].id, this.rng);
      if (isGenesis) {
        consumer.cash = 0;
        consumer.savings = 0;
        consumer.income = 0;
      }
      consumers.push(consumer);
    }

    for (const biz of businesses) {
      biz.employees = consumers.filter(c => c.employerId === biz.id).length;
    }

    const government = createGovernment();
    if (isGenesis) {
      government.cash = 0;
      government.debt = 0;
      government.incomeTaxRate = 0;
      government.corporateTaxRate = 0;
      government.spendingRate = 0;
    }

    const resources: ResourceState[] = [
      createResource(0, 'gold'),
      createResource(1, 'agriculture'),
    ];

    const indicators = this.computeInitialIndicators(
      centralBank, commercialBanks, businesses, consumers, government
    );

    if (isGenesis) {
      indicators.moneySupply = { m0: 0, m1: 0, m2: 0 };
    }

    const state: SimulationState = {
      tick: 0,
      phase: startPhase,
      centralBank,
      commercialBanks,
      businesses,
      consumers,
      government,
      resources,
      indicators,
      moneyFlows: [],
      events: [],
      config,
    };

    if (isGenesis) {
      state.events.push({
        id: 'evt-genesis-start',
        tick: 0,
        title: 'El Pueblo Nace',
        description: PHASE_DEFINITIONS.barter.narrative,
        impact: 'neutral',
        category: 'growth',
      });
    }

    return state;
  }

  private computeInitialIndicators(
    cb: CentralBankState,
    banks: CommercialBankState[],
    businesses: BusinessState[],
    consumers: ConsumerState[],
    gov: GovernmentState,
  ): EconomicIndicators {
    const totalOutput = businesses.reduce((s, b) => s + b.productionCapacity * b.price, 0);
    const totalDeposits = banks.reduce((s, b) => s + b.deposits, 0);
    const employed = consumers.filter(c => c.employed).length;

    return {
      gdp: totalOutput,
      gdpGrowthRate: 0,
      inflationRate: 0,
      cpi: 100,
      unemploymentRate: 1 - employed / consumers.length,
      interestRate: cb.interestRate,
      moneySupply: {
        m0: cb.moneyPrinted || 1_000_000,
        m1: 1_000_000 + totalDeposits,
        m2: 1_000_000 + totalDeposits * 1.5,
      },
      debtToGdpRatio: gov.debt / Math.max(totalOutput, 1),
      giniCoefficient: 0.3,
      governmentDebt: gov.debt,
      averageWage: businesses.reduce((s, b) => s + b.wage, 0) / Math.max(businesses.length, 1),
      averagePrice: businesses.reduce((s, b) => s + b.price, 0) / Math.max(businesses.length, 1),
      velocityOfMoney: 1,
      totalLoans: banks.reduce((s, b) => s + b.loans.reduce((ls, l) => ls + l.remainingBalance, 0), 0),
      totalDeposits,
    };
  }

  tick(): SimulationSnapshot {
    this.state.tick++;
    this.state.moneyFlows = [];
    this.state.events = [];

    const prevGdp = this.state.indicators.gdp;
    const prevCpi = this.state.indicators.cpi;
    const phaseDef = PHASE_DEFINITIONS[this.state.phase];

    if (this.state.phase === 'barter') {
      this.tickBarter();
    } else if (this.state.phase === 'commodity_money') {
      this.tickCommodityMoney();
    } else {
      if (phaseDef.hasCentralBank) {
        tickMonetarySystem(this.state, this.rng);
      }
      if (phaseDef.hasBanks && phaseDef.hasLoans) {
        tickBankingSystem(this.state, this.addFlow.bind(this));
      }
      tickLaborSystem(this.state, this.rng);
      tickMarketSystem(this.state, this.rng);
      if (phaseDef.hasTaxes) {
        tickFiscalSystem(this.state, this.addFlow.bind(this));
      }
      tickTradeSystem(this.state, this.addFlow.bind(this));
    }

    this.state.indicators = calculateIndicators(this.state, prevGdp, prevCpi);
    this.checkEvents();

    return this.getSnapshot();
  }

  private tickBarter(): void {
    for (const biz of this.state.businesses) {
      biz.inventory += biz.employees * 2;
    }

    let failedTrades = 0;
    let successfulTrades = 0;

    for (const consumer of this.state.consumers) {
      const wantIdx = Math.floor(this.rng.next() * this.state.businesses.length);
      const hasIdx = this.state.businesses.findIndex(b => b.id === consumer.employerId);
      if (hasIdx < 0) continue;

      const wantBiz = this.state.businesses[wantIdx];
      const hasBiz = this.state.businesses[hasIdx];

      if (wantIdx === hasIdx) {
        wantBiz.inventory = Math.max(0, wantBiz.inventory - 1);
        consumer.satisfaction = Math.min(100, consumer.satisfaction + 2);
        successfulTrades++;
        continue;
      }

      const wantsBack = this.rng.next() < 0.35;
      if (wantsBack && wantBiz.inventory > 0 && hasBiz.inventory > 0) {
        wantBiz.inventory--;
        hasBiz.inventory--;
        consumer.satisfaction = Math.min(100, consumer.satisfaction + 1);
        successfulTrades++;
        this.addFlow(hasBiz.id, wantBiz.id, 1, 'transfer');
      } else {
        consumer.satisfaction = Math.max(0, consumer.satisfaction - 3);
        failedTrades++;
      }
    }

    if (this.state.tick % 5 === 0 && failedTrades > successfulTrades) {
      this.state.events.push({
        id: `evt-${this.state.tick}-barter-fail`,
        tick: this.state.tick,
        title: 'Problemas del trueque',
        description: `${failedTrades} intercambios fallaron porque no hubo "doble coincidencia de deseos". La gente se frustra.`,
        impact: 'negative',
        category: 'market',
      });
    }

    if (this.state.tick >= 8) {
      const avgSatisfaction = this.state.consumers.reduce((s, c) => s + c.satisfaction, 0) / this.state.consumers.length;
      if (avgSatisfaction < 50) {
        this.state.events.push({
          id: `evt-${this.state.tick}-need-money`,
          tick: this.state.tick,
          title: '¡Se necesita una solución!',
          description: 'La satisfacción es baja. Los habitantes piden un medio de intercambio universal. ¿Qué tal usar algo que todos valoren como "dinero"?',
          impact: 'neutral',
          category: 'market',
        });
      }
    }
  }

  private tickCommodityMoney(): void {
    for (const biz of this.state.businesses) {
      biz.inventory += biz.employees * 2;
    }

    for (const consumer of this.state.consumers) {
      consumer.income = 5;
      consumer.cash += consumer.income;
    }

    for (const biz of this.state.businesses) {
      if (biz.price === 0) biz.price = 3;
    }

    for (const consumer of this.state.consumers) {
      if (consumer.cash < 1) continue;
      const targetBiz = this.state.businesses[
        Math.floor(this.rng.next() * this.state.businesses.length)
      ];
      if (!targetBiz || targetBiz.inventory <= 0) continue;

      const cost = targetBiz.price;
      if (consumer.cash >= cost) {
        consumer.cash -= cost;
        targetBiz.cash += cost;
        targetBiz.inventory--;
        consumer.satisfaction = Math.min(100, consumer.satisfaction + 3);
        this.addFlow(consumer.id, targetBiz.id, cost, 'purchase');
      }
    }

    for (const biz of this.state.businesses) {
      const wageBudget = Math.min(biz.cash, biz.employees * 3);
      if (wageBudget > 0) {
        const employees = this.state.consumers.filter(c => c.employerId === biz.id);
        const perEmp = wageBudget / Math.max(employees.length, 1);
        for (const emp of employees) {
          emp.cash += perEmp;
        }
        biz.cash -= wageBudget;
        if (employees.length > 0) {
          this.addFlow(biz.id, employees[0].id, wageBudget, 'wage');
        }
      }
    }

    if (this.state.tick % 10 === 0) {
      this.state.events.push({
        id: `evt-${this.state.tick}-commodity-info`,
        tick: this.state.tick,
        title: 'El dinero mercancía funciona',
        description: 'Ahora todos aceptan sal como pago. El comercio fluye mejor. Pero la sal se deteriora con el tiempo... ¿habrá algo más duradero?',
        impact: 'positive',
        category: 'market',
      });
    }
  }

  private advancePhase(): void {
    const currentIdx = PHASE_ORDER.indexOf(this.state.phase);
    if (currentIdx >= PHASE_ORDER.length - 1) return;

    const nextPhase = PHASE_ORDER[currentIdx + 1];
    const nextDef = PHASE_DEFINITIONS[nextPhase];
    this.state.phase = nextPhase;

    if (nextPhase === 'commodity_money') {
      for (const consumer of this.state.consumers) {
        consumer.cash = 10;
      }
      for (const biz of this.state.businesses) {
        biz.price = 3;
        biz.cash = 5;
      }
    }

    if (nextPhase === 'coinage') {
      for (const consumer of this.state.consumers) {
        consumer.cash *= 10;
        consumer.income = 30;
      }
      for (const biz of this.state.businesses) {
        biz.price = 10;
        biz.cash *= 10;
        biz.wage = 30;
      }
      this.state.government.cash = 500;
      this.state.government.incomeTaxRate = 0.10;
      this.state.government.corporateTaxRate = 0.05;
      this.state.government.spendingRate = 0.5;
    }

    if (nextPhase === 'banking') {
      const scale = SCALE_CONFIGS[this.state.config.scale];
      for (let i = 0; i < scale.bankCount; i++) {
        this.state.commercialBanks.push(createCommercialBank(i, this.rng));
      }
      for (const consumer of this.state.consumers) {
        consumer.savings = consumer.cash * 0.5;
        consumer.cash *= 0.5;
      }
    }

    if (nextPhase === 'central_banking') {
      this.state.centralBank.cash = 100_000;
      this.state.centralBank.moneyPrinted = 100_000;
      this.state.centralBank.interestRate = 0.05;
      this.state.centralBank.reserveRequirement = 0.10;
    }

    if (nextPhase === 'fiat') {
      this.state.centralBank.moneyPrinted = 500_000;
      this.state.centralBank.cash = 500_000;
    }

    if (nextPhase === 'modern') {
      for (const biz of this.state.businesses) {
        biz.wage = 3000;
        biz.price = 10;
        biz.cash = 50000;
      }
      for (const consumer of this.state.consumers) {
        consumer.income = 3000;
        consumer.cash = 5000;
        consumer.savings = 5000;
      }
      this.state.government.cash = 500_000;
      this.state.centralBank.moneyPrinted = 1_000_000;
      this.state.centralBank.cash = 1_000_000;
    }

    this.state.events.push({
      id: `evt-${this.state.tick}-phase-${nextPhase}`,
      tick: this.state.tick,
      title: `Nueva era: ${nextDef.name}`,
      description: nextDef.narrative,
      impact: 'positive',
      category: 'growth',
    });
  }

  private addFlow(from: string, to: string, amount: number, type: MoneyFlow['type']): void {
    if (amount <= 0) return;
    this.flowCounter++;
    this.state.moneyFlows.push({
      id: `f-${this.state.tick}-${this.flowCounter}`,
      from,
      to,
      amount,
      type,
      tick: this.state.tick,
    });
  }

  private checkEvents(): void {
    const ind = this.state.indicators;

    if (ind.inflationRate > 0.5 && this.state.tick > 10) {
      this.state.events.push({
        id: `evt-${this.state.tick}-hyperinf`,
        tick: this.state.tick,
        title: 'Alerta de hiperinflación',
        description: `La inflación alcanzó ${(ind.inflationRate * 100).toFixed(1)}%. Los precios se disparan.`,
        impact: 'negative',
        category: 'crisis',
      });
    }

    if (ind.unemploymentRate > 0.25) {
      this.state.events.push({
        id: `evt-${this.state.tick}-unemp`,
        tick: this.state.tick,
        title: 'Crisis de desempleo',
        description: `El desempleo llegó a ${(ind.unemploymentRate * 100).toFixed(1)}%.`,
        impact: 'negative',
        category: 'crisis',
      });
    }

    if (ind.gdpGrowthRate > 0.05) {
      this.state.events.push({
        id: `evt-${this.state.tick}-boom`,
        tick: this.state.tick,
        title: 'Boom económico',
        description: `El PIB creció ${(ind.gdpGrowthRate * 100).toFixed(1)}% este mes.`,
        impact: 'positive',
        category: 'growth',
      });
    }
  }

  applyAction(action: PlayerAction): void {
    switch (action.type) {
      case 'set_interest_rate':
        this.state.centralBank.interestRate = Math.max(0, Math.min(0.5, action.value));
        break;
      case 'set_reserve_requirement':
        this.state.centralBank.reserveRequirement = Math.max(0.01, Math.min(1, action.value));
        break;
      case 'print_money': {
        const amount = Math.max(0, action.amount);
        this.state.centralBank.cash += amount;
        this.state.centralBank.moneyPrinted += amount;
        this.addFlow('central_bank', 'central_bank', amount, 'money_creation');
        break;
      }
      case 'set_tax_rate':
        if (action.taxType === 'income') {
          this.state.government.incomeTaxRate = Math.max(0, Math.min(0.6, action.value));
        } else {
          this.state.government.corporateTaxRate = Math.max(0, Math.min(0.6, action.value));
        }
        break;
      case 'set_government_spending':
        this.state.government.spendingRate = Math.max(0, Math.min(1, action.value));
        break;
      case 'set_price': {
        const biz = this.state.businesses.find(b => b.id === action.entityId);
        if (biz) biz.price = Math.max(1, action.value);
        break;
      }
      case 'hire': {
        const biz = this.state.businesses.find(b => b.id === action.entityId);
        if (!biz) break;
        const unemployed = this.state.consumers.filter(c => !c.employed);
        const toHire = Math.min(action.count, unemployed.length);
        for (let i = 0; i < toHire; i++) {
          unemployed[i].employed = true;
          unemployed[i].employerId = biz.id;
          unemployed[i].income = biz.wage;
          biz.employees++;
        }
        break;
      }
      case 'fire': {
        const biz = this.state.businesses.find(b => b.id === action.entityId);
        if (!biz) break;
        const employees = this.state.consumers.filter(c => c.employerId === biz.id);
        const toFire = Math.min(action.count, employees.length);
        for (let i = 0; i < toFire; i++) {
          employees[i].employed = false;
          employees[i].employerId = null;
          employees[i].income = 0;
          biz.employees--;
        }
        break;
      }
      case 'advance_phase':
        this.advancePhase();
        break;
      case 'citizen_change_job': {
        const player = this.state.consumers[0];
        if (!player) break;
        const newJob = this.state.businesses.find(b => b.id === action.businessId);
        if (!newJob) break;
        const oldJob = this.state.businesses.find(b => b.id === player.employerId);
        if (oldJob) oldJob.employees--;
        player.employerId = newJob.id;
        player.employed = true;
        player.income = newJob.wage;
        newJob.employees++;
        break;
      }
      case 'citizen_start_business': {
        const player = this.state.consumers[0];
        if (!player) break;
        const industry = action.industryId ? getIndustryById(action.industryId) : null;
        const startCost = industry ? industry.startupCost : player.cash * 0.6;
        if (player.cash < startCost || startCost < 100) break;
        player.cash -= startCost;
        const oldBiz = this.state.businesses.find(b => b.id === player.employerId);
        if (oldBiz) oldBiz.employees--;
        player.employed = false;
        player.employerId = null;
        const newIdx = this.state.businesses.length;
        const sector = (industry?.sector ?? action.sector) as 'agriculture' | 'manufacturing' | 'services' | 'technology' | 'energy';
        const newBiz = createBusiness(newIdx, sector, this.rng);
        newBiz.cash = startCost;
        newBiz.ownerId = player.id;
        newBiz.industryId = industry?.id ?? null;
        if (industry) {
          newBiz.name = industry.name;
          newBiz.price = industry.pricePerUnit;
          newBiz.productionCapacity = industry.productionPerEmployee * industry.employeesNeeded;
          newBiz.monthlyFixedCosts = industry.monthlyFixedCosts;
          newBiz.wage = industry.pricePerUnit * industry.productionPerEmployee * 0.3;
        } else {
          newBiz.name = `Negocio de ${player.name}`;
        }
        newBiz.employees = 1;
        this.state.businesses.push(newBiz);
        player.employerId = newBiz.id;
        player.employed = true;
        player.income = newBiz.wage;
        this.state.events.push({
          id: `evt-${this.state.tick}-new-biz`,
          tick: this.state.tick,
          title: `¡Nuevo negocio: ${newBiz.name}!`,
          description: industry
            ? `Invertiste ${startCost.toLocaleString()} para abrir tu ${industry.name}. ${industry.howYouEarn}`
            : `Invertiste ${startCost.toLocaleString()} para abrir tu negocio.`,
          impact: 'positive',
          category: 'growth',
        });
        break;
      }
      case 'citizen_save': {
        const player = this.state.consumers[0];
        if (!player) break;
        const saveAmt = Math.min(action.amount, player.cash);
        if (saveAmt <= 0) break;
        player.cash -= saveAmt;
        player.savings += saveAmt;
        if (this.state.commercialBanks.length > 0) {
          const bank = this.state.commercialBanks[0];
          bank.deposits += saveAmt;
          bank.reserves += saveAmt;
          this.addFlow(player.id, bank.id, saveAmt, 'deposit');
        }
        break;
      }
      case 'citizen_withdraw': {
        const player = this.state.consumers[0];
        if (!player) break;
        const wAmt = Math.min(action.amount, player.savings);
        if (wAmt <= 0) break;
        player.savings -= wAmt;
        player.cash += wAmt;
        if (this.state.commercialBanks.length > 0) {
          const bank = this.state.commercialBanks[0];
          bank.deposits -= wAmt;
          bank.reserves = Math.max(0, bank.reserves - wAmt);
        }
        break;
      }
      case 'citizen_take_loan': {
        const player = this.state.consumers[0];
        if (!player || this.state.commercialBanks.length === 0) break;
        const bank = this.state.commercialBanks[0];
        const loanAmt = Math.min(action.amount, bank.reserves * 0.5);
        if (loanAmt < 100) break;
        player.cash += loanAmt;
        player.debt += loanAmt;
        bank.reserves -= loanAmt;
        bank.deposits += loanAmt;
        const lRate = this.state.centralBank.interestRate + bank.interestRateSpread;
        bank.loans.push({
          id: `loan_citizen_${this.state.tick}`,
          bankId: bank.id,
          borrowerId: player.id,
          principal: loanAmt,
          remainingBalance: loanAmt,
          interestRate: lRate,
          termRemaining: 60,
          monthlyPayment: (loanAmt * (lRate / 12)) / (1 - Math.pow(1 + lRate / 12, -60)),
        });
        this.addFlow(bank.id, player.id, loanAmt, 'loan');
        break;
      }
      case 'citizen_pay_loan': {
        const player = this.state.consumers[0];
        if (!player || this.state.commercialBanks.length === 0) break;
        const payAmt = Math.min(action.amount, player.cash, player.debt);
        if (payAmt <= 0) break;
        player.cash -= payAmt;
        player.debt -= payAmt;
        const bank = this.state.commercialBanks[0];
        bank.cash += payAmt;
        this.addFlow(player.id, bank.id, payAmt, 'debt_payment');
        break;
      }
      case 'citizen_set_consumption': {
        const player = this.state.consumers[0];
        if (!player) break;
        player.consumptionRate = Math.max(0.1, Math.min(0.95, action.rate));
        break;
      }
      default:
        break;
    }
  }

  getSnapshot(): SimulationSnapshot {
    return {
      tick: this.state.tick,
      phase: this.state.phase,
      centralBank: { ...this.state.centralBank },
      commercialBanks: this.state.commercialBanks.map(b => ({ ...b, loans: [...b.loans] })),
      businesses: this.state.businesses.map(b => ({ ...b })),
      consumers: this.state.consumers.map(c => ({ ...c })),
      government: { ...this.state.government, bonds: [...this.state.government.bonds] },
      resources: this.state.resources.map(r => ({ ...r })),
      indicators: { ...this.state.indicators, moneySupply: { ...this.state.indicators.moneySupply } },
      moneyFlows: [...this.state.moneyFlows],
      events: [...this.state.events],
    };
  }

  getState(): SimulationState {
    return this.state;
  }
}
