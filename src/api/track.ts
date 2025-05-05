import { useAutoFetch } from '@/hooks/useMutation';
import type { TrackModel } from '@/models/tracks';

import api from './api';

export const useGetTrack = (id?: string) => {
  const { data, isLoading, hasError } = useAutoFetch({
    mutate: async () => {
      if (!id) return;
      const response = await api.get(`/tracks/${id}`);
      return response.data as TrackModel;
    },
  });

  return {
    data,
    isLoading,
    hasError,
  };
};
