'use client';
import { useEffect, useRef } from 'react';

import { useMutation } from '@/hooks/useMutation';
import type {
  PlaylistModel,
  RequestSearchParams,
  TrackModel,
  TrackUserModel,
} from '@/models/tracks';

import api from './api';

export const useSearchTracks = (params: RequestSearchParams) => {
  const previousParams = useRef<string>('');
  const searchTrack = async () => {
    const response = await api.get('search/tracks', {
      params,
    });
    return response.data as TrackModel[];
  };
  const { data, isLoading, hasError, runMutation } = useMutation({
    mutate: searchTrack,
    startLoading: true,
  });

  useEffect(() => {
    const currentString = previousParams.current;
    const newString = JSON.stringify(params);

    if (currentString !== newString) {
      runMutation();
      previousParams.current = newString;
    }
  }, [params, runMutation]);

  return {
    data,
    isLoading,
    hasError,
  };
};

export const useSearchPlaylists = (params: RequestSearchParams) => {
  const previousParams = useRef<string>('');
  const searchTrack = async () => {
    const response = await api.get('search/playlists', {
      params,
    });
    return response.data as PlaylistModel[];
  };
  const { data, isLoading, hasError, runMutation } = useMutation({
    mutate: searchTrack,
    startLoading: true,
  });

  useEffect(() => {
    const currentString = previousParams.current;
    const newString = JSON.stringify(params);

    if (currentString !== newString) {
      runMutation();
      previousParams.current = newString;
    }
  }, [params, runMutation]);

  return {
    data,
    isLoading,
    hasError,
  };
};

export const useSearchArtists = (params: RequestSearchParams) => {
  const previousParams = useRef<string>('');
  const searchTrack = async () => {
    const response = await api.get('search/artists', {
      params,
    });
    return response.data as TrackUserModel[];
  };
  const { data, isLoading, hasError, runMutation } = useMutation({
    mutate: searchTrack,
    startLoading: true,
  });

  useEffect(() => {
    const currentString = previousParams.current;
    const newString = JSON.stringify(params);

    if (currentString !== newString) {
      runMutation();
      previousParams.current = newString;
    }
  }, [params, runMutation]);

  return {
    data,
    isLoading,
    hasError,
  };
};
