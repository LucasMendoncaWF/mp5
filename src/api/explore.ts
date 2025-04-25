'use client';
import { useAutoFetch } from '@/hooks/useMutation';
import type { TrackModel } from '@/models/tracks';

import api from './api';

export const TrendingMusics = () => {
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
