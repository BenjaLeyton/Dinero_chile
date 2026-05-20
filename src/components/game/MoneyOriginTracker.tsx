'use client';

import { useGameStore } from '@/stores/game-store';
import { formatCurrency } from '@/lib/format';
import { FLOW_COLORS, FLOW_LABELS } from '@/lib/colors';

export default function MoneyOriginTracker() {
  const snapshot = useGameStore(s => s.snapshot);

  if (!snapshot) return null;

  const player = snapshot.consumers[0];
  if (!player) return null;

  const employer = snapshot.businesses.find(b => b.id === player.employerId);
  const cb = snapshot.centralBank;
  const gov = snapshot.government;
  const bank = snapshot.commercialBanks[0];

  const chain = buildMoneyChain(player, employer, cb, gov, bank);

  const playerFlows = snapshot.moneyFlows.filter(
    f => f.to === player.id || f.from === player.id,
  );

  const incoming = playerFlows.filter(f => f.to === player.id);
  const outgoing = playerFlows.filter(f => f.from === player.id);
  const totalIn = incoming.reduce((s, f) => s + f.amount, 0);
  const totalOut = outgoing.reduce((s, f) => s + f.amount, 0);

  return (
    <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] overflow-hidden">
      <div className="px-4 py-3 border-b border-[var(--border)] bg-[var(--surface)]">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
          ¿De dónde viene tu dinero?
        </h3>
      </div>

      <div className="p-4">
        <div className="space-y-0">
          {chain.map((step, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ backgroundColor: step.color }}
                >
                  {step.icon}
                </div>
                {idx < chain.length - 1 && (
                  <div className="w-0.5 h-6 bg-[var(--border)]" />
                )}
              </div>
              <div className="pb-4">
                <p className="text-xs font-medium">{step.entity}</p>
                <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed">{step.explanation}</p>
                {step.amount > 0 && (
                  <span className="text-[10px] font-mono text-[var(--success)]">+{formatCurrency(step.amount)}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {(incoming.length > 0 || outgoing.length > 0) && (
        <div className="px-4 pb-4">
          <div className="border-t border-[var(--border)] pt-3">
            <h4 className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
              Flujos este mes
            </h4>

            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="px-2 py-1.5 rounded bg-[var(--success-muted)] border border-[var(--success-border)]">
                <p className="text-[10px] text-[var(--success)]">Entradas</p>
                <p className="text-xs font-mono font-semibold text-[var(--success)]">{formatCurrency(totalIn)}</p>
              </div>
              <div className="px-2 py-1.5 rounded bg-[var(--danger-muted)] border border-[var(--danger-border)]">
                <p className="text-[10px] text-[var(--danger)]">Salidas</p>
                <p className="text-xs font-mono font-semibold text-[var(--danger)]">{formatCurrency(totalOut)}</p>
              </div>
            </div>

            <div className="space-y-1">
              {incoming.map(flow => (
                <FlowRow key={flow.id} flow={flow} direction="in" snapshot={snapshot} />
              ))}
              {outgoing.map(flow => (
                <FlowRow key={flow.id} flow={flow} direction="out" snapshot={snapshot} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FlowRow({ flow, direction, snapshot }: {
  flow: { from: string; to: string; amount: number; type: string };
  direction: 'in' | 'out';
  snapshot: NonNullable<ReturnType<typeof useGameStore.getState>['snapshot']>;
}) {
  const otherId = direction === 'in' ? flow.from : flow.to;
  const otherEntity =
    snapshot.businesses.find(b => b.id === otherId) ??
    snapshot.commercialBanks.find(b => b.id === otherId) ??
    (otherId === 'government' ? snapshot.government : null) ??
    (otherId === 'central_bank' ? snapshot.centralBank : null);

  const color = FLOW_COLORS[flow.type as keyof typeof FLOW_COLORS] ?? '#64748b';
  const label = FLOW_LABELS[flow.type as keyof typeof FLOW_LABELS] ?? flow.type;

  return (
    <div className="flex items-center justify-between text-[10px]">
      <div className="flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
        <span className="text-[var(--text-secondary)]">
          {direction === 'in' ? '←' : '→'} {otherEntity?.name ?? otherId}
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-[var(--text-secondary)]">{label}</span>
        <span className={`font-mono ${direction === 'in' ? 'text-[var(--success)]' : 'text-[var(--danger)]'}`}>
          {direction === 'in' ? '+' : '-'}{formatCurrency(flow.amount)}
        </span>
      </div>
    </div>
  );
}

interface ChainStep {
  entity: string;
  explanation: string;
  icon: string;
  color: string;
  amount: number;
}

function buildMoneyChain(
  player: { income: number; employerId: string | null; employed: boolean },
  employer: { name: string; sector: string; revenue: number; price: number } | undefined,
  cb: { moneyPrinted: number; interestRate: number },
  gov: { incomeTaxRate: number; spending: number },
  bank: { name: string; deposits: number; loans: { remainingBalance: number }[] } | undefined,
): ChainStep[] {
  const chain: ChainStep[] = [];

  chain.push({
    entity: 'Banco Central',
    explanation: `Crea la base monetaria. Ha impreso ${formatCurrency(cb.moneyPrinted)} en total. Fija la tasa de interés al ${(cb.interestRate * 100).toFixed(1)}%.`,
    icon: '🏛️',
    color: '#6366f1',
    amount: 0,
  });

  if (bank) {
    const totalLoans = bank.loans.reduce((s, l) => s + l.remainingBalance, 0);
    chain.push({
      entity: bank.name,
      explanation: `Recibe depósitos (${formatCurrency(bank.deposits)}) y crea dinero nuevo al prestar (${formatCurrency(totalLoans)} en préstamos activos). Por cada $1 depositado, puede prestar hasta $${(1 / 0.1).toFixed(0)} — así se multiplica el dinero.`,
      icon: '🏦',
      color: '#2563eb',
      amount: 0,
    });
  }

  if (employer) {
    chain.push({
      entity: employer.name,
      explanation: `Tu empleador. Vende ${employer.sector} a ${formatCurrency(employer.price)}/unidad, genera ${formatCurrency(employer.revenue)}/mes de ingreso. De ahí sale tu salario.`,
      icon: '🏭',
      color: '#16a34a',
      amount: player.income,
    });
  }

  chain.push({
    entity: 'Tú',
    explanation: player.employed
      ? `Recibes ${formatCurrency(player.income)}/mes. El gobierno te cobra ${(gov.incomeTaxRate * 100).toFixed(0)}% de impuestos (${formatCurrency(player.income * gov.incomeTaxRate)}). Lo que queda lo divides entre consumir y ahorrar.`
      : 'No tienes empleo. Buscas trabajo o puedes emprender tu propio negocio.',
    icon: '👤',
    color: '#d97706',
    amount: 0,
  });

  chain.push({
    entity: 'Gobierno',
    explanation: `Recauda impuestos y los redistribuye en gasto público (${formatCurrency(gov.spending)}/mes). Parte de ese gasto vuelve a ti como servicios y transferencias.`,
    icon: '🏛️',
    color: '#dc2626',
    amount: 0,
  });

  return chain;
}
