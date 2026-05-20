import type { PlayerRole } from './game';

export interface PlayerProfile {
  name: string;
  currentRole: PlayerRole;
  achievements: Achievement[];
  completedScenarios: string[];
  completedLessons: string[];
  totalTicksPlayed: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: number;
  category: AchievementCategory;
}

export type AchievementCategory =
  | 'learning'
  | 'monetary'
  | 'fiscal'
  | 'crisis'
  | 'mastery';

export interface SaveSlot {
  id: string;
  name: string;
  timestamp: number;
  tick: number;
  scenarioId: string | null;
  role: PlayerRole;
  preview: {
    gdp: number;
    inflation: number;
    unemployment: number;
  };
}
