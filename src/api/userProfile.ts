import { useAutoFetch } from '@/hooks/useMutation';
import type { TrackUserModel } from '@/models/tracks';

import api from './api';

export const useGetUserProfile = () => {
  const { data, isLoading, hasError } = useAutoFetch({
    mutate: async () => {
      const response = await api.get(`/userProfile`);
      return response.data as TrackUserModel;
    },
  });

  return {
    data,
    isLoading,
    hasError,
  };
};
