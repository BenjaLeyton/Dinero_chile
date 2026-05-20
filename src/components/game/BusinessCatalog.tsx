'use client';

import { useState } from 'react';
import { useGameStore } from '@/stores/game-store';
import { formatCurrency } from '@/lib/format';
import { SECTOR_TYPES, INDUSTRIES, type IndustryDefinition } from '@/engine/config/industries';

const RISK_COLORS = {
  bajo: 'text-[var(--success)] bg-[var(--success-muted)]',
  medio: 'text-[var(--warning)] bg-[var(--warning-muted)]',
  alto: 'text-[var(--danger)] bg-[var(--danger-muted)]',
};

const DEMAND_BARS: Record<string, number> = {
  baja: 1,
  media: 2,
  alta: 3,
  'muy alta': 4,
};

export default function BusinessCatalog({ onClose }: { onClose: () => void }) {
  const snapshot = useGameStore(s => s.snapshot);
  const executeAction = useGameStore(s => s.executeAction);
  const [selectedSector, setSelectedSector] = useState<'primary' | 'secondary' | 'tertiary'>('primary');
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryDefinition | null>(null);

  if (!snapshot) return null;
  const player = snapshot.consumers[0];
  if (!player) return null;

  const industries = INDUSTRIES.filter(i => i.sectorType === selectedSector);

  const handleStart = (industry: IndustryDefinition) => {
    executeAction({ type: 'citizen_start_business', sector: industry.sector, industryId: industry.id });
    onClose();
  };

  if (selectedIndustry) {
    const ind = selectedIndustry;
    const canAfford = player.cash >= ind.startupCost;

    return (
      <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
        <div className="bg-[var(--card)] rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
          <div className="p-5 border-b border-[var(--border)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{ind.icon}</span>
                <div>
                  <h2 className="text-base font-bold">{ind.name}</h2>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${RISK_COLORS[ind.riskLevel]}`}>
                    Riesgo {ind.riskLevel}
                  </span>
                </div>
              </div>
              <button onClick={() => setSelectedIndustry(null)} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-lg">
                ✕
              </button>
            </div>
          </div>

          <div className="p-5 space-y-4">
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{ind.description}</p>

            <div className="grid grid-cols-2 gap-2">
              <InfoBox label="Inversión inicial" value={formatCurrency(ind.startupCost)} />
              <InfoBox label="Costos fijos/mes" value={formatCurrency(ind.monthlyFixedCosts)} />
              <InfoBox label="Precio por unidad" value={formatCurrency(ind.pricePerUnit)} />
              <InfoBox label="Empleados necesarios" value={`${ind.employeesNeeded}`} />
              <InfoBox label="Producción/empleado" value={`${ind.productionPerEmployee} uds/mes`} />
              <InfoBox label="Margen de ganancia" value={`${(ind.profitMarginRange[0] * 100).toFixed(0)}–${(ind.profitMarginRange[1] * 100).toFixed(0)}%`} />
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider">Demanda</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className={`w-5 h-2 rounded-full ${i <= DEMAND_BARS[ind.demandLevel] ? 'bg-[var(--info)]' : 'bg-[var(--border)]'}`} />
                ))}
              </div>
              <span className="text-[10px] text-[var(--text-secondary)] capitalize">{ind.demandLevel}</span>
            </div>

            <div className="bg-[var(--surface)] rounded-lg p-3 space-y-2">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">¿Qué vendes?</p>
                <p className="text-xs">{ind.whatYouSell}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">¿Cómo ganas?</p>
                <p className="text-xs">{ind.howYouEarn}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Consejo</p>
                <p className="text-xs italic">{ind.tips}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-[var(--border)]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-[var(--text-secondary)]">Tu efectivo:</span>
                <span className="text-sm font-mono font-semibold">{formatCurrency(player.cash)}</span>
              </div>
              <button
                onClick={() => handleStart(ind)}
                disabled={!canAfford}
                className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  canAfford
                    ? 'bg-[var(--success)] text-white hover:opacity-90'
                    : 'bg-[var(--surface)] text-[var(--text-secondary)] cursor-not-allowed'
                }`}
              >
                {canAfford
                  ? `Invertir ${formatCurrency(ind.startupCost)} y abrir negocio`
                  : `Necesitas ${formatCurrency(ind.startupCost - player.cash)} más`}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-[var(--card)] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-xl flex flex-col">
        <div className="p-5 border-b border-[var(--border)] flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold">Catálogo de Negocios</h2>
            <p className="text-[10px] text-[var(--text-secondary)]">
              Elige un rubro y comienza tu empresa — Tu capital: {formatCurrency(player.cash)}
            </p>
          </div>
          <button onClick={onClose} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-lg">
            ✕
          </button>
        </div>

        <div className="flex gap-1 px-5 pt-3">
          {SECTOR_TYPES.map(st => (
            <button
              key={st.id}
              onClick={() => setSelectedSector(st.id)}
              className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                selectedSector === st.id
                  ? 'bg-[var(--info-muted)] text-[var(--info)] border border-[var(--info-border)]'
                  : 'bg-[var(--surface)] text-[var(--text-secondary)] border border-transparent hover:border-[var(--border)]'
              }`}
            >
              <span className="block text-sm mb-0.5">{st.icon}</span>
              {st.name}
            </button>
          ))}
        </div>

        <div className="px-5 py-2">
          <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed">
            {SECTOR_TYPES.find(s => s.id === selectedSector)?.description}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-5">
          <div className="space-y-2">
            {industries.map(ind => {
              const canAfford = player.cash >= ind.startupCost;
              return (
                <button
                  key={ind.id}
                  onClick={() => setSelectedIndustry(ind)}
                  className="w-full text-left px-4 py-3 rounded-xl border border-[var(--border)] hover:border-[var(--info-border)] hover:bg-[var(--info-muted)] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{ind.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">{ind.name}</span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${RISK_COLORS[ind.riskLevel]}`}>
                          {ind.riskLevel}
                        </span>
                      </div>
                      <p className="text-[10px] text-[var(--text-secondary)] mt-0.5 truncate">{ind.description}</p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-[10px] text-[var(--text-secondary)]">
                          Inversión: <span className={`font-mono font-semibold ${canAfford ? 'text-[var(--success)]' : 'text-[var(--danger)]'}`}>
                            {formatCurrency(ind.startupCost)}
                          </span>
                        </span>
                        <span className="text-[10px] text-[var(--text-secondary)]">
                          Margen: {(ind.profitMarginRange[0] * 100).toFixed(0)}–{(ind.profitMarginRange[1] * 100).toFixed(0)}%
                        </span>
                        <div className="flex gap-0.5 items-center">
                          {[1, 2, 3, 4].map(i => (
                            <div key={i} className={`w-3 h-1.5 rounded-full ${i <= DEMAND_BARS[ind.demandLevel] ? 'bg-[var(--info)]' : 'bg-[var(--border)]'}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-[var(--text-secondary)] text-xs">→</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-3 py-2 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
      <p className="text-[9px] text-[var(--text-secondary)] uppercase tracking-wider">{label}</p>
      <p className="text-xs font-mono font-semibold mt-0.5">{value}</p>
    </div>
  );
}
