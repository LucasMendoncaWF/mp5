'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { useTranslations } from 'use-intl';

import routes from '@/app/routes';
import DropDownMenu from '@/components/Shared/DropDownMenu';
import type { PlaylistModel } from '@/models/tracks';
import useTrackStore from '@/stores/trackStore';

import PlayButton from '../PlayButton';
import DropDownButton from '../DropDownMenu/DropDownButton';

interface Props {
  playlist: PlaylistModel;
  isSidebar?: boolean;
}

export default function PlaylistItem({ playlist, isSidebar }: Props) {
  const t = useTranslations();
  const { setCurrentPlayList, setPlaying, setOpenRemovePlayListModal } = useTrackStore();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const onCloseMenu = () => {
    setTimeout(() => {
      setMenuOpen(false);
    }, 100);
  };

  const onClickPlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentPlayList(playlist);
    setPlaying(true);
    onCloseMenu();
  };

  const onClickDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (playlist.id) {
      setOpenRemovePlayListModal(playlist.id);
    }
    onCloseMenu();
  };

  return (
    <div
      onBlur={onCloseMenu}
      className="capitalize relative py-2 flex items-center justify-between"
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
      <DropDownMenu direction="bottom" setMenuOpen={setMenuOpen} isMenuOpen={isMenuOpen}>
        <DropDownButton ariaLabel="Play playlist" onClick={onClickPlay}>
          {t('play')}
        </DropDownButton>
        <DropDownButton ariaLabel="Edit Playlist" onClick={() => {}}>
          {t('edit')}
        </DropDownButton>
        <DropDownButton ariaLabel="Delete playlist" onClick={onClickDelete}>
          {t('delete')}
        </DropDownButton>
      </DropDownMenu>
    </div>
  );
}
