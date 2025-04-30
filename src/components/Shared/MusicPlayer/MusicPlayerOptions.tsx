'use client';

import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import useTrackStore from '@/stores/trackStore';
import RandomIcon from '@/svgs/icon-random';
import ShuffleIcon from '@/svgs/icon-shuffle';

import DropDownMenu from '../DropDownMenu';

export default function MusicPlayerOptions() {
  const t = useTranslations();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const {
    currentTrack,
    isRepeatActive,
    isShuffleActive,
    favorites,
    addOrRemoveToFavorites,
    toggleRepeat,
    toggleShuffle,
  } = useTrackStore();

  const onCloseMenu = () => {
    setTimeout(() => {
      setMenuOpen(false);
    }, 100);
  };

  const onClickFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (currentTrack) {
      addOrRemoveToFavorites(currentTrack);
    }
    onCloseMenu();
  };

  const isOnFavorites = favorites.find((item) => item.id === currentTrack?.id);
  return (
    <div onBlur={onCloseMenu} className="w-[100px] flex items-center md:gap-[14px] justify-end">
      <button
        onClick={toggleShuffle}
        className={`scale-80 md:scale-100 mr-1 md:mr-0 cursor-pointer transition hover:opacity-80 ${isShuffleActive ? 'text-primary' : 'text-text-color'}`}
      >
        {ShuffleIcon}
      </button>
      <button
        onClick={toggleRepeat}
        className={`scale-80 md:scale-100 mr-2 md:mr-0 cursor-pointer transition hover:opacity-80 ${isRepeatActive ? 'text-primary' : 'text-text-color'}`}
      >
        {RandomIcon}
      </button>
      <DropDownMenu size={1.2} isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen}>
        <button
          onClick={onClickFavorite}
          className="w-full text-[12px] dark:text-black text-white p-2 px-5 hover:opacity-80 hover:bg-[rgba(0,0,0,0.1)] transition cursor-pointer"
        >
          {isOnFavorites ? t('removeFavorite') : t('addFavorite')}
        </button>
        <button
          onClick={() => setTimeout(() => setMenuOpen(false), 200)}
          className="w-full text-[12px] dark:text-black text-white p-2 px-5 hover:opacity-80 hover:bg-[rgba(0,0,0,0.1)] transition cursor-pointer"
        >
          {t('addToPlaylist')}
        </button>
      </DropDownMenu>
    </div>
  );
}
