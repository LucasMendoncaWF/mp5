'use client';
import { useTranslations } from 'next-intl';
import React, { useRef, useState, useEffect } from 'react';

import PlayButton from '@/components/Shared/PlayButton';
import useTrackStore from '@/stores/trackStore';
import RandomIcon from '@/svgs/icon-random';
import ShuffleIcon from '@/svgs/icon-shuffle';

import VolumeControl from './VolumeControl';
import './MusicPlayer.scss';
import DropDownMenu from '../DropDownMenu';
import { AudioPlayer } from './AudioPlayer';

export default function MusicPlayer() {
  const t = useTranslations();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const onCloseMenu = () => {
    setTimeout(() => {
      setMenuOpen(false);
    }, 200);
  };
  const progressBarRef = useRef<HTMLDivElement>(null);
  const {
    isShuffleActive,
    isRepeatActive,
    toggleRepeat,
    toggleShuffle,
    currentPlayList,
    currentTrack,
    getCurrentMusicSiblings,
  } = useTrackStore();
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const updatePercentage = (clientX: number) => {
    const progressBar = progressBarRef.current;
    if (!progressBar) return;

    const rect = progressBar.getBoundingClientRect();
    const x = clientX - rect.left;
    const newPercentage = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setProgressPercentage(newPercentage);
    setIsLoading(true);
  };

  useEffect(() => {
    if (currentTrack) {
      setIsLoading(true);
      setProgressPercentage(0);
    }
  }, [currentTrack]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        updatePercentage(e.clientX);
      }
    };

    const handleMouseUp = () => {
      if (isDragging) setIsDragging(false);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) updatePercentage(e.touches[0].clientX);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);
  const { hasPrev, hasNext } = getCurrentMusicSiblings();

  const options = (
    <div className="w-[100px] flex items-center md:gap-[14px] justify-end">
      <button
        onClick={() => toggleShuffle()}
        className={`scale-80 md:scale-100 mr-1 md:mr-0 cursor-pointer transition hover:opacity-80 ${isShuffleActive ? 'text-primary' : 'text-text-color'}`}
      >
        {ShuffleIcon}
      </button>
      <button
        onClick={() => toggleRepeat()}
        className={`scale-80 md:scale-100 mr-2 md:mr-0 cursor-pointer transition hover:opacity-80 ${isRepeatActive ? 'text-primary' : 'text-text-color'}`}
      >
        {RandomIcon}
      </button>
      <DropDownMenu size={1.2} isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen}>
        <button
          onClick={onCloseMenu}
          className="w-full text-[12px] dark:text-black text-white p-2 px-5 hover:opacity-80 hover:bg-[rgba(0,0,0,0.1)] transition cursor-pointer"
        >
          {t('addFavorite')}
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

  return (
    <div className="h-[122px] box-shadow-small select-none w-full bg-background-secondary relative z-9">
      <div className="flex items-center justify-center">
        <button
          disabled={!hasPrev && !isRepeatActive}
          className="tracking-[-5px] mr-2 cursor-pointer transition text-primary text-xl mr-1 hover:opacity-70"
        >
          ◀◀
        </button>
        <div className="p-2 px-3 box-shadow-small bg-background-secondary mt-[-30px] rounded-full">
          <PlayButton
            isLoading={isLoading}
            disabled={!currentTrack && !currentPlayList}
            width={50}
          />
        </div>
        <button
          disabled={!hasNext && !isRepeatActive}
          className="tracking-[-5px] ml-1 cursor-pointer transition text-primary text-xl hover:opacity-70"
        >
          ▶▶
        </button>
      </div>

      <div className="w-full mb-3 mt-2 flex items-center justify-between md:justify-center px-6 md:px-10 transform-[translateX()]">
        <div className="w-[100px]">
          <VolumeControl setVolume={setVolume} volume={volume} />
        </div>
        <div className="capitalize music-player__name text-center md:text-sm text-xs line-clamp-1">
          {currentTrack?.title}
        </div>
        <div className="hidden md:flex">{options}</div>
      </div>
      <div className="w-full flex gap-3 items-center relative justify-center mt-4">
        <div
          ref={progressBarRef}
          onMouseDown={(e) => updatePercentage(e.clientX)}
          className="w-[60%] h-2 bg-primary relative rounded-lg"
        >
          <div className="w-full h-full overflow-hidden">
            <div
              style={{ width: `${progressPercentage}%` }}
              className="h-full bg-text-color rounded-lg"
            ></div>
          </div>

          <div
            onTouchStart={() => setIsDragging(true)}
            onMouseDown={() => setIsDragging(true)}
            style={{ left: `${progressPercentage - 0.5}%` }}
            className={`h-4 w-4 bottom-[-4px] rounded-full border-2 border-text-color bg-background absolute z-10 transition hover:opacity-80 hover:scale-109 ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
          ></div>
        </div>
        <div className="flex md:hidden">{options}</div>
        {currentTrack && (
          <AudioPlayer
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            progress={progressPercentage}
            onChangeProgress={setProgressPercentage}
            trackId={currentTrack?.id}
            volume={volume}
          />
        )}
      </div>
    </div>
  );
}
