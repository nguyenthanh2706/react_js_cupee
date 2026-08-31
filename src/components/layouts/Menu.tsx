'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Cookies from 'js-cookie';
import { APP_TOKEN_NAME } from '@/utils/constants';
import { MenuItem } from '@/components/layouts/MenuItem';

export function Menu() {
    const t = useTranslations();
    const [token, setToken] = useState<string | undefined>(undefined);

    useEffect(() => {
        setToken(Cookies.get(APP_TOKEN_NAME));
    }, []);

    const sideMenuDefault = {
        menu: [
            {
                label: t('layout.menu.introduce'),
                items: [
                    {
                        label: t('introduce.nav.companyInfo'),
                        to: `/introduce/company-info`,
                    },
                    {
                        label: t('introduce.nav.policy'),
                        to: `/introduce/policy`,
                    },
                    {
                        label: t('introduce.nav.guide'),
                        to: `/introduce/guide`,
                    },
                ],
            },
            {
                label: t('layout.menu.product'),
                to: `/product/list`,
            },
            {
                label: t('layout.menu.orderTracking'),
                to: token ? `/order-tracking` : `/auth/login`,
            },
        ],
    };

    return (
        <ul className="layout-menu">
            {sideMenuDefault.menu.map((menuItem, index) => (
                <MenuItem
                    key={`${menuItem.label}-${index}`}
                    item={menuItem}
                    root={true}
                    index={index}
                    parentItemKey={null}
                />
            ))}
        </ul>
    );
}
