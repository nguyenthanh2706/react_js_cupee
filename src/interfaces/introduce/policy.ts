export interface Section {
    id?: string;
    title: string;
    content: string;
}
export interface PolicyNavigation {
    code: string;
    title: string;
    content: string;
}
export interface Policy {
    code: string;
    title_vn?: string;
    title_en?: string;
    title_jp?: string;
    content_vn?: string;
    content_en?: string;
    content_jp?: string;
}
