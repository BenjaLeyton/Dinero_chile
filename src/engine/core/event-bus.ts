type Handler<T = unknown> = (data: T) => void;

export class EventBus {
  private handlers = new Map<string, Handler[]>();

  on<T>(event: string, handler: Handler<T>): () => void {
    const list = this.handlers.get(event) ?? [];
    list.push(handler as Handler);
    this.handlers.set(event, list);
    return () => {
      const idx = list.indexOf(handler as Handler);
      if (idx >= 0) list.splice(idx, 1);
    };
  }

  emit<T>(event: string, data: T): void {
    const list = this.handlers.get(event);
    if (list) {
      for (const handler of list) {
        handler(data);
      }
    }
  }

  clear(): void {
    this.handlers.clear();
  }
}
