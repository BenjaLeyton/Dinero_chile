'use client';

import { useGameStore } from '@/stores/game-store';
import { formatPercent, formatCurrency } from '@/lib/format';

export default function GovernmentPanel() {
  const snapshot = useGameStore(s => s.snapshot);
  const executeAction = useGameStore(s => s.executeAction);

  if (!snapshot) return null;
  const gov = snapshot.government;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold">Gobierno</h3>

      <div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-[var(--text-secondary)]">Impuesto a la Renta</span>
          <span className="font-mono">{formatPercent(gov.incomeTaxRate)}</span>
        </div>
        <input
          type="range"
          min={0}
          max={0.6}
          step={0.01}
          value={gov.incomeTaxRate}
          onChange={e => executeAction({ type: 'set_tax_rate', taxType: 'income', value: parseFloat(e.target.value) })}
          className="w-full h-1.5 rounded-full appearance-none bg-[var(--border)] accent-[var(--government)]"
        />
      </div>

      <div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-[var(--text-secondary)]">Impuesto Corporativo</span>
          <span className="font-mono">{formatPercent(gov.corporateTaxRate)}</span>
        </div>
        <input
          type="range"
          min={0}
          max={0.6}
          step={0.01}
          value={gov.corporateTaxRate}
          onChange={e => executeAction({ type: 'set_tax_rate', taxType: 'corporate', value: parseFloat(e.target.value) })}
          className="w-full h-1.5 rounded-full appearance-none bg-[var(--border)] accent-[var(--government)]"
        />
      </div>

      <div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-[var(--text-secondary)]">Tasa de Gasto</span>
          <span className="font-mono">{formatPercent(gov.spendingRate)}</span>
        </div>
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={gov.spendingRate}
          onChange={e => executeAction({ type: 'set_government_spending', value: parseFloat(e.target.value) })}
          className="w-full h-1.5 rounded-full appearance-none bg-[var(--border)] accent-[var(--government)]"
        />
      </div>

      <div className="pt-2 border-t border-[var(--border)] space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-[var(--text-secondary)]">Recaudación</span>
          <span className="font-mono">{formatCurrency(gov.revenue)}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-[var(--text-secondary)]">Gasto</span>
          <span className="font-mono">{formatCurrency(gov.spending)}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-[var(--text-secondary)]">Déficit</span>
          <span className={`font-mono ${gov.deficit > 0 ? 'text-[var(--danger)]' : 'text-[var(--success)]'}`}>
            {formatCurrency(gov.deficit)}
          </span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-[var(--text-secondary)]">Deuda total</span>
          <span className="font-mono">{formatCurrency(gov.debt)}</span>
        </div>
      </div>
    </div>
  );
}
