import { useState } from 'react';
import { PostCard } from './PostCard';
import { usePosts } from '../../hooks/usePosts';
import { AnimatePresence, motion } from 'framer-motion';

export const PostList = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = usePosts(page);

  const posts = data?.results || data || [];
  const total = data?.count || posts.length;
  const pageSize = 10;
  const totalPages = total ? Math.ceil(total / pageSize) : 1;

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

      {totalPages > 1 && (
        <div className="flex items-center justify-between border border-line rounded-2xl p-3 bg-cream">
          <button
            className="px-3 py-1 text-xs uppercase tracking-[0.2em] text-ink/70 hover:text-ink disabled:opacity-40"
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={page === 1}
          >
            Prev
          </button>
          <div className="text-xs uppercase tracking-[0.3em] text-ink/60">
            Page {page} / {totalPages}
          </div>
          <button
            className="px-3 py-1 text-xs uppercase tracking-[0.2em] text-ink/70 hover:text-ink disabled:opacity-40"
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
