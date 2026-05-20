'use client';

import { useGameStore } from '@/stores/game-store';
import { formatCurrency, formatPercent, tickToDate } from '@/lib/format';
import type { GameSpeed } from '@/types/game';
import { PHASE_DEFINITIONS } from '@/types/game';
import ThemeToggle from '@/components/ui/ThemeToggle';

const SPEEDS: GameSpeed[] = [1, 2, 5, 10];

const ROLE_NAMES: Record<string, string> = {
  central_banker: 'Banquero Central',
  business_owner: 'Empresario',
  government: 'Gobierno',
  investor: 'Inversor',
  citizen: 'Ciudadano',
};

export default function TopBar() {
  const snapshot = useGameStore(s => s.snapshot);
  const status = useGameStore(s => s.status);
  const speed = useGameStore(s => s.speed);
  const pause = useGameStore(s => s.pause);
  const resume = useGameStore(s => s.resume);
  const setSpeed = useGameStore(s => s.setSpeed);
  const engine = useGameStore(s => s.engine);

  if (!snapshot) return null;

  const config = engine?.getState().config;
  const ind = snapshot.indicators;

  return (
    <div className="h-14 border-b border-[var(--border)] bg-[var(--card)] px-4 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-4">
        <button
          onClick={() => status === 'playing' ? pause() : resume()}
          className="w-8 h-8 rounded-lg border border-[var(--border)] flex items-center justify-center hover:bg-[var(--surface)] transition-colors text-sm"
        >
          {status === 'playing' ? '⏸' : '▶'}
        </button>

        <div className="flex gap-1">
          {SPEEDS.map(s => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`px-2 py-1 rounded text-xs font-mono transition-colors ${
                speed === s
                  ? 'bg-[var(--foreground)] text-[var(--background)]'
                  : 'hover:bg-[var(--surface)]'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>

        <div className="h-6 w-px bg-[var(--border)]" />

        <span className="text-sm font-mono text-[var(--text-secondary)]">
          {tickToDate(snapshot.tick)}
        </span>

        {config && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--surface)] text-[var(--text-secondary)]">
            {ROLE_NAMES[config.playerRole]}
          </span>
        )}

        {snapshot && snapshot.phase !== 'modern' && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--warning-muted)] text-[var(--warning)] border border-[var(--warning-border)]">
            {PHASE_DEFINITIONS[snapshot.phase].name}
          </span>
        )}
      </div>

      <div className="flex items-center gap-6 text-sm">
        <div>
          <span className="text-[var(--text-secondary)] text-xs">PIB</span>
          <span className="ml-1 font-mono font-medium">{formatCurrency(ind.gdp)}</span>
        </div>
        <div>
          <span className="text-[var(--text-secondary)] text-xs">Inflación</span>
          <span className={`ml-1 font-mono font-medium ${ind.inflationRate > 0.1 ? 'text-[var(--danger)]' : ''}`}>
            {formatPercent(ind.inflationRate)}
          </span>
        </div>
        <div>
          <span className="text-[var(--text-secondary)] text-xs">Desempleo</span>
          <span className={`ml-1 font-mono font-medium ${ind.unemploymentRate > 0.15 ? 'text-[var(--danger)]' : ''}`}>
            {formatPercent(ind.unemploymentRate)}
          </span>
        </div>
        <div>
          <span className="text-[var(--text-secondary)] text-xs">Tasa</span>
          <span className="ml-1 font-mono font-medium">{formatPercent(ind.interestRate)}</span>
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
}
