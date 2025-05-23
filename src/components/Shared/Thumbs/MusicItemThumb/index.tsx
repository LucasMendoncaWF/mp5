'use client';
import Link from 'next/link';

import routes from '@/app/routes';
import type { TrackModel } from '@/models/tracks';

import MusicItemDropDown from '../../ListItems/MusicListItem/MusicItemDropDown';
import PlayButton from '../../Material/Buttons/PlayButton';

import './MusicItemThumb.scss';

export default function MusicItemThumb({ track }: { track: TrackModel }) {
  return (
    <div className="py-2 md:px-4 px-2">
      <Link aria-label="Music Details" href={`${routes.track}/${track.id}`}>
        <div
          className="link-hover relative text-text-color md:w-70 md:h-70 w-50 h-50 bg-primary bg-center bg-no-repeat bg-cover flex-wrap items-end flex"
          style={{
            backgroundImage: `url(${track.artwork['480x480'] || '/images/placeholder.jpg'})`,
          }}
        >
          <div className="w-full md:h-1/4 h-1/3">
            <div className="p-4 w-full h-full relative z-2">
              <div className="music-thumb-gradient absolute bottom-0 left-0 w-full h-full z-1"></div>
              <div className="flex w-full h-full items-center justify-between  relative z-3">
                <div className="text-sm line-clamp-2 max-w-[70%] font-bold dark:text-white music-item-thumb-title ">
                  {track.title}
                </div>
                <PlayButton isSingleTrack track={track} />
              </div>
            </div>
          </div>
          <div className="absolute top-1 right-2 z-2">
            <MusicItemDropDown track={track} />
          </div>
        </div>
      </Link>
    </div>
  );
}
