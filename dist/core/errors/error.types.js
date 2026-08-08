export class AppError extends Error {
    code;
    statusCode;
    details;
    category;
    isOperational = true;
    constructor(code, message, statusCode = 500, details, category = 'SYSTEM') {
        super(message);
        this.code = code;
        this.statusCode = statusCode;
        this.details = details;
        this.category = category;
        this.name = 'AppError';
    }
}
