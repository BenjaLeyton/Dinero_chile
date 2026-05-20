'use client';

import { useGameStore } from '@/stores/game-store';
import { formatCurrency, formatPercent } from '@/lib/format';
import type { Opportunity } from '@/types/game';

const CATEGORY_ICONS: Record<string, string> = {
  empleo: '💼',
  negocio: '🏪',
  ahorro: '🏦',
  deuda: '💳',
  inversion: '📈',
};

const URGENCY_COLORS: Record<string, string> = {
  alta: 'border-[var(--danger-border)] bg-[var(--danger-muted)]',
  media: 'border-[var(--warning-border)] bg-[var(--warning-muted)]',
  baja: 'border-[var(--info-border)] bg-[var(--info-muted)]',
};

export default function OpportunityDetector() {
  const snapshot = useGameStore(s => s.snapshot);
  const executeAction = useGameStore(s => s.executeAction);

  if (!snapshot) return null;

  const player = snapshot.consumers[0];
  if (!player) return null;

  const opportunities = detectOpportunities(snapshot, player);

  if (opportunities.length === 0) {
    return (
      <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] p-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
          Oportunidades
        </h3>
        <p className="text-xs text-[var(--text-secondary)]">
          La economía está estable. Sigue observando los indicadores.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] overflow-hidden">
      <div className="px-4 py-3 border-b border-[var(--border)] bg-[var(--surface)]">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
          Oportunidades ({opportunities.length})
        </h3>
      </div>

      <div className="p-3 space-y-2">
        {opportunities.map(opp => (
          <div
            key={opp.id}
            className={`px-3 py-2.5 rounded-lg border ${URGENCY_COLORS[opp.urgency]}`}
          >
            <div className="flex items-start gap-2">
              <span className="text-sm">{CATEGORY_ICONS[opp.category]}</span>
              <div className="flex-1">
                <p className="text-xs font-medium">{opp.title}</p>
                <p className="text-[10px] text-[var(--text-secondary)] mt-0.5 leading-relaxed">
                  {opp.description}
                </p>
                <p className="text-[10px] mt-1 italic text-[var(--text-secondary)]">
                  ¿Por qué? {opp.why}
                </p>
                {opp.action && (
                  <button
                    onClick={() => executeAction(opp.action!)}
                    className="mt-1.5 px-2.5 py-1 rounded text-[10px] font-medium bg-[var(--card)] border border-[var(--border)] hover:bg-[var(--surface)] transition-colors"
                  >
                    Hacer esto →
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

type PlayerConsumer = NonNullable<ReturnType<typeof useGameStore.getState>['snapshot']>['consumers'][0];
type Snapshot = NonNullable<ReturnType<typeof useGameStore.getState>['snapshot']>;

function detectOpportunities(snapshot: Snapshot, player: PlayerConsumer): Opportunity[] {
  const opps: Opportunity[] = [];
  const ind = snapshot.indicators;

  if (!player.employed) {
    const bestJob = [...snapshot.businesses]
      .filter(b => b.employees < b.productionCapacity * 0.1)
      .sort((a, b) => b.wage - a.wage)[0];

    opps.push({
      id: 'find-job',
      title: 'Busca empleo urgente',
      description: bestJob
        ? `${bestJob.name} paga ${formatCurrency(bestJob.wage)}/mes y está contratando.`
        : 'Busca entre las empresas disponibles o considera emprender.',
      why: 'Sin empleo no tienes ingreso fijo. Es la prioridad.',
      action: bestJob ? { type: 'citizen_change_job', businessId: bestJob.id } : null,
      category: 'empleo',
      urgency: 'alta',
    });
  }

  if (player.employed) {
    const betterJobs = snapshot.businesses
      .filter(b => b.id !== player.employerId && b.wage > player.income * 1.15)
      .sort((a, b) => b.wage - a.wage);

    if (betterJobs.length > 0) {
      const best = betterJobs[0];
      opps.push({
        id: 'better-job',
        title: `Mejor salario en ${best.name}`,
        description: `Paga ${formatCurrency(best.wage)}/mes vs tu actual ${formatCurrency(player.income)}/mes — un ${((best.wage / player.income - 1) * 100).toFixed(0)}% más.`,
        why: `El sector ${best.sector} está pagando más por la demanda de trabajadores.`,
        action: { type: 'citizen_change_job', businessId: best.id },
        category: 'empleo',
        urgency: 'media',
      });
    }
  }

  if (ind.inflationRate > 0.08) {
    opps.push({
      id: 'inflation-warning',
      title: 'Tu dinero pierde valor',
      description: `La inflación es ${formatPercent(ind.inflationRate)}. Cada mes que tu dinero está quieto, pierde poder de compra.`,
      why: `Hay demasiado dinero circulando (M2: ${formatCurrency(ind.moneySupply.m2)}). Los precios suben.`,
      action: player.cash > 1000 ? { type: 'citizen_set_consumption', rate: Math.min(0.9, player.consumptionRate + 0.1) } : null,
      category: 'ahorro',
      urgency: 'alta',
    });
  }

  if (ind.inflationRate < 0) {
    opps.push({
      id: 'deflation-save',
      title: 'Los precios están bajando — ahorra',
      description: 'En deflación, tu dinero vale más cada mes. Guárdalo y compra después.',
      why: 'Los precios caen → tu efectivo gana poder de compra sin hacer nada.',
      action: player.cash > 500 ? { type: 'citizen_save', amount: Math.floor(player.cash * 0.5) } : null,
      category: 'ahorro',
      urgency: 'media',
    });
  }

  if (ind.interestRate < 0.03 && snapshot.commercialBanks.length > 0 && player.debt === 0 && player.cash > 2000) {
    opps.push({
      id: 'cheap-loan',
      title: 'Crédito barato disponible',
      description: `La tasa está al ${formatPercent(ind.interestRate)} — históricamente baja. Buen momento para pedir un préstamo e invertir o emprender.`,
      why: 'El banco central bajó la tasa para estimular la economía. Aprovecha antes de que suba.',
      action: null,
      category: 'deuda',
      urgency: 'baja',
    });
  }

  if (player.debt > player.income * 6) {
    opps.push({
      id: 'high-debt',
      title: 'Deuda elevada — paga lo que puedas',
      description: `Tu deuda (${formatCurrency(player.debt)}) es ${(player.debt / Math.max(player.income, 1)).toFixed(1)}x tu ingreso mensual.`,
      why: 'Los intereses se acumulan cada mes. Cuanto más esperes, más pagas.',
      action: player.cash > 500 ? { type: 'citizen_pay_loan', amount: Math.floor(player.cash * 0.4) } : null,
      category: 'deuda',
      urgency: 'alta',
    });
  }

  if (player.cash > player.income * 5 && player.debt === 0) {
    const profitableSectors = snapshot.businesses
      .filter(b => b.revenue > b.costs * 1.2)
      .map(b => b.sector);
    const bestSector = profitableSectors.length > 0 ? profitableSectors[0] : 'services';

    opps.push({
      id: 'start-business',
      title: 'Tienes capital para emprender',
      description: `Con ${formatCurrency(player.cash)} puedes abrir un negocio. El sector "${bestSector}" está generando buenas ganancias ahora.`,
      why: 'Tienes suficiente ahorro y sin deuda. Es el momento de generar ingreso propio.',
      action: { type: 'citizen_start_business', sector: bestSector },
      category: 'negocio',
      urgency: 'media',
    });
  }

  if (ind.unemploymentRate > 0.15 && player.employed) {
    opps.push({
      id: 'job-risk',
      title: 'Riesgo de despido',
      description: `El desempleo es ${formatPercent(ind.unemploymentRate)}. Las empresas están recortando personal.`,
      why: 'La economía se contrae. Reduce gastos y aumenta tu ahorro de emergencia.',
      action: player.consumptionRate > 0.5 ? { type: 'citizen_set_consumption', rate: 0.4 } : null,
      category: 'empleo',
      urgency: 'alta',
    });
  }

  if (player.savings < player.income * 3 && player.cash > player.income * 0.5 && player.employed) {
    opps.push({
      id: 'emergency-fund',
      title: 'Crea un fondo de emergencia',
      description: `Tienes solo ${formatCurrency(player.savings)} ahorrados. Lo ideal es tener al menos ${formatCurrency(player.income * 3)} (3 meses de ingreso).`,
      why: 'Si pierdes el empleo, necesitas dinero para sobrevivir mientras buscas otro.',
      action: { type: 'citizen_save', amount: Math.floor(player.cash * 0.3) },
      category: 'ahorro',
      urgency: 'media',
    });
  }

  if (ind.gdpGrowthRate > 0.03 && player.employed && player.consumptionRate < 0.6) {
    opps.push({
      id: 'economy-growing',
      title: 'La economía crece — oportunidad',
      description: 'El PIB sube y hay demanda. Buen momento para pedir un aumento, cambiar de trabajo o invertir.',
      why: `El PIB creció ${formatPercent(ind.gdpGrowthRate)} — las empresas ganan más y pueden pagar más.`,
      action: null,
      category: 'inversion',
      urgency: 'baja',
    });
  }

  return opps.slice(0, 5);
}
