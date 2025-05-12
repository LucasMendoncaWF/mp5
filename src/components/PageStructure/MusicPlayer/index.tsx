'use client';

import dynamic from 'next/dynamic';
import React, { useState, useEffect, useCallback, useRef } from 'react';

import PlayButton from '@/components/Shared/Material/Buttons/PlayButton';
import type { TrackModel } from '@/models/tracks';
import useTrackStore from '@/stores/trackStore';

const AudioPlayer = dynamic(() => import('./AudioPlayer'));
const MusicPlayerOptions = dynamic(() => import('./MusicPlayerOptions'));
const ProgressBar = dynamic(() => import('./ProgressBar'));
const VolumeControl = dynamic(() => import('./VolumeControl'));

import './MusicPlayer.scss';

export default function MusicPlayer() {
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isLoading, setIsLoading] = useState(false);
  const playedSongs = useRef<string[]>([]);
  const [hasMounted, setHasMounted] = useState(false);

  const {
    isShuffleActive,
    isRepeatActive,
    currentPlayList,
    currentTrack,
    setPlaying,
    setCurrentTrack,
    getCurrentMusicSiblings,
  } = useTrackStore();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // audio player functions

  const hasOnlyOneSong = (currentPlayList?.tracks?.length || 0) <= 1;

  const { hasNext, index } = getCurrentMusicSiblings();

  const getUnplayedTracks = useCallback(() => {
    if (!currentPlayList?.tracks) return [];
    return currentPlayList?.tracks.filter((track) => !playedSongs.current.includes(track.id));
  }, [currentPlayList?.tracks]);

  const selectRandomIndex = () => {
    return currentPlayList?.tracks?.length
      ? Math.floor(Math.random() * currentPlayList?.tracks?.length)
      : 0;
  };

  const handleTrackEnd = () => {
    handleNext();
  };

  const addToPlayedSongsAndReproduce = (track: TrackModel, shouldRestart: boolean) => {
    setCurrentTrack(track);
    if (shouldRestart) {
      playedSongs.current = [track.id];
    } else {
      playedSongs.current = [...playedSongs.current.filter((item) => item !== track.id), track.id];
    }
  };

  const handleNext = () => {
    if (!hasOnlyOneSong && currentPlayList?.tracks) {
      let unplayedTracks = getUnplayedTracks();
      let nextIndex = 0;
      let shouldRestart = false;

      // if repeat is active, it remounts the unplayed tracks
      if (isRepeatActive && !unplayedTracks.length) {
        unplayedTracks = currentPlayList?.tracks;
        shouldRestart = true;
      }

      if (unplayedTracks.length) {
        // if shuffle is active, it gets a random index that wasnt played yet
        if (isShuffleActive) {
          let randomIndex = selectRandomIndex();
          // it loops until it gets an unplayed track
          while (
            ![...unplayedTracks].includes(currentPlayList?.tracks[randomIndex]) ||
            currentPlayList?.tracks[randomIndex] === currentTrack
          ) {
            randomIndex = selectRandomIndex();
          }
          addToPlayedSongsAndReproduce(currentPlayList?.tracks[randomIndex], shouldRestart);
        } else if (index !== undefined) {
          nextIndex = index + 1;
          // if has next song and is not shuffle, it gets the next index on the playlist
          if (currentPlayList?.tracks[nextIndex]) {
            addToPlayedSongsAndReproduce(currentPlayList?.tracks[nextIndex], shouldRestart);

            // if doesnt have a next song, but the repeat is active, it restarts the playlist
          } else if (isRepeatActive) {
            addToPlayedSongsAndReproduce(currentPlayList?.tracks[0], shouldRestart);
          }
        }

        // start playing if there are unplayed tracks
        setPlaying(true);
      }

      // Resets to 0
    } else if (isRepeatActive) {
      setPlaying(true);
    }
    setProgressPercentage(0);
  };

  // TODO: is not coming back if has 2 musics
  const handlePrev = () => {
    if (progressPercentage > 5) {
      setPlaying(true);
      setProgressPercentage(0);
      return;
    }

    if (!hasOnlyOneSong && currentPlayList?.tracks && currentTrack) {
      const currentIndex = playedSongs.current.findIndex((item) => item === currentTrack.id);
      // if has a previous track, it moves back

      //it's remove from the played array in either cases
      if (playedSongs.current[currentIndex - 1] || isRepeatActive) {
        playedSongs.current = [...playedSongs.current.filter((item) => item !== currentTrack.id)];
      }

      if (playedSongs.current[currentIndex - 1]) {
        const nextTrack = currentPlayList?.tracks.find(
          (track) => track.id === playedSongs.current[currentIndex - 1],
        );
        if (nextTrack) {
          setCurrentTrack(nextTrack);
        }
        // if doesnt have a previous track on the player array, but is on repeat, it starts from the end of the array again
      } else if (isRepeatActive) {
        setCurrentTrack(
          currentPlayList?.tracks[(index || 0) - 1] ||
            currentPlayList?.tracks[currentPlayList?.tracks.length - 1],
        );
      }
    }
    // Resets to 0 and play
    setPlaying(true);
    setProgressPercentage(0);
  };

  // UI functions

  useEffect(() => {
    if (currentTrack) {
      playedSongs.current = [
        ...playedSongs.current.filter((item) => item !== currentTrack.id),
        currentTrack.id,
      ];
      setIsLoading(true);
      setProgressPercentage(0);
    }
  }, [currentTrack]);

  const hasUnplayed = getUnplayedTracks().length;
  return (
    <div className="h-[122px] box-shadow-small select-none w-full bg-background-secondary relative z-9">
      {currentTrack && (
        <AudioPlayer
          duration={currentTrack.duration}
          trackId={currentTrack?.id}
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
            aria-label="previous"
            onClick={handlePrev}
            disabled={!currentTrack}
            className="tracking-[-5px] mr-2 cursor-pointer transition text-primary text-xl hover:opacity-70"
          >
            ◀◀
          </button>
        )}
        <div className="p-2 px-3 box-shadow-small bg-background-secondary mt-[-30px] rounded-full">
          <PlayButton
            isLoading={isLoading}
            disabled={!currentTrack && !currentPlayList?.tracks}
            width={50}
          />
        </div>
        {hasMounted && (
          <button
            aria-label="next"
            onClick={handleNext}
            disabled={
              !!(!hasNext && !isRepeatActive && !isShuffleActive) ||
              !!(isShuffleActive && !hasUnplayed && !isRepeatActive) ||
              hasOnlyOneSong
            }
            className="tracking-[-5px] ml-1 cursor-pointer transition text-primary text-xl hover:opacity-70"
          >
            ▶▶
          </button>
        )}
      </div>
      <div className="md:hidden w-full capitalize text-center md:text-sm text-xs line-clamp-1 px-10">
        {currentTrack?.title}
      </div>
      <div className="w-full md:mb-3 mt-1 md:mt-2 flex items-center justify-between md:justify-center px-6 md:px-10">
        <div className="w-[100px]">
          <VolumeControl setVolume={setVolume} volume={volume} />
        </div>
        <div className="md:block hidden capitalize music-player__name md:text-center md:text-sm text-xs line-clamp-1">
          {currentTrack?.title}
        </div>
        <MusicPlayerOptions />
      </div>
      <ProgressBar
        progressPercentage={progressPercentage}
        setIsLoading={setIsLoading}
        setProgressPercentage={setProgressPercentage}
      />
    </div>
  );
}
