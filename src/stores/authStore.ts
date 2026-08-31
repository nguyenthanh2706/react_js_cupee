import { create } from 'zustand';
import Cookies from 'js-cookie';

interface AuthState {
    isLoggedIn: boolean;
    // Actions
    login: (token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    // Khi vừa mở web, đọc cookie xem có token không để set state ban đầu
    isLoggedIn: !!Cookies.get('token'),

    login: (token: string) => {
        // 1. Lưu token vào cookie
        Cookies.set('token', token, { expires: 7 }); // expires: 7 ngày
        // 2. Báo cho React cập nhật state -> Sidebar tự động nhảy thành "Chi tiết"
        set({ isLoggedIn: true });
    },

    logout: () => {
        // 1. Xóa cookie
        Cookies.remove('token');
        // 2. Báo cho React cập nhật state -> Sidebar nhảy về "Đăng nhập"
        set({ isLoggedIn: false });
    },
}));
