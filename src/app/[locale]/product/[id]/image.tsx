'use client';

import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import {Gallery} from '@primereact/ui/gallery';
import {useTranslations} from 'next-intl';
import { ChevronLeft, ChevronRight } from '@primeicons/react';

export default function ProductDetailImage({productDetail, variantCode}: {
    productDetail: any,
    variantCode?: string | null
}) {
    const t = useTranslations();
    const [activeIndex, setActiveIndex] = useState(0);

    const isCustomize = productDetail?.is_customizable === '1' || productDetail?.is_3d_custom === '1';

    const galleryImages = React.useMemo(() => {
        if (!productDetail) return [];

        const imageList: any[] = [];
        if (productDetail.images) {
            imageList.push(
                ...productDetail.images
                    .filter((img: any) => img.image?.path_image_original && img.image_type !== 'base')
                    .map((img: any) => ({
                        image: {path_image_original: img.image?.path_image_original || null},
                        alt: img.image?.origin_name || ''
                    }))
            );
        }
        if (productDetail.productVariant) {
            imageList.push(
                ...productDetail.productVariant
                    .filter((variant: any) => variant.image?.path_image_original)
                    .map((variant: any) => ({
                        image: {path_image_original: variant.image?.path_image_original || null},
                        alt: variant.image?.origin_name || '',
                        variantCode: variant.code
                    }))
            );
        }
        return imageList;
    }, [productDetail]);

    useEffect(() => {
        if (!variantCode || !productDetail?.productVariant || galleryImages.length === 0) return;
        const selectedVariant = productDetail.productVariant.find((v: any) => v.code === variantCode);
        const targetPath = selectedVariant?.image?.path_image_original;
        if (!targetPath) return;

        const index = galleryImages.findIndex(img => img.image?.path_image_original === targetPath);
        if (index !== -1 && index !== activeIndex) {
            setActiveIndex(index);
        }
    }, [variantCode, productDetail, galleryImages, activeIndex]);

    const itemTemplate = (img: any) => {
        return (
            <>
                <Image src={img.image?.path_image_original} alt={img.alt || 'product'}  width={500} height={500}  className="img-main" />
                {isCustomize && (
                    <span className="tag-customize absolute top-4 left-4 bg-white/80 p-1 px-2 rounded font-semibold flex items-center gap-1 z-10">
                        <Image src="/page/customize.png" className="object-contain w-5 h-5" width={30} height={30} alt="customize" />
                        {t('productList.filter.customize')}
                    </span>
                )}
            </>
        );
    };

    const thumbnailTemplate = (img: any) => {
        return (
            <Image draggable={false} src={img.image?.path_image_original} alt={img.alt || 'thumbnail'}  width={100} height={100} className="w-full h-full object-cover" />
        );
    };

    return (
        <div className="image-view bg-gray-50 rounded-lg">
            <Gallery.Root
                activeIndex={activeIndex}
                onActiveIndexChange={(e: any) => setActiveIndex(e.value ?? 0)}
                className="h-full flex flex-col"
            >
                <Gallery.Prev>
                    <ChevronLeft />
                </Gallery.Prev>
                <Gallery.Next>
                    <ChevronRight />
                </Gallery.Next>
                <Gallery.Content>
                    {galleryImages.map((img, idx) => (
                        <Gallery.Item key={idx}>
                            {itemTemplate(img)}
                        </Gallery.Item>
                    ))}
                </Gallery.Content>
                <Gallery.Footer className="!bg-transparent !p-0">
                    <Gallery.Thumbnail className="!bg-transparent">
                        <Gallery.ThumbnailContent className="!bg-transparent">
                            {galleryImages.map((img, idx) => (
                                <Gallery.ThumbnailItem key={idx} index={idx} className="!bg-transparent border-none">
                                    {thumbnailTemplate(img)}
                                </Gallery.ThumbnailItem>
                            ))}
                        </Gallery.ThumbnailContent>
                    </Gallery.Thumbnail>
                </Gallery.Footer>
            </Gallery.Root>
        </div>
    );
}
