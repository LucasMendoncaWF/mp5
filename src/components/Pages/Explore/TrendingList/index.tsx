'use client';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { useTrendingMusics } from '@/api/explore';
import Carousel from '@/components/Shared/Carousel';
import ErrorMessage from '@/components/Shared/ErrorMessage';

import MusicItemThumb from '../../../Shared/MusicItemThumb';
import TradingListSkeleton from '../skeleton';

export default function TrendingList() {
  const t = useTranslations();
  const { data, hasError, isLoading } = useTrendingMusics();
  if (isLoading) {
    return <TradingListSkeleton />;
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
          <Carousel loadingComponent={<TradingListSkeleton />}>
            {data?.map((track) => <MusicItemThumb track={track} key={track.id} />)}
          </Carousel>
        </div>
      )}
    </div>
  );
}
