import { fetchApi } from './fetchApi';

export const fetchDataCompany = (t: (key: string, params?: any) => string) => ({
    get:  async () => {
        const { data, error } = await fetchApi(`/platform/introduce/company-info`, { method: 'GET' }, t);
        return { data: data?._data?.data ?? {}, error: error?.response?._data };
    }
})