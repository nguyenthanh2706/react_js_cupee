'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { fetchProduct } from '@/api/fetchProduct';
import { Loading } from '@/components/common/Loading';

interface RawCategory {
    id: number | string;
    code: string;
    name: string;
    [key: string]: any;
}

interface CategoryItem {
    data: RawCategory;
}

interface CategoryState {
    list: CategoryItem[];
    page: number;
    limit: number;
    loadMore: boolean;
}

interface Props {
    selectedItem?: string | null;
    onUpdateCategory: (value: Record<string, any> | null) => void;
}

export default function ItemCategory({ selectedItem, onUpdateCategory }: Props) {
    const t = useTranslations();
    const locale = useLocale();
    
    const [loading, setLoading] = useState<boolean>(false);
    const [state, setState] = useState<CategoryState>({
        list: [],
        page: 1,
        limit: 10,
        loadMore: false
    });

    const getMoreCategory = () => {
        setState(prev => ({ ...prev, page: prev.page + 1 }));
    };

    const selectCategory = (index: number) => {
        const clickedItemData = state.list[index].data;
        
        if (selectedItem === clickedItemData.code) {
            onUpdateCategory(null);
        } else {
            onUpdateCategory(clickedItemData);
        }
    };

    useEffect(() => {
        const fetchList = async () => {
            setLoading(true);
            const query = [`page=${state.page}`, `limit=${state.limit}`, `lang=${locale}`];
            const params = query.join('&');
            const { data } = await fetchProduct((key: string) => t(key as any)).listCategory(params);

            const dataOptions = Array.isArray(data) ? data : (data?.data ?? []);
            const hasMore = dataOptions.length > 0;

            const newItems = dataOptions.map((item: RawCategory) => ({
                data: item
            }));

            setState(prev => ({
                ...prev,
                list: [...prev.list, ...newItems],
                loadMore: hasMore
            }));

            setLoading(false);
        };

        fetchList();
    }, [locale, state.limit, state.page, t])
    return (
        <div className="flex flex-wrap gap-2 mt-3">
            {loading && state.list.length === 0 ? (
                <div className="flex justify-center items-center w-full p-4">
                    <Loading className="w-8 h-8 inline-block" color="black" />
                </div>
            ) : (
                <>
                    {state.list.map((item, index) => {
                        const isSelected = selectedItem === item.data.code;
                        return (
                            <button
                                key={item.data.id || index}
                                onClick={() => selectCategory(index)}
                                className={`item-choose p-2 border rounded ${isSelected ? 'item-selected bg-blue-100' : ''}`}
                            >
                                {item.data.name}
                            </button>
                        );
                    })}
                    {state.loadMore && (
                        <button className="item-choose p-2 border rounded" onClick={getMoreCategory}>
                            {t('text.loadMore')}...
                        </button>
                    )}
                </>
            )}
        </div>
    );
}
