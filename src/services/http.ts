import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { AppError, createAppError, mapHttpStatusToAppError } from '../lib/errors';

// Central Axios instance with base URL and defaults
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const httpClient: AxiosInstance = axios.create({
    baseURL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    // You can tune timeouts if needed
    timeout: 30000,
});

export interface HttpOptions {
    token?: string;
    params?: Record<string, unknown>;
    // Extra headers when needed
    headers?: Record<string, string>;
}

function buildConfig(options?: HttpOptions): AxiosRequestConfig {
    const config: AxiosRequestConfig = {};
    if (options?.params) {
        config.params = options.params;
    }
    if (options?.token || options?.headers) {
        config.headers = {
            ...(options.headers ?? {}),
            ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
        } as Record<string, string>;
    }
    return config;
}

export async function httpGet<T>(url: string, options?: HttpOptions): Promise<T> {
    try {
        const { data } = await httpClient.get<T>(url, buildConfig(options));
        return data;
    } catch (error) {
        throw normalizeHttpError(error);
    }
}

export async function httpPost<T>(url: string, body?: unknown, options?: HttpOptions): Promise<T> {
    try {
        const { data } = await httpClient.post<T>(url, body, buildConfig(options));
        return data;
    } catch (error) {
        throw normalizeHttpError(error);
    }
}

export async function httpPut<T>(url: string, body?: unknown, options?: HttpOptions): Promise<T> {
    try {
        const { data } = await httpClient.put<T>(url, body, buildConfig(options));
        return data;
    } catch (error) {
        throw normalizeHttpError(error);
    }
}

function normalizeHttpError(error: unknown): AppError {
    if (error instanceof AxiosError) {
        const status = error.response?.status;
        const fallback = error.response?.data?.message || error.message || 'Request failed';
        const appErr = mapHttpStatusToAppError(status, fallback);
        appErr.details = error.response?.data;
        return appErr;
    }
    if (error instanceof Error) {
        return createAppError(error.message, 'UNKNOWN');
    }
    return createAppError('Unknown error', 'UNKNOWN');
} 