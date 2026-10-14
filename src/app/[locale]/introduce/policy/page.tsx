import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { Loading } from '@/components/common/Loading';
import { fetchIntroduce } from '@/api/fetchIntroduce';
import PolicyLayout from './policyLayout';
import PolicySection from './section';
import type { Policy } from './types';

type Params = Promise<{ locale: string }>;

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations();
    return { title: t('introduce.policy.title') };
}

export default async function PolicyPage({ params }: { params: Params }) {
    const t = await getTranslations();

    return (
        <>
            <div className="banner">
                <div className="title-banner">{t('introduce.policy.title')}</div>
                <Breadcrumb
                    className="t-breadcrumb"
                    model={[
                        { label: t('breadcrumb.homePage'), url: '/introduce/company' },
                        { label: t('breadcrumb.introduce'), url: '/introduce/company' },
                        { label: t('breadcrumb.policy') }
                    ]}
                />
            </div>

            <Suspense
                fallback={
                    <div className="flex justify-center items-center min-h-[400px]">
                        <Loading className="w-10 h-10" color="black" icon="spinning-circles" />
                    </div>
                }
            >
                <PolicyContent params={params} />
            </Suspense>
        </>
    );
}

async function PolicyContent({ params }: { params: Params }) {
    const { locale } = await params;
    const t = await getTranslations();
    const { data } = await fetchIntroduce(t).listPolicy(`lang=${locale}`);

    const policies: Policy[] = (data?.data ?? []).map((policy: Partial<Policy>) => ({
        code: policy.code ?? '',
        title: policy.title ?? '',
        content: policy.content ?? ''
    }));

    return (
        <PolicyLayout policies={policies.map(({ code, title }) => ({ code, title }))}>
            {policies.map((policy) => (
                <PolicySection key={policy.code} {...policy} />
            ))}
        </PolicyLayout>
    );
}
