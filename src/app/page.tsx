'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

import TrendingListSkeleton from '@/components/Pages/Explore/skeleton';
import NoteIcon from '@/svgs/icon-note';
import RecommendedIcon from '@/svgs/icon-recommend';
import TrendingIcon from '@/svgs/icon-trending';

const GenresList = dynamic(() => import('@/components/Pages/Explore/Genres'), {
  ssr: false,
  loading: () => <TrendingListSkeleton />,
});
const RecommendedList = dynamic(() => import('@/components/Pages/Explore/RecommendedList'), {
  ssr: false,
  loading: () => <TrendingListSkeleton />,
});
const TrendingList = dynamic(() => import('@/components/Pages/Explore/TrendingList'), {
  ssr: false,
  loading: () => <TrendingListSkeleton />,
});

export default function ExplorePage() {
  const t = useTranslations();

  return (
    <div className="w-full pb-4 md:pt-4 max-h-full overflow-auto md:px-8 pb-20">
      <div className="mb-3">
        <h3 className="text-2xl font-birdy items-center pl-6 mb-2 md:pt-4 pt-8 flex gap-2 capitalize text-text-color">
          <div className="w-8 h-8 text-contrast-color">{TrendingIcon}</div>
          {t('trendingTitle')}
        </h3>
        <div className="px-4">
          <TrendingList />
        </div>
      </div>
      <div className="mb-3">
        <h3 className="text-2xl font-birdy items-center pl-6 mb-2 md:pt-4 pt-8 flex gap-2 capitalize text-text-color">
          <div className="w-6 h-6 text-contrast-color">{RecommendedIcon}</div>
          {t('recommended')}
        </h3>
        <div className="px-4">
          <RecommendedList />
        </div>
      </div>
      <div className="mb-3">
        <h3 className="text-2xl font-birdy items-center pl-6 mb-2 md:pt-4 pt-8 flex gap-2 capitalize text-text-color">
          <div className="w-6 h-6 text-contrast-color">{NoteIcon}</div>
          {t('genres')}
        </h3>
        <div className="px-4">
          <GenresList />
        </div>
      </div>
    </div>
  );
}
