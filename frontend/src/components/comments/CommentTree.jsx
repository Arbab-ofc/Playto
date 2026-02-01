import { motion } from 'framer-motion';
import { useState } from 'react';
import { CommentItem } from './CommentItem';
import { buildCommentTree } from '../../utils/buildCommentTree';

export const CommentTree = ({ comments, postId, maxDepth = 50 }) => {
  const commentTree = buildCommentTree(comments || []);

  return (
    <div className="space-y-4">
      {commentTree.map((comment) => (
        <CommentTreeNode
          key={comment.id}
          comment={comment}
          level={0}
          maxDepth={maxDepth}
          postId={postId}
        />
      ))}
    </div>
  );
};

const CommentTreeNode = ({ comment, level, maxDepth, postId }) => {
  const [collapsed, setCollapsed] = useState(false);
  const canRenderReplies = level < maxDepth;
  const hasReplies = comment.replies && comment.replies.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: level * 0.05 }}
      style={{ marginLeft: level > 0 ? '2rem' : 0 }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <CommentItem comment={comment} level={level} postId={postId} />
        </div>
        {hasReplies && (
          <button
            className="text-xs uppercase tracking-[0.2em] text-ink/60 hover:text-ink"
            onClick={() => setCollapsed((prev) => !prev)}
          >
            {collapsed ? 'Expand' : 'Collapse'}
          </button>
        )}
      </div>

      {canRenderReplies && hasReplies && !collapsed && (
        <div className="mt-3 space-y-3">
          {comment.replies.map((reply) => (
            <CommentTreeNode
              key={reply.id}
              comment={reply}
              level={level + 1}
              maxDepth={maxDepth}
              postId={postId}
            />
          ))}
        </div>
      )}

      {!canRenderReplies && (
        <div className="mt-2 text-xs text-ink/60">Max nesting reached.</div>
      )}
    </motion.div>
  );
};
