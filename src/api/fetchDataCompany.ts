import { fetchApi } from './fetchApi';
import { serverFetchJson } from './serverFetch';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';
const isServer = typeof window === 'undefined';

export const fetchDataCompany = (t: (key: string, params?: any) => string) => ({
    get: async () => {
        if (isServer) {
            const { data, error } = await serverFetchJson(`${BASE_URL}/platform/introduce/company-info`, {
                next: { revalidate: 3600 }
            });
            return { data: data ?? {}, error };
        }
        const { data, error } = await fetchApi(`/platform/introduce/company-info`, { method: 'GET' }, t);
        return { data: data?._data?.data ?? {}, error: error?.response?._data };
    }
});