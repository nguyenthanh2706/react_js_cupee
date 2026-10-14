'use client';

import { useTranslations, useLocale } from 'next-intl';
import type { LocalProductCard } from './types';

interface Props {
    product: LocalProductCard;
    onViewDetails?: (code: string) => void;
    onToggleWishlist?: (code: string) => void;
}

export default function ProductCard({ product, onViewDetails, onToggleWishlist }: Props) {
    const t = useTranslations('introduce.company');
    const locale = useLocale();

    const formatCurrency = (value: any) => {
        const number = Number(value);
        if (!number || isNaN(number)) return '0';
        return locale === 'vi' ? number.toLocaleString('vi-VN') : number.toLocaleString('en-GB');
    };

    const formatSold = (sold: number): string => {
        if (sold >= 1000) {
            return (sold / 1000).toFixed(1) + 'k';
        }
        return sold.toString();
    };

    return (
        <div className="flex-shrink-0 w-[262px] bg-[#faf9f5] rounded-md shadow-sm hover:border-[#b26158] transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100 flex flex-col">
            <div className="relative h-[260px] bg-gray-50 overflow-hidden">
                {product.images ? (
                    <img
                        src={product.images}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onClick={() => onViewDetails?.(product.code)}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <i className="pi pi-image text-5xl" />
                    </div>
                )}

                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist?.(product.code);
                    }}
                    className="absolute top-3 right-3 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform z-1"
                >
                    <i
                        className={`pi text-lg ${product.isWishlisted ? 'pi-heart-fill text-red-500' : 'pi-heart text-gray-400'}`}
                    />
                </button>

                {product.discount ? (
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        -{product.discount}%
                    </div>
                ) : null}
            </div>

            <div className="p-4 flex-1 flex flex-col">
                <h3
                    className="font-semibold text-[#333332] text-base mb-2 cursor-pointer"
                    onClick={() => onViewDetails?.(product.code)}
                >
                    {{ ...product }.name}
                </h3>

                <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#b26158] font-bold text-base">
                        đ{formatCurrency(product.priceDisplay)}
                    </span>
                    {product.originalPrice && product.discount ? (
                        <span className="text-[#a0a0a0] line-through text-xs">
                            đ{formatCurrency(product.originalPrice)}
                        </span>
                    ) : null}
                </div>

                <p className="text-xs text-[#a0a0a0] mb-3 line-clamp-2">{t('freeCustomDesign')}</p>

                <div className="flex items-center gap-[10px] mb-3 text-xs">
                    <span className="flex items-center border p-[2px] border-[#a38d78] gap-1 text-gray-600">
                        <i className="pi pi-star-fill text-yellow-400 text-[0.5rem]" />
                        {product.rating || 5}
                    </span>
                    <span className="text-[#464544]">
                        {t('sold', { sold: formatSold(product.sold || 0) })}
                    </span>
                </div>

                {product.colors && product.colors.length > 0 && (
                    <div className="flex gap-2 mb-3">
                        {product.colors.slice(0, 5).map((color, index) => (
                            <button
                                key={index}
                                type="button"
                                className="w-6 h-6 rounded-full border-2 border-gray-300 hover:border-gray-600 transition-colors"
                                style={{ backgroundColor: color }}
                                title={color}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
