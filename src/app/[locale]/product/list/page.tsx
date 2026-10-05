import {getTranslations} from 'next-intl/server';
import {fetchProduct} from '@/api/fetchProduct';
import {PER_PAGE_LIST} from '@/utils/constants';
import ProductListClient from './ProductListClient';
import {parseFilterFromSearchParams, buildQueryString, mapToProductItem} from './utils';
import Image from "next/image";
import {Breadcrumb} from "@/components/common/Breadcrumb";
import React, {Suspense} from 'react';
import {Loading} from "@/components/common/Loading";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
type Params = Promise<{ locale: string }>;

export default async function ProductList({params, searchParams}: {
    params: Params;
    searchParams: SearchParams;
}) {
    const t = await getTranslations();
    return (
        <div>
            <div className="banner">
                <Image
                    src="/layout/background.webp"
                    className="img-banner"
                    alt="customize"
                    width={1920}
                    height={400}
                />
                <Breadcrumb
                    className="t-breadcrumb"
                    model={[
                        {label: t('breadcrumb.homePage'), url: '/introduce/company-info'},
                        {label: t('breadcrumb.listProduct')}
                    ]}
                />
            </div>
            <div className="product-list">
                <Suspense fallback={
                    <div className="flex justify-center items-center min-h-[400px]">
                        <Loading className="w-10 h-10" color="black" icon="spinning-circles"/>
                    </div>
                }>
                    <ProductListPage params={params} searchParams={searchParams}/>
                </Suspense>
            </div>
        </div>
    );
}

async function ProductListPage({params, searchParams}: {
    params: Params;
    searchParams: SearchParams;
}) {
    const {locale} = await params;
    const resolvedSearchParams = await searchParams;
    const t = await getTranslations();

    const filter = parseFilterFromSearchParams(resolvedSearchParams);
    const page = Number(resolvedSearchParams.page) || 1;
    const limit = Number(resolvedSearchParams.limit) || PER_PAGE_LIST[0];

    const queryString = buildQueryString(filter, {page, limit, total: 0}, locale);
    const {data} = await fetchProduct(t).list(queryString);

    const initialItems = (data?.data ?? []).map(mapToProductItem);
    const initialTotal: number = data?.total ?? 0;

    return (
        <div>
            <ProductListClient
                initialItems={initialItems}
                initialTotal={initialTotal}
            />
        </div>
    )
        ;
}
