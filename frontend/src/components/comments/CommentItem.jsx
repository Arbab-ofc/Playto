import { Heart } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';
import { useToggleCommentLike } from '../../hooks/useComments';

export const CommentItem = ({ comment, level }) => {
  const toggleLike = useToggleCommentLike();

  return (
    <div className="bg-dark-surface border border-dark-border rounded-lg p-4 shadow-3d">
      <div className="text-xs text-gray-400 mb-2">
        {comment.author_username} · {formatDate(comment.created_at)} · L{level}
      </div>
      <p className="text-sm mb-3">{comment.content}</p>
      <button
        onClick={() => toggleLike.mutate(comment.id)}
        className="flex items-center space-x-2 text-xs text-gray-300 hover:text-neon-green"
      >
        <Heart size={14} />
        <span>{comment.like_count}</span>
      </button>
    </div>
  );
};
