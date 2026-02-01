import { PostCard } from './PostCard';
import { usePosts } from '../../hooks/usePosts';
import { AnimatePresence, motion } from 'framer-motion';

export const PostList = () => {
  const { data, isLoading } = usePosts();

  const posts = data?.results || data || [];

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
            {[0, 1, 2].map((item) => (
              <div key={item} className="phone-frame p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="h-3 w-24 bg-line/60 rounded-full animate-pulse" />
                  <div className="h-3 w-16 bg-line/60 rounded-full animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-full bg-line/60 rounded-full animate-pulse" />
                  <div className="h-3 w-5/6 bg-line/60 rounded-full animate-pulse" />
                  <div className="h-3 w-2/3 bg-line/60 rounded-full animate-pulse" />
                </div>
                <div className="mt-4 h-3 w-12 bg-line/60 rounded-full animate-pulse" />
              </div>
            ))}
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
    </div>
  );
};
