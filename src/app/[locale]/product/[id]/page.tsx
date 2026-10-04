'use client';

import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import {useTranslations, useLocale} from 'next-intl';
import {Breadcrumb} from '@/components/common/Breadcrumb';
import {fetchProduct} from '@/api/fetchProduct';
import ProductDetailImage from './image';
import ProductDetailInfor from './infor';

// Dummy imports for child components - Please create/convert these components to React
// import ProductDetailDescribe from './ProductDetailDescribe';
// import ProductDetailOther from './ProductDetailOther';

export default function ProductDetailPage({params}: { params: Promise<{ id: string, locale: string }> }) {
    const resolvedParams = React.use(params);
    const t = useTranslations();
    const locale = useLocale();

    // Using any since IProductDetail interface might not be migrated yet
    const [product, setProduct] = useState<any>({});
    const [variantCode, setVariantCode] = useState<string | null>(null);

    const handleVariantCodeChanged = (code: string | null) => {
        setVariantCode(code);
    };

    useEffect(() => {
        const getProductDetail = async () => {
            const {data} = await fetchProduct(t).getProduct(resolvedParams.id, `lang=${locale}`);
            setProduct(data.data);
        };

        getProductDetail();
    }, [resolvedParams.id, locale, t]);

    return (
        <>
            <div className="banner">
                <Image src="/layout/background.webp" className="img-banner" alt="customize" width={1920} height={400}/>
                <Breadcrumb
                    className="t-breadcrumb"
                    model={[
                        {label: t('breadcrumb.homePage'), url: '/introduce/company-info'},
                        {label: t('breadcrumb.listProduct'), url: '/product/list'},
                        {label: t('breadcrumb.detailProduct')}
                    ]}
                />
            </div>

            <div className="product-detail">
                <div className="detail">
                    <div className="left-item">
                        <ProductDetailImage productDetail={product} variantCode={variantCode} />
                    </div>

                    <div className="right-item">
                        <ProductDetailInfor onUpdateVariantCode={handleVariantCodeChanged} product={product} />
                    </div>
                </div>

                {/*    <ProductDetailDescribe productDetail={product} />*/}
                {/*    */}
                {/*    <div className="text-2xl font-bold uppercase mb-6">*/}
                {/*        {t('productDetail.seeOtherProduct')}*/}
                {/*    </div>*/}
                {/*    */}
                {/*    <ProductDetailOther categoryCode={product?.category_code} />*/}
            </div>
        </>
    );
}
