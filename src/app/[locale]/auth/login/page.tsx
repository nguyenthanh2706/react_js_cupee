import React, { Suspense } from 'react';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { Loading } from '@/components/common/Loading';
import LoginForm from './loginForm';

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale });
    return { title: t('auth.login') };
}

export default async function LoginPage({ params }: { params: Params }) {
    const { locale } = await params;
    const t = await getTranslations({ locale });

    return (
        <div>
            <div className="banner">
                <Image
                    src="/layout/background.webp"
                    className="img-banner"
                    alt="customize"
                    width={1920}
                    height={400}
                    priority
                />
                <Breadcrumb
                    className="t-breadcrumb"
                    model={[
                        { label: t('breadcrumb.homePage'), url: '/introduce/company-info' },
                        { label: t('breadcrumb.login') }
                    ]}
                />
            </div>
            <div className="auth">
                <div className="auth-screen">
                    <div className="title">{t('auth.login')}</div>
                    <Suspense
                        fallback={
                            <div className="flex justify-center items-center py-10">
                                <Loading className="w-8 h-8" color="black" icon="spinning-circles" />
                            </div>
                        }
                    >
                        <LoginForm />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
