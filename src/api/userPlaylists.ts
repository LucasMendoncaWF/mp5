'use client';
import { useAutoFetch } from '@/hooks/useMutation';
import type { PlaylistModel } from '@/models/tracks';
import useTrackStore from '@/stores/trackStore';

import api from './api';

export const useUserPlaylist = ({ enabled = true }: { enabled?: boolean }) => {
  const { data, isLoading, hasError } = useAutoFetch({
    mutate: async () => {
      if (enabled) {
        const response = await api.get('playlists');
        return response.data as PlaylistModel[];
      } else {
        return [];
      }
    },
  });

  return {
    data,
    isLoading,
    hasError,
  };
};

export const usePlaylistDetails = (id: string) => {
  const { playlists } = useTrackStore();
  const { data, isLoading, hasError } = useAutoFetch({
    mutate: async () => {
      if (id) {
        if (id.includes('local_playlist')) {
          const newPlaylist = playlists.find((item) => item.id === id);
          return newPlaylist;
        }
        const response = await api.get(`playlists/details/${id}`);
        return response.data as PlaylistModel;
      }
      return {};
    },
  });

  return {
    data,
    isLoading,
    hasError,
  };
};
