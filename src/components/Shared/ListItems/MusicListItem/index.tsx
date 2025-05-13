import Link from 'next/link';
import React from 'react';

import routes from '@/app/routes';
import type { TrackModel } from '@/models/tracks';

import MusicItemDropDown from './MusicItemDropDown';
import PlayButton from '../../Material/Buttons/PlayButton';
import './MusicListItem.scss';

interface Props {
  track: TrackModel;
  hasDragIcon?: boolean;
  // eslint-disable-next-line no-unused-vars
  onRemove?: (track: TrackModel) => void;
}

export default function MusicListItem({ track, hasDragIcon, onRemove }: Props) {
  return (
    <div className="music-list-item text-text-color normal-case justify-between flex items-center p-4 py-3">
      <div className="flex gap-3 items-center flex-wrap w-full">
        <PlayButton track={track} isSingleTrack />
        <div className="ml-2 w-[70%] line-clamp-1">
          <Link
            aria-label="Music Details"
            className="cursor-pointer hover:underline"
            href={`${routes.track}/${track.id}`}
          >
            {track.title}
          </Link>
        </div>
      </div>
      <MusicItemDropDown onRemove={onRemove} track={track} />
      {hasDragIcon && (
        <div className="flex ml-5 flex-wrap w-[18px] cursor-grab">
          <div className="bg-text-color w-1 h-1 rounded-full m-[1px]"></div>
          <div className="bg-text-color w-1 h-1 rounded-full m-[1px]"></div>
          <div className="bg-text-color w-1 h-1 rounded-full m-[1px]"></div>
          <div className="bg-text-color w-1 h-1 rounded-full m-[1px]"></div>
          <div className="bg-text-color w-1 h-1 rounded-full m-[1px]"></div>
          <div className="bg-text-color w-1 h-1 rounded-full m-[1px]"></div>
        </div>
      )}
    </div>
  );
}
