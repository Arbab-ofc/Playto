import { useNavigate, useParams } from 'react-router-dom';
import { usePost } from '../hooks/usePosts';
import { PostDetailDrawer } from '../components/feed/PostDetailDrawer';

export const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = usePost(id);

  if (isLoading || !data) return null;

  return (
    <PostDetailDrawer
      post={data}
      isOpen={true}
      onClose={() => navigate(-1)}
    />
  );
};
