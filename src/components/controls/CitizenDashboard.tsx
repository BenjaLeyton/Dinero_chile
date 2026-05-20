'use client';

import { useState } from 'react';
import { useGameStore } from '@/stores/game-store';
import { formatCurrency, formatPercent } from '@/lib/format';
import BusinessCatalog from '@/components/game/BusinessCatalog';
import MyBusiness from '@/components/game/MyBusiness';

export default function CitizenDashboard() {
  const snapshot = useGameStore(s => s.snapshot);
  const executeAction = useGameStore(s => s.executeAction);
  const [saveAmount, setSaveAmount] = useState(500);
  const [loanAmount, setLoanAmount] = useState(5000);
  const [showCatalog, setShowCatalog] = useState(false);

  if (!snapshot) return null;

  const player = snapshot.consumers[0];
  if (!player) return null;

  const employer = snapshot.businesses.find(b => b.id === player.employerId);
  const totalWealth = player.cash + player.savings - player.debt;
  const netMonthly = player.income - (player.income * snapshot.government.incomeTaxRate) - (player.cash * player.consumptionRate * 0.3);

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">👤</span>
          <div>
            <h3 className="text-sm font-semibold">{player.name}</h3>
            <span className="text-[10px] text-[var(--text-secondary)]">Tu personaje</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <StatBox label="Efectivo" value={formatCurrency(player.cash)} color="#16a34a" />
          <StatBox label="Ahorros" value={formatCurrency(player.savings)} color="#2563eb" />
          <StatBox label="Deuda" value={formatCurrency(player.debt)} color="#dc2626" />
          <StatBox label="Patrimonio" value={formatCurrency(totalWealth)} color={totalWealth >= 0 ? '#16a34a' : '#dc2626'} />
        </div>

        <div className="space-y-1 text-xs">
          <Row label="Ingreso mensual" value={formatCurrency(player.income)} />
          <Row label="Impuestos (-)" value={formatCurrency(player.income * snapshot.government.incomeTaxRate)} negative />
          <Row label="Neto estimado" value={formatCurrency(netMonthly)} />
          <Row label="Satisfacción" value={`${player.satisfaction.toFixed(0)}/100`} />
        </div>
      </div>

      <Section title="Empleo">
        <div className="text-xs space-y-1 mb-2">
          <Row label="Estado" value={player.employed ? 'Empleado' : 'Desempleado'} />
          {employer && <Row label="Empresa" value={employer.name} />}
          {employer && <Row label="Sector" value={employer.sector} />}
          <Row label="Salario" value={formatCurrency(player.income)} />
        </div>

        <p className="text-[10px] text-[var(--text-secondary)] mb-2">Cambiar de trabajo:</p>
        <div className="space-y-1">
          {snapshot.businesses
            .filter(b => b.id !== player.employerId)
            .slice(0, 5)
            .map(biz => (
              <button
                key={biz.id}
                onClick={() => executeAction({ type: 'citizen_change_job', businessId: biz.id })}
                className="w-full text-left px-2.5 py-2 rounded-lg border border-[var(--border)] hover:border-[var(--text-secondary)] transition-colors text-xs"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{biz.name}</span>
                  <span className="font-mono text-[var(--success)]">{formatCurrency(biz.wage)}/mes</span>
                </div>
                <div className="flex justify-between text-[10px] text-[var(--text-secondary)] mt-0.5">
                  <span>{biz.sector}</span>
                  <span>{biz.employees} empleados</span>
                </div>
              </button>
            ))}
        </div>
      </Section>

      <Section title="Consumo y Ahorro">
        <div className="mb-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-[var(--text-secondary)]">Tasa de consumo</span>
            <span className="font-mono">{formatPercent(player.consumptionRate)}</span>
          </div>
          <input
            type="range"
            min={0.1}
            max={0.95}
            step={0.05}
            value={player.consumptionRate}
            onChange={e => executeAction({ type: 'citizen_set_consumption', rate: parseFloat(e.target.value) })}
            className="w-full h-1.5 rounded-full appearance-none bg-[var(--border)] accent-amber-500"
          />
          <div className="flex justify-between text-[10px] text-[var(--text-secondary)] mt-1">
            <span>Ahorrar más</span>
            <span>Gastar más</span>
          </div>
        </div>

        <div className="flex gap-2 mb-2">
          <input
            type="number"
            value={saveAmount}
            onChange={e => setSaveAmount(parseInt(e.target.value) || 0)}
            className="flex-1 px-2 py-1.5 border border-[var(--border)] rounded-md text-xs font-mono bg-[var(--card)]"
          />
          <button
            onClick={() => executeAction({ type: 'citizen_save', amount: saveAmount })}
            className="px-3 py-1.5 bg-[var(--info)] text-white rounded-md text-xs font-medium hover:opacity-90 transition-colors"
          >
            Ahorrar
          </button>
          <button
            onClick={() => executeAction({ type: 'citizen_withdraw', amount: saveAmount })}
            className="px-3 py-1.5 border border-[var(--border)] rounded-md text-xs font-medium hover:bg-[var(--surface)] transition-colors"
          >
            Retirar
          </button>
        </div>
      </Section>

      {snapshot.commercialBanks.length > 0 && (
        <Section title="Crédito">
          <div className="text-xs space-y-1 mb-2">
            <Row label="Deuda actual" value={formatCurrency(player.debt)} />
            <Row label="Tasa de interés" value={formatPercent(snapshot.centralBank.interestRate + (snapshot.commercialBanks[0]?.interestRateSpread ?? 0))} />
          </div>

          <div className="flex gap-2 mb-2">
            <input
              type="number"
              value={loanAmount}
              onChange={e => setLoanAmount(parseInt(e.target.value) || 0)}
              className="flex-1 px-2 py-1.5 border border-[var(--border)] rounded-md text-xs font-mono bg-[var(--card)]"
            />
            <button
              onClick={() => executeAction({ type: 'citizen_take_loan', amount: loanAmount })}
              className="px-3 py-1.5 bg-[var(--warning)] text-white rounded-md text-xs font-medium hover:opacity-90 transition-colors"
            >
              Pedir
            </button>
            <button
              onClick={() => executeAction({ type: 'citizen_pay_loan', amount: loanAmount })}
              disabled={player.debt <= 0}
              className="px-3 py-1.5 border border-[var(--border)] rounded-md text-xs font-medium hover:bg-[var(--surface)] transition-colors disabled:opacity-40"
            >
              Pagar
            </button>
          </div>
        </Section>
      )}

      <Section title="Mi Negocio">
        <MyBusiness />
        <button
          onClick={() => setShowCatalog(true)}
          className="w-full mt-2 px-3 py-2.5 rounded-lg border-2 border-dashed border-[var(--border)] hover:border-[var(--info-border)] hover:bg-[var(--info-muted)] transition-colors text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--info)]"
        >
          {snapshot.businesses.some(b => b.ownerId === player.id)
            ? '📋 Explorar más negocios'
            : '📋 Explorar negocios para emprender'}
        </button>
      </Section>

      {showCatalog && <BusinessCatalog onClose={() => setShowCatalog(false)} />}
    </div>
  );
}

function StatBox({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)]">
      <p className="text-[10px] text-[var(--text-secondary)]">{label}</p>
      <p className="text-sm font-mono font-semibold" style={{ color }}>{value}</p>
    </div>
  );
}

function Row({ label, value, negative }: { label: string; value: string; negative?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-[var(--text-secondary)]">{label}</span>
      <span className={`font-mono ${negative ? 'text-[var(--danger)]' : ''}`}>{value}</span>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="pt-3 border-t border-[var(--border)]">
      <h4 className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">{title}</h4>
      {children}
    </div>
  );
}
