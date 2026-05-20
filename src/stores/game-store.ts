'use client';

import { create } from 'zustand';
import type {
  SimulationSnapshot,
  GameStatus,
  GameSpeed,
  SimulationConfig,
  PlayerAction,
  EconomicEvent,
} from '@/types/game';
import type { MoneyFlow, EconomicIndicators, HistoryEntry } from '@/types/economy';
import { SimulationEngine } from '@/engine/core/simulation';
import { GameClock } from '@/engine/core/clock';
import { HistoryBuffer } from '@/engine/economy/history';

interface GameStore {
  status: GameStatus;
  speed: GameSpeed;
  snapshot: SimulationSnapshot | null;
  history: HistoryEntry[];
  recentEvents: EconomicEvent[];

  engine: SimulationEngine | null;
  clock: GameClock | null;
  historyBuffer: HistoryBuffer | null;

  initSimulation: (config: SimulationConfig) => void;
  tick: () => void;
  pause: () => void;
  resume: () => void;
  setSpeed: (speed: GameSpeed) => void;
  executeAction: (action: PlayerAction) => void;
  reset: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  status: 'menu',
  speed: 1,
  snapshot: null,
  history: [],
  recentEvents: [],

  engine: null,
  clock: null,
  historyBuffer: null,

  initSimulation: (config) => {
    const prev = get();
    if (prev.clock) prev.clock.stop();

    const engine = new SimulationEngine(config);
    const historyBuffer = new HistoryBuffer();

    const clock = new GameClock(() => {
      get().tick();
    });

    const snapshot = engine.getSnapshot();
    historyBuffer.push(snapshot.tick, snapshot.indicators);

    set({
      engine,
      clock,
      historyBuffer,
      snapshot,
      status: 'paused',
      speed: 1,
      history: historyBuffer.getAll(),
      recentEvents: [],
    });
  },

  tick: () => {
    const { engine, historyBuffer } = get();
    if (!engine || !historyBuffer) return;

    const snapshot = engine.tick();
    historyBuffer.push(snapshot.tick, snapshot.indicators);

    set(state => ({
      snapshot,
      history: historyBuffer.getAll(),
      recentEvents: [
        ...snapshot.events,
        ...state.recentEvents,
      ].slice(0, 50),
    }));
  },

  pause: () => {
    const { clock } = get();
    if (clock) clock.stop();
    set({ status: 'paused' });
  },

  resume: () => {
    const { clock, speed } = get();
    if (clock) {
      clock.setSpeed(speed);
      clock.start();
    }
    set({ status: 'playing' });
  },

  setSpeed: (speed) => {
    const { clock, status } = get();
    if (clock && status === 'playing') {
      clock.setSpeed(speed);
    }
    set({ speed });
  },

  executeAction: (action) => {
    const { engine } = get();
    if (!engine) return;
    engine.applyAction(action);
  },

  reset: () => {
    const { clock } = get();
    if (clock) clock.stop();
    set({
      status: 'menu',
      speed: 1,
      snapshot: null,
      history: [],
      recentEvents: [],
      engine: null,
      clock: null,
      historyBuffer: null,
    });
  },
}));
