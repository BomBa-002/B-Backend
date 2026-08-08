import { app } from './app.js';
import { env } from './infrastructure/config/env.js';
import { logger } from './core/logger/logger.js';
import { sqlite } from './infrastructure/database/client.js';
import { execFileSync } from 'node:child_process';
import { watchOpenApiChanges } from './interfaces/http/openapi.watcher.js';
try {
    execFileSync(process.execPath, ['--import', 'tsx', 'src/infrastructure/database/migrate.ts'], { stdio: 'inherit' });
}
catch (error) {
    logger.error('الترحيل فشل، السيرفر هيكمل عادي', { error });
}
const openApiWatcher = watchOpenApiChanges();
const server = app.listen(env.PORT, () => logger.info('السيرفر اشتغل ومش هيقع من خطأ عابر', { port: env.PORT, environment: env.NODE_ENV }));
const shutdown = (signal) => { logger.info('إغلاق هادي للسيرفر', { signal }); openApiWatcher?.close(); server.close(() => { sqlite.close(); process.exit(0); }); setTimeout(() => process.exit(1), 10000).unref(); };
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('uncaughtException', error => logger.error('uncaughtException اتلقط والسيرفر مكمل', { error }));
process.on('unhandledRejection', reason => logger.error('unhandledRejection اتلقط والسيرفر مكمل', { reason }));
