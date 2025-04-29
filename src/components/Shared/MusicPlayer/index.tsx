'use client';

import { useTranslations } from 'next-intl';
import React, { useRef, useState, useEffect, useCallback } from 'react';

import PlayButton from '@/components/Shared/PlayButton';
import useTrackStore from '@/stores/trackStore';
import RandomIcon from '@/svgs/icon-random';
import ShuffleIcon from '@/svgs/icon-shuffle';

import VolumeControl from './VolumeControl';
import DropDownMenu from '../DropDownMenu';
import { AudioPlayer } from './AudioPlayer';

import './MusicPlayer.scss';

export default function MusicPlayer() {
  const t = useTranslations();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [playedSongs, setPlayedSongs] = useState<string[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const {
    isShuffleActive,
    isRepeatActive,
    toggleRepeat,
    toggleShuffle,
    currentPlayList,
    currentTrack,
    setPlaying,
    setCurrentTrack,
    getCurrentMusicSiblings,
  } = useTrackStore();

  const { hasPrev, hasNext, index } = getCurrentMusicSiblings();

  const getUnplayedTracks = useCallback(() => {
    if (!currentPlayList.tracks) return [];
    return currentPlayList.tracks
      .map((track, i) => ({ ...track, index: i }))
      .filter((track) => !playedSongs.includes(track.id));
  }, [currentPlayList.tracks, playedSongs]);

  const selectRandomUnplayedTrack = (unplayedTracks: { id: string; index: number }[]) => {
    const random = Math.floor(Math.random() * unplayedTracks.length);
    return unplayedTracks[random].index;
  };

  const getNextSongIndex = useCallback(
    (currIndex: number): number => {
      if (!currentPlayList.tracks) return currIndex;

      const totalTracks = currentPlayList.tracks.length;
      const currTrackId = currentPlayList.tracks[currIndex]?.id;

      if (currTrackId) {
        setPlayedSongs((prev) => [...new Set([...prev, currTrackId])]);
      }

      const unplayed = getUnplayedTracks();

      if (isShuffleActive) {
        if (unplayed.length === 0) {
          if (isRepeatActive) {
            setPlayedSongs([]);
            return Math.floor(Math.random() * totalTracks);
          } else {
            return currIndex;
          }
        }

        return selectRandomUnplayedTrack(unplayed);
      }

      const nextIndex = currIndex + 1;

      if (nextIndex >= totalTracks) {
        if (isRepeatActive) {
          return 0;
        }
        return currIndex;
      }

      return nextIndex;
    },
    [currentPlayList.tracks, isShuffleActive, isRepeatActive, getUnplayedTracks],
  );

  console.log(playedSongs, currentPlayList);

  const handleTrackEnd = () => {
    if (!currentPlayList.tracks || index === undefined) return;

    const nextIndex = getNextSongIndex(index);
    const nextTrack = currentPlayList.tracks[nextIndex];

    setCurrentTrack(nextTrack);
    setPlaying(index !== nextIndex || isRepeatActive);
  };

  const handleNext = () => {
    if (!currentPlayList.tracks || index === undefined) return;

    const canAdvance = hasNext || isRepeatActive || isShuffleActive;
    if (!canAdvance) return;

    const nextIndex = getNextSongIndex(index);
    const nextTrack = currentPlayList.tracks[nextIndex];
    setPlayedSongs((prev) => [...new Set([...prev, nextTrack.id])]);

    setCurrentTrack(nextTrack);
    setProgressPercentage(0);
    setPlaying(true);
  };

  const handlePrev = () => {
    if (!currentPlayList.tracks || index === undefined) return;

    setPlayedSongs((prev) => prev.filter((item) => item !== currentTrack?.id));
    if (hasPrev) {
      const prevTrack = currentPlayList.tracks[index - 1];
      setCurrentTrack(prevTrack);
    }
    setProgressPercentage(0);
    setPlaying(true);
  };

  const updateProgressByClientX = (clientX: number) => {
    const bar = progressBarRef.current;
    if (!bar) return;

    const rect = bar.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setProgressPercentage(percentage);
    setIsLoading(true);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) updateProgressByClientX(e.clientX);
    },
    [isDragging],
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (isDragging) updateProgressByClientX(e.touches[0].clientX);
    },
    [isDragging],
  );

  const handleMouseUp = useCallback(() => {
    if (isDragging) setIsDragging(false);
  }, [isDragging]);

  useEffect(() => {
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
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  useEffect(() => {
    if (currentTrack) {
      setIsLoading(true);
      setProgressPercentage(0);
    }
  }, [currentTrack]);

  const options = (
    <div className="w-[100px] flex items-center md:gap-[14px] justify-end">
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
          onClick={() => setTimeout(() => setMenuOpen(false), 200)}
          className="w-full text-[12px] dark:text-black text-white p-2 px-5 hover:opacity-80 hover:bg-[rgba(0,0,0,0.1)] transition cursor-pointer"
        >
          {t('addFavorite')}
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

  const hasUnplayed = getUnplayedTracks().length;
  return (
    <div className="h-[122px] box-shadow-small select-none w-full bg-background-secondary relative z-9">
      {currentTrack && (
        <AudioPlayer
          trackId={currentTrack?.id}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          volume={volume}
          onEndSong={handleTrackEnd}
          onChangeProgress={setProgressPercentage}
          progress={progressPercentage}
        />
      )}
      <div className="flex items-center justify-center">
        {hasMounted && (
          <button
            onClick={handlePrev}
            disabled={!currentTrack && !currentPlayList.tracks}
            className="tracking-[-5px] mr-2 cursor-pointer transition text-primary text-xl hover:opacity-70"
          >
            ◀◀
          </button>
        )}
        <div className="p-2 px-3 box-shadow-small bg-background-secondary mt-[-30px] rounded-full">
          <PlayButton
            isLoading={isLoading}
            disabled={!currentTrack && !currentPlayList.tracks}
            width={50}
          />
        </div>
        {hasMounted && (
          <button
            onClick={handleNext}
            disabled={
              !!(!hasNext && !isRepeatActive && !isShuffleActive) ||
              !!(isShuffleActive && !hasUnplayed && !isRepeatActive)
            }
            className="tracking-[-5px] ml-1 cursor-pointer transition text-primary text-xl hover:opacity-70"
          >
            ▶▶
          </button>
        )}
      </div>

      <div className="w-full mb-3 mt-2 flex items-center justify-between md:justify-center px-6 md:px-10">
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
          className="music-player__progress-bar relative w-[60%] h-[6px] bg-gray-600 rounded cursor-pointer"
          onMouseDown={(e) => {
            updateProgressByClientX(e.clientX);
            setIsDragging(true);
          }}
          onTouchStart={(e) => {
            updateProgressByClientX(e.touches[0].clientX);
            setIsDragging(true);
          }}
        >
          <div className="h-full bg-primary rounded" style={{ width: `${progressPercentage}%` }} />
          <div
            onTouchStart={() => setIsDragging(true)}
            onMouseDown={() => setIsDragging(true)}
            style={{ left: `${progressPercentage - 0.5}%` }}
            className={`h-4 w-4 bottom-[-4px] rounded-full border-2 border-text-color bg-background absolute z-10 transition hover:opacity-80 hover:scale-109 ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
}
