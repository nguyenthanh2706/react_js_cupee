// PRESENTATIONAL COMPONENT — không có state, không gọi API
// Chỉ nhận props và render UI
import React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { Loading } from '@/components/common/Loading';
import { ProductItem } from './types';

interface Props {
    isLoading?: boolean;
    listData?: ProductItem[];
}

export default function ProductListMain({ isLoading = false, listData = [] }: Props) {
    const t = useTranslations();

    return (
        <div className="list-data">
            {isLoading && (
                <div className="flex justify-center w-full my-4">
                    <Loading className="w-8 h-8 inline-block" color="black" icon="spinning-circles" />
                </div>
            )}

            {!isLoading && listData.length === 0 && (
                <div>{t('tableBox.noSearchData')}</div>
            )}

            {!isLoading && listData.length > 0 && listData.map((product) => (
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
                            {product.tags.map((tag) => (
                                <span key={tag.code} className="tag text-xs bg-gray-100 px-2 py-1 rounded">
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
