import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

export const useCreateComment = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await api.post('/comments/', payload);
      return data;
    },
    onSuccess: (_data, variables) => {
      if (variables?.post) {
        qc.invalidateQueries({ queryKey: ['posts', variables.post] });
      }
      qc.invalidateQueries({ queryKey: ['posts'], exact: false });
      qc.invalidateQueries({ queryKey: ['leaderboard'] });
    }
  });
};

export const useToggleCommentLike = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await api.post(`/comments/${id}/like/`);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['posts'], exact: false });
      qc.invalidateQueries({ queryKey: ['leaderboard'] });
    }
  });
};
