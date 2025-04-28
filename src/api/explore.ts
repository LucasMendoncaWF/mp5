'use client';
import { useAutoFetch } from '@/hooks/useMutation';
import type { TrackModel } from '@/models/tracks';

import api from './api';

export const useTrendingMusics = () => {
  const { data, isLoading, hasError } = useAutoFetch({
    mutate: async () => {
      const response = await api.get('trending');
      return response.data as TrackModel[];
    },
  });

  return {
    data,
    isLoading,
    hasError,
  };
};

export const useGenres = () => {
  const { data, isLoading, hasError } = useAutoFetch({
    mutate: async () => {
      const response = await api.get('genres');
      return response.data as string[];
    },
  });

  return {
    data,
    isLoading,
    hasError,
  };
};
