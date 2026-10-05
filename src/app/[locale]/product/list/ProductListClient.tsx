'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Pagination } from '@/components/common/Pagination';
import ProductListFilter from './filter';
import ProductListMain from './main';
import { useProductList } from './useProductList';
import { ProductItem } from './types';

interface ProductListClientProps {
    initialItems: ProductItem[];
    initialTotal: number;
}

export default function ProductListClient({ initialItems, initialTotal }: ProductListClientProps) {
    const t = useTranslations();
    const { filter, pagination, productList, updateFilter, changePage, changeLimit } = useProductList({
        initialItems,
        initialTotal
    });

    return (
        <>
            <ProductListFilter
                dataFilter={filter}
                onUpdateDataFilter={updateFilter}
            />

            <div className="uppercase font-bold mb-3">
                {pagination.total} <span>{t('text.result')}</span>
            </div>

            {productList.isError ? (
                <div className="text-center py-8">
                    <p>{t('tableBox.errorData')}</p>
                    <button onClick={() => updateFilter(filter)} className="mt-3 underline">
                        {t('text.retry')}
                    </button>
                </div>
            ) : (
                <>
                    <ProductListMain
                        isLoading={productList.isLoading}
                        listData={productList.items}
                    />
                    <Pagination
                        page={pagination.page}
                        limit={pagination.limit}
                        total={pagination.total}
                        onChangePage={changePage}
                        onChangeLimit={changeLimit}
                    />
                </>
            )}
        </>
    );
}

