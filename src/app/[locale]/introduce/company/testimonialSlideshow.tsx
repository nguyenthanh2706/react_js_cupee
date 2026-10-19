'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import type { Review } from './types';

interface TestimonialItem {
    name: string;
    code: string;
    content: string;
    avatar: string;
    productImage: string;
    hasVideo: boolean;
}

interface Props {
    testimonials?: Review[];
}

export default function TestimonialSlideshow({
    testimonials: rawTestimonials = []
}: Props) {
    const t = useTranslations('introduceCompany.testimonials');

    const testimonials = useMemo<TestimonialItem[]>(() => {
        if (!Array.isArray(rawTestimonials)) return [];
        return rawTestimonials.map((item) => ({
            code: item.code || '',
            name: item.customer_name || '',
            content: item.content || '',
            avatar: item.image?.path_image_original || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
            hasVideo: false,
            productImage: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop'
        }));
    }, [rawTestimonials]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerSlide = 3;

    const testimonialGroups = useMemo(() => {
        const groups: TestimonialItem[][] = [];
        for (let i = 0; i < testimonials.length; i += itemsPerSlide) {
            groups.push(testimonials.slice(i, i + itemsPerSlide));
        }
        return groups;
    }, [testimonials]);

    const nextSlide = () => {
        if (currentIndex < testimonialGroups.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    if (testimonials.length === 0) {
        return null;
    }

    return (
        <section className="bg-[#f4f1ea] py-16 px-4">
            <div className="layout-content mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#000000] mb-3 uppercase tracking-wide">
                        {t('title')}
                    </h2>
                    <p className="text-[#a38d78] text-sm md:text-base">{t('subtitle')}</p>
                </div>

                <div className="relative">
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-out"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {testimonialGroups.map((group, groupIndex) => (
                                <div key={groupIndex} className="w-full flex-shrink-0">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-4">
                                        {group.map((item) => (
                                            <div
                                                key={item.code}
                                                className="relative flex overflow-hidden transition-shadow duration-300"
                                            >
                                                <div className="mt-[50px] px-6 bg-white rounded-3xl max-w-[70%] shadow-sm">
                                                    <div className="relative top-[-30px] flex flex-col justify-center items-center">
                                                        <div className="relative">
                                                            <img
                                                                src={item.avatar}
                                                                alt={item.name}
                                                                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow"
                                                            />
                                                        </div>
                                                        <h3 className="font-semibold text-[#000000] text-base mt-2">
                                                            {item.name}
                                                        </h3>

                                                        <div className="flex justify-center mb-3 text-base text-red-500">
                                                            {'★'.repeat(5)}
                                                        </div>

                                                        <p className="text-gray-700 text-sm leading-relaxed text-center line-clamp-4">
                                                            {item.content}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div
                                                    className="absolute top-0 right-0 max-w-[100%] rounded-tl-[50px] rounded-br-[50px] h-48 bg-gray-100"
                                                    style={{ zIndex: 0 }}
                                                >
                                                    <img
                                                        src={item.productImage}
                                                        alt={item.name}
                                                        className="w-full h-full rounded-tl-[50px] rounded-br-[50px] object-cover"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Navigation Dots & Buttons */}
                {testimonialGroups.length > 1 && (
                    <div className="flex justify-center items-center gap-3 mt-8">
                        <button
                            type="button"
                            onClick={prevSlide}
                            disabled={currentIndex === 0}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all bg-white shadow-sm cursor-pointer ${
                                currentIndex === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:scale-110'
                            }`}
                        >
                            <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <div className="flex gap-2">
                            {testimonialGroups.map((_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => goToSlide(index)}
                                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                                        currentIndex === index ? 'w-8 bg-gray-800' : 'w-2 bg-gray-400 hover:bg-gray-600'
                                    }`}
                                />
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={nextSlide}
                            disabled={currentIndex === testimonialGroups.length - 1}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all bg-white shadow-sm cursor-pointer ${
                                currentIndex === testimonialGroups.length - 1 ? 'opacity-40 cursor-not-allowed' : 'hover:scale-110'
                            }`}
                        >
                            <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
