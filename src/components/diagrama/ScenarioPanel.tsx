'use client';

import { motion } from 'framer-motion';
import type { Scenario } from './scenarios';

const VERDICT_STYLES = {
  healthy: {
    bg: 'var(--success-muted)',
    border: 'var(--success-border)',
    text: 'var(--success)',
  },
  warning: {
    bg: 'var(--warning-muted)',
    border: 'var(--warning-border)',
    text: 'var(--warning)',
  },
  danger: {
    bg: 'var(--danger-muted)',
    border: 'var(--danger-border)',
    text: 'var(--danger)',
  },
};

const INDICATOR_LABELS: Record<string, string> = {
  inflacion: 'Inflación',
  desempleo: 'Desempleo',
  pib: 'Crecimiento PIB',
  tasaInteres: 'Tasa de Interés',
  deudaPib: 'Deuda/PIB',
  gini: 'Gini (desigualdad)',
};

function getIndicatorColor(key: string, value: string): string {
  const num = parseFloat(value);
  if (key === 'inflacion') {
    if (num >= 0 && num <= 3) return 'var(--success)';
    if (num > 3 && num <= 6) return 'var(--warning)';
    return 'var(--danger)';
  }
  if (key === 'desempleo') {
    if (num <= 5) return 'var(--success)';
    if (num <= 10) return 'var(--warning)';
    return 'var(--danger)';
  }
  if (key === 'pib') {
    if (num >= 2) return 'var(--success)';
    if (num >= 0) return 'var(--warning)';
    return 'var(--danger)';
  }
  if (key === 'deudaPib') {
    if (num <= 60) return 'var(--success)';
    if (num <= 90) return 'var(--warning)';
    return 'var(--danger)';
  }
  if (key === 'gini') {
    if (num <= 0.35) return 'var(--success)';
    if (num <= 0.45) return 'var(--warning)';
    return 'var(--danger)';
  }
  return 'var(--text-secondary)';
}

export default function ScenarioPanel({ scenario }: { scenario: Scenario }) {
  const style = VERDICT_STYLES[scenario.verdict];

  return (
    <motion.div
      key={scenario.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border border-[var(--border)] rounded-xl p-6 bg-[var(--card)]"
    >
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">{scenario.icon}</span>
            <h2 className="text-xl font-bold">{scenario.name}</h2>
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{
                backgroundColor: style.bg,
                color: style.text,
                border: `1px solid ${style.border}`,
              }}
            >
              {scenario.verdictLabel}
            </span>
          </div>
          <p className="text-sm text-[var(--text-secondary)] mb-4">{scenario.description}</p>
          <ul className="space-y-1.5">
            {scenario.keyPoints.map((point, i) => (
              <li key={i} className="text-xs text-[var(--text-secondary)] flex gap-2">
                <span className="text-[var(--foreground)] shrink-0">•</span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="md:w-72 shrink-0">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-3">
            Indicadores
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(scenario.indicators).map(([key, value]) => (
              <div
                key={key}
                className="border border-[var(--border)] rounded-lg p-2.5 text-center"
              >
                <div
                  className="text-lg font-bold font-mono"
                  style={{ color: getIndicatorColor(key, value) }}
                >
                  {value}
                </div>
                <div className="text-[10px] text-[var(--text-secondary)]">
                  {INDICATOR_LABELS[key]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
