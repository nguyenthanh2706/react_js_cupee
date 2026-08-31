import { fetchApi } from './fetchApi';

export interface IPayloadCart {
    product_variant_code: string;
    quantity: number;
    customizations: ICustomization[] | null;
}
export interface ICustomization {
    type: string;
    option_code: string;
    text_value: string | null;
}

export const fetchCart = (t: (key: string, params?: any) => string) => {
    const get = async (params?: any) => {
        const { data, error } = await fetchApi(`/platform/cart?${params}`, { method: 'GET' }, t, params);
        return { data: data?._data?.data ?? {}, error: error?.response?._data };
    };

    const addToCart = async (payload: IPayloadCart) => {
        const { data, error } = await fetchApi('/platform/cart/add-item', { data: payload, method: 'POST' }, t);
        return { data: data?._data?.data ?? {}, error: error?.response?._data };
    };

    const removeCart = async (id: string) => {
        const { data, error } = await fetchApi(`/platform/cart/remove-item/${id}`, { method: 'DELETE' }, t, id);
        return { data: data?._data?.data ?? {}, error: error?.response?._data };
    };

    const updateCartItem = async (code: string, payload: { quantity?: number; product_variant_code?: string }) => {
        const { data, error } = await fetchApi(`/platform/cart/update-item/${code}`, { method: 'PUT', data: payload }, t, code);
        return { data: data?._data?.data ?? {}, error: error?.response?._data };
    };

    const getVoucher = async (id: string) => {
        const { data, error } = await fetchApi(`/platform/cart/voucher/${id}`, { method: 'GET' }, t, id);
        return { data: data?._data?.data ?? {}, error: error?.response?._data };
    };

    return {
        get,
        addToCart,
        removeCart,
        updateCartItem,
        getVoucher
    };
};
