'use client';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

import nextIntlConfig from '@/locales/languages';
import DropDownButton from '../DropDownMenu/DropDownButton';

export default function LanguageSwitcher() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const t = useTranslations();
  const currentLocale = useLocale();

  const onClick = (value: string) => {
    document.cookie = `NEXT_LOCALE=${value}; path=/; max-age=31536000; SameSite=Lax; Secure`;
    location.reload();
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
            <DropDownButton key={index} ariaLabel="Select language" onClick={() => onClick(locale)}>
              {languages[locale].name}
            </DropDownButton>
          ))}
          <div className="absolute text-text-color top-14 left-1 z-[-1]">▼</div>
        </div>
      )}
    </div>
  );
}
