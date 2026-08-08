import { logger } from '../logger/logger.js';

type Handler<T> = (event: T) => void | Promise<void>;
export class EventBus {
  private readonly handlers = new Map<string, Handler<unknown>[]>();
  on<T>(name: string, handler: Handler<T>): void { const current = this.handlers.get(name) ?? []; current.push(handler as Handler<unknown>); this.handlers.set(name, current); }
  async publish<T extends { type: string }>(event: T): Promise<void> { for (const handler of this.handlers.get(event.type) ?? []) { try { await handler(event); } catch (error) { logger.error('فشل معالج حدث، بس السيرفر مكمل', { event: event.type, error }); } } }
}
export const eventBus = new EventBus();
