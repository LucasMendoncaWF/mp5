'use client';
import { useAutoFetch, useMutation } from '@/hooks/useMutation';
import type { PlaylistModel } from '@/models/tracks';
import useTrackStore from '@/stores/trackStore';

import api from './api';
import { isLocalPlaylist } from '@/utils/general';

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
  const { data, isLoading, hasError } = useMutation({
    mutate: async () => {
      if (id) {
        if (isLocalPlaylist(id)) {
          return;
        }
        const response = await api.get(`playlists/details/${id}`);
        return response.data as PlaylistModel;
      }
      return {};
    },
  });

  return {
    data: data || playlists?.find((item) => item.id === id),
    isLoading,
    hasError,
  };
};
