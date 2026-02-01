import { motion } from 'framer-motion';
import { CommentItem } from './CommentItem';
import { buildCommentTree } from '../../utils/buildCommentTree';

export const CommentTree = ({ comments, maxDepth = 50 }) => {
  const commentTree = buildCommentTree(comments || []);

  return (
    <div className="space-y-4">
      {commentTree.map((comment) => (
        <CommentTreeNode key={comment.id} comment={comment} level={0} maxDepth={maxDepth} />
      ))}
    </div>
  );
};

const CommentTreeNode = ({ comment, level, maxDepth }) => {
  const canRenderReplies = level < maxDepth;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: level * 0.05 }}
      style={{ marginLeft: level > 0 ? '2rem' : 0 }}
    >
      <CommentItem comment={comment} level={level} />
      {canRenderReplies && comment.replies && comment.replies.length > 0 && (
        <div className="mt-3 space-y-3">
          {comment.replies.map((reply) => (
            <CommentTreeNode key={reply.id} comment={reply} level={level + 1} maxDepth={maxDepth} />
          ))}
        </div>
      )}
      {!canRenderReplies && (
        <div className="mt-2 text-xs text-ink/60">Max nesting reached.</div>
      )}
    </motion.div>
  );
};
