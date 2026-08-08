import { logger } from '../logger/logger.js';
export class EventBus {
    handlers = new Map();
    on(name, handler) { const current = this.handlers.get(name) ?? []; current.push(handler); this.handlers.set(name, current); }
    async publish(event) { for (const handler of this.handlers.get(event.type) ?? []) {
        try {
            await handler(event);
        }
        catch (error) {
            logger.error('فشل معالج حدث، بس السيرفر مكمل', { event: event.type, error });
        }
    } }
}
export const eventBus = new EventBus();
