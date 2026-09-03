import React from 'react';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Logo } from '@/components/common/Logo';
import { ScrollToTop } from '@/components/layouts/ScrollToTop';
import { Loading } from '@/components/common/Loading';
import { fetchDataCompany } from '@/api/fetchDataCompany';

export async function LayoutFooter() {
    const t = await getTranslations();

    return (
        <div className="footer relative">
            <ScrollToTop />
            
            <div className="info">
                <Logo className="mb-6" />
                
                {/* LƯỚI 5 CỘT: Các cột tĩnh hiện ngay, cột động có Suspense */}
                <div className="grid grid-cols-5 gap-4">
                    
                    {/* CỘT 1: Cần API -> Bọc Suspense */}
                    <React.Suspense fallback={<LoadingColumn />}>
                        <CompanyInfoAsync t={t} />
                    </React.Suspense>

                    <AboutUs t={t} />
                    <SupportMenu t={t} />
                    <AccountMenu t={t} />

                    {/* CỘT 5: Cần API -> Bọc Suspense */}
                    <React.Suspense fallback={<LoadingColumn />}>
                        <FollowUsAsync t={t} />
                    </React.Suspense>
                    
                </div>
            </div>

            <div className="coppy-right">
                <p>{t('companyInfor.copyWrite')}</p>
            </div>
        </div>
    );
}

async function CompanyInfoAsync({ t }: { t: any }) {
    const { data } = await fetchDataCompany(t as any).get();
    const dataCompany = data?.data?.[0] || {};

    return (
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
    );
}

async function FollowUsAsync({ t }: { t: any }) {
    const { data } = await fetchDataCompany(t as any).get();
    const platforms = data?.data?.[0]?.platforms || [];

    return (
        <ul className="text-sm space-y-4">
            <li className="flex flex-row items-center text-base font-bold">
                <Image src="/layout/follow-us.png" width={20} height={20} className="object-contain mr-1" alt="follow us" />
                <span>{t('companyInfor.followUs')}</span>
            </li>
            {platforms?.map((platform: any, index: number) => (
                <li key={index} className="pl-8">
                    <a href={platform.link} className="hover:underline">
                        {platform.platform_name}
                    </a>
                </li>
            ))}
        </ul>
    );
}

function LoadingColumn() {
    return (
        <div className="flex justify-center py-10 opacity-50">
            <Loading icon="spinning-circles" className="w-8 h-8 text-gray-400" />
        </div>
    );
}

function AboutUs({ t }: { t: any }) {
    return (
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
    );
}

function SupportMenu({ t }: { t: any }) {
    return (
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
    );
}

function AccountMenu({ t }: { t: any }) {
    return (
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
    );
}