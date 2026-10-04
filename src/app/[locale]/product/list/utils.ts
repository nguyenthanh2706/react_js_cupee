// Pure utility functions — không có 'use client', dùng được ở cả Server và Client

import { OptionsFilter, PaginationType, ProductItem } from './types';
import { PER_PAGE_LIST } from '@/utils/constants';

const SPECIAL_TAG_ROLE = '1';

export function mapToProductItem(item: Record<string, unknown>): ProductItem {
    const rawTags = (item?.tags as Record<string, unknown>[] ?? []);
    const tags = rawTags
        .filter((tag) => tag.role === SPECIAL_TAG_ROLE)
        .map((tag) => ({
            code: String(tag?.code ?? ''),
            name: String(tag?.name ?? ''),
            note: String(tag?.note ?? ''),
            status: Number(tag?.status ?? 0)
        }));

    return {
        code: String(item?.code ?? ''),
        name: String(item?.name ?? ''),
        image: (item?.path_image_resize as string) ?? null,
        price: Number(item?.sale_price ?? 0),
        is_customizable: Boolean(item?.is_3d_custom || item?.is_customizable == 1),
        tags
    };
}

export function buildQueryString(filter: OptionsFilter, pagination: PaginationType, locale: string): string {
    const query = [
        `page=${pagination.page}`,
        `limit=${pagination.limit}`,
        `lang=${locale}`
    ];

    const append = (map: Record<string, string>, prefix: string) => {
        Object.entries(map).forEach(([key, param]) => {
            const value = filter[key as keyof OptionsFilter];
            if (value !== null && value !== undefined && value !== '') {
                query.push(`${prefix}[${param}]=${encodeURIComponent(String(value))}`);
            }
        });
    };

    append({ q: 'name' }, 'search');
    append({ category: 'category_code', isCustomizable: 'is_customizable', priceRange: 'sale_price_range', tagColor: 'tags', tagSpecial: 'tags' }, 'filters');
    append({ sortPrice: 'sale_price', sortProduct: 'code' }, 'sorts');

    return query.join('&');
}

// Server Component dùng — searchParams là plain object
export function parseFilterFromSearchParams(
    searchParams: Record<string, string | string[] | undefined>
): OptionsFilter {
    const get = (key: string): string | null => {
        const val = searchParams[key];
        return Array.isArray(val) ? (val[0] ?? null) : (val ?? null) || null;
    };
    return {
        q: get('q'),
        category: get('category'),
        isCustomizable: get('isCustomizable') ? Number(get('isCustomizable')) : null,
        priceRange: get('priceRange'),
        tagColor: get('tagColor'),
        tagSpecial: get('tagSpecial'),
        sortPrice: get('sortPrice'),
        sortProduct: get('sortProduct'),
    };
}

// Client Component dùng — searchParams là URLSearchParams
export function parseFilterFromUrl(searchParams: URLSearchParams): OptionsFilter {
    return {
        q: searchParams.get('q') || null,
        category: searchParams.get('category') || null,
        isCustomizable: searchParams.get('isCustomizable') ? Number(searchParams.get('isCustomizable')) : null,
        priceRange: searchParams.get('priceRange') || null,
        tagColor: searchParams.get('tagColor') || null,
        tagSpecial: searchParams.get('tagSpecial') || null,
        sortPrice: searchParams.get('sortPrice') || null,
        sortProduct: searchParams.get('sortProduct') || null,
    };
}

export function buildUrlParams(filter: OptionsFilter, page: number, limit: number): string {
    const params = new URLSearchParams();
    if (page > 1) params.set('page', String(page));
    if (limit !== PER_PAGE_LIST[0]) params.set('limit', String(limit));
    if (filter.q) params.set('q', filter.q);
    if (filter.category) params.set('category', filter.category);
    if (filter.isCustomizable != null) params.set('isCustomizable', String(filter.isCustomizable));
    if (filter.priceRange) params.set('priceRange', filter.priceRange);
    if (filter.tagColor) params.set('tagColor', filter.tagColor);
    if (filter.tagSpecial) params.set('tagSpecial', filter.tagSpecial);
    if (filter.sortPrice) params.set('sortPrice', filter.sortPrice);
    if (filter.sortProduct) params.set('sortProduct', filter.sortProduct);
    const str = params.toString();
    return str ? `?${str}` : '';
}
