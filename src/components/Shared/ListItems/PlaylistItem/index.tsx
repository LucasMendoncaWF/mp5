import Link from 'next/link';
import React from 'react';

import routes from '@/app/routes';
import type { PlaylistModel } from '@/models/tracks';

import PlaylistDropDown from './PlaylistDropDown';
import PlayButton from '../../Material/Buttons/PlayButton';
import './PlaylistListItem.scss';

interface Props {
  playlist: PlaylistModel;
  isSidebar?: boolean;
  isAlternate?: boolean;
}

export default function PlaylistItem({ playlist, isSidebar, isAlternate }: Props) {
  return (
    <div
      className={`${isAlternate ? 'playlist-list-item px-6 py-3' : ''} capitalize relative py-2 flex items-center justify-between`}
    >
      <div className="flex gap-2 items-center">
        {!isSidebar && !!playlist.tracks?.length && (
          <div className="min-w-10">
            <PlayButton isPlaylist playList={playlist} />
          </div>
        )}
        <Link
          aria-label="Playlist details"
          href={`${routes.playlists}/${playlist.id}`}
          className="dark:opacity-80 hover:opacity-60 transition text-text-color"
        >
          <div className="line-clamp-1 pr-4">{playlist.name}</div>
        </Link>
      </div>
      <PlaylistDropDown playlist={playlist} />
    </div>
  );
}
