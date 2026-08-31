'use client';

import React, {useState, useEffect, useRef} from 'react';
import {useLayout} from '@/context/LayoutContext';
import {Link} from '@/i18n/routing';
import {usePathname} from 'next/navigation';

export interface MenuItemType {
    label: string;
    icon?: string;
    to?: string;
    url?: string;
    items?: MenuItemType[];
    visible?: boolean;
    disabled?: boolean;
    class?: string;
    target?: string;
    command?: (event: { originalEvent: React.SyntheticEvent; item: MenuItemType }) => void;
}

interface MenuItemProps {
    item: MenuItemType;
    index: number;
    root?: boolean;
    parentItemKey?: string | null;
}

export function MenuItem({item, index, root = false, parentItemKey = null}: MenuItemProps) {
    const itemKey = parentItemKey ? `${parentItemKey}-${index}` : String(index);
    const [isActiveMenu, setIsActiveMenu] = useState<boolean>(false);

    const {layoutState, setActiveMenuItem} = useLayout();

    useEffect(() => {
        const activeItem = layoutState.activeMenuItem;
        const isActive = activeItem === itemKey || (activeItem ? activeItem.startsWith(itemKey + '-') : false);
        setIsActiveMenu(isActive);
    }, [layoutState.activeMenuItem, itemKey]);

    const itemClick = (event: React.MouseEvent<HTMLAnchorElement>, menuItem: MenuItemType) => {
        if (menuItem.disabled) {
            event.preventDefault();
            return;
        }
        if (menuItem.items) {
            event.preventDefault();
            // Nếu menu đang mở -> Bấm click sẽ đóng (gán key về parentItemKey)
            // Nếu menu đang đóng -> Bấm click sẽ mở (gán key về itemKey)
            setActiveMenuItem(isActiveMenu ? parentItemKey : itemKey);
        }
    };
    // 💡 SỰ KIỆN 4: Tự động đổi trạng thái khi đổi URL trang web
    const pathname = usePathname();
    useEffect(() => {
        if (item.to && item.to === pathname) {
            setActiveMenuItem(itemKey);
        }
    }, [pathname, item.to, itemKey, setActiveMenuItem]);

    const checkActiveRoute = (menuItem: MenuItemType) => {
        return menuItem.to === pathname;
    }

    const MenuDrop = (!item.to || item.items) && item.visible !== false &&
        <Link className={`${item.class}`} href={item.url || '#'} target={item.target ?? ''} tabIndex={0}
              onClick={(e) => itemClick(e, item)}>
            {root && <i className={item.icon + 'layout-menuitem-icon'}></i>}
            <span className={root ? 'ml-2' : ''}> {item.label}</span>
            {item.items && <i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>}
        </Link>

    const MenuNotDrop = item.to && !item.items && item.visible !== false &&
        <Link className={`${item.class || ''} ${checkActiveRoute(item) ? 'active-route' : ''}`.trim()}
              href={item.to || '#'} target={item.target ?? ''} tabIndex={0}
              onClick={(e) => itemClick(e, item)}>
            {root && <i className={item.icon + 'layout-menuitem-icon'}></i>}
            <span className={root ? 'ml-2' : ''}> {item.label}</span>
            {item.items && <i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>}
        </Link>

    const MenuChildren = item.items && item.visible !== false &&
        <ul className={root ? 'layout-root-submenulist' : ''}>
            {item.items.map((menuItem, index) => (
                <MenuItem
                    key={`${menuItem.label}-${index}`}
                    item={menuItem}
                    root={false}
                    index={index}
                    parentItemKey={itemKey}
                />
            ))}
        </ul>


    return (
        <li className={`${root ? 'layout-root-menuitem' : ''} ${isActiveMenu ? 'active-menuitem' : ''}`}>
            {MenuDrop}
            {MenuNotDrop}
            {MenuChildren}
        </li>

    );
}
