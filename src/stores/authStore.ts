import { create } from 'zustand';
import Cookies from 'js-cookie';
import { APP_TOKEN_NAME } from '@/utils/constants';

export interface UserInfo {
    id?: number | string;
    email?: string;
    name?: string;
    [key: string]: unknown;
}

interface AuthState {
    isLoggedIn: boolean;
    token: string | null;
    userInfo: UserInfo | null;
    login: (token: string, expires: number | Date, userInfo?: UserInfo | null) => void;
    logout: () => void;
}

const getInitialUserInfo = (): UserInfo | null => {
    if (typeof window === 'undefined') return null;
    try {
        const raw = localStorage.getItem('userInfo');
        return raw ? (JSON.parse(raw) as UserInfo) : null;
    } catch {
        return null;
    }
};

export const useAuthStore = create<AuthState>((set) => {
    const savedToken = Cookies.get(APP_TOKEN_NAME) || null;

    return {
        token: savedToken,
        isLoggedIn: !!savedToken,
        userInfo: getInitialUserInfo(),
        login: (token: string, expires: number | Date, userInfo?: UserInfo | null) => {
            Cookies.set(APP_TOKEN_NAME, token, { expires });
            if (userInfo !== undefined && typeof window !== 'undefined') {
                if (userInfo) {
                    localStorage.setItem('userInfo', JSON.stringify(userInfo));
                } else {
                    localStorage.removeItem('userInfo');
                }
            }
            set((state) => ({
                token,
                isLoggedIn: true,
                userInfo: userInfo !== undefined ? userInfo : state.userInfo
            }));
        },
        logout: () => {
            Cookies.remove(APP_TOKEN_NAME);
            if (typeof window !== 'undefined') {
                localStorage.removeItem('userInfo');
            }
            set({
                token: null,
                isLoggedIn: false,
                userInfo: null
            });
        }
    };
});
