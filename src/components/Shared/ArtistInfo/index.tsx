import Link from 'next/link';
import { useTranslations } from 'next-intl';

import routes from '@/app/routes';
import type { TrackUserModel } from '@/models/tracks';
import { InstagramIcon } from '@/svgs/icon-instagram';
import UserIcon from '@/svgs/icon-user';

export default function ArtistInfo({ user }: { user: TrackUserModel }) {
  const t = useTranslations();

  const getFollowerCount = (count: number) => {
    if (count > 1000) {
      return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return count;
  };

  return (
    <div className="flex flex-wrap items-start gap-5">
      <div
        className="w-45 aspect-square rounded-full bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url("${user.cover_photo ? user.cover_photo['640x'] : '/images/placeholder.jpg'}")`,
        }}
      ></div>
      <div className="text-text-color normal-case mt-2">
        <div className="normal-case text-primary font-bold text-xl mb-2">{t('artist')}</div>
        <div className="mb-1 text-xl">
          <Link className="hover:underline" href={`${routes.artist}/${user.id}`}>
            {user.name}
          </Link>
        </div>
        <div className="md:block flex gap-3">
          <div className="flex gap-2 mb-1 items-center">
            <div className="w-5 h-5">{UserIcon}</div> {getFollowerCount(user.follower_count)}
          </div>
          <Link
            href={`https://www.instagram.com/${user.instagram_handle}`}
            className="cursor-pointer hover:underline flex gap-2 mb-1 items-center"
          >
            <div className="w-4 h-4">{InstagramIcon}</div> {user.instagram_handle}
          </Link>
        </div>
        <div>{user.bio}</div>
      </div>
    </div>
  );
}
