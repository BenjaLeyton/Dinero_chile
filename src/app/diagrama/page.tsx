'use client';

import { useState } from 'react';
import Link from 'next/link';
import FloatingThemeToggle from '@/components/ui/FloatingThemeToggle';
import EconomyDiagram from '@/components/diagrama/EconomyDiagram';
import ScenarioPanel from '@/components/diagrama/ScenarioPanel';
import FlowLegend from '@/components/diagrama/FlowLegend';
import type { Scenario } from '@/components/diagrama/scenarios';
import { SCENARIOS } from '@/components/diagrama/scenarios';

export default function DiagramaPage() {
  const [activeScenario, setActiveScenario] = useState<Scenario>(SCENARIOS[0]);
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <FloatingThemeToggle />

      <div className="max-w-7xl mx-auto px-4 pt-8 pb-16">
        <div className="mb-6">
          <Link
            href="/"
            className="text-sm text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors"
          >
            ← Inicio
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-2">Mapa Económico Interactivo</h1>
        <p className="text-[var(--text-secondary)] mb-8 max-w-2xl">
          Explora cómo se relacionan todas las entidades económicas.
          Selecciona un escenario para ver qué pasa cuando la economía funciona
          bien — o cuando todo sale mal.
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setActiveScenario(s);
                setSelectedEntity(null);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                activeScenario.id === s.id
                  ? 'border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]'
                  : 'border-[var(--border)] hover:border-[var(--text-secondary)]'
              }`}
            >
              {s.icon} {s.name}
            </button>
          ))}
        </div>

        <ScenarioPanel scenario={activeScenario} />

        <div className="mt-6 border border-[var(--border)] rounded-xl overflow-hidden bg-[var(--card)]">
          <EconomyDiagram
            scenario={activeScenario}
            selectedEntity={selectedEntity}
            onSelectEntity={setSelectedEntity}
          />
        </div>

        <FlowLegend scenario={activeScenario} />
      </div>
    </main>
  );
}
