'use client';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { useSearchArtists, useSearchPlaylists, useSearchTracks } from '@/api/search';
import routes from '@/app/routes';
const SearchArtists = dynamic(() => import('@/components/Pages/Search/SearchArtists'), {
  ssr: false,
});
const SearchPlaylists = dynamic(() => import('@/components/Pages/Search/SearchPlaylists'), {
  ssr: false,
});
const SearchTracks = dynamic(() => import('@/components/Pages/Search/SearchTracks'), {
  ssr: false,
});
const ErrorMessage = dynamic(() => import('@/components/Shared/ErrorMessage'), { ssr: false });

export default function SearchPage() {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const genre = searchParams.get('genre') || '';
  const query = searchParams.get('query') || '';

  const {
    data: artists,
    isLoading: isLoadingArtists,
    hasError: hasErrorArtists,
  } = useSearchArtists({
    query,
    genre,
  });

  const {
    data: playlists,
    isLoading: isLoadingPlaylists,
    hasError: hasErrorPlaylists,
  } = useSearchPlaylists({
    query,
    genre,
  });

  const {
    data: tracks,
    isLoading: isLoadingTracks,
    hasError: hasErrorTracks,
  } = useSearchTracks({
    query,
    genre,
  });

  const onClickGenreTag = () => {
    if (genre) {
      router.push(`${routes.search}${query ? `?query=${query}` : ''}`);
    }
  };

  const isLessThen10Tracks = tracks?.length && tracks?.length < 10 && !isLoadingTracks;
  const isTracksEmpty = !tracks?.length && !isLoadingTracks;
  const isPlaylistEmpty = !playlists?.length && !isLoadingPlaylists;
  const isArtistsEmpty = !artists?.length && !isLoadingArtists;
  const noResults = isTracksEmpty && isArtistsEmpty && isPlaylistEmpty;
  if (noResults) {
    return <ErrorMessage>{t('noResult')}</ErrorMessage>;
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="md:pt-6 px-6 md:px-8 flex">
        {genre && (
          <button
            aria-label="close"
            onClick={onClickGenreTag}
            className="bg-text-color cursor-pointer mb-4 px-3 py-1 pr-6 relative text-background rounded-2xl hover:opacity-60 transition"
          >
            {genre} <span className="bottom-[9px] text-xs right-3 absolute">x</span>
          </button>
        )}
      </div>
      <div className="px-4 md:px-2 pb-16 normal-case md:flex flex-wrap">
        <div
          className={`${(isPlaylistEmpty && isArtistsEmpty) || isLessThen10Tracks ? '' : 'lg:w-1/2'} lg:pl-6  w-full`}
        >
          <SearchTracks data={tracks} hasError={hasErrorTracks} isLoading={isLoadingTracks} />
        </div>
        <div className={`${!isTracksEmpty && !isLessThen10Tracks ? 'lg:w-1/2' : 'w-full'} lg:px-6`}>
          <SearchArtists data={artists} hasError={hasErrorArtists} isLoading={isLoadingArtists} />
          <SearchPlaylists
            data={playlists}
            hasError={hasErrorPlaylists}
            isLoading={isLoadingPlaylists}
          />
        </div>
      </div>
    </div>
  );
}
