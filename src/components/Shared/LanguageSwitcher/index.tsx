'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

import nextIntlConfig from '@/locales/languages';

export default function LanguageSwitcher() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const onClick = (value: string) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${value}`);
    document.cookie = `NEXT_LOCALE=${value}; path=/; max-age=31536000; SameSite=Lax; Secure`;
    router.push(newPath);
    window.location.href = newPath;
    setMenuOpen(false);
  };

  const onCloseMenu = () => {
    setTimeout(() => {
      setMenuOpen(false);
    }, 100);
  };

  const languages: Record<string, { name: string }> = {
    en: {
      name: t('english'),
    },
    pt: {
      name: t('portuguese'),
    },
  };

  return (
    <div className="flex relative" onBlur={onCloseMenu}>
      <button
        aria-label="Open Language options"
        onClick={() => setMenuOpen(!isMenuOpen)}
        className="border-text-color text-xs text-text-color border-2 py-2 px-5 rounded-full cursor-pointer hover:scale-105 hover:opacity-70 transition"
      >
        {languages[currentLocale].name}
      </button>
      {isMenuOpen && (
        <div className="bg-text-color z-9 rounded-md rounded-200 left-2 absolute bottom-[115%]">
          {nextIntlConfig.locales.map((locale, index) => (
            <button
              aria-label="Select language"
              className="w-full text-xs dark:text-black text-white p-2 px-5 hover:opacity-80 hover:bg-[rgba(0,0,0,0.1)] transition cursor-pointer"
              key={index}
              onClick={() => onClick(locale)}
            >
              {languages[locale].name}
            </button>
          ))}
          <div className="absolute text-text-color top-14 left-1 z-[-1]">▼</div>
        </div>
      )}
    </div>
  );
}
