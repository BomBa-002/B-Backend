export const response = {
  success<T>(data: T, message = 'تمت العملية بنجاح', meta?: Record<string, unknown>) { return { success: true, message, data, meta }; },
  list<T>(data: T[], total: number, page = 1, limit = 20) { return { success: true, data, meta: { total, page, limit, pages: Math.ceil(total / limit) } }; },
  error(error: { code: string; message: string; category: string; details?: unknown }, requestId: string) { return { success: false, error, requestId }; },
};
