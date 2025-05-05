import { useAutoFetch } from '@/hooks/useMutation';
import type { TrackUserModel } from '@/models/tracks';

import api from './api';

export const useGetArtist = (id?: string) => {
  const { data, isLoading, hasError } = useAutoFetch({
    mutate: async () => {
      if (!id) return;
      const response = await api.get(`/artist/${id}`);
      return response.data as TrackUserModel;
    },
  });

  return {
    data,
    isLoading,
    hasError,
  };
};
