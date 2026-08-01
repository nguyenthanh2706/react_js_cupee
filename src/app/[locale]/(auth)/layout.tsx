import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 dark:bg-zinc-950 p-4">
      {/* 🔵 AUTH LAYOUT: Khung sạch sẽ căn giữa màn hình cho trang Login/Register */}
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-8 shadow-xl">
        {children}
      </div>
    </div>
  );
}
