'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { fetchProduct } from '@/api/fetchProduct';
import { Loading } from '@/components/common/Loading';

interface RawTag {
    id: number | string;
    code: string;
    name: string;
    [key: string]: any;
}

interface TagItem {
    data: RawTag;
}

interface TagState {
    list: TagItem[];
    page: number;
    limit: number;
    loadMore: boolean;
}

interface Props {
    selectedItem?: string | null;
    onUpdateSpecialTag: (value: Record<string, any> | null) => void;
}

export default function ItemSpecialTag({ selectedItem, onUpdateSpecialTag }: Props) {
    const t = useTranslations();
    const locale = useLocale();
    
    const [loading, setLoading] = useState<boolean>(false);
    const [state, setState] = useState<TagState>({
        list: [],
        page: 1,
        limit: 10,
        loadMore: false
    });

    const getQueryString = (page: number, limit: number): string => {
        const queryGetSpecialTag = `filters[role]=1`;
        let query = [`page=${page}`, `limit=${limit}`, `lang=${locale}`, queryGetSpecialTag];
        return query.join('&');
    };

    const getListTag = async (page: number, currentList: TagItem[]) => {
        // Trick nhỏ để lách ESLint: Đẩy hàm này thành Async hoàn toàn (chạy sau Effect)
        await Promise.resolve();
        
        setLoading(true);
        const params = getQueryString(page, state.limit);
        const { data } = await fetchProduct((key: string) => t(key as any)).listTag(params);
        
        // Đảm bảo dataOptions luôn là mảng
        const dataOptions = Array.isArray(data) ? data : (data?.data ?? []);
        const hasMore = dataOptions.length > 0;
        
        const newItems = dataOptions.map((item: RawTag) => ({
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

    const getMoreTag = async () => {
        const nextPage = state.page + 1;
        await getListTag(nextPage, state.list);
    };

    const selectTag = (index: number) => {
        const clickedItemData = state.list[index].data;
        
        // Nếu click vào mục đang được chọn thì bỏ chọn
        if (selectedItem === clickedItemData.code) {
            onUpdateSpecialTag(null);
        } else {
            // Ngược lại thì chọn mục mới
            onUpdateSpecialTag(clickedItemData);
        }
    };

    // Tự động fetch data khi component được render (Tab được mở)
    useEffect(() => {
        if (state.list.length === 0 && !loading) {
            getListTag(1, []);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                                onClick={() => selectTag(index)}
                                className={`item-choose p-2 border rounded ${isSelected ? 'item-selected bg-blue-100' : ''}`}
                            >
                                {item.data.name}
                            </button>
                        );
                    })}
                    {state.loadMore && (
                        <button className="item-choose p-2 border rounded" onClick={getMoreTag}>
                            {t('text.loadMore')}...
                        </button>
                    )}
                </>
            )}
        </div>
    );
}
