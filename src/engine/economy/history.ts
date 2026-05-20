import type { EconomicIndicators, HistoryEntry, Tick } from '@/types/economy';
import { HISTORY_BUFFER_SIZE } from '@/engine/config/constants';

export class HistoryBuffer {
  private entries: HistoryEntry[] = [];

  push(tick: Tick, indicators: EconomicIndicators): void {
    this.entries.push({
      tick,
      indicators: {
        ...indicators,
        moneySupply: { ...indicators.moneySupply },
      },
    });
    if (this.entries.length > HISTORY_BUFFER_SIZE) {
      this.entries.shift();
    }
  }

  getAll(): HistoryEntry[] {
    return this.entries;
  }

  getLast(n: number): HistoryEntry[] {
    return this.entries.slice(-n);
  }

  clear(): void {
    this.entries = [];
  }
}
