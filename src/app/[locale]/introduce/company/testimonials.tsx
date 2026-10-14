'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import type { Review } from './types';

interface Props {
    isLoading?: boolean;
    testimonials?: Review[];
}

export default function Testimonials({
    isLoading = false,
    testimonials: rawTestimonials = []
}: Props) {
    const t = useTranslations('introduce.company');

    const reviews = useMemo(() => {
        if (!Array.isArray(rawTestimonials)) return [];
        return rawTestimonials.map((item) => ({
            code: item.code || '',
            name: item.customer_name || '',
            content: item.content || '',
            avatar: item.image?.path_image_original || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'
        }));
    }, [rawTestimonials]);

    if (isLoading) {
        return <div className="text-gray-500 p-6 text-center">Đang tải dữ liệu...</div>;
    }

    if (reviews.length === 0) {
        return <div className="text-gray-500 p-6 text-center">Không có dữ liệu</div>;
    }

    return (
        <section className="mb-12">
            <div className="card !mb-0 p-4">
                <h2 className="text-2xl font-bold text-gray-900">{t('productReviews')}</h2>
            </div>

            <div className="p-6">
                <div
                    className={`grid gap-10 items-stretch ${
                        reviews.length >= 4
                            ? 'md:grid-cols-4'
                            : reviews.length === 3
                            ? 'md:grid-cols-3'
                            : 'md:grid-cols-2'
                    }`}
                >
                    {reviews.map((testimonial) => (
                        <div key={testimonial.code} className="card !mb-0 cursor-pointer p-4 bg-white shadow rounded-lg">
                            <div className="grid grid-cols-2 gap-4 items-center min-h-[180px]">
                                <div className="bg-yellow-50 h-full flex flex-col justify-between p-4 rounded-md">
                                    <div className="w-full flex justify-center mb-4">
                                        <div className="w-24 h-24 bg-yellow-200 rounded-full overflow-hidden">
                                            <img
                                                src={testimonial.avatar}
                                                alt={testimonial.name}
                                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-center mb-3">
                                        <div className="flex space-x-1 text-yellow-400">
                                            {'★'.repeat(5)}
                                        </div>
                                    </div>

                                    <div className="text-center font-medium">
                                        <h4 className="text-sm">{testimonial.name}</h4>
                                    </div>
                                </div>

                                <div className="text-sm text-gray-700 leading-relaxed italic">
                                    "{testimonial.content}"
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
