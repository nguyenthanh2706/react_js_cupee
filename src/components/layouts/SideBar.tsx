'use client';

import {Link} from '@/i18n/routing';
import {Logo} from '@/components/common/Logo';
import {Menu} from '@/components/layouts/Menu';

export function SideBar() {

    return (
        <div className="layout-sidebar">
            <div className="sidebar-header">
                <Link className="cursor-pointer" href={'/introduce/company-info'}>
                    <Logo></Logo>
                </Link>
            </div>
            <div className="layout-menu-container">
                <Menu></Menu>
            </div>
        </div>
    )
}