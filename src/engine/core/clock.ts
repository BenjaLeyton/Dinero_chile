export class GameClock {
  private ticksPerSecond = 1;
  private running = false;
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private onTick: () => void;

  constructor(onTick: () => void) {
    this.onTick = onTick;
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.scheduleInterval();
  }

  stop(): void {
    this.running = false;
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  setSpeed(ticksPerSecond: number): void {
    this.ticksPerSecond = Math.max(1, Math.min(10, ticksPerSecond));
    if (this.running) {
      this.stop();
      this.start();
    }
  }

  getSpeed(): number {
    return this.ticksPerSecond;
  }

  isRunning(): boolean {
    return this.running;
  }

  private scheduleInterval(): void {
    const ms = Math.round(1000 / this.ticksPerSecond);
    this.intervalId = setInterval(() => {
      this.onTick();
    }, ms);
  }
}
