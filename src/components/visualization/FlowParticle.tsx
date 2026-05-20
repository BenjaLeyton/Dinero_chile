'use client';

import { motion } from 'framer-motion';
import type { MoneyFlow } from '@/types/economy';
import type { AnyEntity } from '@/engine/entities/types';
import { FLOW_COLORS } from '@/lib/colors';

interface Props {
  flow: MoneyFlow;
  entities: Map<string, AnyEntity>;
  containerWidth: number;
  containerHeight: number;
}

export default function FlowParticle({ flow, entities, containerWidth, containerHeight }: Props) {
  const fromEntity = entities.get(flow.from);
  const toEntity = entities.get(flow.to);
  if (!fromEntity || !toEntity) return null;
  if (flow.from === flow.to) return null;

  const x1 = fromEntity.position.x * containerWidth;
  const y1 = fromEntity.position.y * containerHeight;
  const x2 = toEntity.position.x * containerWidth;
  const y2 = toEntity.position.y * containerHeight;

  const color = FLOW_COLORS[flow.type] ?? '#64748b';
  const size = Math.max(4, Math.min(12, Math.log10(flow.amount + 1) * 2));

  return (
    <motion.circle
      cx={x1}
      cy={y1}
      r={size / 2}
      fill={color}
      opacity={0.8}
      animate={{
        cx: [x1, x2],
        cy: [y1, y2],
        opacity: [0.8, 0],
      }}
      transition={{
        duration: 1.5,
        ease: 'easeInOut',
      }}
    />
  );
}
