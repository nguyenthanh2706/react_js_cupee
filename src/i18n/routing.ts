import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
    locales: ['vi', 'en', 'ja'],
    defaultLocale: 'en'
});

// Export Link, redirect, usePathname, useRouter chính chủ của next-intl hỗ trợ đa ngôn ngữ
interface LinkProps {
    onClick?: void
}

export const {Link, redirect, usePathname, useRouter} = createNavigation(routing);