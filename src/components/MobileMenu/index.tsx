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
  const iconClasses = 'w-10 h-10 block cursor-pointer hover:opacity-70 hover:scale-110 transition';
  return (
    <div className="md:hidden flex w-full items-center -translate-y-3">
      <div className="flex gap-8 items-center justify-center w-1/2 pr-5">
        <Link
          className={`${iconClasses} ${pathName.includes(routes.explore.base) ? 'text-primary' : 'text-text-color'}`}
          href={routes.explore.base}
        >
          {HomeIcon}
        </Link>
        <Link
          className={`${iconClasses} ${pathName.includes(routes.playlists.base) ? 'text-primary' : 'text-text-color'}`}
          href={routes.playlists.base}
        >
          {PlaylistIcon}
        </Link>
      </div>

      <div className="flex gap-8 justify-center items-center w-1/2 pl-5">
        <Link
          className={`${iconClasses} ${pathName.includes(routes.profile.base) ? 'text-primary' : 'text-text-color'}`}
          href={routes.profile.base}
        >
          {UserIcon}
        </Link>
        <Link
          className={`${iconClasses} ${pathName.includes(routes.settings.base) ? 'text-primary' : 'text-text-color'}`}
          href={routes.settings.base}
        >
          {SettingsIcon}
        </Link>
      </div>
    </div>
  );
}
