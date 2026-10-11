export interface Section {
    code: string;
    title: string;
    slug?: string;
    content?: string;
    children?: Section[];
    idList?: string;
    key?: string;
    items?: Section[];
}

export function mapListMenu(sections?: Section[]): Section[] {
    if (!sections || !Array.isArray(sections)) return [];

    function traverse(arr: Section[], prefix: number[] = []): Section[] {
        return arr.map((item, i) => {
            const currentIndex = [...prefix, i + 1];
            const idList = currentIndex.join('.');

            return {
                ...item,
                idList,
                key: item.code,
                items: item.children ? traverse(item.children, currentIndex) : undefined
            };
        });
    }

    return traverse(sections);
}

export function findSectionBySlug(listMenu: Section[], slug?: string): Section | null {
    if (!slug) return null;

    for (const item of listMenu) {
        if (item.slug === slug || item.code === slug) {
            return item;
        }

        const children = item.items || item.children;
        if (children && children.length > 0) {
            const found = findSectionBySlug(children, slug);
            if (found) return found;
        }
    }
    return null;
}
