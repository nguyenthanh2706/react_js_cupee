'use client';

import React, {useEffect} from 'react';
import Image from 'next/image';
import {usePathname, useRouter} from 'next/navigation';
import {useTranslations, useLocale} from 'next-intl';
import {SearchMain} from '@/components/common/SearchMain';
import {useAuthStore} from '@/stores/authStore';
import {useCartStore} from '@/stores/cartStore';
import {Button} from '@primereact/ui/button';

export function EndTopBar() {
    const pathname = usePathname();
    const router = useRouter();
    const t = useTranslations();
    const locale = useLocale();

    // 1. Rút biến state (số lượng) ra để vẽ lên giao diện
    const isLoggedIn = useAuthStore(state => state.isLoggedIn);
    const countCart = useCartStore((state) => state.countCart);

    // 2. Rút hàm action ra
    const getCart = useCartStore((state) => state.getCart);

    // 3. Khi Component vừa load, gọi hàm lấy giỏ hàng
    useEffect(() => {
        getCart(t, locale);
    }, [getCart, locale, t]);

    const toggle = () =>{
        return;
    }
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
                    {countCart > 0 && (
                        <span
                            className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-[10px] font-bold bg-[#A75B51] text-white rounded-full leading-none">
                            {countCart}
                        </span>
                    )}
                </li>
                {
                    isLoggedIn ? (
                        <li>
                            <button
                                type="button"
                                className="!bg-[#F4F1EA] !border !border-[#000000] !rounded-full !px-4 !py-2 flex items-center gap-3 hover:!bg-[#ece7de] transition"
                                onClick={() => {
                                    toggle()
                                }}
                            >
                                <i v-else className="pi pi-user"></i>
                        </button>
                        {/*<Menu></Menu>*/}
                    </li>
                    ) : (
                        <li  className="flex items-center gap-2">
                            <Button
                                size="small"
                                onClick={() => {
                                    router.push(`/${locale}/register`)
                                }}
                                variant="link"
                                className="whitespace-nowrap !bg-[#000000] !text-[#FFFFFF] !rounded-full !px-4 !py-2 flex items-center gap-3 transition"
                            >
                                <Image src={"/svg/user.svg"} alt="user" width={20} height={20}/>
                                <span>{ t('btn.register') }</span>
                            </Button>
                            <span>|</span>
                            <Button
                                size="small"
                                className="!bg-[#000000] !text-[#FFFFFF] !rounded-full !px-4 !py-2 flex items-center gap-2 transition whitespace-nowrap"
                                onClick={() => {
                                    router.push(`/${locale}/auth/login`)
                                }}
                                variant="link"
                            >
                                <Image src={"/svg/user.svg"} alt="user" width={20} height={20}/>
                                <span>{ t('btn.login') }</span>
                            </Button>
                        </li>
                    )
                }
            </ul>
        </div>
    );
}
