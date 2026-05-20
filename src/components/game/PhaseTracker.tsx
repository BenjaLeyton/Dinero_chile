'use client';

import { useState } from 'react';
import { useGameStore } from '@/stores/game-store';
import { PHASE_DEFINITIONS } from '@/types/game';
import type { EconomyPhase } from '@/types/game';

const PHASE_ORDER: EconomyPhase[] = [
  'barter', 'commodity_money', 'coinage', 'banking', 'central_banking', 'fiat', 'modern',
];

const PHASE_ICONS: Record<EconomyPhase, string> = {
  barter: '🤝',
  commodity_money: '🧂',
  coinage: '🪙',
  banking: '🏦',
  central_banking: '🏛️',
  fiat: '💵',
  modern: '🌐',
};

export default function PhaseTracker() {
  const snapshot = useGameStore(s => s.snapshot);
  const executeAction = useGameStore(s => s.executeAction);
  const [showNarrative, setShowNarrative] = useState(false);

  if (!snapshot) return null;

  const currentPhase = snapshot.phase;
  const currentDef = PHASE_DEFINITIONS[currentPhase];
  const currentIdx = PHASE_ORDER.indexOf(currentPhase);
  const isLastPhase = currentIdx >= PHASE_ORDER.length - 1;
  const nextPhase = !isLastPhase ? PHASE_ORDER[currentIdx + 1] : null;
  const nextDef = nextPhase ? PHASE_DEFINITIONS[nextPhase] : null;

  return (
    <div className="border border-[var(--border)] rounded-xl bg-[var(--card)] overflow-hidden">
      <div className="px-4 py-3 border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">{PHASE_ICONS[currentPhase]}</span>
            <div>
              <p className="text-sm font-semibold">{currentDef.name}</p>
              <p className="text-[10px] text-[var(--text-secondary)]">{currentDef.era}</p>
            </div>
          </div>
          <button
            onClick={() => setShowNarrative(!showNarrative)}
            className="text-xs text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors"
          >
            {showNarrative ? 'Ocultar' : 'Historia'}
          </button>
        </div>
      </div>

      {showNarrative && (
        <div className="px-4 py-3 border-b border-[var(--border)] bg-[var(--warning-muted)]">
          <p className="text-xs leading-relaxed text-[var(--keypoint-text)]">
            {currentDef.narrative}
          </p>
        </div>
      )}

      <div className="px-4 py-2">
        <div className="flex gap-1 mb-2">
          {PHASE_ORDER.map((phase, idx) => (
            <div
              key={phase}
              className={`flex-1 h-1.5 rounded-full transition-colors ${
                idx <= currentIdx ? 'bg-[var(--foreground)]' : 'bg-[var(--border)]'
              }`}
              title={PHASE_DEFINITIONS[phase].name}
            />
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {currentDef.unlocks.map(unlock => (
            <span
              key={unlock}
              className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--success-muted)] text-[var(--success)] border border-[var(--success-border)]"
            >
              {unlock}
            </span>
          ))}
        </div>

        {nextDef && (
          <button
            onClick={() => executeAction({ type: 'advance_phase' })}
            className="w-full py-2.5 rounded-lg border-2 border-dashed border-[var(--border)] hover:border-[var(--foreground)] hover:bg-[var(--surface)] transition-all text-sm group"
          >
            <span className="text-lg mr-2">{nextPhase ? PHASE_ICONS[nextPhase] : ''}</span>
            <span className="font-medium group-hover:text-[var(--foreground)] text-[var(--text-secondary)]">
              Avanzar a: {nextDef.name}
            </span>
            <span className="block text-[10px] text-[var(--text-secondary)] mt-0.5">
              {nextDef.description}
            </span>
          </button>
        )}

        {isLastPhase && (
          <p className="text-center text-xs text-[var(--text-secondary)] py-2">
            Has alcanzado la economía moderna completa.
          </p>
        )}
      </div>
    </div>
  );
}
