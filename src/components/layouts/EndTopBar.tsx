'use client';

import React from 'react';
import {usePathname, useRouter} from 'next/navigation';
import {SearchMain} from '@/components/common/SearchMain';
import { useAuthStore } from '@/stores/authStore';

export function EndTopBar() {
    const pathname = usePathname();
    const router = useRouter();

    const isLoggedIn = useAuthStore(state => state.isLoggedIn);

    return (
        <div className="topbar-end">
            <ul className="topbar-menu">
                <li className="flex items-center justify-center">
                    <SearchMain key={pathname}/>
                </li>
                <li className="relative p-2 flex items-center justify-center rounded-full cursor-pointer"
                    onClick={() => {
                        router.push(`/shopping-cart?tab=0`)
                    }}>
                    <i className="pi pi-shopping-cart text-center !text-[24px] text-[#9C826B]"></i>
                    {/*v-if="countCart > 0"*/}
                    <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-[10px] font-bold bg-[#A75B51] text-white rounded-full leading-none">
                        {/*{ countCart }*/}
                        5
                    </span>
                </li>
                <li>
                    <div>
                        {isLoggedIn ? (
                            <button>Chi tiết tài khoản</button>
                        ) : (
                            <button>Đăng nhập</button>
                        )}
                    </div>
                </li>
            </ul>
        </div>
    );
}
