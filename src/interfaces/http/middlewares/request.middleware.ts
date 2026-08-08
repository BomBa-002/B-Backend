import { randomUUID } from 'node:crypto';
import type { RequestHandler } from 'express';
import { accessLogger } from '../../../core/logger/logger.js';
export const requestContext: RequestHandler = (req, res, next) => { const id = String(req.headers['x-request-id'] ?? randomUUID()); res.setHeader('x-request-id', id); const started = Date.now(); res.on('finish', () => accessLogger.info('طلب HTTP خلص', { requestId: id, method: req.method, path: req.path, status: res.statusCode, durationMs: Date.now() - started })); next(); };
