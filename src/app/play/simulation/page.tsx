'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useGameStore } from '@/stores/game-store';
import TopBar from '@/components/layout/TopBar';
import Sidebar from '@/components/layout/Sidebar';
import MoneyFlowCanvas from '@/components/visualization/MoneyFlowCanvas';
import EconomyCharts from '@/components/charts/EconomyCharts';
import CentralBankPanel from '@/components/controls/CentralBankPanel';
import GovernmentPanel from '@/components/controls/GovernmentPanel';
import CitizenDashboard from '@/components/controls/CitizenDashboard';
import EventFeed from '@/components/game/EventFeed';
import EntityDetails from '@/components/game/EntityDetails';
import PhaseTracker from '@/components/game/PhaseTracker';
import MoneyOriginTracker from '@/components/game/MoneyOriginTracker';
import OpportunityDetector from '@/components/game/OpportunityDetector';
import { useUIStore } from '@/stores/ui-store';
import { PHASE_DEFINITIONS } from '@/types/game';

export default function SimulationPage() {
  const snapshot = useGameStore(s => s.snapshot);
  const status = useGameStore(s => s.status);
  const engine = useGameStore(s => s.engine);
  const router = useRouter();
  const selectedEntityId = useUIStore(s => s.selectedEntityId);

  useEffect(() => {
    if (!snapshot && !engine) {
      router.push('/play');
    }
  }, [snapshot, engine, router]);

  if (!snapshot) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[var(--text-secondary)]">
        Cargando simulación...
      </div>
    );
  }

  const config = engine?.getState().config;
  const phaseDef = PHASE_DEFINITIONS[snapshot.phase];
  const isGenesis = config?.genesisMode && snapshot.phase !== 'modern';
  const isCitizen = config?.playerRole === 'citizen';
  const showCentralBankControls = !isCitizen && phaseDef.hasCentralBank &&
    (config?.playerRole === 'central_banker' || config?.playerRole === 'government');
  const showGovernmentControls = !isCitizen && phaseDef.hasTaxes &&
    (config?.playerRole === 'government' || config?.playerRole === 'central_banker');

  return (
    <div className="h-screen flex flex-col bg-[var(--background)]">
      <TopBar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 p-4">
            <MoneyFlowCanvas snapshot={snapshot} />
          </div>

          <div className="h-44 border-t border-[var(--border)] px-4 py-3 bg-[var(--card)] overflow-y-auto">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                Eventos
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[var(--surface)] text-[var(--text-secondary)]">
                Tick {snapshot.tick}
              </span>
            </div>
            <EventFeed />
          </div>
        </div>

        <aside className={`border-l border-[var(--border)] bg-[var(--card)] overflow-y-auto shrink-0 ${isCitizen ? 'w-80' : 'w-72'}`}>
          <div className="p-4 space-y-4">
            {isGenesis && <PhaseTracker />}

            {isCitizen && (
              <>
                <CitizenDashboard />
                <MoneyOriginTracker />
                <OpportunityDetector />
              </>
            )}

            {selectedEntityId && !isCitizen && <EntityDetails />}

            {showCentralBankControls && <CentralBankPanel />}
            {showGovernmentControls && <GovernmentPanel />}

            <div>
              <h3 className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-3">
                Indicadores
              </h3>
              <EconomyCharts />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
