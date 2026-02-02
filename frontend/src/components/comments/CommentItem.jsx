import { useState } from 'react';
import { Heart, Reply } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';
import { useToggleCommentLike } from '../../hooks/useComments';
import { CommentReply } from './CommentReply';
import { useAuth } from '../../hooks/useAuth';
import { MentionText } from '../ui/MentionText';

export const CommentItem = ({ comment, level, postId }) => {
  const toggleLike = useToggleCommentLike();
  const { isAuthenticated } = useAuth();
  const [showReply, setShowReply] = useState(false);
  const isLiked = Boolean(comment.liked_by_me);

  return (
    <div className="border border-line rounded-2xl p-4 bg-cream">
      <div className="text-xs text-ink/60 mb-2">
        {comment.is_anonymous ? (
          'Anonymous'
        ) : (
          <Link to={`/u/${encodeURIComponent(comment.author_username)}`} className="hover:text-ink">
            {comment.author_username}
          </Link>
        )}{' '}
        · {formatDate(comment.created_at)} · L{level}
      </div>
      <MentionText text={comment.content} className="text-sm text-ink/70 mb-3" />
      <div className="flex items-center space-x-4 text-xs text-ink/70">
        <button
          onClick={() => toggleLike.mutate(comment.id)}
          className={`flex items-center space-x-2 transition ${
            isLiked ? 'text-accent' : 'hover:text-accent'
          }`}
        >
          <Heart size={14} fill={isLiked ? 'currentColor' : 'none'} />
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
