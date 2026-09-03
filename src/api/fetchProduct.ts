import { fetchApi } from './fetchApi';

export const fetchProduct = (t: (key: string, params?: any) => string) => ({
    list: async (params?: string) => {
        const { data, error } = await fetchApi(`/platform/product?${params ?? ''}`, { method: 'GET' }, t);
        return { data: data?._data?.data ?? {}, error: error?.response?._data };
    },
    
    listCategory: async (params?: string) => {
        const { data, error } = await fetchApi(`/platform/product/category?${params ?? ''}`, { method: 'GET' }, t);
        return { data: data?._data?.data ?? {}, error: error?.response?._data };
    },
    
    listTag: async (params?: string) => {
        const { data, error } = await fetchApi(`/platform/product/tag?${params ?? ''}`, { method: 'GET' }, t);
        return { data: data?._data?.data ?? {}, error: error?.response?._data };
    },
    
    detail: async (params?: string | null | any) => {
        const { data, error } = await fetchApi(`/platform/product/${params ?? ''}`, { method: 'GET' }, t);
        // Note: The original code returned data?._data?.data?.data here, keeping it as is to match your data structure.
        return { data: data?._data?.data?.data ?? {}, error: error?.response?._data };
    },
    
    getProduct: async (code: string | any, params?: string) => {
        const { data, error } = await fetchApi(`/platform/product/${code}?${params ?? ''}`, { method: 'GET' }, t);
        return { data: data?._data?.data ?? {}, error: error?.response?._data };
    },
    
    getVariantDetails: async (params?: string) => {
        const { data, error } = await fetchApi(`/platform/product/variant/detail?${params ?? ''}`, { method: 'GET' }, t);
        return { data: data?._data?.data ?? [], error: error?.response?._data };
    }
});
