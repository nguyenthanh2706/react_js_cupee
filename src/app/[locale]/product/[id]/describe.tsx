'use client';

import React, { useMemo } from 'react';

export default function ProductDetailDescribe({ productDetail }: { productDetail: any }) {
    // We render the raw HTML as requested. In production, ensure this is sanitized (e.g. using DOMPurify)
    const safeHtml = useMemo(() => {
        if (!productDetail?.description) return '';
        return productDetail.description;
    }, [productDetail]);

    return (
        <>
            <div 
                id="describe" 
                className="ckeditor-content" 
                dangerouslySetInnerHTML={{ __html: safeHtml }} 
            />
            <hr className="w-full h-px bg-gray-400 opacity-30 my-10 border-0" />
        </>
    );
}
