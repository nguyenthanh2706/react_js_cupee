
import { fetchApi } from './fetchApi';
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';
const isServer = typeof window === 'undefined';

export const fetchProduct = (t: (key: string, params?: any) => string) => ({
    list: async (params?: string) => {
        if (isServer) {
            const res = await fetch(`${BASE_URL}/platform/product?${params ?? ''}`, { next: { revalidate: 60 } });
            const json = await res.json();
            return { data: json?.data ?? {}, error: null };
        }
        const { data, error } = await fetchApi(`/platform/product?${params ?? ''}`, { method: 'GET' }, t);
        return { data: data?._data?.data ?? {}, error: error?.response?._data };
    },

    listCategory: async (params?: string) => {
        if (isServer) {
            const res = await fetch(`${BASE_URL}/platform/product/category?${params ?? ''}`, { next: { revalidate: 60 } });
            const json = await res.json();
            return { data: json?.data ?? {}, error: null };
        }
        const { data, error } = await fetchApi(`/platform/product/category?${params ?? ''}`, { method: 'GET' }, t);
        return { data: data?._data?.data ?? {}, error: error?.response?._data };
    },

    listTag: async (params?: string) => {
        if (isServer) {
            const res = await fetch(`${BASE_URL}/platform/product/tag?${params ?? ''}`, { next: { revalidate: 60 } });
            const json = await res.json();
            return { data: json?.data ?? {}, error: null };
        }
        const { data, error } = await fetchApi(`/platform/product/tag?${params ?? ''}`, { method: 'GET' }, t);
        return { data: data?._data?.data ?? {}, error: error?.response?._data };
    },

    detail: async (params?: string | null | any) => {
        if (isServer) {
            const res = await fetch(`${BASE_URL}/platform/product/${params ?? ''}`, { next: { revalidate: 60 } });
            const json = await res.json();
            return { data: json?.data?.data ?? {}, error: null };
        }
        const { data, error } = await fetchApi(`/platform/product/${params ?? ''}`, { method: 'GET' }, t);
        // Note: The original code returned data?._data?.data?.data here, keeping it as is to match your data structure.
        return { data: data?._data?.data?.data ?? {}, error: error?.response?._data };
    },

    getProduct: async (code: string | any, params?: string) => {
        if (isServer) {
            const res = await fetch(`${BASE_URL}/platform/product/${code}?${params ?? ''}`, { next: { revalidate: 60 } });
            const json = await res.json();
            return { data: json?.data ?? {}, error: null };
        }
        const { data, error } = await fetchApi(`/platform/product/${code}?${params ?? ''}`, { method: 'GET' }, t);
        return { data: data?._data?.data ?? {}, error: error?.response?._data };
    },

    getVariantDetails: async (params?: string) => {
        if (isServer) {
            const res = await fetch(`${BASE_URL}/platform/product/variant/detail?${params ?? ''}`, { next: { revalidate: 60 } });
            const json = await res.json();
            return { data: json?.data ?? [], error: null };
        }
        const { data, error } = await fetchApi(`/platform/product/variant/detail?${params ?? ''}`, { method: 'GET' }, t);
        return { data: data?._data?.data ?? [], error: error?.response?._data };
    }
});
