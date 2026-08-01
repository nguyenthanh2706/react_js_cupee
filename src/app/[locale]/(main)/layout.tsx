import { HeadTopbar } from '@/components/layouts/HeadTopbar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="layout-container layout-horizontal layout-light-menu">
            <div className="layout-topbar">
                <HeadTopbar />
                <div className="main-topbar"></div>
            </div>
            <main className="layout-content-wrapper flex-1">{children}</main>
            <footer>Footer</footer>
        </div>
    );
}