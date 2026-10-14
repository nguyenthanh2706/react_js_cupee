import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Loading } from '@/components/common/Loading';
import { fetchDataCompany } from '@/api/fetchDataCompany';
import HeroSection from './heroSection';
import MissionVision from './missionVision';
import FeaturedProducts from './featuredProducts';
import CupeeFeatures from './cupeeFeatures';
import TestimonialSlideshow from './testimonialSlideshow';
import SocialMediaTrends from './socialMediaTrends';
import type { CompanyDataInfo } from './types';

type Params = Promise<{ locale: string }>;

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations();
    return { title: t('breadcrumb.introduce') || 'Giới thiệu công ty' };
}

export default async function CompanyPage({ params }: { params: Params }) {
    return (
        <div className="min-h-screen">
            <Suspense
                fallback={
                    <div className="flex justify-center items-center min-h-[500px]">
                        <Loading className="w-10 h-10" color="black" icon="spinning-circles" />
                    </div>
                }
            >
                <CompanyContent params={params} />
            </Suspense>
        </div>
    );
}

async function CompanyContent({ params }: { params: Params }) {
    await params;
    const t = await getTranslations();
    const { data } = await fetchDataCompany(t).get();

    const rawCompany = Array.isArray(data)
        ? data[0]
        : data?.companies?.[0] ?? data?.data?.[0] ?? data;

    const company: CompanyDataInfo = rawCompany || {};

    return (
        <div>
            <HeroSection mediaItems={company.media ?? []} />

            <MissionVision
                missionVision={{
                    mission: company.mission ?? '',
                    vision: company.vision ?? ''
                }}
            />

            <FeaturedProducts featuredProducts={company.featuredProducts ?? []} />

            <CupeeFeatures />

            <TestimonialSlideshow testimonials={company.reviews ?? []} />

            <SocialMediaTrends />
        </div>
    );
}
