'use client';

import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import DropDownButton from '@/components/Shared/Material/DropDownMenu/DropDownButton';
import useTrackStore from '@/stores/trackStore';
import RandomIcon from '@/svgs/icon-random';
import ShuffleIcon from '@/svgs/icon-shuffle';

import DropDownMenu from '../../Shared/Material/DropDownMenu';

export default function MusicPlayerOptions() {
  const t = useTranslations();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { isRepeatActive, isShuffleActive, toggleRepeat, toggleShuffle } = useTrackStore();

  const onCloseMenu = () => {
    setTimeout(() => {
      setMenuOpen(false);
    }, 100);
  };

  return (
    <div onBlur={onCloseMenu} className="w-[100px] flex items-center md:gap-[14px] justify-end">
      <button
        aria-label="Toggle Shuffle"
        onClick={toggleShuffle}
        className={`scale-80 md:scale-100 mr-1 md:mr-0 cursor-pointer transition hover:opacity-80 ${isShuffleActive ? 'text-primary' : 'text-text-color'}`}
      >
        {ShuffleIcon}
      </button>
      <button
        aria-label="Toggle Repeat"
        onClick={toggleRepeat}
        className={`scale-80 md:scale-100 mr-2 md:mr-0 cursor-pointer transition hover:opacity-80 ${isRepeatActive ? 'text-primary' : 'text-text-color'}`}
      >
        {RandomIcon}
      </button>
      <DropDownMenu size={1.2} isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen}>
        <DropDownButton
          ariaLabel="Add to playlist"
          onClick={() => setTimeout(() => setMenuOpen(false), 200)}
        >
          {t('addToPlaylist')}
        </DropDownButton>
      </DropDownMenu>
    </div>
  );
}
