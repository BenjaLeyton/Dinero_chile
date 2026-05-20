'use client';

import { useGameStore } from '@/stores/game-store';
import { useUIStore } from '@/stores/ui-store';
import { formatCurrency } from '@/lib/format';
import { ENTITY_COLORS } from '@/lib/colors';
import type { AnyEntity } from '@/engine/entities/types';

const CATEGORY_ORDER = [
  { type: 'central_bank' as const, label: 'Banco Central', icon: '🏛️' },
  { type: 'commercial_bank' as const, label: 'Bancos', icon: '🏦' },
  { type: 'business' as const, label: 'Empresas', icon: '🏭' },
  { type: 'government' as const, label: 'Gobierno', icon: '🏛️' },
  { type: 'consumer' as const, label: 'Consumidores', icon: '👥' },
  { type: 'resource' as const, label: 'Recursos', icon: '⛏️' },
];

export default function Sidebar() {
  const snapshot = useGameStore(s => s.snapshot);
  const selectedEntityId = useUIStore(s => s.selectedEntityId);
  const selectEntity = useUIStore(s => s.selectEntity);

  if (!snapshot) return null;

  const allEntities: AnyEntity[] = [
    snapshot.centralBank,
    ...snapshot.commercialBanks,
    ...snapshot.businesses,
    snapshot.government,
    ...snapshot.consumers,
    ...snapshot.resources,
  ];

  const grouped = new Map<string, AnyEntity[]>();
  for (const e of allEntities) {
    const list = grouped.get(e.type) ?? [];
    list.push(e);
    grouped.set(e.type, list);
  }

  return (
    <aside className="w-56 border-r border-[var(--border)] bg-[var(--card)] overflow-y-auto shrink-0">
      <div className="p-3">
        <h2 className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-3">
          Entidades
        </h2>

        {CATEGORY_ORDER.map(cat => {
          const entities = grouped.get(cat.type);
          if (!entities || entities.length === 0) return null;

          const showIndividual = entities.length <= 10;

          return (
            <div key={cat.type} className="mb-4">
              <p className="text-xs font-medium text-[var(--text-secondary)] mb-1 flex items-center gap-1">
                <span>{cat.icon}</span>
                {cat.label}
                <span className="ml-auto text-[10px]">{entities.length}</span>
              </p>

              {showIndividual ? (
                <div className="space-y-0.5">
                  {entities.map(e => (
                    <button
                      key={e.id}
                      onClick={() => selectEntity(selectedEntityId === e.id ? null : e.id)}
                      className={`w-full text-left px-2 py-1.5 rounded-md text-xs flex items-center justify-between transition-colors ${
                        selectedEntityId === e.id
                          ? 'bg-[var(--surface)]'
                          : 'hover:bg-[var(--surface)]/50'
                      }`}
                    >
                      <span className="truncate">{e.name}</span>
                      <span className="font-mono text-[10px] text-[var(--text-secondary)] shrink-0 ml-2">
                        {formatCurrency(e.cash)}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="px-2 py-1.5 text-xs text-[var(--text-secondary)]">
                  <span className="font-mono">
                    Total: {formatCurrency(entities.reduce((s, e) => s + e.cash, 0))}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
