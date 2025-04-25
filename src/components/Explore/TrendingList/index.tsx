'use client';
import { useState } from 'react';

import { TrendingMusics } from '@/api/explore';
import Carousel from '@/components/Shared/Carousel';

import MusicItemThumb from '../MusicItemThumb';
import TradingListSkeleton from './skeleton';

export default function TrendingList() {
  const [isRendered, setIsRendered] = useState(false);
  const { data, hasError, isLoading } = TrendingMusics();
  if (isLoading) {
    return <TradingListSkeleton />;
  }

  if (!data?.length) {
    return <div></div>;
  }

  if (hasError) {
    return <div></div>;
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
