'use client';

import type { AnyEntity } from '@/engine/entities/types';
import type { FlowType } from '@/types/economy';
import { FLOW_COLORS } from '@/lib/colors';

interface Props {
  from: AnyEntity;
  to: AnyEntity;
  flowType: FlowType;
  intensity: number;
  containerWidth: number;
  containerHeight: number;
}

export default function ConnectionLine({ from, to, flowType, intensity, containerWidth, containerHeight }: Props) {
  if (from.id === to.id) return null;

  const x1 = from.position.x * containerWidth;
  const y1 = from.position.y * containerHeight;
  const x2 = to.position.x * containerWidth;
  const y2 = to.position.y * containerHeight;

  const color = FLOW_COLORS[flowType] ?? '#64748b';
  const width = Math.max(0.5, Math.min(3, intensity));

  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={color}
      strokeWidth={width}
      strokeOpacity={0.2}
      strokeDasharray="4 4"
    />
  );
}
