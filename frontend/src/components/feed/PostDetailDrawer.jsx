import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CommentTree } from '../comments/CommentTree';
import { CommentForm } from '../comments/CommentForm';
import { useAuth } from '../../hooks/useAuth';
import { usePost } from '../../hooks/usePosts';

export const PostDetailDrawer = ({ post, isOpen, onClose }) => {
  const { isAuthenticated } = useAuth();
  const { data: freshPost } = usePost(post?.id, { enabled: isOpen && Boolean(post?.id) });
  const activePost = freshPost || post;
  const isAnonymous = activePost.is_anonymous || activePost.author_username === 'Anonymous';

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            className="absolute inset-0 bg-black/40"
            onClick={onClose}
            aria-label="Close post details"
          />

          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-cream border-t border-line rounded-t-3xl shadow-lift max-h-[85vh] overflow-y-auto"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
          >
            <div className="container mx-auto px-4 py-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-ink/60">Post details</p>
                  <h3 className="font-display text-2xl mt-2">
                    {isAnonymous ? (
                      'Anonymous'
                    ) : (
                      <Link to={`/u/${encodeURIComponent(activePost.author_username)}`} className="hover:text-ink">
                        {activePost.author_username}
                      </Link>
                    )}
                  </h3>
                </div>
                <button
                  className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-ink/70 hover:text-ink"
                  onClick={onClose}
                  aria-label="Close drawer"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="border border-line rounded-2xl p-4 bg-cream">
                <p className="text-sm text-ink/80">{activePost.content}</p>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-display text-xl">Comments</h4>
                  <span className="text-xs text-ink/60">{activePost.comments?.length || 0} total</span>
                </div>

                {isAuthenticated ? (
                  <CommentForm postId={activePost.id} />
                ) : (
                  <p className="text-xs text-ink/60">Sign in to reply.</p>
                )}

                <div className="mt-4">
                  <CommentTree comments={activePost.comments || []} postId={activePost.id} maxDepth={50} />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
