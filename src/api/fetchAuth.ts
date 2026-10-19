import { fetchApi } from './fetchApi';

export interface LoginPayload {
    email: string;
    password: string;
}

export interface ForgotPasswordPayload {
    email: string;
}

export interface ResetPasswordPayload {
    email: string;
    token: string;
    password: string;
}

export interface AuthUser {
    id?: number | string;
    email?: string;
    name?: string;
    [key: string]: unknown;
}

export interface LoginResponseData {
    access_token?: string;
    user?: AuthUser;
    [key: string]: unknown;
}

export interface ApiErrorResponse {
    code?: number;
    message?: string;
    messages?: string[] | { message?: string };
    [key: string]: unknown;
}

export const fetchAuth = (t: (key: string, params?: any) => string) => {
    const login = async (payload: LoginPayload): Promise<{ data: LoginResponseData | null; error: ApiErrorResponse | null }> => {
        const { data, error } = await fetchApi('/customer/login', { data: payload, method: 'POST' }, t);
        return {
            data: (data?._data?.data ?? data?._data ?? null) as LoginResponseData | null,
            error: (error?.response?._data ?? error ?? null) as ApiErrorResponse | null
        };
    };

    const forgotPassword = async (payload: ForgotPasswordPayload): Promise<{ data: unknown; error: ApiErrorResponse | null }> => {
        const { data, error } = await fetchApi('/customer/forgot-password', { data: payload, method: 'POST' }, t);
        return {
            data: data?._data?.data ?? data?._data ?? null,
            error: (error?.response?._data ?? error ?? null) as ApiErrorResponse | null
        };
    };

    const resetPassword = async (payload: ResetPasswordPayload): Promise<{ data: unknown; error: ApiErrorResponse | null }> => {
        const { data, error } = await fetchApi('/customer/reset-password', { data: payload, method: 'POST' }, t);
        return {
            data: data?._data?.data ?? data?._data ?? null,
            error: (error?.response?._data ?? error ?? null) as ApiErrorResponse | null
        };
    };

    return {
        login,
        forgotPassword,
        resetPassword
    };
};
