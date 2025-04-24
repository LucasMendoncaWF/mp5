'use client';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function DropDownMenu() {
  const t = useTranslations();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const onCloseMenu = () => {
    setTimeout(() => {
      setMenuOpen(false);
    }, 200);
  };

  return (
    <div className="relative" onBlur={onCloseMenu}>
      <button
        onClick={() => setMenuOpen(!isMenuOpen)}
        className="flex gap-[3px] py-2 cursor-pointer transition hover:opacity-70"
      >
        <div className="w-2 h-2 rounded-full bg-text-color"></div>
        <div className="w-2 h-2 rounded-full bg-text-color"></div>
        <div className="w-2 h-2 rounded-full bg-text-color"></div>
      </button>
      {isMenuOpen && (
        <div className="bg-text-color w-40 z-9 rounded-md rounded-200 z-9999 right-[50%] absolute bottom-[100%]">
          <button
            onClick={onCloseMenu}
            className="w-full text-[12px] dark:text-black text-white p-2 px-5 hover:opacity-80 hover:bg-[rgba(0,0,0,0.1)] transition cursor-pointer"
          >
            {t('addFavorite')}
          </button>
          <button
            onClick={onCloseMenu}
            className="w-full text-[12px] dark:text-black text-white p-2 px-5 hover:opacity-80 hover:bg-[rgba(0,0,0,0.1)] transition cursor-pointer"
          >
            {t('addToPlaylist')}
          </button>
          <div className="absolute text-text-color bottom-[-12px] right-1 z-[-1]">▼</div>
        </div>
      )}
    </div>
  );
}
