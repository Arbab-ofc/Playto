import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

const updateCommentInPost = (post, commentId, updater) => {
  if (!post || !Array.isArray(post.comments)) return post;
  let touched = false;
  const comments = post.comments.map((comment) => {
    if (comment.id !== commentId) return comment;
    touched = true;
    return updater(comment);
  });
  return touched ? { ...post, comments } : post;
};

const updateCommentInPage = (page, commentId, updater) => {
  if (!page || !Array.isArray(page.results)) return page;
  let touched = false;
  const results = page.results.map((post) => {
    const nextPost = updateCommentInPost(post, commentId, updater);
    if (nextPost !== post) touched = true;
    return nextPost;
  });
  return touched ? { ...page, results } : page;
};

const updateCommentInQueryData = (data, commentId, updater) => {
  if (!data) return data;
  if (Array.isArray(data.pages)) {
    const pages = data.pages.map((page) => updateCommentInPage(page, commentId, updater));
    return { ...data, pages };
  }
  if (Array.isArray(data.results)) {
    return updateCommentInPage(data, commentId, updater);
  }
  if (data.id && Array.isArray(data.comments)) {
    return updateCommentInPost(data, commentId, updater);
  }
  return data;
};

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
    onMutate: async (id) => {
      const predicate = (query) => Array.isArray(query.queryKey) && query.queryKey[0] === 'posts';
      await qc.cancelQueries({ predicate });
      const snapshots = qc.getQueriesData({ predicate });
      qc.setQueriesData({ predicate }, (old) =>
        updateCommentInQueryData(old, id, (comment) => {
          const nextLiked = !comment.liked_by_me;
          const nextCount = Math.max(0, (comment.like_count || 0) + (nextLiked ? 1 : -1));
          return { ...comment, liked_by_me: nextLiked, like_count: nextCount };
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
        updateCommentInQueryData(old, id, (comment) => ({
          ...comment,
          liked_by_me: actionLiked,
          like_count: typeof nextCount === 'number' ? nextCount : comment.like_count
        }))
      );
      qc.invalidateQueries({ queryKey: ['posts'], exact: false });
      qc.invalidateQueries({ queryKey: ['leaderboard'] });
    }
  });
};
