import { useTranslations } from 'use-intl';

import Loader from '@/components/Shared/Material/Loader';
import ArtistThumb from '@/components/Shared/Thumbs/ArtistThumb';
import type { TrackUserModel } from '@/models/tracks';
import UserIcon from '@/svgs/icon-user';

interface Props {
  data: TrackUserModel[] | null;
  isLoading?: boolean;
  hasError: boolean;
}

export default function SearchArtists({ isLoading, data, hasError }: Props) {
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
        <div className="w-6 h-6 text-contrast-color">{UserIcon}</div>
        {t('artistsFound')}
      </h3>
      <div className="flex items-start flex-wrap w-full justify-center lg:justify-start">
        {data?.map((artist) => <ArtistThumb key={artist.id} artist={artist} />)}
      </div>
    </div>
  );
}
