export interface ImageInfo {
    code: string;
    origin_name: string;
    path_image_resize: string;
    path_image_original: string;
    disk: string;
    extension: string;
    filesize: number;
    status: string;
    note: string | null;
}

export interface Review {
    code: string;
    customer_name: string;
    content: string;
    image: ImageInfo;
}

export interface FeaturedProduct<T = unknown> {
    [key: string]: T;
}
export interface CompanyDataInfo {
    code: string;
    mission: string;
    vision: string;
    reviews?: Review[];
    media?: MediaItem[];
    featuredProducts?: FeaturedProduct[];
}
export interface MediaItem {
    code: string;
    type: 'image' | 'video';
    image_url: string;
    path_image_original?: string;
    path_image_resize?: string;
    video_url?: string;
    poster?: string;
}
export interface Testimonial {
    code: string;
    customer_name: string;
    content: string;
    image: object;
}
export interface Icompany {
    isLoading: boolean | null;
    companies: CompanyDataInfo | null;
}

// components
export interface PrimaryImage {
    image: string;
    imageOriginal: string;
    alt: string;
}
export interface ProductCard {
    code: string;
    name: string;
    images: PrimaryImage;
}
export interface FeaturedProduct {}
