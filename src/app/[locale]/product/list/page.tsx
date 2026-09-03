'use client';

import React, {useState, useEffect, useCallback} from 'react';
import {useTranslations, useLocale} from 'next-intl';
import Image from 'next/image';
import {Breadcrumb} from '@/components/common/Breadcrumb';
import ProductListFilter from '@/app/[locale]/product/list/filter';
import ProductListMain from '@/app/[locale]/product/list/main';
import {PER_PAGE_LIST} from '@/utils/constants';
import {fetchProduct} from '@/api/fetchProduct';

export interface OptionsFilter {
    q?: string | null;
    category?: string | null;
    isCustomizable?: number | null;
    priceRange?: string | null;
    tagColor?: string | null;
    tagSpecial?: string | null;
    sortPrice?: string | null;
    sortProduct?: string | null;
}

export interface PaginationType {
    page: number;
    limit: number;
    total: number;
}

export interface ProductData {
    isLoading: boolean;
    items: any[] | null;
}

export default function ProductListPage() {
    const t = useTranslations();
    const locale = useLocale();

    // useState
    const [optionsFilter, setOptionsFilter] = useState<OptionsFilter>({
        q: '',
        category: null, // selectedCategory,
        isCustomizable: null,
        priceRange: null,
        tagColor: null,
        tagSpecial: null,
        sortPrice: null,
        sortProduct: null
    });
    const [pagination, setPagination] = useState<PaginationType>({
        page: 1,
        limit: PER_PAGE_LIST[0],
        total: 0
    });

    const [productData, setProductData] = useState<ProductData>({
        isLoading: false,
        items: []
    });


    const updateDataFilter = (newFilter: OptionsFilter) => {
        setProductData(prev => ({...prev, isLoading: true}));
        setOptionsFilter(newFilter);
        setPagination(prev => ({...prev, page: 1}));
    };
    // mount , update
    useEffect(() => {
        const fetchList = async () => {
            setProductData({isLoading: true, items: []});
            const getQueryString = () => {
                const query = [`page=${pagination.page}`, `limit=${pagination.limit}`, `lang=${locale}`];

                const maps: any = {
                    search: {q: 'name'},
                    filters: {
                        category: 'category_code',
                        isCustomizable: 'is_customizable',
                        priceRange: 'sale_price_range',
                        tagColor: 'tags',
                        tagSpecial: 'tags'
                    },
                    sorts: {
                        sortPrice: 'sale_price',
                        sortProduct: 'code'
                    }
                };

                const appendParams = (map: any, prefix: string) => {
                    Object.entries(map).forEach(([key, param]) => {
                        const value = (optionsFilter as any)[key];
                        if (value !== null && value !== undefined && value !== '') {
                            query.push(`${prefix}[${param}]=${encodeURIComponent(value)}`);
                        }
                    });
                };

                appendParams(maps.search, 'search');
                appendParams(maps.filters, 'filters');
                appendParams(maps.sorts, 'sorts');

                return query.join('&');
            };
            const params = getQueryString();
            const {data} = await fetchProduct(t).list(params);
            setProductData({isLoading: false, items: data?.data ?? []});
            setPagination(prev => ({...prev, total: data?.total ?? 0}));
        };
        fetchList();
    }, [optionsFilter, pagination.page, pagination.limit, t]);

    return (
        <div>
            <div className="banner">
                <Image src="/layout/background.webp" className="img-banner" alt="customize" width={1920} height={400}/>
                <Breadcrumb
                    className="t-breadcrumb"
                    model={[
                        {label: t('breadcrumb.homePage'), url: '/introduce/company-info'},
                        {label: t('breadcrumb.listProduct')}
                    ]}
                />
            </div>

            <div className="product-list">
                    <>
                        <ProductListFilter dataFilter={optionsFilter}
                                           onUpdateDataFilter={updateDataFilter}></ProductListFilter>

                        <div className="uppercase font-bold mb-3">
                            {pagination.total} <span>{t('text.result')}</span>
                        </div>

                        <ProductListMain isLoading={productData.isLoading} listData={productData.items}/>

                        {/*<Pagination*/}
                        {/*    page={pagination.page}*/}
                        {/*    limit={pagination.limit}*/}
                        {/*    total={pagination.total}*/}
                        {/*    onChangePage={(newPage: number) => setPagination(prev => ({ ...prev, page: newPage }))}*/}
                        {/*    onChangeLimit={(newLimit: number) => setPagination(prev => ({ ...prev, limit: newLimit, page: 1 }))}*/}
                        {/*/>*/}
                    </>
            </div>
        </div>
    );
}
