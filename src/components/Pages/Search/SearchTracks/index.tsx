import { useTranslations } from 'use-intl';

import MusicListItem from '@/components/Shared/ListItems/MusicListItem';
import Loader from '@/components/Shared/Material/Loader';
import type { TrackModel } from '@/models/tracks';
import NoteIcon from '@/svgs/icon-note';

interface Props {
  isLoading?: boolean;
  hasError: boolean;
  data: TrackModel[] | null;
  fullWidth?: boolean;
  title?: string;
  hideTitle?: boolean;
}

export default function SearchTracks({
  isLoading,
  hasError,
  data,
  fullWidth,
  title,
  hideTitle,
}: Props) {
  const t = useTranslations();

  if (isLoading) {
    return (
      <div className={fullWidth ? 'w-full' : 'lg:w-1/2'}>
        <Loader width="100%" height="20dvh" />
      </div>
    );
  }

  if (hasError || !data?.length) {
    return null;
  }

  return (
    <div>
      {!hideTitle && (
        <h3 className="text-2xl font-birdy items-center pl-6 mb-4 lg:pt-4 pt-5 flex gap-2 capitalize text-text-color">
          <div className="w-6 h-6 text-contrast-color">{NoteIcon}</div>
          {title || t('musicsFound')}
        </h3>
      )}
      <div>{data?.map((track) => <MusicListItem key={track.id} track={track} />)}</div>
    </div>
  );
}
