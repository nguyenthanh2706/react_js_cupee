'use client';

import { useTranslations } from 'next-intl';
import {
    CarouselRoot,
    CarouselContent,
    CarouselItem,
    CarouselIndicators,
    CarouselIndicator
} from '@primereact/ui/carousel';
import type { MediaItem } from './types';

interface Props {
    isLoading?: boolean;
    mediaItems?: MediaItem[];
}

export default function HeroSection({mediaItems = [] }: Props) {
    const t = useTranslations('introduceCompany.hero');

    const items = (mediaItems || []).map((item) => ({
        code: item.code ?? '',
        image_url: item.image_url ?? '',
        type: item.type ?? 'image',
        poster: item.poster
    }));

    if (items.length === 0) {
        return null;
    }

    return (
        <section className="relative mb-10">
            <div className="overflow-hidden relative">
                <CarouselRoot slidesPerPage={1} loop spacing={0} className="w-full">
                    <CarouselContent
                        style={{ pointerEvents: 'none' }}
                        onPointerDown={(e: { stopPropagation: () => any; }) => e.stopPropagation()}
                        onPointerMove={(e: { stopPropagation: () => any; }) => e.stopPropagation()}
                        onPointerUp={(e: { stopPropagation: () => any; }) => e.stopPropagation()}
                        onWheel={(e: { stopPropagation: () => any; }) => e.stopPropagation()}
                    >
                        {items.map((item, index) => (
                            <CarouselItem key={`${item.code}-${index}`} value={index}>
                                <div className="aspect-[21/9] overflow-hidden relative bg-gray-200 w-full h-[517px]">
                                    {item.type === 'image' ? (
                                        <div className="w-full h-full max-h-[517px]">
                                            <img
                                                src={item.image_url}
                                                alt={item.code}
                                                className="w-full h-[517px] object-cover"
                                            />
                                        </div>
                                    ) : item.type === 'video' ? (
                                        <div className="w-full h-[517px]">
                                            <video
                                                src={item.image_url}
                                                poster={item.poster || item.image_url}
                                                controls
                                                className="w-full h-[517px] object-cover"
                                            >
                                                {t('videoNotSupported')}
                                            </video>
                                        </div>
                                    ) : null}
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    <CarouselIndicators className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 p-0 z-10">
                        {items.map((_, index) => (
                            <CarouselIndicator
                                key={index}
                                page={index}
                                className="w-2.5 h-2.5 rounded-full bg-black/30 data-[active]:bg-black/80 data-[active]:scale-125 transition-all cursor-pointer border-none"
                            />
                        ))}
                    </CarouselIndicators>
                </CarouselRoot>
            </div>
        </section>
    );
}
