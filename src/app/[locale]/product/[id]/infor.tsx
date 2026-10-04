'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { InputNumber } from '@primereact/ui/inputnumber';

// Import correctly from your project's store if possible
// import { useCartStore } from '@/stores/cartStore';

export default function ProductDetailInfor({ product, onUpdateVariantCode }: { product: any, onUpdateVariantCode: (code: string | null) => void }) {
    const t = useTranslations();
    const locale = useLocale();
    const router = useRouter();
    
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedSizeCode, setSelectedSizeCode] = useState<string | null>(null);
    const [quantity, setQuantity] = useState<number>(0);

    const safeHtml = product?.description || '';
    const hasSizes = (product?.productVariant || []).some((v: any) => !!v.size);

    const selectedVariantCode = useMemo(() => {
        return (product?.productVariant || []).find((variant: any) => {
            const matchColor = !selectedColor || variant.color?.hex === selectedColor;
            const matchSize = !hasSizes || variant.size?.code === selectedSizeCode;
            return matchColor && matchSize;
        }) || null;
    }, [product, selectedColor, selectedSizeCode, hasSizes]);

    const quantityProduct = selectedVariantCode?.warehouse?.stock_quantity || 0;

    const uniqueColors = useMemo(() => {
        const variants = product?.productVariant || [];
        const seen = new Set<string>();
        return variants.filter((v: any) => {
            const hex = v.color?.hex?.toLowerCase();
            if (!hex || seen.has(hex)) return false;
            seen.add(hex);
            return true;
        });
    }, [product]);

    const uniqueSizes = useMemo(() => {
        const variants = product?.productVariant || [];
        const seen = new Set<string>();
        return variants.filter((v: any) => {
            const code = v.size?.code?.toLowerCase();
            if (!code || seen.has(code)) return false;
            seen.add(code);
            return true;
        });
    }, [product]);

    useEffect(() => {
        onUpdateVariantCode(selectedVariantCode?.code || null);
    }, [selectedVariantCode, onUpdateVariantCode]);

    const scrollTo = (id: string, offset = 130) => {
        const el = document.getElementById(id);
        if (el) {
            const y = el.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    const purchase = () => {
        if (!selectedVariantCode) return;
        const selectedProduct = {
            product_code: selectedVariantCode.product.code,
            product_variant_code: selectedVariantCode.code,
            quantity: quantity,
            category_code: selectedVariantCode.product.category_code,
            unit_price: selectedVariantCode.product.sale_price,
            totalPrice: selectedVariantCode.product.sale_price * quantity,
            name: product.name,
            variant: {
                product: {
                    path_image_resize: selectedVariantCode.product.path_image_resize,
                    name: product.name,
                    code: selectedVariantCode.product.code,
                    sale_price: selectedVariantCode.product.sale_price
                },
                color: selectedVariantCode.color,
                size: selectedVariantCode.size,
                variant_code: selectedVariantCode.code
            }
        };

        // TODO: Update state manager for Cart properly
        // cartStore.setSelectedProducts([selectedProduct]);
        const token = typeof window !== 'undefined' ? localStorage.getItem('APP_TOKEN_NAME') : null;

        if (!token) {
            alert(t('productDetail.purchaseError')); 
            router.push(`/${locale}/auth/login?redirect=/shopping-cart?tab=1`);
            return;
        } else {
            router.push(`/${locale}/shopping-cart?tab=1`);
        }
    };

    const changeRouter = () => {
        if (!selectedVariantCode) return;
        if (selectedVariantCode.product.is_customizable === '1') {
            router.push(`/${locale}/product/customize/2d/${selectedVariantCode.code}`);
        }
        if (selectedVariantCode.product.is_3d_custom === '1') {
            router.push(`/${locale}/product/customize/3d/${selectedVariantCode.code}`);
        }
    };

    const addToCart = async () => {
        if (!selectedVariantCode?.code) {
            alert(t('productDetail.messageErrorVariant'));
            return;
        }
        if (quantity <= 0) {
            alert(t('productDetail.messageErrorQuantity'));
            return;
        }
        if (quantityProduct === 0) {
            alert(t('productDetail.outOfStock'));
            return;
        }

        // Call your cart API here:
        // await useCart(t, $showMessage).addToCart(...)
        alert(t('productDetail.addedToCart')); 
    };

    return (
        <>
            <div className="product-name font-bold text-2xl">{product?.name}</div>
            <div className="product-price text-red-500 font-semibold text-xl my-2">{selectedVariantCode?.activePriceSetting?.sale_price ?? product?.sale_price}</div>
            <div className="rating-filter">★ 5</div>
            {safeHtml && <div className="ckeditor-content mt-4" dangerouslySetInnerHTML={{ __html: safeHtml }} />}
            {safeHtml && <div onClick={() => scrollTo('describe')} className="see-detail text-blue-500 cursor-pointer hover:underline mt-2">{t('productDetail.seeDetail')}</div>}
            
            <hr className="w-full h-px bg-gray-400 opacity-30 my-5 border-0" />
            
            <div className="product-info font-medium">{t('productDetail.color')}</div>
            <div className="option-color flex gap-2 mt-2">
                {uniqueColors.map((color: any, index: number) => (
                    <div
                        key={index}
                        className={`option-item flex items-center p-2 border rounded cursor-pointer ${selectedColor === color.color?.hex ? 'border-black bg-gray-50' : 'border-gray-200'}`}
                        onClick={() => { setSelectedColor(color.color?.hex || ''); setQuantity(0); }}
                    >
                        <div
                            className="w-6 h-6 rounded-full border-2 cursor-pointer mr-2"
                            style={{
                                backgroundColor: color.color?.hex,
                                borderColor: selectedColor === color.color?.hex ? '#000' : '#ccc'
                            }}
                        ></div>
                        <span>{color.color?.name}</span>
                    </div>
                ))}
            </div>

            {hasSizes && (
                <>
                    <span className="product-info block mt-4 font-medium">{t('productDetail.sizeOrStyle')} </span>
                    <div className="option-color flex gap-2 mt-2">
                        {uniqueSizes.map((size: any, index: number) => (
                            <div
                                key={index}
                                className={`option-item p-2 border rounded cursor-pointer ${selectedSizeCode === size.size?.code ? 'border-black bg-gray-50' : 'border-gray-200'}`}
                                onClick={() => { setSelectedSizeCode(size.size?.code || ''); setQuantity(0); }}
                            >
                                <span>{size.size?.name || ''}</span>
                            </div>
                        ))}
                    </div>
                </>
            )}

            <div className="product-info mt-4 font-medium">{t('productDetail.quantity')}</div>
            <div className="quantity flex items-center gap-4 mt-2">
                <InputNumber.Root value={quantity} onValueChange={(e: any) => setQuantity(e.value || 0)} min={0} max={quantityProduct}>
                    <InputNumber.Group className="flex items-stretch h-full">
                        <InputNumber.Decrement>
                            <i className="pi pi-minus" />
                        </InputNumber.Decrement>
                        <InputNumber.Input className="w-16 text-center border-y p-2" />
                        <InputNumber.Increment>
                            <i className="pi pi-plus" />
                        </InputNumber.Increment>
                    </InputNumber.Group>
                </InputNumber.Root>
                <div className="text-sm text-gray-600">
                    {selectedVariantCode && quantityProduct !== 0 ? (
                        <span>{t('productDetail.productAvailable', { quantity: quantityProduct })}</span>
                    ) : selectedVariantCode && quantityProduct === 0 ? (
                        <span className="text-red-500">{t('productDetail.outOfStock')}</span>
                    ) : null}
                </div>
            </div>

            {quantity > 0 && quantity === quantityProduct && (
                <div className="mt-2 flex items-center gap-2">
                    <span className="pi pi-exclamation-triangle text-red-500"></span>
                    <span className="text-red-500 text-sm">{t('productDetail.messageMax')}</span>
                </div>
            )}
            
            <hr className="w-full h-px bg-gray-400 opacity-30 my-5 border-0" />
            
            <div className="btn-group flex gap-2 flex-wrap">
                {product?.is_customizable === '1' && (
                    <button
                        disabled={!selectedColor || !selectedVariantCode || quantityProduct === 0 || quantity === 0}
                        onClick={changeRouter}
                        className="btn btn-solid bg-black text-white px-6 py-2 rounded disabled:opacity-50"
                    >
                        <span className="icon mr-2">🛠</span>{t('productDetail.freeCustomization')}
                    </button>
                )}
                {product?.is_customizable === '2' && (
                    <button
                        disabled={!selectedColor || !selectedVariantCode || quantityProduct === 0 || quantity === 0}
                        className="btn btn-outline border-black border text-black px-6 py-2 rounded disabled:opacity-50 flex items-center gap-2"
                        onClick={addToCart}
                    >
                        <Image src="/page/cart.png" className="img-icon" alt="cart" width={20} height={20} />
                        {t('productDetail.addToCard')}
                    </button>
                )}
                {product?.is_customizable === '2' && (
                    <button
                        disabled={!selectedColor || !selectedVariantCode || quantityProduct === 0 || quantity === 0}
                        onClick={purchase}
                        className="btn btn-solid buying bg-black text-white px-6 py-2 rounded disabled:opacity-50"
                    >
                        {t('productDetail.purchase')}
                    </button>
                )}
            </div>
        </>
    );
}
