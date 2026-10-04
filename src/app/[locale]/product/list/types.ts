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

export interface PaginationType {
    page: number;
    limit: number;
    total: number;
}

export interface ProductItem {
    code: string;
    name: string;
    image: string | null;
    price: number;
    is_customizable: boolean;
    tags: Array<{ code: string; name: string; note: string; status: number }>;
}

export const DEFAULT_FILTER: OptionsFilter = {
    q: '',
    category: null,
    isCustomizable: null,
    priceRange: null,
    tagColor: null,
    tagSpecial: null,
    sortPrice: null,
    sortProduct: null
};
