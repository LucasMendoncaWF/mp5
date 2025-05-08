'use client';
import { useTranslations } from 'next-intl';

import { useRecommendedMusics } from '@/api/explore';
import Carousel from '@/components/Shared/Material/Carousel';
import ErrorMessage from '@/components/Shared/Material/ErrorMessage';

import MusicItemThumb from '../../../Shared/Thumbs/MusicItemThumb';
import TrendingListSkeleton from '../skeleton';

export default function RecommendedList() {
  const t = useTranslations();
  const { data, hasError, isLoading } = useRecommendedMusics();
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
            {data?.map((track) => <MusicItemThumb track={track} key={track.id} />)}
          </Carousel>
        </div>
      )}
    </div>
  );
}
