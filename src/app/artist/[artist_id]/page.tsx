'use client';

import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { useGetArtist } from '@/api/artist';
import SearchTracks from '@/components/Pages/Search/SearchTracks';
import ErrorMessage from '@/components/Shared/Material/ErrorMessage';
import ArtistInfo from '@/components/Shared/Sections/ArtistInfo';
import ArtistInfoLoader from '@/components/Shared/Sections/ArtistInfo/ArtistInfoLoader';

export default function ArtistPage() {
  const t = useTranslations();
  const params = useParams();
  const { data, isLoading, hasError } = useGetArtist(params.artist_id as string);

  if (isLoading) {
    return <ArtistInfoLoader hasMusics />;
  }

  if (hasError || !data) {
    return <ErrorMessage>{t('artistDetailError')}</ErrorMessage>;
  }

  return (
    <div className="w-full max-h-full overflow-auto">
      <div className="bg-background-secondary p-6">
        <ArtistInfo user={data} />
      </div>
      <div className="p-6 pb-20">
        {data.tracks && (
          <SearchTracks isLoading={isLoading} hasError={hasError} data={data.tracks} fullWidth />
        )}
      </div>
    </div>
  );
}
