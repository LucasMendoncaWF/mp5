'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import routes from '@/app/routes';
import HomeIcon from '@/svgs/icon-home';
import PlaylistIcon from '@/svgs/icon-playlist';
import SettingsIcon from '@/svgs/icon-settings';
import UserIcon from '@/svgs/icon-user';

export default function MobileMenu() {
  const pathName = usePathname();
  const iconClasses =
    'w-10 h-10 block cursor-pointer hover:opacity-70 hover:scale-110 transition drop-shadow-sm drop-shadow-white dark:drop-shadow-black';
  return (
    <div className="md:hidden flex w-full relative z-9 items-center -translate-y-3">
      <div className="flex gap-8 items-center justify-center w-1/2 pr-5">
        <Link
          aria-label="Home"
          className={`${iconClasses} ${pathName === '/' ? 'text-primary' : 'text-text-color'}`}
          href={routes.explore}
        >
          {HomeIcon}
        </Link>
        <Link
          aria-label="Playlists"
          className={`${iconClasses} ${pathName.includes(routes.playlists) ? 'text-primary' : 'text-text-color'}`}
          href={routes.playlists}
        >
          {PlaylistIcon}
        </Link>
      </div>

      <div className="flex gap-8 justify-center items-center w-1/2 pl-5">
        <Link
          aria-label="Profile"
          className={`${iconClasses} ${pathName.includes(routes.profile) ? 'text-primary' : 'text-text-color'}`}
          href={routes.profile}
        >
          {UserIcon}
        </Link>
        <Link
          aria-label="Settings"
          className={`${iconClasses} ${pathName.includes(routes.settings) ? 'text-primary' : 'text-text-color'}`}
          href={routes.settings}
        >
          {SettingsIcon}
        </Link>
      </div>
    </div>
  );
}
