export interface Section {
    code: string;
    title: string;
    content?: string;
    order?: string | number | null;
    status?: number;
    children?: Section[];
    items?: Section[];
    key: string;
    idList?: string;
}
