export interface MediaItem {
    code?: string;
    image_url?: string;
    type?: 'image' | 'video' | string;
    poster?: string;
}

export interface Review {
    code?: string;
    customer_name?: string;
    content?: string;
    image?: {
        path_image_original?: string;
        path_image_resize?: string;
    };
    [key: string]: any;
}

export interface FeaturedProduct {
    code: string;
    name?: string;
    price?: string;
    sale_price?: string;
    discount_percent?: number;
    category_code?: string | null;
    colors?: string[];
    rating?: number;
    sold_count?: number;
    is_wishlisted?: boolean;
    path_image_resize?: string;
    [key: string]: any;
}

export interface CompanyDataInfo {
    code?: string;
    reviews?: Review[];
    media?: MediaItem[];
    featuredProducts?: FeaturedProduct[];
    mission?: string;
    vision?: string;
}

export interface LocalProductCard {
    code: string;
    name: string;
    images: string;
    priceDisplay: string;
    originalPrice?: string;
    discount?: number;
    category_code?: string | null;
    colors?: string[];
    rating?: number;
    sold?: number;
    isWishlisted?: boolean;
}
