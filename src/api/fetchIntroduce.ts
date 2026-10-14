import { fetchApi } from './fetchApi';
import { serverFetchJson } from './serverFetch';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';
const isServer = typeof window === 'undefined';

export const fetchIntroduce = (t: (key: string, params?: any) => string) => ({
    listPolicy: async (params?: string) => {
        if (isServer) {
            const { data, error } = await serverFetchJson(`${BASE_URL}/platform/introduce/policy?${params ?? ''}`, {
                next: { revalidate: 3600 }
            });
            return { data: data ?? {}, error };
        }
        const { data, error } = await fetchApi(`/platform/introduce/policy?${params ?? ''}`, { method: 'GET' }, t);
        return { data: data?._data?.data ?? {}, error: error?.response?._data };
    },
    listGuide: async (params?: string) => {
        if (isServer) {
            const { data, error } = await serverFetchJson(`${BASE_URL}/platform/introduce/guide?${params ?? ''}`, {
                next: { revalidate: 3600 }
            });
            return { data: data ?? {}, error };
        }
        const { data, error } = await fetchApi(`/platform/introduce/guide?${params ?? ''}`, { method: 'GET' }, t);
        return { data: data?._data?.data ?? {}, error: error?.response?._data };
    }
});
