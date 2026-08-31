'use client';

import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import {InputText} from '@primereact/ui/inputtext';
import {useTranslations, useLocale} from "next-intl";
import { fetchProduct } from '@/api/fetchProduct'
import Image from "next/image";

interface ProductResult {
    code: string;
    name: string;
    image: string;
    price: string | number;
}

export function SearchMain() {
    const t = useTranslations();
    const locale = useLocale();
    const router = useRouter();

    const [searchQuery, setSearchQuery] = useState<string>('');
    const [results, setResults] = useState<ProductResult[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    }

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (!searchQuery || searchQuery.length === 0) {
                setResults([]);
                return;
            }
            setLoading(true);
            const params = new URLSearchParams({
                lang: locale,
                limit: '50',
                'filters[status]': '1',
                'search[name]': searchQuery,
                'search[code]': searchQuery,
            });
            const { data } = await fetchProduct(t).list(params.toString());
            const mapped = (data?.data ?? []).map((p: any) => ({
                code: p.code ?? p.product_code ?? p.id ?? '',
                name: p.name ?? p.product_name ?? p[`name_${locale}`] ?? '',
                image: p.path_image_resize ?? '',
                price: p.sale_price ?? ''
            }));

            setResults(mapped)
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery, locale, t]);

    let contentResults: React.ReactNode;
    if (loading) {
        contentResults = (
            <div className="py-2 text-center text-gray-500 text-sm">
                <i className="pi pi-spinner pi-spin mr-2"/>
                {t('text.loading')}...
            </div>
        );
    } else if (results.length === 0 && searchQuery) {
        contentResults = (
            <div className="py-2 text-center text-gray-500 text-sm">
                {t('text.noData')}
            </div>
        );
    } else if (results.length > 0 && searchQuery) {
        contentResults = (results.map ((item, index) => (
                <div key={`${item?.code}-${index}`}
                     className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                    onClick={() => {router.push(`/product/${item.code}`)}}
                >
                    <div className="flex-shrink-0">
                        <Image src={item.image} alt={item.name} className={"w-12 h-12 rounded-lg object-cover border border-gray-200"} width={48} height={48} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="!w-[190px] font-medium text-gray-900 text-sm truncate mb-1 line-clamp-2">
                            {item.name}
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-red-600 font-semibold text-sm">
                                {item.price}
                            </span>
                        </div>
                    </div>
                </div>
            )
        ));
    } else {
        contentResults = null;
    }
    return (
        <div className="relative !w-[280px]">
            <div className="relative">
                <InputText type={"search"} value={searchQuery} placeholder={t('btn.searchProduct')}
                           className={"!w-[280px] !border-[#707070] pr-10"} autoComplete={"new-search"}
                           name={"product-search"} onChange={onChange}/>
            </div>
            <div
                className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1 max-h-60 overflow-y-auto w-[280px]">
                {contentResults}
            </div>
        </div>
    );
}
