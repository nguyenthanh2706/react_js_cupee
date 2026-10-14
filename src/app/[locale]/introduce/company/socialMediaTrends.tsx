'use client';

import { useTranslations } from 'next-intl';

interface TrendProduct {
    name: string;
    price: string;
    image: string;
    creator: string;
    hasVideo?: boolean;
}

export default function SocialMediaTrends() {
    const t = useTranslations('introduceCompany.trends');

    const products: TrendProduct[] = [
        {
            name: 'Tách trà Sakura',
            price: 'đ120.000',
            image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=300&fit=crop',
            creator: '@minale',
            hasVideo: false
        },
        {
            name: 'Tách trà sweetie',
            price: 'đ210.000',
            image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop',
            creator: '@nhinquyen',
            hasVideo: false
        },
        {
            name: 'Đĩa Hương Trà',
            price: 'đ145.000',
            image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=300&fit=crop',
            creator: '@mocnhien_tran',
            hasVideo: true
        }
    ];

    return (
        <section className="py-16 px-4 bg-white">
            <div className="layout-content mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#333333] mb-3">{t('title')}</h2>
                    <p className="text-[#a89480] text-sm md:text-base">{t('subtitle')}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {products.map((product, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300 max-h-[250px]"
                        >
                            <div
                                className="relative overflow-hidden group rounded-lg"
                                style={{
                                    background: 'linear-gradient(to top, #dd8437 0%, #d2c4b6 50%, white 100%)'
                                }}
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full max-h-[250px] object-cover group-hover:scale-105 transition-transform duration-500"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-[#a38d78] via-transparent to-transparent opacity-90" />

                                <div className="absolute bottom-[20px] left-4 text-white font-medium drop-shadow-lg">
                                    {product.creator}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
