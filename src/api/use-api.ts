import Cookies from 'js-cookie';
import { ApiOptions } from '@/interfaces/api';
import { APP_TOKEN_NAME } from '@/utils/constants';

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

export async function useApi<T = any>(
    url: string,
    apiOptions: ApiOptions<T>,
    t: (key: string, params?: any) => string,
    $showMessage: any,
    param?: string
) {
    const token = Cookies.get(APP_TOKEN_NAME);
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
                $showMessage('error', t('text.error'), t('text.systemError'));
            }
            const code = resData?.code || response.status;
            const message = Array.isArray(resData?.messages)
                ? resData?.messages?.[0]
                : resData?.messages?.message || resData?.message;

            if (code === 401 && message === 'token.expired' && !apiOptions._retried) {
                return await handleRefreshing(url, apiOptions, t, $showMessage);
            }

            if (code === 401 && message === 'token.invalid') {
                isInvalid = true;
                handleError(code, message, t, $showMessage);
                return { data: null, error: { response: { _data: resData } } };
            } else {
                isInvalid = false;
            }

            if (!isInvalid) {
                handleError(code, message, t, $showMessage);
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
    $showMessage: any
): Promise<any> => {
    try {
        if (isRefreshing) {
            return new Promise(function (resolve, reject) {
                failedQueue.push({ resolve, reject });
            })
                .then(async () => {
                    return await useApi(
                        url,
                        { ...apiOptions, _retried: true },
                        t,
                        $showMessage
                    );
                })
                .catch((err) => {
                    return Promise.reject(err);
                });
        }
        isRefreshing = true;
        const newToken = await refreshAccessToken(apiOptions, t, $showMessage);
        if (newToken) {
            isRefreshing = false;
            processQueue(null, newToken);
            return await useApi(
                url,
                { ...apiOptions, _retried: true },
                t,
                $showMessage
            );
        }
    } catch (_error) {
        processQueue(_error, null);
    }
};

async function refreshAccessToken(
    apiOptions: ApiOptions,
    t: (key: string, params?: any) => string,
    $showMessage: any
): Promise<string | null> {
    try {
        const { data } = await useApi(
            '/customer/refresh',
            { ...apiOptions, _retried: false, method: 'POST' },
            t,
            $showMessage
        );

        const newToken = data?._data?.data?.access_token;
        if (newToken) {
            let d = new Date();
            d.setUTCHours(23, 59, 59, 999);
            Cookies.set(APP_TOKEN_NAME, newToken, { expires: d });
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
    t: (key: string, params?: any) => string,
    $showMessage: any
): void => {
    switch (status) {
        case 401:
            switch (message) {
                case 'token.expired':
                    break;
                case 'auth.invalid':
                    $showMessage('error', t('text.error'), t(message));
                    break;
                case 'token.invalid':
                case 'auth.unauthorized':
                case 'token.blacklist':
                default:
                    $showMessage('error', t('text.error'), t(message));
                    Cookies.remove(APP_TOKEN_NAME);
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
                    $showMessage('error', t('text.error'), message ? t(message) : t('auth.inactive'));
                    break;
                case 'errors.invalid_reset_password_token':
                    break;
                default:
                    $showMessage('error', t('text.error'), message ? t(message) : t('text.systemError'));
                    break;
            }
    }
};
