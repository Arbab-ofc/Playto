import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import { useAuth } from './useAuth';

const updatePostInPage = (page, postId, updater) => {
  if (!page || !Array.isArray(page.results)) return page;
  let touched = false;
  const results = page.results.map((post) => {
    if (post.id !== postId) return post;
    touched = true;
    return updater(post);
  });
  return touched ? { ...page, results } : page;
};

const updatePostInQueryData = (data, postId, updater) => {
  if (!data) return data;
  if (Array.isArray(data.pages)) {
    const pages = data.pages.map((page) => updatePostInPage(page, postId, updater));
    return { ...data, pages };
  }
  if (Array.isArray(data.results)) {
    return updatePostInPage(data, postId, updater);
  }
  if (data.id === postId) {
    return updater(data);
  }
  return data;
};

export const usePosts = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const authKey = isAuthenticated ? `auth-${user?.id ?? 'me'}` : 'anon';
  return useInfiniteQuery({
    queryKey: ['posts', authKey],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await api.get('/posts/', { params: { page: pageParam } });
      return data;
    },
    enabled: !loading,
    getNextPageParam: (lastPage) => {
      if (!lastPage?.next) return undefined;
      const nextUrl = new URL(lastPage.next);
      const nextPage = Number(nextUrl.searchParams.get('page'));
      return Number.isNaN(nextPage) ? undefined : nextPage;
    },
    keepPreviousData: true,
    staleTime: 30000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });
};

export const usePost = (id, options = {}) => {
  const { enabled = true, ...rest } = options;
  const { user, isAuthenticated, loading } = useAuth();
  const authKey = isAuthenticated ? `auth-${user?.id ?? 'me'}` : 'anon';
  return useQuery({
    queryKey: ['posts', id, authKey],
    queryFn: async () => {
      const { data } = await api.get(`/posts/${id}/`);
      return data;
    },
    enabled: Boolean(id) && enabled && !loading,
    staleTime: 30000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    ...rest
  });
};

export const useCreatePost = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await api.post('/posts/', payload);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['leaderboard'] });
    }
  });
};

export const useTogglePostLike = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await api.post(`/posts/${id}/like/`);
      return data;
    },
    onMutate: async (id) => {
      const predicate = (query) => Array.isArray(query.queryKey) && query.queryKey[0] === 'posts';
      await qc.cancelQueries({ predicate });
      const snapshots = qc.getQueriesData({ predicate });
      qc.setQueriesData({ predicate }, (old) =>
        updatePostInQueryData(old, id, (post) => {
          const nextLiked = !post.liked_by_me;
          const nextCount = Math.max(0, (post.like_count || 0) + (nextLiked ? 1 : -1));
          return { ...post, liked_by_me: nextLiked, like_count: nextCount };
        })
      );
      return { snapshots };
    },
    onError: (_error, _id, context) => {
      if (!context?.snapshots) return;
      context.snapshots.forEach(([key, data]) => {
        qc.setQueryData(key, data);
      });
    },
    onSuccess: (data, id) => {
      const actionLiked = data?.action === 'liked';
      const nextCount = typeof data?.like_count === 'number' ? data.like_count : undefined;
      const predicate = (query) => Array.isArray(query.queryKey) && query.queryKey[0] === 'posts';
      qc.setQueriesData({ predicate }, (old) =>
        updatePostInQueryData(old, id, (post) => ({
          ...post,
          liked_by_me: actionLiked,
          like_count: typeof nextCount === 'number' ? nextCount : post.like_count
        }))
      );
      qc.invalidateQueries({ queryKey: ['leaderboard'] });
    }
  });
};

export const useUserPosts = (userId) => {
  const { user, isAuthenticated, loading } = useAuth();
  const authKey = isAuthenticated ? `auth-${user?.id ?? 'me'}` : 'anon';
  return useQuery({
    queryKey: ['posts', 'user', userId, authKey],
    queryFn: async () => {
      const { data } = await api.get('/posts/', { params: { author: userId } });
      return data;
    },
    enabled: Boolean(userId) && !loading,
    staleTime: 30000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });
};

export const useUserPostsInfinite = (userId) => {
  const { user, isAuthenticated, loading } = useAuth();
  const authKey = isAuthenticated ? `auth-${user?.id ?? 'me'}` : 'anon';
  return useInfiniteQuery({
    queryKey: ['posts', 'user', userId, 'infinite', authKey],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await api.get('/posts/', { params: { author: userId, page: pageParam } });
      return data;
    },
    enabled: Boolean(userId) && !loading,
    getNextPageParam: (lastPage) => {
      if (!lastPage?.next) return undefined;
      const nextUrl = new URL(lastPage.next);
      const nextPage = Number(nextUrl.searchParams.get('page'));
      return Number.isNaN(nextPage) ? undefined : nextPage;
    },
    keepPreviousData: true,
    staleTime: 30000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });
};
