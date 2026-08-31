import {HeadTopbar} from '@/components/layouts/HeadTopbar';
import {SideBar} from '@/components/layouts/SideBar';
import {EndTopBar} from '@/components/layouts/EndTopBar';

export default function MainLayout({children}: { children: React.ReactNode }) {
    return (
        <div className="layout-container layout-horizontal layout-light-menu">
            <div className="layout-topbar">
                <HeadTopbar/>
                <div className="main-topbar">
                    <SideBar></SideBar>
                    <EndTopBar></EndTopBar>
                </div>
            </div>
            <main className="layout-content-wrapper flex-1">{children}</main>
            <footer>Footer</footer>
        </div>
    );
}