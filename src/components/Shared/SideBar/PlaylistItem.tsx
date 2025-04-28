'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useTranslations } from 'use-intl';

import routes from '@/app/routes';

import DropDownMenu from '../DropDownMenu';

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
        href={`${routes.playlists}/${1}`}
        className="dark:opacity-80 hover:opacity-60 transition text-text-color"
      >
        playlist 4
      </Link>
      <DropDownMenu setMenuOpen={setMenuOpen} isMenuOpen={isMenuOpen}>
        <button className="w-full text-[12px] dark:text-black text-white p-2 px-5 hover:opacity-80 hover:bg-[rgba(0,0,0,0.1)] transition cursor-pointer">
          {t('edit')}
        </button>
        <button className="w-full text-[12px] dark:text-black text-white p-2 px-5 hover:opacity-80 hover:bg-[rgba(0,0,0,0.1)] transition cursor-pointer">
          {t('delete')}
        </button>
      </DropDownMenu>
    </div>
  );
}
