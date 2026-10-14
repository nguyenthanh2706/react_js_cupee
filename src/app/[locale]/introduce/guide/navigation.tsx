'use client';

import { useState, useMemo } from 'react';
import type { Section } from './types';
import { mapListMenu } from './types';

interface Props {
    listGuide: Section[];
    activeCode: string | null;
    onSelectSection: (section: Section) => void;
    className?: string;
}

function getParentCodes(code: string, menu: Section[], parents: string[] = []): string[] {
    for (const m of menu) {
        if (m.code === code) {
            return parents;
        }
        const children = m.items || m.children;
        if (children && children.length > 0) {
            const found = getParentCodes(code, children, [...parents, m.code]);
            if (found.length > 0) return found;
        }
    }
    return [];
}

export default function GuideNavigation({
    listGuide,
    activeCode,
    onSelectSection,
    className = ''
}: Props) {
    const listMenu = useMemo(() => mapListMenu(listGuide), [listGuide]);
    // Mở sẵn các node cha của mục đang active (khi vào trực tiếp bằng URL slug)
    const [expandedKeys, setExpandedKeys] = useState<Record<string, boolean>>(() =>
        activeCode
            ? Object.fromEntries(getParentCodes(activeCode, listMenu).map((code) => [code, true]))
            : {}
    );

    const handleToggleExpand = (code: string) => {
        setExpandedKeys((prev) => ({
            ...prev,
            [code]: !prev[code]
        }));
    };

    const handleSelect = (item: Section, hasChildren: boolean) => {
        onSelectSection(item);
        if (hasChildren) {
            handleToggleExpand(item.code);
        }
    };

    const renderSubItems = (items: Section[]) => {
        return items.map((subItem) => {
            const hasChildren = Boolean(subItem.items && subItem.items.length > 0);
            const isExpanded = Boolean(expandedKeys[subItem.code]);
            const isActive = activeCode === subItem.code;

            return (
                <li key={subItem.code} className="p-panelmenu-item">
                    <div className="p-panelmenu-item-content">
                        <button
                            type="button"
                            className={`item-menu w-full text-left flex items-center justify-between transition-colors duration-200 ${
                                isActive ? 'item-active' : ''
                            }`}
                            onClick={() => handleSelect(subItem, hasChildren)}
                        >
                            <span className="font-semibold">
                                {subItem.idList} . {subItem.title}
                            </span>
                            {hasChildren && (
                                <i
                                    className={`pi pi-chevron-down text-xs ml-2 transition-transform duration-300 ${
                                        isExpanded ? 'rotate-180' : ''
                                    }`}
                                />
                            )}
                        </button>
                    </div>

                    {hasChildren && (
                        <div
                            className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                                isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                            }`}
                        >
                            <div className="overflow-hidden">
                                <div className="p-panelmenu-content pl-4">
                                    <ul className="p-panelmenu-root-list list-none p-0 m-0">
                                        {renderSubItems(subItem.items!)}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </li>
            );
        });
    };

    return (
        <nav className={`panel-menu-custom ${className}`}>
            <div className="p-panelmenu">
                {listMenu.map((item) => {
                    const hasChildren = Boolean(item.items && item.items.length > 0);
                    const isExpanded = Boolean(expandedKeys[item.code]);
                    const isActive = activeCode === item.code;

                    return (
                        <div key={item.code} className="p-panelmenu-panel">
                            <div className="p-panelmenu-header-content">
                                <button
                                    type="button"
                                    className={`item-menu w-full text-left flex items-center justify-between transition-colors duration-200 ${
                                        isActive ? 'item-active' : ''
                                    }`}
                                    onClick={() => handleSelect(item, hasChildren)}
                                >
                                    <span className="font-semibold">
                                        {item.idList} . {item.title}
                                    </span>
                                    {hasChildren && (
                                        <i
                                            className={`pi pi-chevron-down text-xs ml-2 transition-transform duration-300 ${
                                                isExpanded ? 'rotate-180' : ''
                                            }`}
                                        />
                                    )}
                                </button>
                            </div>

                            {hasChildren && (
                                <div
                                    className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                                        isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                                    }`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="p-panelmenu-content pl-2">
                                            <ul className="p-panelmenu-root-list list-none p-0 m-0">
                                                {renderSubItems(item.items!)}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </nav>
    );
}
