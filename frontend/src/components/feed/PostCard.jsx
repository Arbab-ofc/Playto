import { motion } from 'framer-motion';
import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';
import { useTogglePostLike } from '../../hooks/usePosts';
import { useAuth } from '../../hooks/useAuth';
import { CommentForm } from '../comments/CommentForm';
import { PostDetailDrawer } from './PostDetailDrawer';

export const PostCard = ({ post }) => {
  const toggleLike = useTogglePostLike();
  const { isAuthenticated } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="phone-frame p-5"
    >
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-ink/60 mb-3">
        <span>{post.author_username}</span>
        <span>{formatDate(post.created_at)}</span>
      </div>
      <p className="text-sm leading-relaxed mb-4 text-ink/90">{post.content}</p>
      <button
        onClick={() => toggleLike.mutate(post.id)}
        className="flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-ink/70 hover:text-accent"
      >
        <Heart size={14} />
        <span>{post.like_count}</span>
      </button>

      {Array.isArray(post.comments) && post.comments.length > 0 && (
        <div className="mt-4">
          <div className="border border-line rounded-2xl p-3 bg-cream">
            <p className="text-xs uppercase tracking-[0.2em] text-ink/60">
              {post.comments[0].author_username}
            </p>
            <p className="text-sm text-ink/70 mt-2">{post.comments[0].content}</p>
          </div>
          {post.comments.length > 1 && (
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="mt-3 text-xs uppercase tracking-[0.2em] text-ink/60 hover:text-ink"
            >
              Show all comments
            </button>
          )}
        </div>
      )}

      <div className="mt-4 border-t border-line/60 pt-4">
        {isAuthenticated ? (
          <CommentForm postId={post.id} />
        ) : null}
      </div>

      <PostDetailDrawer post={post} isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </motion.div>
  );
};
