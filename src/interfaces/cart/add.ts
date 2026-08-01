export interface IPayloadCart {
    product_variant_code: string;
    quantity: number;
    customizations: ICustomization[] | null;
}
export interface ICustomization {
    type: string;
    option_code: string;
    text_value: string | null;
}
