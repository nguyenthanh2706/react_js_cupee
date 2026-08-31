import {create} from 'zustand';
import {fetchCart} from "@/api/fetchCart";

interface CartState {
    countCart: number;
    getCart: (t: any, locale: string) => Promise<void>;
}

export const useCartStore = create<CartState>((set) => {
    const initialCartCount = 0;
    const getCart = async (t: any, locale: string) => {
        const { data } = await fetchCart(t).get(`lang=${locale}`);
        const quantity = data?.data?.items?.length || 0;
        set({ countCart: quantity });
    };
    return {
        countCart: initialCartCount,
        getCart,
    };
});
