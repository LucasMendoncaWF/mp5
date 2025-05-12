'use client';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { usePlaylistDetails } from '@/api/userPlaylists';
import SearchTracks from '@/components/Pages/Search/SearchTracks';
import TrackDetailLoader from '@/components/Pages/TrackDetail/TrackDetailLoader';
import PlaylistDropDown from '@/components/Shared/ListItems/PlaylistItem/PlaylistDropDown';
import PlayButton from '@/components/Shared/Material/Buttons/PlayButton';
import ErrorMessage from '@/components/Shared/Material/ErrorMessage';

export default function PlaylistDetailPage() {
  const t = useTranslations();
  const params = useParams();
  const { data, isLoading, hasError } = usePlaylistDetails(params.playlist_id as string);

  if (isLoading) {
    return <TrackDetailLoader />;
  }

  if (hasError || !data) {
    return <ErrorMessage>{t('playlistError')}</ErrorMessage>;
  }

  return (
    <div className="w-full max-h-full overflow-auto">
      <div className="p-6 relative">
        <div className="absolute md:right-5 right-8 md:top-5 top-8 z-9">
          <PlaylistDropDown playlist={data} />
        </div>
        <div className="absolute right-5 bottom-6">
          <PlayButton isPlaylist playList={data} />
        </div>
        <div className="flex flex-wrap items-end gap-5">
          <div
            className="link-hover relative text-text-color md:w-70 md:h-70 w-full aspect-square bg-primary bg-center bg-no-repeat bg-cover"
            style={{
              backgroundImage: `url(${data.artwork || '/images/placeholder.jpg'})`,
            }}
          ></div>
          <div className="pr-15 mt-3  text-text-color">
            <div className="font-birdy capitalize md:text-2xl">{data.name}</div>
            <div className="normal-case w-full break-all">{data.description}</div>
          </div>
        </div>
      </div>
      <div className="p-6 pb-20">
        {data.tracks && (
          <SearchTracks
            hideTitle
            isLoading={isLoading}
            hasError={hasError}
            data={data.tracks}
            fullWidth
          />
        )}
      </div>
    </div>
  );
}
