'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/stores/game-store';
import type { PlayerRole, SimulationScale } from '@/types/game';
import Link from 'next/link';

const roles: { id: PlayerRole; name: string; icon: string; desc: string }[] = [
  { id: 'central_banker', name: 'Banquero Central', icon: '🏛️', desc: 'Controla tasas de interés, reservas y la impresión de dinero.' },
  { id: 'business_owner', name: 'Empresario', icon: '🏭', desc: 'Maneja precios, producción, contratación e inversión.' },
  { id: 'government', name: 'Gobierno', icon: '🏛️', desc: 'Define impuestos, gasto público y emisión de deuda.' },
  { id: 'citizen', name: 'Ciudadano', icon: '👤', desc: 'Decide entre consumir, ahorrar, endeudarse y trabajar.' },
];

const scales: { id: SimulationScale; name: string; icon: string; agents: string }[] = [
  { id: 'pueblo', name: 'Pueblo', icon: '🏘️', agents: '16 agentes' },
  { id: 'ciudad', name: 'Ciudad', icon: '🏙️', agents: '43 agentes' },
  { id: 'metropolis', name: 'Metrópolis', icon: '🌆', agents: '72 agentes' },
  { id: 'pais', name: 'País', icon: '🗺️', agents: '142 agentes' },
  { id: 'mundial', name: 'Mundial', icon: '🌍', agents: 'Multi-país' },
];

export default function PlayPage() {
  const [selectedRole, setSelectedRole] = useState<PlayerRole>('central_banker');
  const [selectedScale, setSelectedScale] = useState<SimulationScale>('pueblo');
  const [genesisMode, setGenesisMode] = useState(false);
  const router = useRouter();
  const initSimulation = useGameStore(s => s.initSimulation);

  function handleStart() {
    initSimulation({
      scale: selectedScale,
      playerRole: selectedRole,
      scenarioId: null,
      difficulty: 'normal',
      seed: Date.now(),
      ticksPerSecond: 1,
      genesisMode,
    });
    router.push('/play/simulation');
  }

  return (
    <main className="min-h-screen bg-[var(--background)] py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-sm text-[var(--text-secondary)] hover:text-[var(--foreground)] mb-6 block">
          ← Inicio
        </Link>

        <h1 className="text-3xl font-bold mb-2">Nueva Simulación</h1>
        <p className="text-[var(--text-secondary)] mb-10">
          Configura tu economía y comienza a jugar.
        </p>

        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4">Elige tu Rol</h2>
          <div className="grid grid-cols-2 gap-3">
            {roles.map(role => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  selectedRole === role.id
                    ? 'border-[var(--foreground)] bg-[var(--surface)]'
                    : 'border-[var(--border)] hover:border-[var(--text-secondary)]'
                }`}
              >
                <span className="text-2xl">{role.icon}</span>
                <p className="font-medium mt-1">{role.name}</p>
                <p className="text-xs text-[var(--text-secondary)] mt-1">{role.desc}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4">Escala de la Economía</h2>
          <div className="flex flex-wrap gap-3">
            {scales.map(scale => (
              <button
                key={scale.id}
                onClick={() => setSelectedScale(scale.id)}
                className={`px-5 py-3 rounded-lg border text-center transition-all ${
                  selectedScale === scale.id
                    ? 'border-[var(--foreground)] bg-[var(--surface)]'
                    : 'border-[var(--border)] hover:border-[var(--text-secondary)]'
                }`}
              >
                <span className="text-xl">{scale.icon}</span>
                <p className="font-medium text-sm mt-1">{scale.name}</p>
                <p className="text-xs text-[var(--text-secondary)]">{scale.agents}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4">Modo de Inicio</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setGenesisMode(false)}
              className={`p-4 rounded-xl border text-left transition-all ${
                !genesisMode
                  ? 'border-[var(--foreground)] bg-[var(--surface)]'
                  : 'border-[var(--border)] hover:border-[var(--text-secondary)]'
              }`}
            >
              <span className="text-2xl">⚡</span>
              <p className="font-medium mt-1">Economía Moderna</p>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Empieza con todo funcionando: bancos, gobierno, dinero.
              </p>
            </button>
            <button
              onClick={() => setGenesisMode(true)}
              className={`p-4 rounded-xl border text-left transition-all ${
                genesisMode
                  ? 'border-[var(--foreground)] bg-[var(--surface)]'
                  : 'border-[var(--border)] hover:border-[var(--text-secondary)]'
              }`}
            >
              <span className="text-2xl">🌱</span>
              <p className="font-medium mt-1">Desde Cero (Génesis)</p>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Empieza con trueque. Inventa el dinero, crea bancos y gobierno paso a paso.
              </p>
            </button>
          </div>
        </section>

        <button
          onClick={handleStart}
          className="w-full py-3 bg-[var(--foreground)] text-[var(--background)] rounded-lg font-medium text-lg hover:opacity-90 transition-opacity"
        >
          {genesisMode ? 'Comenzar desde el Trueque' : 'Iniciar Simulación'}
        </button>
      </div>
    </main>
  );
}
