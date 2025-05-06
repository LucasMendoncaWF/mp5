'use client';
import React, { useState } from 'react';

import './PlayButton.scss';
import type { PlaylistModel, TrackModel } from '@/models/tracks';
import useTrackStore from '@/stores/trackStore';

interface Props {
  width?: number;
  track?: TrackModel;
  playList?: PlaylistModel;
  isSingleTrack?: boolean;
  isPlaylist?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
}

export default function PlayButton({
  width = 30,
  track,
  isSingleTrack,
  disabled,
  isPlaylist,
  playList,
  isLoading,
}: Props) {
  const {
    togglePlay,
    isPlaying,
    setCurrentTrack,
    currentTrack,
    currentPlayList,
    setSingleTrack,
    setCurrentPlayList,
  } = useTrackStore();
  const [buttonPressed, setButtonPressed] = useState(false);
  const parseValueToPx = (n: number) => `${n}px`;

  const onButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (playList) {
      onPlayPlaylist();
    } else if (track || currentTrack) {
      onPlayTrack();
    }
    // do animation
    if (!buttonPressed) {
      setButtonPressed(true);
      setTimeout(() => {
        setButtonPressed(false);
      }, 1000);
    }
  };

  const onPlayTrack = () => {
    if (!track || currentTrack?.id === track.id || !isPlaying) {
      togglePlay();
    }
    if (track && track.id !== currentTrack?.id) {
      setCurrentTrack(track);
      if (isSingleTrack) {
        setSingleTrack(track);
      }
    }
  };

  const onPlayPlaylist = () => {
    if (!playList || currentPlayList?.id === playList.id || !isPlaying) {
      togglePlay();
    }
    if (playList && playList.id !== currentPlayList?.id) {
      setCurrentPlayList(playList);
    }
  };

  const currentTrackPlaying =
    !!(isPlaylist && currentPlayList?.id === playList?.id) ||
    !!(isSingleTrack && currentTrack?.id === track?.id);
  const isCurrentPlaying = isPlaying && (currentTrackPlaying || (!track?.id && !playList?.id));

  return (
    <div
      style={{
        width: parseValueToPx(width),
        height: parseValueToPx(width),
      }}
      className="flex play-button relative flex-wrap justify-center content-center rounded-full"
    >
      <button
        aria-label="Play or Pause Music"
        disabled={disabled}
        onClick={onButtonClick}
        className={`play-button__element ${buttonPressed && 'pressed'} bg-primary cursor-pointer relative h-full w-full rounded-full transition duration-300 hover:opacity-80 hover:scale-92`}
      >
        {buttonPressed && <div className="play-button__notes-animation"></div>}
        {isLoading && isCurrentPlaying ? (
          <div className="play-button__loader"></div>
        ) : !isCurrentPlaying ? (
          <div
            style={{
              borderWidth: parseValueToPx(width / 3.4),
              borderLeftWidth: parseValueToPx(width / 2.4),
              borderRightWidth: 0,
              left: `calc(50% - ${parseValueToPx(width / 7)})`,
              top: `calc(50% - ${parseValueToPx(width / 3.9)})`,
            }}
            className="play-button__icon"
          ></div>
        ) : (
          <div className="flex justify-center w-full h-full items-center gap-[10%]">
            <div className="bg-background w-[16%] h-[50%]"></div>
            <div className="bg-background w-[16%] h-[50%]"></div>
          </div>
        )}
      </button>
    </div>
  );
}
