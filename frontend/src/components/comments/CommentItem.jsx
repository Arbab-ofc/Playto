import { useState } from 'react';
import { Heart, Reply } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';
import { useToggleCommentLike } from '../../hooks/useComments';
import { CommentReply } from './CommentReply';
import { useAuth } from '../../hooks/useAuth';

export const CommentItem = ({ comment, level, postId }) => {
  const toggleLike = useToggleCommentLike();
  const { isAuthenticated } = useAuth();
  const [showReply, setShowReply] = useState(false);

  return (
    <div className="border border-line rounded-2xl p-4 bg-cream">
      <div className="text-xs text-ink/60 mb-2">
        {comment.author_username} · {formatDate(comment.created_at)} · L{level}
      </div>
      <p className="text-sm text-ink/70 mb-3">{comment.content}</p>
      <div className="flex items-center space-x-4 text-xs text-ink/70">
        <button
          onClick={() => toggleLike.mutate(comment.id)}
          className="flex items-center space-x-2 hover:text-accent"
        >
          <Heart size={14} />
          <span>{comment.like_count}</span>
        </button>
        {isAuthenticated && (
          <button
            onClick={() => setShowReply((prev) => !prev)}
            className="flex items-center space-x-2 hover:text-ink"
          >
            <Reply size={14} />
            <span>{showReply ? 'Cancel' : 'Reply'}</span>
          </button>
        )}
      </div>
      {showReply && isAuthenticated && (
        <div className="mt-3">
          <CommentReply postId={postId} parentId={comment.id} />
        </div>
      )}
    </div>
  );
};
