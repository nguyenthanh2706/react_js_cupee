'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function Home() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-8 max-w-4xl mx-auto w-full">
      <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-8 shadow-md w-full text-center space-y-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400">
          🟢 TRANG CHỦ (MAIN LAYOUT)
        </h1>

        <div className="p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl text-left space-y-3 font-mono text-sm">
          <p><span className="font-bold text-slate-500">Current Locale:</span> <span className="text-blue-500 font-semibold">{locale}</span></p>
          <p><span className="font-bold text-slate-500">t('breadcrumb.homePage'):</span> {t('breadcrumb.homePage')}</p>
          <p><span className="font-bold text-slate-500">t('breadcrumb.listProduct'):</span> {t('breadcrumb.listProduct')}</p>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-zinc-800 flex justify-center gap-4 text-sm">
          <Link
            href="/login"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
          >
            👉 Chuyển sang Trang Đăng nhập (Dùng Auth Layout riêng)
          </Link>
        </div>
      </div>
    </main>
  );
}
