import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import type { TrackModel } from '@/models/tracks';
import useTrackStore from '@/stores/trackStore';

import DropDownMenu from '../DropDownMenu';

export default function MusicITemDropDown({ track }: { track: TrackModel }) {
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
    <div onBlur={onCloseMenu}>
      <DropDownMenu
        direction="bottom"
        hasBorder
        size={1.4}
        gap={1}
        isMenuOpen={isMenuOpen}
        setMenuOpen={setMenuOpen}
      >
        <button
          aria-label="Add or Remove from Favorites"
          onClick={onClickFavorite}
          className="w-full text-xs dark:text-black text-white p-2 px-5 hover:opacity-80 hover:bg-[rgba(0,0,0,0.1)] transition cursor-pointer"
        >
          {isOnFavorites ? t('removeFavorite') : t('addFavorite')}
        </button>
        <button
          aria-label="Add or Remove from Queue"
          onClick={onClickQueue}
          className="w-full text-xs dark:text-black text-white p-2 px-5 hover:opacity-80 hover:bg-[rgba(0,0,0,0.1)] transition cursor-pointer"
        >
          {isOnQueue ? t('removeFromQueue') : t('addToQueue')}
        </button>
        <button
          aria-label="Add to playlist"
          onClick={onCloseMenu}
          className="w-full text-xs dark:text-black text-white p-2 px-5 hover:opacity-80 hover:bg-[rgba(0,0,0,0.1)] transition cursor-pointer"
        >
          {t('addToPlaylist')}
        </button>
      </DropDownMenu>
    </div>
  );
}
