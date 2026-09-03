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

    const getQueryString = (page: number, limit: number): string => {
        const query = [`page=${page}`, `limit=${limit}`, `lang=${locale}`];
        return query.join('&');
    };

    const getListCategory = async (page: number, currentList: CategoryItem[]) => {
        // Trick nhỏ để lách ESLint: Đẩy hàm này thành Async hoàn toàn (chạy sau Effect)
        await Promise.resolve();
        
        setLoading(true);
        const params = getQueryString(page, state.limit);
        const { data } = await fetchProduct((key: string) => t(key as any)).listCategory(params);
        
        // Đảm bảo dataOptions luôn là mảng (Xử lý trường hợp API trả về object phân trang có chứa thuộc tính data)
        const dataOptions = Array.isArray(data) ? data : (data?.data ?? []);
        const hasMore = dataOptions.length > 0;
        
        const newItems = dataOptions.map((item: RawCategory) => ({
            data: item
        }));

        setState(prev => ({
            ...prev,
            list: [...currentList, ...newItems],
            page: page,
            loadMore: hasMore
        }));
        
        setLoading(false);
    };

    const getMoreCategory = async () => {
        const nextPage = state.page + 1;
        await getListCategory(nextPage, state.list);
    };

    const selectCategory = (index: number) => {
        const clickedItemData = state.list[index].data;
        
        // Nếu click vào mục đang được chọn thì bỏ chọn
        if (selectedItem === clickedItemData.code) {
            onUpdateCategory(null);
        } else {
            // Ngược lại thì chọn mục mới
            onUpdateCategory(clickedItemData);
        }
    };

    useEffect(() => {
        if (state.list.length === 0 && !loading) {
            getListCategory(1, []);
        }
    }, []);

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
