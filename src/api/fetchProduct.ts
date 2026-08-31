import { fetchApi } from './fetchApi';

export const fetchProduct = (t: (key: string, params?: any) => string) => ({
    list:  async (params?: any) => {
            const { data, error } = await fetchApi(`/platform/product?${params}`, { method: 'GET' }, t);
            return { data: data?._data?.data ?? {}, error: error?.response?._data };
        }
})