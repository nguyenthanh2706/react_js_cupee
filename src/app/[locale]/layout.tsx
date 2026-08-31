import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {LayoutProvider} from '@/context/LayoutContext';
import PrimeSSRProvider from '@/components/providers/PrimeSSRProvider';
import ToastRoot from "@/components/common/ToastRoot"
import '@/app/globals.css';
import {HeadTopbar} from "@/components/layouts/HeadTopbar";
import {SideBar} from "@/components/layouts/SideBar";
import {EndTopBar} from "@/components/layouts/EndTopBar";
import {LayoutFooter} from "@/components/layouts/LayoutFooter";

export default async function LocaleLayout({children, params,}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const {locale} = await params;
    const messages = await getMessages();

    return (
        <html lang={locale}>
        <body>
        <NextIntlClientProvider messages={messages}>
            <LayoutProvider>
                <PrimeSSRProvider>
                    <div className="layout-container layout-horizontal layout-light-menu">
                        <div className="layout-topbar">
                            <HeadTopbar/>
                            <div className="main-topbar">
                                <SideBar></SideBar>
                                <EndTopBar></EndTopBar>
                            </div>
                        </div>
                        <main className="layout-content-wrapper flex-1">{children}</main>
                        <LayoutFooter></LayoutFooter>
                    </div>
                    <ToastRoot></ToastRoot>
                </PrimeSSRProvider>
            </LayoutProvider>
        </NextIntlClientProvider>
        </body>
        </html>
    );
}
