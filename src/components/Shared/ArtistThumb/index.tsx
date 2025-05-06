import Link from 'next/link';

import routes from '@/app/routes';
import type { TrackUserModel } from '@/models/tracks';

interface Props {
  artist: TrackUserModel;
}

export default function ArtistThumb({ artist }: Props) {
  return (
    <div className="2xl:w-1/3 w-1/2 max-w-60 aspect-square p-6">
      <Link aria-label="Artist details" href={`${routes.artist}/${artist.id}`}>
        <div
          className="rounded-full w-full h-full bg-center bg-cover bg-no-repeat hover:scale-105 transition"
          style={{
            backgroundImage: `url("${artist.cover_photo ? artist.cover_photo['640x'] : '/images/placeholder.jpg'}")`,
          }}
        ></div>
        <div className="text-text-color text-center mt-2">{artist.name}</div>
      </Link>
    </div>
  );
}
