'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Logo } from '@/components/common/Logo';
import {useCompanyStore} from "@/stores/companyStore";

export function LayoutFooter() {
    const t = useTranslations();

    // khai bao bien
    const footerRef = useRef<HTMLDivElement>(null);
    const [showScrollToTopButton, setShowScrollToTopButton] = useState(false);
    const [isNearFooter, setIsNearFooter] = useState(false);
    const dataCompany = useCompanyStore(state => state.detail);
    const getDataCompany = useCompanyStore((state) => state.getInfo);

    // Call First Data company
    useEffect(() => {
        getDataCompany(t);
    }, [getDataCompany, t]);
    // Xử lý sự kiện cuộn trang để hiện nút Scroll To Top
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollToTopButton(window.scrollY > 150);

            if (footerRef.current) {
                const scrollPositionBottom = window.scrollY + window.innerHeight;
                const footerPositionTop = footerRef.current.offsetTop;
                setIsNearFooter(scrollPositionBottom >= footerPositionTop);
            }
        };

        // Giữ lại { passive: true } để trình duyệt tối ưu cuộn trang
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const buttonClasses = isNearFooter
        ? 'absolute top-[-25px] right-10 z-10'
        : 'fixed bottom-10 right-10 z-50';

    // Logic cuộn mượt
    const scrollToTopAdvanced = () => {
        const targetPosition = 0;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1200;
        let startTime: number | null = null;

        const easeInOutQuint = (time: number, b: number, c: number, d: number) => {
            if ((time /= d / 2) < 1) return (c / 2) * time * time * time * time * time + b;
            return (c / 2) * ((time -= 2) * time * time * time * time + 2) + b;
        };

        const animation = (currentTime: number) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutQuint(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    };

    return (
        <div className="footer relative" ref={footerRef}>
            {showScrollToTopButton && (
                <button
                    onClick={scrollToTopAdvanced}
                    className={`${buttonClasses} transition-all duration-300 text-5 border px-3 py-5 rounded-full font-bold hover:bg-black hover:text-white cursor-pointer`}
                >
                    TOP
                </button>
            )}
            
            <div className="info">
                <Logo className="mb-6" />
                <div className="grid grid-cols-5 gap-4">
                    <ul className="space-y-4">
                        <li className="text-sm">{t('companyInfor.tax')} : {dataCompany?.tax_code ?? ''}</li>
                        <li className="text-sm">
                            {t('companyInfor.email')}:
                            <a href={`mailto:${dataCompany?.email ?? ''}`} className="text-blue-500 ml-1">
                                {dataCompany?.email ?? ''}
                            </a>
                        </li>
                        <li className="text-sm">
                            {t('companyInfor.tel')}: 
                            <a href="tel:0248988984" className="hover:underline ml-1">
                                {dataCompany?.hotline ?? ''}
                            </a>
                        </li>
                        <li className="text-sm">{t('companyInfor.address')}: {dataCompany?.address ?? ''}</li>
                    </ul>

                    <ul className="text-sm space-y-4">
                        <li className="flex flex-row items-center text-base font-bold">
                            <Image src="/layout/about-us.png" width={20} height={20} className="object-contain mr-1" alt="about us" />
                            <span>{t('companyInfor.aboutUs')}</span>
                        </li>
                        <li className="pl-8">
                            <Link className="hover:underline" href={'/introduce/company-info'}>
                                {t('layout.menu.introduce')}
                            </Link>
                        </li>
                        <li className="pl-8">
                            <Link className="hover:underline" href={'/product/list'}>
                                {t('companyInfor.listProduct')}
                            </Link>
                        </li>
                    </ul>

                    <ul className="text-sm space-y-4">
                        <li className="flex flex-row items-center text-base font-bold">
                            <Image src="/layout/support.png" width={20} height={20} className="object-contain mr-1" alt="support" />
                            <span>{t('companyInfor.support')}</span>
                        </li>
                        <li className="pl-8">
                            <Link className="hover:underline" href={'/introduce/policy'}>
                                {t('introduce.nav.policy')}
                            </Link>
                        </li>
                        <li className="pl-8">
                            <Link className="hover:underline" href={'/introduce/guide'}>
                                {t('introduce.nav.guide')}
                            </Link>
                        </li>
                    </ul>

                    <ul className="text-sm space-y-4">
                        <li className="flex flex-row items-center text-base font-bold">
                            <Image src="/layout/user.png" width={20} height={20} className="object-contain mr-1" alt="account" />
                            <span>{t('companyInfor.account')}</span>
                        </li>
                        <li className="pl-8">
                            <Link className="hover:underline" href="/login">
                                {t('btn.login')}
                            </Link>
                        </li>
                        <li className="pl-8">
                            <Link className="hover:underline" href="/register">
                                {t('btn.register')}
                            </Link>
                        </li>
                        <li className="pl-8">
                            <Link className="hover:underline" href="/order-tracking">
                                {t('layout.menu.orderTracking')}
                            </Link>
                        </li>
                    </ul>

                    <ul className="text-sm space-y-4">
                        <li className="flex flex-row items-center text-base font-bold">
                            <Image src="/layout/follow-us.png" width={20} height={20} className="object-contain mr-1" alt="follow us" />
                            <span>{t('companyInfor.followUs')}</span>
                        </li>
                        {dataCompany?.platforms?.map((platform: any, index: number) => (
                            <li key={index} className="pl-8">
                                <a href={platform.link} className="hover:underline">
                                    {platform.platform_name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="coppy-right mt-8">
                <p>{t('companyInfor.copyWrite')}</p>
            </div>
        </div>
    );
}
