import { CommentTree } from '../comments/CommentTree';
import { usePost } from '../../hooks/usePosts';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export const PostDetail = ({ postId }) => {
  const { data, isLoading } = usePost(postId);

  if (isLoading) return <LoadingSpinner />;
  if (!data) return null;

  return (
    <div className="space-y-6">
      <div className="bg-dark-surface border border-dark-border rounded-xl p-6 shadow-3d">
        <h2 className="font-terminal text-xl mb-2">Post</h2>
        <p className="text-base leading-relaxed">{data.content}</p>
      </div>
      <CommentTree comments={data.comments || []} />
    </div>
  );
};
