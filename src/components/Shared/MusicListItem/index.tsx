import Link from 'next/link';
import React from 'react';

import routes from '@/app/routes';
import type { TrackModel } from '@/models/tracks';

import PlayButton from '../PlayButton';
import './MusicListItem.scss';
import MusicITemDropDown from './MusicItemDropDown';

interface Props {
  track: TrackModel;
}

export default function MusicListItem({ track }: Props) {
  return (
    <div className="music-list-item text-text-color normal-case justify-between flex items-center p-4 py-3">
      <div className="flex gap-3 items-center flex-wrap w-full">
        <PlayButton track={track} isSingleTrack />
        <div className="ml-2 w-[70%] line-clamp-1">
          <Link className="cursor-pointer hover:underline" href={`${routes.track}/${track.id}`}>
            {track.title}
          </Link>
        </div>
      </div>
      <MusicITemDropDown track={track} />
    </div>
  );
}
