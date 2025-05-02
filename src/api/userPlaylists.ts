'use client';
import { useAutoFetch } from '@/hooks/useMutation';
import type { PlaylistModel } from '@/models/tracks';

import api from './api';

export const useUserPlaylist = () => {
  const { data, isLoading, hasError } = useAutoFetch({
    mutate: async () => {
      const response = await api.get('playlists');
      return response.data as PlaylistModel[];
    },
  });

  return {
    data,
    isLoading,
    hasError,
  };
};
