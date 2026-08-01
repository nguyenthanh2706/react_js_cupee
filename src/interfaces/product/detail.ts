export interface IProductDetail {
    code?: string;
    name?: string;
    path_image_resize?: string;
    alt?: string;
    productVariant?: IProductVariant[];
    images?: IVariantImage[];
    category_code?: string;
    sale_price?: string;
    description?: string;
}

interface IColor {
    hex: string;
}

interface ISize {
    code: string;
}

interface IWarehouse {
    stock_quantity: number | null;
}

export interface IProductVariant {
    color: IColor | null;
    size: ISize | null;
    code: string;
    warehouse?: IWarehouse;
    image?: IImage | null;
}
interface IImage {
    path_image_original: string;
    origin_name?: string;
}

interface IVariantImage {
    image?: IImage | null;
}
