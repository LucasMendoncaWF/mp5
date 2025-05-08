import Link from 'next/link';
import { useTranslations } from 'next-intl';

import routes from '@/app/routes';
import LanguageSwitcher from '@/components/Shared/Material/LanguageSwitcher';
import ThemeSelector from '@/components/Shared/Material/ThemeSelector';

import PlaylistList from './PlaylistList';

export default function SideBar() {
  const t = useTranslations();
  return (
    <div className="w-full relative z-99 text-sm bg-background-secondary h-full md:block hidden">
      <div className="p-8 h-[85%] overflow-y-auto">
        <div className="pb-2">
          <Link
            aria-label="Your playlists"
            className="hover:opacity-60 font-bold text-xl capitalize transition"
            href={routes.playlists}
          >
            {t('playlists')}
          </Link>
          <div className="mt-2">
            <PlaylistList />
          </div>
        </div>
        <div className="pt-5">
          <Link
            aria-label="Your profile"
            className="hover:opacity-60 font-bold capitalize text-lg  transition"
            href={routes.profile}
          >
            {t('profile')}
          </Link>
        </div>
        <div className="pt-2">
          <Link
            aria-label="Settings"
            className="hover:opacity-60 font-bold capitalize text-lg transition"
            href={routes.settings}
          >
            {t('settings')}
          </Link>
        </div>
      </div>
      <div className="text-[11px] capitalize text-center text-text-color dark:opacity-70">
        {t('footer')}
      </div>
      <div className="p-8 pt-3 items-center justify-between flex gap-2">
        <LanguageSwitcher />
        <ThemeSelector />
      </div>
    </div>
  );
}
