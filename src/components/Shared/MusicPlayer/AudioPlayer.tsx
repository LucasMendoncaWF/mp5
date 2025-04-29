'use client';

import React, { useEffect, useRef, useState } from 'react';

import { apiBaseUrl } from '@/api/api';
import useTrackStore from '@/stores/trackStore';

type AudioPlayerProps = {
  trackId: string;
  progress: number;
  volume: number;
  isLoading: boolean;
  // eslint-disable-next-line no-unused-vars
  onChangeProgress: (n: number) => void;
  // eslint-disable-next-line no-unused-vars
  setIsLoading: (value: boolean) => void;
  onEndSong: () => void;
};

export function AudioPlayer({
  trackId,
  progress,
  volume,
  isLoading,
  onChangeProgress,
  setIsLoading,
  onEndSong,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const changeProgressTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loadingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { setPlaying, isPlaying } = useTrackStore();
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const streamUrl = `${apiBaseUrl}/stream?trackId=${trackId}`;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration > 0) {
        setCurrentTime(audio.currentTime);
        const percent = (audio.currentTime / audio.duration) * 100;
        onChangeProgress(percent);
      }
    };

    const updateDuration = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [onChangeProgress]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume / 100;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setPlaying(true);
    const handlePause = () => setPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [audioRef, setPlaying]);

  useEffect(() => {
    if (changeProgressTimeout.current) {
      clearTimeout(changeProgressTimeout.current);
    }
    changeProgressTimeout.current = setTimeout(() => {
      const audio = audioRef.current;
      if (!audio || duration === 0) return;
      const newTime = (progress / 100) * duration;
      if (Math.abs(audio.currentTime - newTime) > 0.5) {
        audio.currentTime = newTime;
        setCurrentTime(newTime);
      }
    }, 20);
  }, [progress, duration]);

  useEffect(() => {
    if (playTimeout.current) {
      clearTimeout(playTimeout.current);
    }
    playTimeout.current = setTimeout(() => {
      const audio = audioRef.current;
      if (!audio || !trackId) {
        return;
      }
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }, 100);
  }, [isPlaying, trackId]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || progress < 100) return;
    onEndSong();
    onChangeProgress(0);
  }, [onChangeProgress, onEndSong, progress]);

  const handleProgress = (event: React.SyntheticEvent<HTMLAudioElement>) => {
    const audio = event.target as HTMLAudioElement;
    if (audio.buffered.length > 0) {
      const bufferedEnd = audio.buffered.end(audio.buffered.length - 1);
      const percentBuffered = (bufferedEnd / audio.duration) * 100;
      if (percentBuffered > 5) {
        onLoaded();
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const onLoaded = () => {
    if (loadingTimeout.current) {
      clearTimeout(loadingTimeout.current);
    }
    loadingTimeout.current = setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return (
    <>
      <span className="text-[10px] absolute top-5 md:top-2 pt-[2px] w-20 text-center">
        {!isLoading && (
          <>
            {formatTime(currentTime)}/{formatTime(duration)}
          </>
        )}
      </span>
      <audio
        onCanPlay={onLoaded}
        onProgress={handleProgress}
        ref={audioRef}
        src={streamUrl}
        preload="metadata"
      />
    </>
  );
}
