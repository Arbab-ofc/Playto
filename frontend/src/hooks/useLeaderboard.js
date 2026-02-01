import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

export const useLeaderboard = () => {
  return useQuery({
    queryKey: ['leaderboard'],
    queryFn: async () => {
      const { data } = await api.get('/leaderboard/');
      return data;
    },
    refetchInterval: 60000
  });
};
