'use client';

import { useState, useMemo, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import {
    CarouselRoot,
    CarouselContent,
    CarouselItem,
    CarouselPrev,
    CarouselNext
} from '@primereact/ui/carousel';
import ListCategory from './list/listCategory';
import ProductCard from './productCard';
import type { FeaturedProduct, LocalProductCard } from './types';

interface Props {
    isLoading?: boolean;
    featuredProducts?: FeaturedProduct[];
}

export default function FeaturedProducts({ isLoading = false, featuredProducts = [] }: Props) {
    const t = useTranslations();
    const router = useRouter();

    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [wishlistCodes, setWishlistCodes] = useState<Record<string, boolean>>({});
    const [slidesPerPage, setSlidesPerPage] = useState<number>(4);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setSlidesPerPage(1);
            } else if (width < 768) {
                setSlidesPerPage(2);
            } else if (width < 1024) {
                setSlidesPerPage(3);
            } else {
                setSlidesPerPage(4);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const formattedProducts = useMemo<LocalProductCard[]>(() => {
        if (!featuredProducts || featuredProducts.length === 0) return [];
        return featuredProducts.map((product) => ({
            code: product.code,
            name: product.name || '',
            images: product.path_image_resize || '',
            priceDisplay: product.sale_price || product.price || '',
            originalPrice: product.price,
            discount: product.discount_percent,
            category_code: product.category_code || null,
            colors: product.colors || [],
            rating: product.rating || 5,
            sold: product.sold_count || 0,
            isWishlisted: wishlistCodes[product.code] ?? product.is_wishlisted ?? false
        }));
    }, [featuredProducts, wishlistCodes]);

    const filteredProducts = useMemo(() => {
        if (!selectedCategory) return formattedProducts;
        return formattedProducts.filter((p) => p.category_code === selectedCategory);
    }, [formattedProducts, selectedCategory]);

    const handleSelectCategory = (cat: any) => {
        setSelectedCategory(cat?.code ?? null);
    };

    const handleViewProduct = (code: string) => {
        router.push(`/product/${code}`);
    };

    const handleToggleWishlist = (code: string) => {
        setWishlistCodes((prev) => ({
            ...prev,
            [code]: !prev[code]
        }));
    };

    const handleViewAll = () => {
        router.push('/product/list');
    };

    return (
        <section className="py-16">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-[#2C2C2C] mb-3 uppercase tracking-wide">
                    {t('introduceCompany.featuredProducts.title')}
                </h2>
                <p className="text-[#B4967C] text-base">{t('introduceCompany.featuredProducts.subtitle')}</p>
            </div>

            <div className="relative mb-10 px-4">
                <ListCategory onSelectCategory={handleSelectCategory} />
            </div>

            {isLoading ? (
                <div className="text-center text-gray-500 py-12">
                    <i className="pi pi-spin pi-spinner text-3xl mb-3" />
                    <p>{t('text.loading') || 'Đang tải...'}</p>
                </div>
            ) : filteredProducts.length === 0 ? (
                <div className="text-center text-gray-500 py-12">
                    <i className="pi pi-inbox text-4xl mb-3" />
                    <p>{t('text.noData') || 'Không có sản phẩm'}</p>
                </div>
            ) : (
                <div className="relative px-4 max-w-[1240px] mx-auto">
                    <CarouselRoot
                        slidesPerPage={slidesPerPage}
                        loop
                        spacing={16}
                        className="products-carousel-wrapper"
                    >
                        <div className="relative">
                            <CarouselPrev className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-white cursor-pointer transition-all">
                                <i className="pi pi-chevron-left" />
                            </CarouselPrev>

                            <CarouselContent className="products-carousel">
                                {filteredProducts.map((product) => (
                                    <CarouselItem key={product.code} value={product.code}>
                                        <div className="flex justify-center h-full p-2">
                                            <ProductCard
                                                product={product}
                                                onViewDetails={handleViewProduct}
                                                onToggleWishlist={handleToggleWishlist}
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>

                            <CarouselNext className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-white cursor-pointer transition-all">
                                <i className="pi pi-chevron-right" />
                            </CarouselNext>
                        </div>
                    </CarouselRoot>
                </div>
            )}

            <div className="mt-10 text-center">
                <button
                    type="button"
                    onClick={handleViewAll}
                    className="cursor-pointer px-12 py-3 border-2 border-[#2C2C2C] text-[#2C2C2C] rounded-full uppercase text-sm font-semibold hover:bg-[#2C2C2C] hover:text-white transition-all duration-300"
                >
                    {t('customerInfo.showAll')}
                </button>
            </div>
        </section>
    );
}
