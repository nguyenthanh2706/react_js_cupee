import React from 'react';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import ForgotPasswordForm from './forgotPasswordForm';

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale });
    return { title: t('auth.forgotPassword') };
}

export default async function ForgotPasswordPage({ params }: { params: Params }) {
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
                        { label: t('breadcrumb.forgotPassword') }
                    ]}
                />
            </div>
            <div className="auth">
                <div className="auth-screen">
                    <div className="title">{t('auth.forgotPassword')}</div>
                    <ForgotPasswordForm />
                </div>
            </div>
        </div>
    );
}
