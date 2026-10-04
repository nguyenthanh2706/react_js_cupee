import {getTranslations} from 'next-intl/server';
import {fetchProduct} from '@/api/fetchProduct';
import {PER_PAGE_LIST} from '@/utils/constants';
import ProductListClient from './ProductListClient';
import {parseFilterFromSearchParams, buildQueryString, mapToProductItem} from './utils';
import Image from "next/image";
import {Breadcrumb} from "@/components/common/Breadcrumb";
import React from "react";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
type Params = Promise<{ locale: string }>;

export default async function ProductListPage({params, searchParams}: {
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
            <ProductListClient
                initialItems={initialItems}
                initialTotal={initialTotal}
            />
        </div>
    );
}
