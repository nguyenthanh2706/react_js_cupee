'use client';

import React, { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { Loading } from '@/components/common/Loading';

const SPECIAL = '1';

interface Props {
    isLoading?: boolean;
    listData?: any[] | null;
}

interface Product {
    code: string;
    name: string;
    image: string | null;
    price: number;
    is_customizable: boolean;
    tags: Array<{ code: string; name: string; note: string; status: number }>;
}

export default function ProductListMain({ isLoading = false, listData = null }: Props) {
    const t = useTranslations();

    const items = useMemo(() => {
        return (listData || []).map((item) => {
            const tags = (item?.tags || [])
                .filter((tag: any) => tag.role === SPECIAL)
                .map((tag: any) => ({
                    code: tag?.code ?? '',
                    name: tag?.name ?? '',
                    note: tag?.note ?? '',
                    status: tag?.status ?? 0
                }));

            return {
                code: item?.code ?? '',
                name: item?.name ?? '',
                image: item?.path_image_resize ?? null,
                price: item?.sale_price ?? 0,
                is_customizable: Boolean(item?.is_3d_custom || item?.is_customizable == 1),
                tags
            } as Product;
        });
    }, [listData]);

    return (
        <div className="list-data">
            {/* Hiển thị Loading */}
            {isLoading && (
                <div className="flex justify-center w-full my-4">
                    <Loading className="w-8 h-8 inline-block" color="black" icon="spinning-circles" />
                </div>
            )}
            
            {/* Hiển thị Không có dữ liệu */}
            {!isLoading && items.length === 0 && (
                <div>{t('tableBox.noSearchData')}</div>
            )}
            
            {/* Hiển thị Danh sách sản phẩm */}
            {!isLoading && items.length > 0 && items.map((product) => (
                // Chuyển div @click thành thẻ <Link> chuẩn SEO của next-intl
                <Link 
                    key={product.code} 
                    href={`/product/${product.code}`}
                    className="item block cursor-pointer"
                >
                    <div className="image relative">
                        {product.image ? (
                            <Image 
                                src={product.image} 
                                alt={product.name} 
                                width={500} 
                                height={500} 
                                className="w-full h-full object-contain" 
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-200"></div>
                        )}
                        
                        {product.is_customizable && (
                            <span className="tag-customize flex items-center absolute top-2 left-2 bg-white px-2 py-1 rounded text-xs font-bold">
                                <Image src="/page/customize.png" width={16} height={16} className="object-contain mr-1" alt="customize" /> 
                                {t('productList.filter.customize')}
                            </span>
                        )}
                    </div>
                    
                    <div className="under-image mt-3">
                        <div className="list-tag flex gap-1 flex-wrap mb-2">
                            {product.tags.map((tag, index) => (
                                <span key={index} className="tag text-xs bg-gray-100 px-2 py-1 rounded">
                                    {tag.name}
                                </span>
                            ))}
                        </div>
                        <span className="mb-2 font-bold block">{product.name}</span>
                        <span className="price text-red-500 font-bold">{product.price}</span>
                    </div>
                </Link>
            ))}
        </div>
    );
}
