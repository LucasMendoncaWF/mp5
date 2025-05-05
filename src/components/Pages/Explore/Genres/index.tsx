'use client';
import { useTranslations } from 'next-intl';

import { useGenres } from '@/api/explore';
import Carousel from '@/components/Shared/Carousel';
import ErrorMessage from '@/components/Shared/ErrorMessage';
import GenreItemThumb from '@/components/Shared/GenreItemThumb';

import TrendingListSkeleton from '../skeleton';

export default function GenresList() {
  const t = useTranslations();
  const { data, hasError, isLoading } = useGenres();

  if (isLoading) {
    return <TrendingListSkeleton />;
  }

  if (!data?.length && !hasError) {
    return <ErrorMessage>{t('zeroLengthResponse')}</ErrorMessage>;
  }

  if (hasError) {
    return <ErrorMessage>{t('errorResponse')}</ErrorMessage>;
  }

  return (
    <div>
      {data && !isLoading && (
        <div>
          <Carousel loadingComponent={<TrendingListSkeleton />}>
            {data?.map((genre) => <GenreItemThumb title={genre} key={genre} />)}
          </Carousel>
        </div>
      )}
    </div>
  );
}
