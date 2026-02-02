import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

export const usePublicUserProfile = (username) => {
  return useQuery({
    queryKey: ['users', 'public', username],
    queryFn: async () => {
      const { data } = await api.get(`/auth/users/by-username/${username}/`);
      return data;
    },
    enabled: Boolean(username)
  });
};
