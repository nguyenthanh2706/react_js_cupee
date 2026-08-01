export interface OptionsFilter {
    q: string | null | '';
    category: string | null;
    isCustomizable: boolean | null;
    priceRange: string | null;
    tagColor: string | null;
    tagSpecial: string | null;
    sortPrice: 'asc' | 'desc' | null;
    sortProduct: 'asc' | 'desc' | null;
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
}

export interface ProductData {
    isLoading: boolean;
    items: any[] | null;
}
