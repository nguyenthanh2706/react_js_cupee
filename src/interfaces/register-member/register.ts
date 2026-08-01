export interface IMembership {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    nation: string;
    city: string;
    district: string;
    ward: string;
    street: string;
    number: string;
    membershipType: string;
    language: string;
    timezone: string;
    accept: boolean;
}

export interface IMembershipPayload {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    password: string;
    password_confirmation: string;
    nation: string;
    city: string;
    ward: string;
    street: string;
    address: string;
    status: string;
    member_type: string;
    note: string;
    locale: string;
}
