'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useGameStore } from '@/stores/game-store';
import { tickToDate } from '@/lib/format';

interface MiniChartProps {
  title: string;
  data: { tick: number; value: number }[];
  color: string;
  formatValue?: (v: number) => string;
}

function MiniChart({ title, data, color, formatValue }: MiniChartProps) {
  const fmt = formatValue ?? ((v: number) => v.toFixed(2));
  const lastValue = data.length > 0 ? data[data.length - 1].value : 0;

  return (
    <div className="border border-[var(--border)] rounded-lg p-3 bg-[var(--card)]">
      <div className="flex justify-between items-baseline mb-2">
        <span className="text-xs font-medium text-[var(--text-secondary)]">{title}</span>
        <span className="text-sm font-mono font-medium">{fmt(lastValue)}</span>
      </div>
      <ResponsiveContainer width="100%" height={60}>
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={1.5}
            dot={false}
          />
          <Tooltip
            contentStyle={{
              fontSize: '10px',
              padding: '4px 8px',
              border: '1px solid var(--border)',
              borderRadius: '6px',
            }}
            formatter={(value) => [fmt(Number(value)), title]}
            labelFormatter={(tick) => tickToDate(Number(tick))}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function EconomyCharts() {
  const history = useGameStore(s => s.history);

  if (history.length < 2) {
    return (
      <div className="text-xs text-[var(--text-secondary)] text-center py-8">
        Los gráficos aparecerán cuando la simulación avance...
      </div>
    );
  }

  const gdpData = history.map(h => ({ tick: h.tick, value: h.indicators.gdp }));
  const inflationData = history.map(h => ({ tick: h.tick, value: h.indicators.inflationRate * 100 }));
  const unemploymentData = history.map(h => ({ tick: h.tick, value: h.indicators.unemploymentRate * 100 }));
  const m2Data = history.map(h => ({ tick: h.tick, value: h.indicators.moneySupply.m2 }));
  const giniData = history.map(h => ({ tick: h.tick, value: h.indicators.giniCoefficient }));
  const rateData = history.map(h => ({ tick: h.tick, value: h.indicators.interestRate * 100 }));

  const fmtCurrency = (v: number) => {
    if (v >= 1e6) return `$${(v / 1e6).toFixed(1)}M`;
    if (v >= 1e3) return `$${(v / 1e3).toFixed(0)}K`;
    return `$${v.toFixed(0)}`;
  };
  const fmtPct = (v: number) => `${v.toFixed(1)}%`;
  const fmtGini = (v: number) => v.toFixed(3);

  return (
    <div className="space-y-3">
      <MiniChart title="PIB" data={gdpData} color="#16a34a" formatValue={fmtCurrency} />
      <MiniChart title="Inflación" data={inflationData} color="#dc2626" formatValue={fmtPct} />
      <MiniChart title="Desempleo" data={unemploymentData} color="#d97706" formatValue={fmtPct} />
      <MiniChart title="Oferta Monetaria (M2)" data={m2Data} color="#2563eb" formatValue={fmtCurrency} />
      <MiniChart title="Tasa de Interés" data={rateData} color="#6366f1" formatValue={fmtPct} />
      <MiniChart title="Coef. Gini" data={giniData} color="#7c3aed" formatValue={fmtGini} />
    </div>
  );
}
