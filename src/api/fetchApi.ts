import { useAuthStore } from '@/stores/authStore';
import { toast } from '@primereact/ui/toaster';

interface ApiOptions<T = unknown> {
    data?: Record<string, any> | null;
    method?: HttpMethod;
    timeout?: number;
    _retried?: boolean;
    headers?: Record<string, string>;
}
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

let isRefreshing: boolean = false;
let isInvalid: boolean = false;
let failedQueue: {
    resolve: (token: string) => void;
    reject: (error: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null) => {
    failedQueue.forEach((prom) => {
        if (error) prom.reject(error);
        else prom.resolve(token!);
    });
    failedQueue = [];
};

export async function fetchApi<T = any>(
    url: string,
    apiOptions: ApiOptions<T>,
    t: (key: string, params?: any) => string,
    params?: string
) {
    const token = useAuthStore.getState().token;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const method = apiOptions.method ?? 'GET';

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(token && token.trim() ? { Authorization: `Bearer ${token}` } : {}),
        ...(apiOptions.headers ?? {})
    };

    const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;

    const fetchConfig: RequestInit = {
        method,
        headers,
        ...(apiOptions.data ? { body: JSON.stringify(apiOptions.data) } : {})
    };

    try {
        const response = await fetch(fullUrl, fetchConfig);
        const resData = await response.json().catch(() => null);

        if (!response.ok) {
            if (!resData) {
                toast.contrast({
                    title: t('text.error'),
                    description: t('text.systemError'),
                    group: 'basic'
                })
            }
            const code = resData?.code || response.status;
            const message = Array.isArray(resData?.messages)
                ? resData?.messages?.[0]
                : resData?.messages?.message || resData?.message;

            if (code === 401 && message === 'token.expired' && !apiOptions._retried) {
                return await handleRefreshing(url, apiOptions, t);
            }

            if (code === 401 && message === 'token.invalid') {
                isInvalid = true;
                handleError(code, message, t);
                return { data: null, error: { response: { _data: resData } } };
            } else {
                isInvalid = false;
            }

            if (!isInvalid) {
                handleError(code, message, t);
            }

            return { data: null, error: { response: { _data: resData } } };
        }

        isInvalid = false;
        return { data: { _data: resData }, error: null };
    } catch (error: any) {
        return { data: null, error };
    }
}

const handleRefreshing = async (
    url: string,
    apiOptions: ApiOptions,
    t: (key: string, params?: any) => string,
): Promise<any> => {
    try {
        if (isRefreshing) {
            return new Promise(function (resolve, reject) {
                failedQueue.push({ resolve, reject });
            })
                .then(async () => {
                    return await fetchApi(
                        url,
                        { ...apiOptions, _retried: true },
                        t
                    );
                })
                .catch((err) => {
                    return Promise.reject(err);
                });
        }
        isRefreshing = true;
        const newToken = await refreshAccessToken(apiOptions, t);
        if (newToken) {
            isRefreshing = false;
            processQueue(null, newToken);
            return await fetchApi(
                url,
                { ...apiOptions, _retried: true },
                t
            );
        }
    } catch (_error) {
        processQueue(_error, null);
    }
};

async function refreshAccessToken(
    apiOptions: ApiOptions,
    t: (key: string, params?: any) => string
): Promise<string | null> {
    try {
        const { data } = await fetchApi(
            '/customer/refresh',
            { ...apiOptions, _retried: false, method: 'POST' },
            t
        );

        const newToken = data?._data?.data?.access_token;
        if (newToken) {
            const d = new Date();
            d.setUTCHours(23, 59, 59, 999);
            useAuthStore.getState().login(newToken, d);
            return newToken;
        }
        return null;
    } catch (error) {
        return null;
    }
}

const handleError = (
    status: number,
    message: string,
    t: (key: string, params?: any) => string
): void => {
    switch (status) {
        case 401:
            switch (message) {
                case 'token.expired':
                    break;
                case 'auth.invalid':
                    toast.contrast({
                        title: t('text.error'),
                        description: t(message),
                        group: 'basic'
                    })
                    break;
                case 'token.invalid':
                case 'auth.unauthorized':
                case 'token.blacklist':
                default:
                    toast.contrast({
                        title: t('text.error'),
                        description: t(message),
                        group: 'basic'
                    })
                    useAuthStore.getState().logout();
                    break;
            }
            break;
        case 400:
        case 404:
            if (message === 'common.not_found') {
                break;
            }
            break;
        case 429:
        case 403:
        case 500:
            switch (message) {
                case 'auth.inactive':
                    toast.contrast({
                        title: t('text.error'),
                        description: message ? t(message) : t('auth.inactive'),
                        group: 'basic'
                    })
                    break;
                case 'errors.invalid_reset_password_token':
                    break;
                default:
                    toast.contrast({
                        title: t('text.error'),
                        description: message ? t(message) : t('auth.systemError'),
                        group: 'basic'
                    })
                    break;
            }
    }
};
