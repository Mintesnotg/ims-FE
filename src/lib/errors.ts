export type AppErrorCode =
    | 'UNAUTHORIZED'
    | 'FORBIDDEN'
    | 'NOT_FOUND'
    | 'NETWORK'
    | 'TIMEOUT'
    | 'SERVER'
    | 'UNKNOWN';

export interface AppError extends Error {
    code: AppErrorCode;
    status?: number;
    details?: unknown;
}

export function createAppError(message: string, code: AppErrorCode, status?: number, details?: unknown): AppError {
    const err = new Error(message) as AppError;
    err.code = code;
    err.status = status;
    err.details = details;
    return err;
}

export function mapHttpStatusToAppError(status?: number, fallbackMessage?: string): AppError {
    switch (status) {
        case 401:
            return createAppError('You are not authorized. Please login again.', 'UNAUTHORIZED', status);
        case 403:
            return createAppError('You do not have permission to perform this action.', 'FORBIDDEN', status);
        case 404:
            return createAppError('Requested resource was not found.', 'NOT_FOUND', status);
        case 408:
            return createAppError('The request timed out. Please try again.', 'TIMEOUT', status);
        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
            return createAppError('Server error. Please try again later.', 'SERVER', status);
        default:
            return createAppError(fallbackMessage ?? 'Something went wrong.', 'UNKNOWN', status);
    }
}

export function getUserFacingMessage(error: unknown): string {
    if (typeof error === 'string') return error;
    if (error && typeof error === 'object' && 'message' in (error as any)) {
        return (error as any).message as string;
    }
    return 'Something went wrong.';
} 