import type { ErrorRequestHandler } from 'express';

export type ErrorCategory = 'SYSTEM' | 'VALIDATION' | 'AUTHENTICATION' | 'AUTHORIZATION' | 'BUSINESS';

export class AppError extends Error {
  public readonly isOperational = true;
  constructor(
    public readonly code: string,
    message: string,
    public readonly statusCode = 500,
    public readonly details?: unknown,
    public readonly category: ErrorCategory = 'SYSTEM',
  ) { super(message); this.name = 'AppError'; }
}

export type ErrorPayload = { code: string; message: string; category: ErrorCategory; details?: unknown };
export type ErrorHandler = ErrorRequestHandler;
