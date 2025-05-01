'use client';

import React, { useState } from 'react';
import { useTranslations } from 'use-intl';

import type { TrackModel } from '@/models/tracks';
import useTrackStore from '@/stores/trackStore';

import DropDownMenu from '../DropDownMenu';
import PlayButton from '../PlayButton';
import './MusicListItem.scss';

interface Props {
  track: TrackModel;
}

export default function MusicListItem({ track }: Props) {
  const t = useTranslations();
  const { favorites, currentPlayList, addOrRemoveToQueue, addOrRemoveToFavorites } =
    useTrackStore();

  const isOnFavorites = favorites.find((item) => item.id === track.id);
  const isOnQueue = currentPlayList?.tracks?.find((item) => item.id === track.id);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const onCloseMenu = () => {
    setTimeout(() => {
      setMenuOpen(false);
    }, 80);
  };

  const onClickFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addOrRemoveToFavorites(track);
    onCloseMenu();
  };

  const onClickQueue = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addOrRemoveToQueue(track);
    onCloseMenu();
  };

  return (
    <div
      onBlur={onCloseMenu}
      className="music-list-item text-text-color normal-case justify-between flex items-center p-4 py-3"
    >
      <div className="flex gap-3 items-center">
        <PlayButton track={track} isSingleTrack />
        <div className="ml-2">{track.title}</div>
      </div>
      <DropDownMenu
        direction="bottom"
        hasBorder
        size={1.4}
        gap={1}
        isMenuOpen={isMenuOpen}
        setMenuOpen={setMenuOpen}
      >
        <button
          onClick={onClickFavorite}
          className="w-full text-[12px] dark:text-black text-white p-2 px-5 hover:opacity-80 hover:bg-[rgba(0,0,0,0.1)] transition cursor-pointer"
        >
          {isOnFavorites ? t('removeFavorite') : t('addFavorite')}
        </button>
        <button
          onClick={onClickQueue}
          className="w-full text-[12px] dark:text-black text-white p-2 px-5 hover:opacity-80 hover:bg-[rgba(0,0,0,0.1)] transition cursor-pointer"
        >
          {isOnQueue ? t('removeFromQueue') : t('addToQueue')}
        </button>
        <button
          onClick={onCloseMenu}
          className="w-full text-[12px] dark:text-black text-white p-2 px-5 hover:opacity-80 hover:bg-[rgba(0,0,0,0.1)] transition cursor-pointer"
        >
          {t('addToPlaylist')}
        </button>
      </DropDownMenu>
    </div>
  );
}
