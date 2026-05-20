'use client';

import { useState } from 'react';
import { useGameStore } from '@/stores/game-store';
import { formatPercent, formatCurrency } from '@/lib/format';

export default function CentralBankPanel() {
  const snapshot = useGameStore(s => s.snapshot);
  const executeAction = useGameStore(s => s.executeAction);
  const [printAmount, setPrintAmount] = useState(10000);

  if (!snapshot) return null;
  const cb = snapshot.centralBank;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold">Banco Central</h3>

      <div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-[var(--text-secondary)]">Tasa de Interés</span>
          <span className="font-mono">{formatPercent(cb.interestRate)}</span>
        </div>
        <input
          type="range"
          min={0}
          max={0.5}
          step={0.005}
          value={cb.interestRate}
          onChange={e => executeAction({ type: 'set_interest_rate', value: parseFloat(e.target.value) })}
          className="w-full h-1.5 rounded-full appearance-none bg-[var(--border)] accent-[var(--central-bank)]"
        />
        <div className="flex justify-between text-[10px] text-[var(--text-secondary)]">
          <span>0%</span>
          <span>50%</span>
        </div>
      </div>

      <div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-[var(--text-secondary)]">Requisito de Reserva</span>
          <span className="font-mono">{formatPercent(cb.reserveRequirement)}</span>
        </div>
        <input
          type="range"
          min={0.01}
          max={1}
          step={0.01}
          value={cb.reserveRequirement}
          onChange={e => executeAction({ type: 'set_reserve_requirement', value: parseFloat(e.target.value) })}
          className="w-full h-1.5 rounded-full appearance-none bg-[var(--border)] accent-[var(--central-bank)]"
        />
        <div className="flex justify-between text-[10px] text-[var(--text-secondary)]">
          <span>1%</span>
          <span>100%</span>
        </div>
      </div>

      <div>
        <label className="text-xs text-[var(--text-secondary)] block mb-1">Imprimir Dinero</label>
        <div className="flex gap-2">
          <input
            type="number"
            value={printAmount}
            onChange={e => setPrintAmount(parseInt(e.target.value) || 0)}
            className="flex-1 px-2 py-1.5 border border-[var(--border)] rounded-md text-xs font-mono bg-[var(--card)]"
          />
          <button
            onClick={() => executeAction({ type: 'print_money', amount: printAmount })}
            className="px-3 py-1.5 bg-[var(--warning)] text-white rounded-md text-xs font-medium hover:opacity-90 transition-colors"
          >
            Imprimir
          </button>
        </div>
      </div>

      <div className="pt-2 border-t border-[var(--border)] space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-[var(--text-secondary)]">Dinero impreso total</span>
          <span className="font-mono">{formatCurrency(cb.moneyPrinted)}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-[var(--text-secondary)]">Efectivo en caja</span>
          <span className="font-mono">{formatCurrency(cb.cash)}</span>
        </div>
      </div>
    </div>
  );
}
