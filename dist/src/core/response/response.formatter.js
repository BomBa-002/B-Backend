export const response = {
    success(data, message = 'تمت العملية بنجاح', meta) { return { success: true, message, data, meta }; },
    list(data, total, page = 1, limit = 20) { return { success: true, data, meta: { total, page, limit, pages: Math.ceil(total / limit) } }; },
    error(error, requestId) { return { success: false, error, requestId }; },
};
