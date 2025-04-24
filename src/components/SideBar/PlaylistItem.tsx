'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useTranslations } from 'use-intl';

export default function PlaylistItem() {
  const t = useTranslations();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const onCloseMenu = () => {
    setTimeout(() => {
      setMenuOpen(false);
    }, 100);
  };

  return (
    <div
      onBlur={onCloseMenu}
      className="capitalize relative py-2 flex items-center justify-between"
    >
      <Link
        href="/playlist"
        className="dark:opacity-80 hover:opacity-60 transition text-text-color"
      >
        playlist 4
      </Link>
      <button
        onClick={() => setMenuOpen(!isMenuOpen)}
        className="flex gap-[2px] py-2 cursor-pointer transition hover:opacity-70"
      >
        <div className="w-1 h-1 rounded-full bg-text-color"></div>
        <div className="w-1 h-1 rounded-full bg-text-color"></div>
        <div className="w-1 h-1 rounded-full bg-text-color"></div>
      </button>
      {isMenuOpen && (
        <div className="bg-text-color z-9 rounded-md rounded-200 z-9999 left-[50%] absolute top-[100%]">
          <button className="w-full text-[12px] dark:text-black text-white p-2 px-5 hover:opacity-80 hover:bg-[rgba(0,0,0,0.1)] transition cursor-pointer">
            {t('edit')}
          </button>
          <button className="w-full text-[12px] dark:text-black text-white p-2 px-5 hover:opacity-80 hover:bg-[rgba(0,0,0,0.1)] transition cursor-pointer">
            {t('delete')}
          </button>
          <div className="absolute text-text-color top-[-12px] right-1 z-[-1]">▲</div>
        </div>
      )}
    </div>
  );
}
