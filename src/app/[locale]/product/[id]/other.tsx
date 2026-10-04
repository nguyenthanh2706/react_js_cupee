'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { fetchProduct } from '@/api/fetchProduct';

export default function ProductDetailOther({ categoryCode, getDefault = false }: { categoryCode?: string, getDefault?: boolean }) {
    const t = useTranslations();
    const locale = useLocale();
    const router = useRouter();
    
    const [loading, setLoading] = useState(false);
    const [productMore, setProductMore] = useState<{ list: any[], page: number, limit: number, loadMore: boolean }>({
        list: [],
        page: 1,
        limit: 5,
        loadMore: false
    });

    const getListProduct = async (currentPage: number, resetList = false) => {
        setLoading(true);
        let query = `page=${currentPage}&limit=5&lang=${locale}`;
        if (categoryCode && !getDefault) {
            query += `&filters[category_code]=${categoryCode}`;
        }

        try {
            const { data } = await fetchProduct(t).list(query);
            const dataOptions = data?.data || [];
            
            setProductMore(prev => ({
                ...prev,
                page: currentPage,
                list: resetList ? dataOptions : [...prev.list, ...dataOptions],
                loadMore: dataOptions.length === 5
            }));
        } catch (err) {
            console.error("Failed to load more products", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (getDefault || categoryCode) {
            getListProduct(1, true);
        }
    }, [categoryCode, getDefault]);

    const getMoreProduct = () => {
        getListProduct(productMore.page + 1);
    };

    const checkIsCustomize = (product: any) => {
        return product.is_customizable === '1' || product.is_3d_custom === '1';
    };

    return (
        <>
            {loading && productMore.page === 1 && (
                <div className="w-full flex justify-center my-4">
                    <div className="w-8 h-8 animate-spin rounded-full border-4 border-solid border-black border-e-transparent align-[-0.125em]"></div>
                </div>
            )}
            
            {!loading && productMore.list.length === 0 ? (
                <span className="text-xl font-medium">{t('productDetail.noProductSuggest')}</span>
            ) : (
                <div>
                    <div className="list-data grid grid-cols-2 md:grid-cols-5 gap-4">
                        {productMore.list.map((product) => (
                            <div 
                                key={product.code} 
                                className="item cursor-pointer flex flex-col group" 
                                onClick={() => router.push(`/${locale}/product/${product.code}`)}
                            >
                                <div className="image relative w-full aspect-square bg-gray-50 mb-3 rounded-lg overflow-hidden border border-gray-100 group-hover:shadow-md transition">
                                    <Image src={product.path_image_resize} alt={product.name || "Product"} fill className="object-cover" />
                                    {checkIsCustomize(product) && (
                                        <span className="tag-customize absolute top-2 left-2 bg-white px-2 py-1 text-xs rounded-md shadow-sm flex items-center font-medium">
                                            <Image src="/page/customize.png" className="object-contain mr-1" alt="customize" width={14} height={14} /> 
                                            {t('productList.filter.customize')}
                                        </span>
                                    )}
                                </div>
                                <div className="under-image px-1 flex flex-col flex-1">
                                    <div className="list-tag flex gap-1 flex-wrap mb-2">
                                        {product.tags?.map((item: any, index: number) => (
                                            <span key={index} className="tag text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600"> {item.name} </span>
                                        ))}
                                    </div>
                                    <div className="mb-1 font-semibold text-gray-800 text-sm line-clamp-2 leading-tight">{product.name} </div>
                                    <div className="price text-red-600 font-bold mt-auto">{product.sale_price}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="w-full text-center mt-10">
                        {productMore.loadMore && (
                            <button
                                className="px-12 py-3 border-2 border-gray-900 rounded-full text-base font-bold text-gray-900 hover:bg-gray-900 hover:text-white transition duration-300 cursor-pointer disabled:opacity-50"
                                onClick={getMoreProduct}
                                disabled={loading}
                            >
                                {loading ? '...' : t('text.showMore')}
                            </button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
