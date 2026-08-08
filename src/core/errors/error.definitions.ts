import { AppError } from './error.types.js';

export const errors = {
  validation: (details?: unknown) => new AppError('2.1.1', 'البيانات اللي اتبعتت مش مظبوطة', 400, details, 'VALIDATION'),
  unauthorized: () => new AppError('3.2.1', 'لازم تسجل دخول الأول', 401, undefined, 'AUTHENTICATION'),
  invalidCredentials: () => new AppError('3.2.2', 'الإيميل أو كلمة السر مش صح', 401, undefined, 'AUTHENTICATION'),
  forbidden: () => new AppError('4.1.1', 'مش مسموح لك تعمل العملية دي', 403, undefined, 'AUTHORIZATION'),
  notFound: (resource = 'المورد') => new AppError('5.1.1', `${resource} مش موجود`, 404, undefined, 'BUSINESS'),
  conflict: (message: string) => new AppError('5.2.1', message, 409, undefined, 'BUSINESS'),
  insufficientBalance: () => new AppError('5.1.2', 'الرصيد مش كفاية للعملية دي', 422, undefined, 'BUSINESS'),
} as const;
