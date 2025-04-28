'use client';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { TrendingMusics } from '@/api/explore';
import Carousel from '@/components/Shared/Carousel';
import ErrorMessage from '@/components/Shared/ErrorMessage';

import TradingListSkeleton from './skeleton';
import MusicItemThumb from '../../Shared/MusicItemThumb';

export default function TrendingList() {
  const t = useTranslations();
  const [isRendered, setIsRendered] = useState(false);
  const { data, hasError, isLoading } = TrendingMusics();
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
        <div className={!isRendered ? 'overflow-hidden w-0 h-0' : ''}>
          <Carousel onRendered={() => setIsRendered(true)}>
            {data?.map((track) => <MusicItemThumb track={track} key={track.id} />)}
          </Carousel>
        </div>
      )}
    </div>
  );
}
