import { CommentForm } from './CommentForm';

export const CommentReply = ({ postId, parentId }) => {
  return (
    <div className="mt-3">
      <CommentForm postId={postId} parentId={parentId} />
    </div>
  );
};
