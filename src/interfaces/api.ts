export interface ApiOptions<T = unknown> {
    data?: Record<string, any> | null;
    method?: HttpMethod;
    timeout?: number;
    _retried?: boolean;
    headers?: Record<string, string>;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
