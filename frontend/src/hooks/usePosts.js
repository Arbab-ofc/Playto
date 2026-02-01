import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

export const usePosts = () => {
  return useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await api.get('/posts/', { params: { page: pageParam } });
      return data;
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage?.next) return undefined;
      const nextUrl = new URL(lastPage.next);
      const nextPage = Number(nextUrl.searchParams.get('page'));
      return Number.isNaN(nextPage) ? undefined : nextPage;
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

export const useUserPosts = (userId) => {
  return useQuery({
    queryKey: ['posts', 'user', userId],
    queryFn: async () => {
      const { data } = await api.get('/posts/', { params: { author: userId } });
      return data;
    },
    enabled: Boolean(userId)
  });
};

export const useUserPostsInfinite = (userId) => {
  return useInfiniteQuery({
    queryKey: ['posts', 'user', userId, 'infinite'],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await api.get('/posts/', { params: { author: userId, page: pageParam } });
      return data;
    },
    enabled: Boolean(userId),
    getNextPageParam: (lastPage) => {
      if (!lastPage?.next) return undefined;
      const nextUrl = new URL(lastPage.next);
      const nextPage = Number(nextUrl.searchParams.get('page'));
      return Number.isNaN(nextPage) ? undefined : nextPage;
    },
    keepPreviousData: true
  });
};
