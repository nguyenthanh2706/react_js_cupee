'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { fetchProduct } from '@/api/fetchProduct';

interface RawCategory {
    id: number | string;
    code: string;
    name: string;
    [key: string]: any;
}

interface CategoryItem {
    checked: boolean;
    data: RawCategory;
}

interface Props {
    onSelectCategory?: (category: RawCategory | null) => void;
}

export default function ListCategory({ onSelectCategory }: Props) {
    const t = useTranslations();
    const locale = useLocale();

    const [list, setList] = useState<CategoryItem[]>([]);
    const [page, setPage] = useState<number>(1);
    const [loadMore, setLoadMore] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchCategories = async () => {
            const params = `page=${page}&limit=5&lang=${locale}`;
            const { data } = await fetchProduct(t).listCategory(params);
            const dataOptions: RawCategory[] = data?.data ?? [];
            setLoadMore(dataOptions.length > 0);
            setList((prev) => [
                ...prev,
                ...dataOptions.map((item) => ({
                    checked: false,
                    data: item
                }))
            ]);
            setLoading(false);
        };
        fetchCategories();
    }, [page, locale, t]);

    const handleSelectCategory = (clickedItem: CategoryItem) => {
        const nextChecked = !clickedItem.checked;
        const nextList = list.map((item) => ({
            ...item,
            checked: item.data.code === clickedItem.data.code ? nextChecked : false
        }));
        setList(nextList);
        if (nextChecked) {
            onSelectCategory?.(clickedItem.data);
        } else {
            onSelectCategory?.(null);
        }
    };

    const handleGetMore = () => {
        setLoading(true);
        setPage((prev) => prev + 1);
    };

    return (
        <div className="flex flex-wrap justify-center gap-4 px-8 py-2">
            {list.map((item, index) => (
                <button
                    key={`${item.data.code}-${index}`}
                    type="button"
                    className={`flex flex-col items-center gap-2 shrink-0 px-4 py-2 transition-colors cursor-pointer ${
                        item.checked
                            ? 'border-b-2 border-[#a38d78] text-[#a38d78]'
                            : 'bg-white text-[#000000] border-gray-200 hover:text-[#a38d78]'
                    }`}
                    onClick={() => handleSelectCategory(item)}
                >
                    <span className="whitespace-nowrap uppercase text-lg">{item.data.name}</span>
                </button>
            ))}

            {loadMore && (
                <button
                    type="button"
                    disabled={loading}
                    className="flex flex-col items-center gap-2 shrink-0 px-4 py-2 transition-colors border-gray-200 hover:text-[#a38d78] cursor-pointer"
                    onClick={handleGetMore}
                >
                    <span className="whitespace-nowrap uppercase text-lg">
                        {t('introduceCompany.featuredProducts.more')}...
                    </span>
                </button>
            )}
        </div>
    );
}
