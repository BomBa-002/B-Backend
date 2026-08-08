import { watch, type FSWatcher } from 'node:fs';
import { resolve } from 'node:path';
import { env } from '../../infrastructure/config/env.js';
import { logger } from '../../core/logger/logger.js';

/** بيراقب ملفات الـ routes في التطوير؛ الـ docs نفسها بتقرأ المواصفة الجديدة عند كل طلب. */
export function watchOpenApiChanges(): FSWatcher | undefined {
  if (env.NODE_ENV === 'production') return undefined;
  const routesDirectory = resolve(process.cwd(), 'src/interfaces/http/routes');
  try {
    return watch(routesDirectory, { recursive: true }, (_event, filename) => {
      if (filename?.endsWith('.ts')) logger.info('اتحدثت مواصفة الـ API تلقائياً', { filename });
    });
  } catch (error) {
    logger.warn('مراقب توثيق API مش متاح، الـ endpoint لسه بيولد آخر نسخة', { error });
    return undefined;
  }
}
