import { useTranslations } from 'use-intl';

import Loader from '@/components/Shared/Loader';
import MusicListItem from '@/components/Shared/MusicListItem';
import type { TrackModel } from '@/models/tracks';
import NoteIcon from '@/svgs/icon-note';

interface Props {
  isLoading?: boolean;
  hasError: boolean;
  data: TrackModel[] | null;
}

export default function SearchTracks({ isLoading, hasError, data }: Props) {
  const t = useTranslations();

  if (isLoading) {
    return (
      <div className="lg:w-1/2">
        <Loader width="100%" height="20dvh" />
      </div>
    );
  }

  if (hasError || !data?.length) {
    return null;
  }

  return (
    <div className="lg:pl-6 lg:w-1/2 w-full">
      <h3 className="text-2xl font-birdy items-center pl-6 mb-4 lg:pt-4 pt-8 flex gap-2 capitalize text-text-color">
        <div className="w-6 h-6 text-contrast-color">{NoteIcon}</div>
        {t('musicsFound')}
      </h3>
      <div>{data?.map((track) => <MusicListItem key={track.id} track={track} />)}</div>
    </div>
  );
}
