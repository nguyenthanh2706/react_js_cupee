// @ts-ignore
import { IProductDetail, IProductVariant } from '~/interfaces/product/detail';
// @ts-ignore
import { ICustomization } from './add';

export interface ICartItem {
    id?: string;
    quantity: number;
    checked: boolean;
    outOfStock: boolean;
    product_variant_code: string;
    variant: IProductVariant & {
        product?: IProductDetail;
        warehouse?: {
            stock_quantity: number;
        };
    };
    customizations?: ICustomization[];
    us_customizable?: any; // Setting from cart item
    customProductPlatform?: {
        image?: {
            path_image_resize: string;
        };
    };
}

export interface IPaymentForm {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    nation: string;
    city: string;
    district: string;
    ward: string;
    street: string;
    number: string;
    note: string;
    accept: boolean;
    paymentMethod: string;
    savedAddress: string | null;
    voucher: IVoucherInfo;
}

export interface IVoucherInfo {
    voucher_code: string;
    voucher_type: string;
    deduction: string;
    start_date: string;
    end_date: string;
    remaining_quantity: number;
    scope_application: any[];
    condition: string;
}

export interface ITotalInfo {
    finalTotal: number;
    shippingFee: number;
    discountAmount: number;
    voucher: string;
}

export interface IPaymentMethod {
    name: string;
    code: string;
}

export interface IAddress {
    id: string;
    address: string;
    city: string;
    district: string;
    ward: string;
    street: string;
    number: string;
    isDefault?: boolean;
}

export interface IValidationField {
    transitionKey: string;
    types: string[];
    errorKey: string;
}

export interface IErrorInfo {
    [key: string]: string | undefined;
}

// Tab Status Interface
export interface ITabStatus {
    key: string;
    label: string;
}

export interface ICartStore {
    items: ICartItem[];
}

export interface IVariantDetail {
    product?: IProductDetail;
    color?: {
        name: string;
    };
    size?: {
        name: string;
    };
    code: string;
}

export interface IUserInfo {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: IAddress[];
}
