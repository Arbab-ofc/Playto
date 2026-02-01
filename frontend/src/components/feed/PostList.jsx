import { LoadingSpinner } from '../ui/LoadingSpinner';
import { PostCard } from './PostCard';
import { usePosts } from '../../hooks/usePosts';

export const PostList = () => {
  const { data, isLoading } = usePosts();

  if (isLoading) return <LoadingSpinner />;

  const posts = data?.results || data || [];

  if (!posts.length) {
    return (
      <div className="text-sm text-ink/60 border border-line rounded-2xl p-6 bg-cream">
        No posts yet. Coming soon.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};
