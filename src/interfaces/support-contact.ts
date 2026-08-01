export interface SupportContactRequest {
    hotline: string;
    email: string;
    content: string;
    attachments: string[];
}

export interface SupportContactResponse {
    success: boolean;
    message: string;
}
