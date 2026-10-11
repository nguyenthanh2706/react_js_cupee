'use client';

import { useState, useEffect, useMemo } from 'react';
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
    const [expandedKeys, setExpandedKeys] = useState<Record<string, boolean>>({});

    useEffect(() => {
        if (activeCode) {
            const parents = getParentCodes(activeCode, listMenu);
            if (parents.length > 0) {
                setExpandedKeys((prev) => {
                    const next = { ...prev };
                    for (const p of parents) {
                        next[p] = true;
                    }
                    return next;
                });
            }
        }
    }, [activeCode, listMenu]);

    const handleItemClick = (item: Section, hasChildren: boolean) => {
        onSelectSection(item);
        if (hasChildren) {
            setExpandedKeys((prev) => ({
                ...prev,
                [item.code]: !prev[item.code]
            }));
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
                            className={`item-menu w-full text-left flex items-center justify-between ${isActive ? 'item-active' : ''}`}
                            onClick={() => handleItemClick(subItem, hasChildren)}
                        >
                            <span className="font-semibold">
                                {subItem.idList} . {subItem.title}
                            </span>
                            {hasChildren && (
                                <i
                                    className={`pi ${isExpanded ? 'pi-chevron-down' : 'pi-chevron-right'} text-xs ml-2`}
                                />
                            )}
                        </button>
                    </div>
                    {hasChildren && isExpanded && (
                        <div className="p-panelmenu-content pl-3">
                            <ul className="list-none p-0 m-0">{renderSubItems(subItem.items!)}</ul>
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
                                    className={`item-menu w-full text-left flex items-center justify-between ${isActive ? 'item-active' : ''}`}
                                    onClick={() => handleItemClick(item, hasChildren)}
                                >
                                    <span className="font-semibold">
                                        {item.idList} . {item.title}
                                    </span>
                                    {hasChildren && (
                                        <i
                                            className={`pi ${isExpanded ? 'pi-chevron-down' : 'pi-chevron-right'} text-xs ml-2`}
                                        />
                                    )}
                                </button>
                            </div>

                            {hasChildren && isExpanded && (
                                <div className="p-panelmenu-content">
                                    <ul className="list-none p-0 m-0">
                                        {renderSubItems(item.items!)}
                                    </ul>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </nav>
    );
}
