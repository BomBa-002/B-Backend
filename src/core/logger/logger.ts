import fs from 'node:fs';
import path from 'node:path';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const logDir = path.resolve(process.env.LOG_DIR ?? 'database/logs');
fs.mkdirSync(logDir, { recursive: true });
const format = winston.format.combine(winston.format.timestamp(), winston.format.errors({ stack: true }), winston.format.json());
const file = (name: string, level?: string) => new DailyRotateFile({ filename: path.join(logDir, `${name}-%DATE%.log`), datePattern: 'YYYY-MM-DD', maxFiles: `${process.env.LOG_RETENTION_DAYS ?? 14}d`, level, format });

export const logger = winston.createLogger({ level: process.env.LOG_LEVEL ?? 'info', format, transports: [file('error', 'error'), file('access'), file('security'), file('audit-summary'), new winston.transports.Console({ format: winston.format.combine(winston.format.colorize(), winston.format.simple()) })] });
export const accessLogger = logger.child({ channel: 'access' });
export const securityLogger = logger.child({ channel: 'security' });
export const auditLogger = logger.child({ channel: 'audit' });
