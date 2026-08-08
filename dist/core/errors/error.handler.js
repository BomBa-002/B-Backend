import { randomUUID } from 'node:crypto';
import { AppError } from './error.types.js';
import { response } from '../response/response.formatter.js';
import { logger } from '../logger/logger.js';
export const errorHandler = (error, req, res, _next) => { const requestId = String(req.headers['x-request-id'] ?? randomUUID()); const safe = error instanceof AppError ? error : new AppError('1.0.0', 'حصلت مشكلة داخلية، جرّب تاني', 500); logger.error('طلب فشل من غير ما نوقف السيرفر', { requestId, error: error instanceof Error ? error.message : error }); res.status(safe.statusCode).json(response.error({ code: safe.code, message: safe.message, category: safe.category, details: safe.details }, requestId)); };
