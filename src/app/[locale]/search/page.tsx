'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { useSearchArtists, useSearchPlaylists, useSearchTracks } from '@/api/search';
import routes from '@/app/routes';
import SearchArtists from '@/components/Pages/Search/SearchArtists';
import SearchPlaylists from '@/components/Pages/Search/SearchPlaylists';
import SearchTracks from '@/components/Pages/Search/SearchTracks';
import ErrorMessage from '@/components/Shared/ErrorMessage';

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
    if (query) {
      router.push(`${routes.search}${query ? `?query=${query}` : ''}`);
    }
  };

  const isTracksEmpty = !tracks?.length && !isLoadingTracks;
  const isPlaylistEmpty = !tracks?.length && !isLoadingTracks;
  const isArtistsEmpty = !tracks?.length && !isLoadingTracks;
  const noResults = isTracksEmpty && isArtistsEmpty && isPlaylistEmpty;

  if (noResults) {
    return <ErrorMessage>{t('noResult')}</ErrorMessage>;
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="pt-6 px-6 md:px-8 flex">
        {genre && (
          <button
            onClick={onClickGenreTag}
            className="bg-text-color cursor-pointer mb-4 px-3 py-1 pr-6 relative text-background rounded-2xl hover:opacity-60 transition"
          >
            {genre} <span className="bottom-[9px] text-xs right-3 absolute">x</span>
          </button>
        )}
      </div>
      <div className="px-6 md:px-2 pb-16 normal-case md:flex flex-wrap">
        <SearchTracks data={tracks} hasError={hasErrorTracks} isLoading={isLoadingTracks} />
        <div className={`${!isTracksEmpty ? 'lg:w-1/2' : 'w-full'} lg:px-6`}>
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
