'use client';

import type { Scenario } from './scenarios';

export default function FlowLegend({ scenario }: { scenario: Scenario }) {
  const uniqueColors = new Map<string, string>();
  scenario.flows.forEach((f) => {
    if (!uniqueColors.has(f.color)) {
      uniqueColors.set(f.color, f.label);
    }
  });

  return (
    <div className="mt-6 border border-[var(--border)] rounded-xl p-5 bg-[var(--card)]">
      <h3 className="text-sm font-semibold mb-3">Flujos en este escenario</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {scenario.flows.map((flow) => (
          <div key={flow.id} className="flex items-start gap-2.5">
            <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: flow.color }}
              />
              <svg width="30" height="8" className="shrink-0">
                <line
                  x1="0" y1="4" x2="30" y2="4"
                  stroke={flow.color}
                  strokeWidth={flow.thickness}
                  strokeOpacity={0.6}
                />
              </svg>
            </div>
            <div>
              <span className="text-xs font-medium">{flow.label}</span>
              <p className="text-[10px] text-[var(--text-secondary)] leading-tight mt-0.5">
                {flow.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
