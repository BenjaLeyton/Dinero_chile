'use client';

import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useGameStore } from '@/stores/game-store';

export default function ScenarioDetailPage() {
  const params = useParams();
  const router = useRouter();
  const initSimulation = useGameStore(s => s.initSimulation);

  const scenarioId = params.scenarioId as string;

  function handleStart() {
    initSimulation({
      scale: 'pueblo',
      playerRole: 'central_banker',
      scenarioId,
      difficulty: 'normal',
      seed: Date.now(),
      ticksPerSecond: 1,
      genesisMode: false,
    });
    router.push('/play/simulation');
  }

  return (
    <main className="min-h-screen bg-[var(--background)] py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/scenarios" className="text-sm text-[var(--text-secondary)] hover:text-[var(--foreground)] mb-6 block">
          ← Volver a Escenarios
        </Link>

        <h1 className="text-3xl font-bold mb-4 capitalize">{scenarioId.replace('-', ' ')}</h1>
        <p className="text-[var(--text-secondary)] mb-8">
          Los escenarios predefinidos estarán disponibles próximamente.
          Por ahora, puedes iniciar una simulación sandbox.
        </p>

        <button
          onClick={handleStart}
          className="px-6 py-3 bg-[var(--foreground)] text-[var(--background)] rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Iniciar como Sandbox
        </button>
      </div>
    </main>
  );
}
