'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

interface Feature {
    id: number;
    icon: string;
    title: string;
    description: string;
}

export default function CupeeFeatures() {
    const t = useTranslations('introduceCompany.features');

    const features: Feature[] = [
        {
            id: 1,
            icon: '/images/introduce/company/features_1.png',
            title: t('items.quality.title'),
            description: t('items.quality.desc')
        },
        {
            id: 2,
            icon: '/images/introduce/company/features_2.png',
            title: t('items.variety.title'),
            description: t('items.variety.desc')
        },
        {
            id: 3,
            icon: '/images/introduce/company/features_3.png',
            title: t('items.easy.title'),
            description: t('items.easy.desc')
        },
        {
            id: 4,
            icon: '/images/introduce/company/features_4.png',
            title: t('items.service.title'),
            description: t('items.service.desc')
        }
    ];

    return (
        <section className="py-16 bg-white">
            <div className="layout-content mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#000000] mb-3 uppercase tracking-wide">
                        {t('title')}
                    </h2>
                    <p className="text-[#a38d78] text-sm md:text-base">{t('subtitle')}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {features.map((feature) => (
                        <div key={feature.id}>
                            <div className="flex flex-col items-center justify-items-center text-center">
                                <div className="w-16 h-16 mb-3 grid place-items-center relative">
                                    <Image
                                        src={feature.icon}
                                        alt={feature.title}
                                        width={64}
                                        height={64}
                                        className="object-contain"
                                    />
                                </div>
                                <p className="font-bold text-[18px] text-black/80 pb-4">{feature.title}</p>
                                <p className="text-[#000000CC] max-w-[250px]">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
