import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

export const usePosts = (page = 1) => {
  return useQuery({
    queryKey: ['posts', page],
    queryFn: async () => {
      const { data } = await api.get('/posts/', { params: { page } });
      return data;
    },
    keepPreviousData: true
  });
};

export const usePost = (id) => {
  return useQuery({
    queryKey: ['posts', id],
    queryFn: async () => {
      const { data } = await api.get(`/posts/${id}/`);
      return data;
    },
    enabled: Boolean(id)
  });
};

export const useCreatePost = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await api.post('/posts/', payload);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['posts'] })
  });
};

export const useTogglePostLike = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await api.post(`/posts/${id}/like/`);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['posts'] })
  });
};
