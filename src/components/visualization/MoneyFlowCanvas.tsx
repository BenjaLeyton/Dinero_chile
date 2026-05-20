'use client';

import { useRef, useState, useEffect } from 'react';
import type { SimulationSnapshot } from '@/types/game';
import type { AnyEntity } from '@/engine/entities/types';
import EntityNode from './EntityNode';
import FlowParticle from './FlowParticle';
import ConnectionLine from './ConnectionLine';
import { FLOW_COLORS, FLOW_LABELS } from '@/lib/colors';
import type { FlowType } from '@/types/economy';

interface Props {
  snapshot: SimulationSnapshot;
}

export default function MoneyFlowCanvas({ snapshot }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(entries => {
      const entry = entries[0];
      if (entry) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const allEntities: AnyEntity[] = [
    snapshot.centralBank,
    ...snapshot.commercialBanks,
    ...snapshot.businesses,
    ...snapshot.consumers,
    snapshot.government,
    ...snapshot.resources,
  ];

  const entityMap = new Map<string, AnyEntity>();
  for (const e of allEntities) {
    entityMap.set(e.id, e);
  }

  const connectionMap = new Map<string, { from: AnyEntity; to: AnyEntity; type: FlowType; count: number }>();
  for (const flow of snapshot.moneyFlows) {
    const key = `${flow.from}-${flow.to}-${flow.type}`;
    const existing = connectionMap.get(key);
    if (existing) {
      existing.count++;
    } else {
      const from = entityMap.get(flow.from);
      const to = entityMap.get(flow.to);
      if (from && to && from.id !== to.id) {
        connectionMap.set(key, { from, to, type: flow.type, count: 1 });
      }
    }
  }

  const visibleParticles = snapshot.moneyFlows.slice(0, 100);

  const visibleEntities = allEntities.filter(e => e.type !== 'consumer' || allEntities.length <= 30);
  const consumerGroup = allEntities.length > 30 ? snapshot.consumers : [];

  const activeFlowTypes = new Set(snapshot.moneyFlows.map(f => f.type));

  return (
    <div ref={containerRef} className="relative w-full h-full bg-[var(--card)] rounded-xl border border-[var(--border)] overflow-hidden">
      <svg
        className="absolute inset-0 pointer-events-none"
        width={dimensions.width}
        height={dimensions.height}
      >
        {Array.from(connectionMap.values()).map((conn, i) => (
          <ConnectionLine
            key={i}
            from={conn.from}
            to={conn.to}
            flowType={conn.type}
            intensity={conn.count}
            containerWidth={dimensions.width}
            containerHeight={dimensions.height}
          />
        ))}

        {visibleParticles.map(flow => (
          <FlowParticle
            key={flow.id}
            flow={flow}
            entities={entityMap}
            containerWidth={dimensions.width}
            containerHeight={dimensions.height}
          />
        ))}
      </svg>

      {visibleEntities.map(entity => (
        <EntityNode
          key={entity.id}
          entity={entity}
          containerWidth={dimensions.width}
          containerHeight={dimensions.height}
        />
      ))}

      {consumerGroup.length > 0 && (
        <div
          className="absolute bottom-4 left-4 px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--card)]/90"
        >
          <span className="text-xs text-[var(--text-secondary)]">
            👥 {consumerGroup.length} consumidores
          </span>
        </div>
      )}

      <div className="absolute bottom-4 right-4 flex flex-wrap gap-2 max-w-[200px]">
        {Array.from(activeFlowTypes).map(type => (
          <div key={type} className="flex items-center gap-1">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: FLOW_COLORS[type] }}
            />
            <span className="text-[10px] text-[var(--text-secondary)]">
              {FLOW_LABELS[type]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
