import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { Loading } from '@/components/common/Loading';
import { fetchIntroduce } from '@/api/fetchIntroduce';
import GuideLayout from './guideLayout';
import type { Section } from './types';

type Params = Promise<{ locale: string }>;

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations();
    return { title: t('introduce.guide.title') };
}

export default async function GuidePage({ params }: { params: Params }) {
    const t = await getTranslations();

    return (
        <>
            <div className="banner">
                <div className="title-banner">{t('introduce.guide.title')}</div>
                <Breadcrumb
                    className="t-breadcrumb"
                    model={[
                        { label: t('breadcrumb.homePage'), url: '/introduce/company' },
                        { label: t('breadcrumb.introduce'), url: '/introduce/company' },
                        { label: t('breadcrumb.guide') }
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
                <GuideContentContainer params={params} />
            </Suspense>
        </>
    );
}

async function GuideContentContainer({ params }: { params: Params }) {
    const { locale } = await params;
    const t = await getTranslations();
    const { data } = await fetchIntroduce(t).listGuide(`lang=${locale}`);

    const rawSections = Array.isArray(data)
        ? data[0]?.sections
        : data?.data?.[0]?.sections ?? data?.sections;
    const listGuide: Section[] = rawSections || [];

    return <GuideLayout listGuide={listGuide} />;
}
