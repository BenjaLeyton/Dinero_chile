'use client';

import { motion } from 'framer-motion';
import type { AnyEntity } from '@/engine/entities/types';
import { ENTITY_COLORS, ENTITY_LABELS } from '@/lib/colors';
import { formatCurrency } from '@/lib/format';
import { useUIStore } from '@/stores/ui-store';

interface Props {
  entity: AnyEntity;
  containerWidth: number;
  containerHeight: number;
}

const ENTITY_ICONS: Record<string, string> = {
  central_bank: '🏛️',
  commercial_bank: '🏦',
  business: '🏭',
  consumer: '👤',
  government: '🏛️',
  resource: '⛏️',
};

export default function EntityNode({ entity, containerWidth, containerHeight }: Props) {
  const selectedId = useUIStore(s => s.selectedEntityId);
  const selectEntity = useUIStore(s => s.selectEntity);
  const isSelected = selectedId === entity.id;
  const color = ENTITY_COLORS[entity.type];

  const x = entity.position.x * containerWidth;
  const y = entity.position.y * containerHeight;

  return (
    <motion.div
      layout
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="absolute cursor-pointer"
      style={{
        left: x - 32,
        top: y - 32,
      }}
      onClick={() => selectEntity(isSelected ? null : entity.id)}
    >
      <div
        className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center border-2 transition-shadow ${
          isSelected ? 'shadow-lg ring-2 ring-offset-2' : 'shadow-sm hover:shadow-md'
        }`}
        style={{
          borderColor: color,
          backgroundColor: `${color}10`,
          '--tw-ring-color': color,
        } as React.CSSProperties}
      >
        <span className="text-lg">{ENTITY_ICONS[entity.type]}</span>
        <span className="text-[8px] font-medium truncate max-w-[56px]" style={{ color }}>
          {entity.name}
        </span>
      </div>
      <div className="text-center mt-1">
        <span className="text-[10px] font-mono text-[var(--text-secondary)]">
          {formatCurrency(entity.cash)}
        </span>
      </div>
    </motion.div>
  );
}
