'use client';

import { useGameStore } from '@/stores/game-store';
import { tickToDate } from '@/lib/format';

const IMPACT_STYLES = {
  positive: 'text-[var(--success)] bg-[var(--success-muted)] border-[var(--success-border)]',
  negative: 'text-[var(--danger)] bg-[var(--danger-muted)] border-[var(--danger-border)]',
  neutral: 'text-[var(--foreground)] bg-[var(--surface)] border-[var(--border)]',
};

export default function EventFeed() {
  const recentEvents = useGameStore(s => s.recentEvents);

  if (recentEvents.length === 0) {
    return (
      <div className="text-xs text-[var(--text-secondary)] text-center py-4">
        Sin eventos recientes
      </div>
    );
  }

  return (
    <div className="space-y-1.5 max-h-40 overflow-y-auto">
      {recentEvents.slice(0, 10).map(event => (
        <div
          key={event.id}
          className={`px-3 py-2 rounded-lg border text-xs ${IMPACT_STYLES[event.impact]}`}
        >
          <div className="flex justify-between items-start">
            <span className="font-medium">{event.title}</span>
            <span className="text-[10px] opacity-70 shrink-0 ml-2">
              {tickToDate(event.tick)}
            </span>
          </div>
          <p className="opacity-80 mt-0.5">{event.description}</p>
        </div>
      ))}
    </div>
  );
}
