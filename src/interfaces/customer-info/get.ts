export interface ICustomerInfo {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    membershipType: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface ICustomerAddress {
    nation: string;
    city: string;
    district: string;
    ward: string;
    street: string;
    number: string;
}

export interface IAddressPayload {
    customer_code: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    nation: string;
    district: string;
    city: string;
    ward: string;
    street: string;
    address: string;
}

export interface IUpdateInfoPayload {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    member_type: string;
}

export interface IChangePasswordPayload {
    current_password: string;
    new_password: string;
    new_password_confirmation: string;
}
