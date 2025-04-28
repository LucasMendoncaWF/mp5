'use client';
import { useTranslations } from 'next-intl';

import GenresList from '@/components/Explore/Genres';
import TrendingList from '@/components/Explore/TrendingList';
import NoteIcon from '@/svgs/icon-note';
import TrendingIcon from '@/svgs/icon-trending';

export default function ExplorePage() {
  const t = useTranslations();
  return (
    <div className="w-full pb-4 md:pt-4 max-h-full overflow-auto md:px-8 pb-20">
      <div>
        <h3 className="text-2xl font-birdy items-center md:pl-4 pl-2 md:pt-4 pt-8 flex gap-2 capitalize text-text-color">
          <div className="w-8 h-8 text-contrast-color">{TrendingIcon}</div>
          {t('trendingTitle')}
        </h3>
        <TrendingList />
      </div>
      <div>
        <h3 className="text-2xl font-birdy items-center md:pl-4 pl-2 md:pt-4 pt-8 flex gap-2 capitalize text-text-color">
          <div className="w-6 h-6 text-contrast-color">{NoteIcon}</div>
          {t('genres')}
        </h3>
        <GenresList />
      </div>
    </div>
  );
}
