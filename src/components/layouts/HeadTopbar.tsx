'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';

interface ListLanguage {
  name: string;
  code: string;
}

const listLanguage: ListLanguage[] = [
  { name: '日本語', code: 'ja' },
  { name: 'Tiếng Việt', code: 'vi' },
  { name: 'English', code: 'en' }
];

export function HeadTopbar() {
  const t = useTranslations();
  const currentLocale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Lấy tên ngôn ngữ hiển thị ban đầu dựa trên locale hiện tại
  const currentLangObj = listLanguage.find((item) => item.code === currentLocale);
  const [languageName, setLanguageName] = useState(currentLangObj?.name || 'Tiếng Việt');

  const toggle = () => setOpen((prev) => !prev);
  const close = () => setOpen(false);

  // Chuyển đổi ngôn ngữ sử dụng useRouter của next-intl
  const changeLanguage = (lang: ListLanguage) => {
    setLanguageName(lang.name);
    router.replace(pathname, { locale: lang.code });
    close();
  };

  // Click outside & Escape key listeners
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        open &&
        btnRef.current &&
        menuRef.current &&
        !btnRef.current.contains(target) &&
        !menuRef.current.contains(target)
      ) {
        close();
      }
    };

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [open]);

  return (
    <div className="head-topbar bg-[#000000] text-white px-6">
      <div className="flex justify-end h-8 text-xs">
        <nav className="flex items-center space-x-4 text-white">
          <Link className="hover:underline" href="/">
            {t('layout.headTopbar.notification')}
          </Link>
          <div className="w-px h-4 bg-white/60"></div>
          <Link className="hover:underline" href="/">
            {t('layout.headTopbar.support')}
          </Link>
          <div className="w-px h-4 bg-white/60"></div>

          {/* Language Switcher Dropdown */}
          <div className="drop-language relative">
            <button
              ref={btnRef}
              type="button"
              className="flex items-center rounded-md font-medium text-white cursor-pointer py-1.5"
              onClick={toggle}
            >
              {languageName}
              <i
                className={`pi pi-chevron-down ml-1 leading-none transition-transform duration-200 ease-in-out icon-drop ${
                  open ? 'rotate-180' : ''
                }`}
              />
            </button>

            {open && (
              <div
                ref={menuRef}
                className="absolute top-full right-0 mt-1 w-40 origin-top-right bg-[#faf9f5] text-gray-700 rounded-lg shadow-lg ring-1 ring-black/5 z-20 transition transform duration-150 ease-out opacity-100 scale-100"
                role="menu"
                tabIndex={-1}
              >
                <ul className="py-1">
                  {listLanguage.map((lang) => (
                    <li
                      key={lang.code}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors"
                      role="menuitem"
                      onClick={() => changeLanguage(lang)}
                    >
                      {lang.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="w-px h-4 bg-white/60"></div>
          
          {/* Social Icons */}
          <div className="flex items-center space-x-2">
            <a href="#" aria-label="Facebook" className="hover:text-blue-400" target="_blank" rel="noopener noreferrer">
              <i className="pi pi-facebook"></i>
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-blue-400" target="_blank" rel="noopener noreferrer">
              <i className="pi pi-instagram"></i>
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-blue-400" target="_blank" rel="noopener noreferrer">
              <i className="pi pi-twitter"></i>
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}
