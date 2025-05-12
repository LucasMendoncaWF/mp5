'use client';

import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React from 'react';

import { useGetTrack } from '@/api/track';
import SimilarTracks from '@/components/Pages/TrackDetail/SimilarTracks';
import TrackDetailLoader from '@/components/Pages/TrackDetail/TrackDetailLoader';
import MusicItemDropDown from '@/components/Shared/ListItems/MusicListItem/MusicItemDropDown';
import PlayButton from '@/components/Shared/Material/Buttons/PlayButton';
import ErrorMessage from '@/components/Shared/Material/ErrorMessage';
import ArtistInfo from '@/components/Shared/Sections/ArtistInfo';

export default function TrackPage() {
  const t = useTranslations();
  const params = useParams();
  const { data: trackData, isLoading, hasError } = useGetTrack(params.track_id as string);

  if (isLoading) {
    return <TrackDetailLoader hasArtist />;
  }

  if (hasError || !trackData) {
    return <ErrorMessage>{t('trackDetailError')}</ErrorMessage>;
  }

  return (
    <div className="w-full max-h-full overflow-auto pb-20">
      <div className="p-6 relative">
        <div className="absolute md:right-5 right-8 md:top-5 top-8 z-9">
          <MusicItemDropDown track={trackData} />
        </div>
        <div className="absolute right-5 bottom-6">
          <PlayButton isSingleTrack track={trackData} />
        </div>
        <div className="flex flex-wrap items-end gap-5">
          <div
            className="link-hover relative text-text-color md:w-70 md:h-70 w-full aspect-square bg-primary bg-center bg-no-repeat bg-cover"
            style={{
              backgroundImage: `url(${trackData.artwork['1000x1000'] || '/images/placeholder.jpg'})`,
            }}
          ></div>
          <div className="pr-15 mt-3  text-text-color">
            <div className="font-birdy capitalize md:text-2xl">{trackData.title}</div>
            <div className="normal-case w-full break-all">{trackData.description}</div>
          </div>
        </div>
      </div>
      <div className="p-6 bg-background-secondary">
        <ArtistInfo user={trackData.user} />
      </div>
      {trackData.genre && (
        <div className="p-6 w-full">
          <SimilarTracks genre={trackData.genre} />
        </div>
      )}
    </div>
  );
}
