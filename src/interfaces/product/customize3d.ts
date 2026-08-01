import { Gradient, Pattern } from 'fabric';

export interface addProductCustomizeToCart3D {
    image: string;
    is_3d_custom: string;
    image_custom: { image: any }[];
    color: any;
    variant: any;
    text: {
        text_font: string;
        text_size: number;
        underline: string;
        bold: string;
        text_color: string | Gradient<'linear'> | Gradient<'radial'> | Pattern;
        opacity: any;
        italic: string;
        content: string;
    }[];
    product_code: any;
    add_to_cart: { quantity: number };
}
export interface DetailCustomize {
    isLoading: boolean;
    items: null | object;
}

export interface Size {
    code: string | null;
    name: string | null;
    description: string | null;
}

export interface Color {
    code: string | null;
    hex: string | null;
}
export interface Product {
    code: string | null;
    name: string | null;
    price: number | null;
    path_image: string | null;
    category_code: string | null;
}

export interface Model3D {
    code: string;
    name: string | null;
    model3D: {
        code: string | null;
        name: string | null;
        path_model: string;
    } | null;
    image_texture: {
        code: string;
        image: {
            code: string | null;
            name: string | null;
            path_image: string | null;
        } | null;
    } | null;
}

export interface Setting {
    code: string;
    size: Size;
    product: Product;
    color: Color;
    model: Model3D | null;
    warehouse: {
        code: string;
        stockQuantity: number | null;
    };
}

export interface TextAndFont {
    isBold: boolean;
    isItalic: boolean;
    isUnderline: boolean;
    opacity: number;
    fontFamily: string;
    fontSize: number;
    textColor: string;
    content: string;
    angle: number;
}

export interface Logo {
    opacity: number;
    flipX: boolean;
    flipY: boolean;
    angle: number;
}
