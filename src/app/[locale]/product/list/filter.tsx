'use client';

import React, { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import InputSearch from '@/components/common/InputSearch';
import { TabsRoot, TabsList, TabsTab, TabsPanels, TabsPanel } from '@primereact/ui/tabs';

import ItemCategory from './itemCategory';
import ItemTagColor from './itemTagColor';
import ItemSpecialTag from './itemSpecialTag';

// --- Constants ---
const ASC = 'asc';
const DESC = 'desc';

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

const defaultFilter: OptionsFilter = {
    q: '',
    category: null,
    isCustomizable: null,
    priceRange: null,
    tagColor: null,
    tagSpecial: null,
    sortPrice: null,
    sortProduct: null
};

interface Props {
    dataFilter?: OptionsFilter;
    onUpdateDataFilter?: (filter: OptionsFilter) => void;
}

export default function ProductListFilter({ dataFilter = defaultFilter, onUpdateDataFilter }: Props) {
    const t = useTranslations();

    // --- State ---
    const [hiddenFilter, setHiddenFilter] = useState<boolean>(true);
    const [activeTab, setActiveTab] = useState<string>('0');

    // Không còn dùng ref nữa, sử dụng Controlled Component pattern

    // --- Options ---
    const sortOptionsPrice = [
        { name: t('productList.filter.heightToShort'), code: DESC },
        { name: t('productList.filter.shortToHeight'), code: ASC }
    ];
    const sortOptionsProduct = [
        { name: t('productList.filter.oldToNew'), code: ASC }
    ];
    const priceRangeOptions = [
        { name: t('productList.filter.priceRangeOption.option1'), value: t('productList.filter.priceRangeOption.value1') },
        { name: t('productList.filter.priceRangeOption.option2'), value: t('productList.filter.priceRangeOption.value2') },
        { name: t('productList.filter.priceRangeOption.option3'), value: t('productList.filter.priceRangeOption.value3') },
        { name: t('productList.filter.priceRangeOption.option4'), value: t('productList.filter.priceRangeOption.value4') }
    ];
    const customizeOptions = [
        { name: t('productList.filter.isCustomize'), value: 1 },
        { name: t('productList.filter.isNotCustomize'), value: 2 }
    ];

    // --- Handlers ---
    const emitUpdate = (newFilter: OptionsFilter) => {
        if (onUpdateDataFilter) {
            onUpdateDataFilter(newFilter);
        }
    };

    const handleSearch = (searchValue: string) => {
        emitUpdate({ ...dataFilter, q: searchValue });
    };

    const showFilter = () => {
        setHiddenFilter(!hiddenFilter);
        // Khi mở ra, tự động trigger tab hiện tại
        onTabChange(activeTab);
    };

    const removeAllFilter = () => {
        const resetFilter = { ...defaultFilter };
        emitUpdate(resetFilter);
    };

    const handleSelectSortPrice = (code: string) => {
        const newCode = dataFilter.sortPrice === code ? null : code;
        emitUpdate({ ...dataFilter, sortPrice: newCode });
    };

    const handleSelectSortProduct = (code: string) => {
        const newCode = dataFilter.sortProduct === code ? null : code;
        emitUpdate({ ...dataFilter, sortProduct: newCode });
    };

    const changeSelectPriceRange = (value: string) => {
        const newValue = dataFilter.priceRange === value ? null : value;
        emitUpdate({ ...dataFilter, priceRange: newValue });
    };

    const changeSelectCustomize = (value: number) => {
        const newValue = dataFilter.isCustomizable === value ? null : value;
        emitUpdate({ ...dataFilter, isCustomizable: newValue });
    };

    const onTabChange = (newValue: string) => {
        setActiveTab(newValue);
    };



    // Events từ component con bắn lên
    const changeSelectCategory = (value: any) => {
        emitUpdate({ ...dataFilter, category: value?.code ?? null });
    };
    const changeSelectColorTag = (value: any) => {
        emitUpdate({ ...dataFilter, tagColor: value?.code ?? null });
    };
    const changeSelectSpecialTag = (value: any) => {
        emitUpdate({ ...dataFilter, tagSpecial: value?.code ?? null });
    };

    return (
        <div className="list-filters">
            <h1 className="title">{t('productList.filter.listProduct')}</h1>
            
            <div className="search">
                <InputSearch
                    className="mr-2"
                    placeholder={t('productList.filter.search')}
                    value={dataFilter.q}
                    onChange={handleSearch}
                    onSearch={handleSearch}
                />
            </div>

            <div className="flex items-center justify-between mb-5 head-filter mt-4">
                <span className="font-bold uppercase cursor-pointer" onClick={showFilter}>
                    <i className="pi pi-filter-fill mr-3"></i>
                    <span>{t('productList.filter.filter')}</span>
                    <i className={`pi pi-fw pi-angle-down ${!hiddenFilter ? 'rotate-180' : ''}`}></i>
                </span>
                <button className="remove-all cursor-pointer text-red-500" onClick={removeAllFilter}>
                    {t('productList.filter.removeAll')}
                </button>
            </div>

            {!hiddenFilter && (
                <div className="main-filter">
                    <TabsRoot 
                        value={activeTab} 
                        onValueChange={(e: any) => onTabChange(e?.value !== undefined ? String(e.value) : String(e))} 
                        className="w-full"
                    >
                        <TabsList>
                            <TabsTab value="0">{t('productList.filter.category')}</TabsTab>
                            <TabsTab value="1">{t('productList.filter.customize')}</TabsTab>
                            <TabsTab value="2">{t('productList.filter.color')}</TabsTab>
                            <TabsTab value="3">{t('productList.filter.priceRange')}</TabsTab>
                            <TabsTab value="4">{t('productList.filter.specialTag')}</TabsTab>
                            <TabsTab value="5">{t('productList.filter.arrange')}</TabsTab>
                        </TabsList>

                        <TabsPanels>
                            <TabsPanel value="0">
                                <ItemCategory selectedItem={dataFilter.category} onUpdateCategory={changeSelectCategory} />
                            </TabsPanel>

                            <TabsPanel value="1">
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {customizeOptions.map((item, index) => (
                                        <button
                                            key={index}
                                            onClick={() => changeSelectCustomize(item.value)}
                                            className={`item-choose p-2 border rounded ${dataFilter.isCustomizable === item.value ? 'item-selected bg-blue-100' : ''}`}
                                        >
                                            {item.name}
                                        </button>
                                    ))}
                                </div>
                            </TabsPanel>

                            <TabsPanel value="2">
                                <ItemTagColor selectedItem={dataFilter.tagColor} onUpdateColorTag={changeSelectColorTag} />
                            </TabsPanel>

                            <TabsPanel value="3">
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {priceRangeOptions.map((item, index) => (
                                        <button
                                            key={index}
                                            onClick={() => changeSelectPriceRange(item.value)}
                                            className={`item-choose p-2 border rounded ${dataFilter.priceRange === item.value ? 'item-selected bg-blue-100' : ''}`}
                                        >
                                            {item.name}
                                        </button>
                                    ))}
                                </div>
                            </TabsPanel>

                            <TabsPanel value="4">
                                <ItemSpecialTag selectedItem={dataFilter.tagSpecial} onUpdateSpecialTag={changeSelectSpecialTag} />
                            </TabsPanel>

                            <TabsPanel value="5">
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {sortOptionsPrice.map((item, index) => (
                                        <button
                                            key={`price-${index}`}
                                            onClick={() => handleSelectSortPrice(item.code)}
                                            className={`item-choose p-2 border rounded ${dataFilter.sortPrice === item.code ? 'item-selected bg-blue-100' : ''}`}
                                        >
                                            {item.name}
                                        </button>
                                    ))}
                                    {sortOptionsProduct.map((item, index) => (
                                        <button
                                            key={`product-${index}`}
                                            onClick={() => handleSelectSortProduct(item.code)}
                                            className={`item-choose p-2 border rounded ${dataFilter.sortProduct === item.code ? 'item-selected bg-blue-100' : ''}`}
                                        >
                                            {item.name}
                                        </button>
                                    ))}
                                </div>
                            </TabsPanel>
                        </TabsPanels>
                    </TabsRoot>
                </div>
            )}
            <hr className="w-full h-px bg-gray-400 opacity-30 my-10 border-0" />
        </div>
    );
}
