'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Scenario, EntityNode, Flow } from './scenarios';

interface Props {
  scenario: Scenario;
  selectedEntity: string | null;
  onSelectEntity: (id: string | null) => void;
}

function FlowArrow({ flow, entities, svgW, svgH, isHighlighted, onHover }: {
  flow: Flow;
  entities: EntityNode[];
  svgW: number;
  svgH: number;
  isHighlighted: boolean;
  onHover: (flow: Flow | null) => void;
}) {
  const from = entities.find((e) => e.id === flow.from);
  const to = entities.find((e) => e.id === flow.to);
  if (!from || !to) return null;

  const x1 = (from.x / 100) * svgW;
  const y1 = (from.y / 100) * svgH + 30;
  const x2 = (to.x / 100) * svgW;
  const y2 = (to.y / 100) * svgH + 30;

  const dx = x2 - x1;
  const dy = y2 - y1;
  const cx = (x1 + x2) / 2 + dy * 0.15;
  const cy = (y1 + y2) / 2 - dx * 0.15;

  const pathId = `flow-${flow.id}`;
  const opacity = isHighlighted ? 0.7 : 0.2;
  const particleSize = Math.max(3, flow.thickness * 1.5);

  return (
    <g
      onMouseEnter={() => onHover(flow)}
      onMouseLeave={() => onHover(null)}
      style={{ cursor: 'pointer' }}
    >
      <path
        d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
        stroke="transparent"
        strokeWidth={20}
        fill="none"
      />
      <path
        id={pathId}
        d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
        stroke={flow.color}
        strokeWidth={flow.thickness}
        strokeOpacity={opacity}
        fill="none"
        strokeLinecap="round"
      />
      {isHighlighted && (
        <>
          <circle r={particleSize} fill={flow.color} opacity={0.9}>
            <animateMotion
              dur={`${flow.speed}s`}
              repeatCount="indefinite"
              path={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
            />
          </circle>
          <circle r={particleSize * 0.6} fill={flow.color} opacity={0.6}>
            <animateMotion
              dur={`${flow.speed}s`}
              repeatCount="indefinite"
              begin={`${flow.speed * 0.4}s`}
              path={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
            />
          </circle>
        </>
      )}
      <defs>
        <marker
          id={`arrow-${flow.id}`}
          markerWidth="8"
          markerHeight="6"
          refX="8"
          refY="3"
          orient="auto"
        >
          <polygon
            points="0 0, 8 3, 0 6"
            fill={flow.color}
            opacity={opacity}
          />
        </marker>
      </defs>
      <path
        d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
        stroke={flow.color}
        strokeWidth={flow.thickness}
        strokeOpacity={opacity}
        fill="none"
        strokeLinecap="round"
        markerEnd={`url(#arrow-${flow.id})`}
      />
    </g>
  );
}

function EntityCircle({ entity, svgW, svgH, isSelected, isRelated, dimmed, onSelect }: {
  entity: EntityNode;
  svgW: number;
  svgH: number;
  isSelected: boolean;
  isRelated: boolean;
  dimmed: boolean;
  onSelect: () => void;
}) {
  const x = (entity.x / 100) * svgW;
  const y = (entity.y / 100) * svgH;
  const radius = isSelected ? 38 : 32;
  const opacity = dimmed ? 0.3 : 1;

  return (
    <g
      onClick={onSelect}
      style={{ cursor: 'pointer' }}
      opacity={opacity}
    >
      <circle
        cx={x}
        cy={y + 30}
        r={radius + 4}
        fill="none"
        stroke={entity.color}
        strokeWidth={isSelected ? 3 : isRelated ? 2 : 0}
        strokeOpacity={0.5}
        strokeDasharray={isRelated ? '4 4' : 'none'}
      />
      <circle
        cx={x}
        cy={y + 30}
        r={radius}
        fill={`${entity.color}15`}
        stroke={entity.color}
        strokeWidth={1.5}
      />
      <text
        x={x}
        y={y + 24}
        textAnchor="middle"
        fontSize="22"
        dominantBaseline="central"
      >
        {entity.icon}
      </text>
      <text
        x={x}
        y={y + 46}
        textAnchor="middle"
        fontSize="10"
        fontWeight="600"
        fill={entity.color}
      >
        {entity.label}
      </text>
    </g>
  );
}

export default function EconomyDiagram({ scenario, selectedEntity, onSelectEntity }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 800, h: 500 });
  const [hoveredFlow, setHoveredFlow] = useState<Flow | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      setDims({ w: width, h: Math.max(420, width * 0.55) });
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const relatedEntities = new Set<string>();
  if (selectedEntity) {
    scenario.flows.forEach((f) => {
      if (f.from === selectedEntity) relatedEntities.add(f.to);
      if (f.to === selectedEntity) relatedEntities.add(f.from);
    });
  }

  const visibleFlows = selectedEntity
    ? scenario.flows.filter((f) => f.from === selectedEntity || f.to === selectedEntity)
    : scenario.flows;

  const selectedEntityData = selectedEntity
    ? scenario.entities.find((e) => e.id === selectedEntity)
    : null;

  return (
    <div ref={containerRef} className="relative w-full">
      <svg
        width={dims.w}
        height={dims.h}
        viewBox={`0 0 ${dims.w} ${dims.h}`}
        className="w-full"
      >
        {visibleFlows.map((flow) => (
          <FlowArrow
            key={flow.id}
            flow={flow}
            entities={scenario.entities}
            svgW={dims.w}
            svgH={dims.h}
            isHighlighted={!hoveredFlow || hoveredFlow.id === flow.id}
            onHover={setHoveredFlow}
          />
        ))}
        {scenario.entities.map((entity) => (
          <EntityCircle
            key={entity.id}
            entity={entity}
            svgW={dims.w}
            svgH={dims.h}
            isSelected={selectedEntity === entity.id}
            isRelated={relatedEntities.has(entity.id)}
            dimmed={!!selectedEntity && selectedEntity !== entity.id && !relatedEntities.has(entity.id)}
            onSelect={() => onSelectEntity(selectedEntity === entity.id ? null : entity.id)}
          />
        ))}
      </svg>

      <AnimatePresence>
        {hoveredFlow && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-4 left-4 right-4 bg-[var(--card)] border border-[var(--border)] rounded-lg p-3 shadow-lg"
          >
            <div className="flex items-center gap-2 mb-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: hoveredFlow.color }}
              />
              <span className="font-semibold text-sm">{hoveredFlow.label}</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)]">{hoveredFlow.description}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedEntityData && !hoveredFlow && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-4 right-4 w-64 bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 shadow-lg"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{selectedEntityData.icon}</span>
              <span className="font-bold" style={{ color: selectedEntityData.color }}>
                {selectedEntityData.label}
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mb-3">
              {selectedEntityData.description}
            </p>
            <div className="space-y-1.5">
              {Object.entries(selectedEntityData.metrics).map(([key, val]) => (
                <div key={key} className="flex justify-between text-xs">
                  <span className="text-[var(--text-secondary)]">{key}</span>
                  <span className="font-mono font-medium">{val}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => onSelectEntity(null)}
              className="mt-3 text-xs text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors"
            >
              ✕ Cerrar
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {!selectedEntity && !hoveredFlow && (
        <div className="absolute top-4 left-4 text-xs text-[var(--text-secondary)] bg-[var(--card)] border border-[var(--border)] rounded-lg px-3 py-2">
          Click en una entidad para filtrar sus flujos · Hover en una línea para ver detalles
        </div>
      )}
    </div>
  );
}
