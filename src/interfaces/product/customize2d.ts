export interface DetailCustomize {
    isLoading: boolean;
    items: null | object;
}

export interface addProductCustomizeToCart {
    product_code: string;
    variant: string;
    image: string;
    style: Array<{
        image: string;
        image_variant: string;
    }>;
    detail: Array<{
        image_color: string;
        color: string;
    }>;
    logo: Array<{
        logo: string;
    }>;
    text: Array<{
        text_font: string;
        text_size: string;
        text_color: string;
        content: string;
        bold?: string;
        italic?: string;
        underline?: string;
        opacity?: number;
    }>;
    colors: Array<{
        image_color: string;
        color: string;
    }>;
    add_to_cart: {
        quantity: number;
    };
}

export interface StyleAndDetail {
    code: string;
    name: string | null;
    style: Array<{
        code: string;
        name: string | null;
        checked: boolean;
        image: {
            code: string;
            image_resize: string;
            image_original: string;
        } | null;
    }>;
    detailAndColor: {
        title: string;
        items: {
            code: string;
            name: string | null;
            color: string | null;
            title: string;
            checked: boolean;
            image: {
                code: string;
                image_resize: string;
                image_original: string;
            } | null;
        }[];
    }[];
}

export interface TextAndFont {
    code: string;
    name: string | null;
    textAdd: string;
    errorText: string;
    custom: {
        code: string | null;
        textLimit: number | null;
    } | null;
    listTextAdd: Array<{
        fontFamily: string | null;
        fontSize: number | null;
        color: string | null;
        textAdd: string;
    }>;
}

export interface Logo {
    code: string;
    name: string | null;
    items: Array<{
        code?: string | null;
        name?: string | null;
        checked: boolean;
        image?: {
            code?: string | null;
            image_resize?: string | null;
            image_original?: string | null;
        } | null;
    }>;
    imagesAdd: Array<{
        code: string;
        image?: string | null;
    }>;
}

export interface Color {
    code: string;
    name: string | null;
    hex: string | null;
    items: {
        title: string;
        items: {
            code: string;
            name: string | null;
            color: string | null;
            checked: boolean;
            image: {
                code: string;
                image_resize: string;
                image_original: string;
            } | null;
        }[];
    }[];
}

export interface Size {
    code: string | null;
    name: string | null;
    description: string | null;
}

export interface Product {
    code: string | null;
    name: string | null;
    price: string | number | null;
    category_code: string | null;
}
export interface ColorProduct {
    code: string | null;
    name: string | null;
    hex: string | null;
    description: string | null;
    status: string | number | null;
    note: string | null;
}

export interface Setting {
    code: string;
    styleAndDetail: Array<StyleAndDetail> | [];
    textAndFont: Array<TextAndFont> | [];
    logo: Array<Logo> | [];
    color: Array<Color> | [];
    size: Size;
    product: Product;
    colorProduct: ColorProduct;
    warehouse: {
        code: string;
        stockQuantity: number | null;
    };
}
