import {create} from 'zustand';
import Cookies from 'js-cookie';
import {APP_TOKEN_NAME} from "@/utils/constants";

interface AuthState {
    isLoggedIn: boolean;
    token: string | null;
    login: (token: string, expires: any) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
    const savedToken = Cookies.get(APP_TOKEN_NAME) || null;

    return {
        token: savedToken,
        isLoggedIn: !!savedToken,
        login: (token: string, expires) => {
            Cookies.set(APP_TOKEN_NAME, token, {expires: expires});
            set({isLoggedIn: true});
        },
        logout: () => {
            Cookies.remove(APP_TOKEN_NAME);
            set({isLoggedIn: false});
        },
    }
});
