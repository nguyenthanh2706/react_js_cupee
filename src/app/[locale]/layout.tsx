import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {LayoutProvider} from '@/context/LayoutContext';
import PrimeSSRProvider from '@/components/providers/PrimeSSRProvider';
import ToastRoot from "@/components/common/ToastRoot"
import '@/app/globals.css';

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
                    {children}
                    <ToastRoot></ToastRoot>
                </PrimeSSRProvider>
            </LayoutProvider>
        </NextIntlClientProvider>
        </body>
        </html>
    );
}
