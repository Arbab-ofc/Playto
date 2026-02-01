import { useEffect, useRef } from 'react';
import { PostCard } from './PostCard';
import { usePosts } from '../../hooks/usePosts';
import { AnimatePresence, motion } from 'framer-motion';

export const PostList = () => {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePosts();
  const sentinelRef = useRef(null);

  const posts = data?.pages?.flatMap((page) => page.results || []) || [];

  useEffect(() => {
    if (!hasNextPage) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: '200px' }
    );

    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            <div className="phone-frame p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="h-3 w-24 bg-line/60 rounded-full animate-pulse" />
                <div className="h-3 w-16 bg-line/60 rounded-full animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-3 w-full bg-line/60 rounded-full animate-pulse" />
                <div className="h-3 w-5/6 bg-line/60 rounded-full animate-pulse" />
              </div>
            </div>
          </motion.div>
        ) : posts.length ? (
          <motion.div
            key="posts"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="text-sm text-ink/60 border border-line rounded-2xl p-6 bg-cream"
          >
            No posts yet. Coming soon.
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={sentinelRef} />

      {isFetchingNextPage && (
        <div className="phone-frame p-4">
          <div className="h-3 w-24 bg-line/60 rounded-full animate-pulse" />
        </div>
      )}

      {!hasNextPage && posts.length > 0 && (
        <div className="text-xs uppercase tracking-[0.3em] text-ink/60 text-center">
          You have reached the end.
        </div>
      )}
    </div>
  );
};
