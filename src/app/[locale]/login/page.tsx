'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function LoginPage() {
  const t = useTranslations();

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          🔵 TRANG ĐĂNG NHẬP (AUTH LAYOUT)
        </h1>
        <p className="text-sm text-slate-500">
          Trang này dùng Auth Layout riêng (sạch sẽ, không có Topbar & Footer)
        </p>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="admin@example.com"
            className="w-full px-3 py-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Mật khẩu</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-3 py-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          Đăng nhập
        </button>
      </form>

      <div className="pt-4 text-center border-t border-slate-200 dark:border-zinc-800">
        <Link
          href="/public"
          className="text-sm text-blue-600 hover:underline dark:text-blue-400"
        >
          👈 Quay về Trang chủ (Dùng Main Layout)
        </Link>
      </div>
    </div>
  );
}
