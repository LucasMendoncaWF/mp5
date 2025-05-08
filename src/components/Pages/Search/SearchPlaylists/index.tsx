import { useTranslations } from 'next-intl';

import Loader from '@/components/Shared/Material/Loader';
import PlaylistThumbItem from '@/components/Shared/Thumbs/PlayListItemThumb';
import type { PlaylistModel } from '@/models/tracks';
import PlaylistIcon from '@/svgs/icon-playlist';

interface Props {
  isLoading?: boolean;
  data: PlaylistModel[] | null;
  hasError: boolean;
}

export default function SearchPlaylists({ isLoading, hasError, data }: Props) {
  const t = useTranslations();
  if (isLoading) {
    return <Loader width="100%" height="20dvh" />;
  }

  if (hasError || !data?.length) {
    return null;
  }

  return (
    <div className="w-full">
      <h3 className="text-2xl font-birdy items-center pl-6 mb-4 lg:pt-4 pt-8 flex gap-2 capitalize text-text-color">
        <div className="w-6 h-6 text-contrast-color">{PlaylistIcon}</div>
        {t('playlistsFound')}
      </h3>
      <div className="flex flex-wrap w-full justify-between">
        {data?.map((playlist) => <PlaylistThumbItem playlist={playlist} key={playlist.id} />)}
      </div>
    </div>
  );
}
