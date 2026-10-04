'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { fetchProduct } from '@/api/fetchProduct';
import { PER_PAGE_LIST } from '@/utils/constants';
import { OptionsFilter, PaginationType, ProductItem } from './types';
import { buildQueryString, mapToProductItem, parseFilterFromUrl, buildUrlParams } from './utils';

interface ProductListState {
    isLoading: boolean;
    isError: boolean;
    items: ProductItem[];
}

interface UseProductListOptions {
    initialItems?: ProductItem[];
    initialTotal?: number;
}

export function useProductList({ initialItems = [], initialTotal = 0 }: UseProductListOptions = {}) {
    const t = useTranslations();
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const filter = parseFilterFromUrl(searchParams);
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || PER_PAGE_LIST[0];

    const [total, setTotal] = useState(initialTotal);
    const [productList, setProductList] = useState<ProductListState>({
        isLoading: false,
        isError: false,
        items: initialItems
    });

    useEffect(() => {
        // Lần đầu load: đã có initialItems từ server → không fetch lại
        if (initialItems.length > 0 && productList.items === initialItems) return;

        const controller = new AbortController();

        const fetchList = async () => {
            setProductList(prev => ({ ...prev, isLoading: true, isError: false }));
            try {
                const params = buildQueryString(filter, { page, limit, total: 0 }, locale);
                const { data } = await fetchProduct(t).list(params);

                if (controller.signal.aborted) return;

                const rawItems: Record<string, unknown>[] = data?.data ?? [];
                setProductList({
                    isLoading: false,
                    isError: false,
                    items: rawItems.map(mapToProductItem)
                });
                setTotal(data?.total ?? 0);
            } catch {
                if (!controller.signal.aborted) {
                    setProductList(prev => ({ ...prev, isLoading: false, isError: true }));
                }
            }
        };

        fetchList();
        return () => controller.abort();
    }, [searchParams, locale, t]);

    const updateFilter = (newFilter: OptionsFilter) =>
        router.push(pathname + buildUrlParams(newFilter, 1, limit));

    const changePage = (newPage: number) =>
        router.push(pathname + buildUrlParams(filter, newPage, limit));

    const changeLimit = (newLimit: number) =>
        router.push(pathname + buildUrlParams(filter, 1, newLimit));

    return {
        filter,
        pagination: { page, limit, total } as PaginationType,
        productList,
        updateFilter,
        changePage,
        changeLimit
    };
}
