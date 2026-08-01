import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '@/app/globals.css';
import { HeadTopbar } from '@/components/layouts/HeadTopbar';


export default async function MainLayout({ children }: { children: React.ReactNode }) {
    const messages = await getMessages();

    return (
        <html lang="vi">
        <body>
        <NextIntlClientProvider messages={messages}>
            <div className="layout-container layout-horizontal layout-light-menu">
                <HeadTopbar />
                <main className="layout-content-wrapper flex-1">{children}</main>
                <footer>Footer</footer>
            </div>
        </NextIntlClientProvider>
        </body>
        </html>
    );
}