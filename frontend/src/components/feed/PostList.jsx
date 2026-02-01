import { LoadingSpinner } from '../ui/LoadingSpinner';
import { PostCard } from './PostCard';
import { usePosts } from '../../hooks/usePosts';

export const PostList = () => {
  const { data, isLoading } = usePosts();

  if (isLoading) return <LoadingSpinner />;

  const posts = data?.results || data || [];

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};
