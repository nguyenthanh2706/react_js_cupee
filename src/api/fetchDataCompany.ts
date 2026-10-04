import { fetchApi } from './fetchApi';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';
const isServer = typeof window === 'undefined';

export const fetchDataCompany = (t: (key: string, params?: any) => string) => ({
    get: async () => {
        if (isServer) {
            const res = await fetch(`${BASE_URL}/platform/introduce/company-info`, { next: { revalidate: 3600 } });
            const json = await res.json();
            return { data: json?.data ?? {}, error: null };
        }
        const { data, error } = await fetchApi(`/platform/introduce/company-info`, { method: 'GET' }, t);
        return { data: data?._data?.data ?? {}, error: error?.response?._data };
    }
})