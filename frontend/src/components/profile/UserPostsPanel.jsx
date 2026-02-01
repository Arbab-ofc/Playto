import { useEffect, useMemo, useRef } from 'react';
import { useUserPostsInfinite } from '../../hooks/usePosts';
import { buildCommentTree } from '../../utils/buildCommentTree';
import { formatDate } from '../../utils/formatDate';

const countReplies = (comments = []) => comments.filter((c) => c.parent_id !== null).length;

export const UserPostsPanel = ({ userId }) => {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useUserPostsInfinite(userId);
  const sentinelRef = useRef(null);

  const posts = useMemo(
    () => data?.pages?.flatMap((page) => page.results || []) || [],
    [data]
  );

  useEffect(() => {
    if (!hasNextPage) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: '200px' }
    );
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="phone-frame p-6">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.3em] text-ink/60">Your posts</p>
        <span className="text-xs text-ink/60">{posts.length} loaded</span>
      </div>

      <div className="mt-4 max-h-[520px] overflow-y-auto pr-2 space-y-4">
        {isLoading && (
          <div className="border border-line rounded-2xl p-4 bg-cream text-sm text-ink/60">
            Loading posts...
          </div>
        )}

        {!isLoading && posts.length === 0 && (
          <div className="border border-line rounded-2xl p-4 bg-cream text-sm text-ink/60">
            No posts yet.
          </div>
        )}

        {posts.map((post) => {
          const comments = post.comments || [];
          const repliesCount = countReplies(comments);
          const tree = buildCommentTree(comments);
          return (
            <a
              key={post.id}
              href={`/#post-${post.id}`}
              className="block border border-line rounded-2xl p-4 bg-cream hover:border-ink/30 transition-colors"
            >
              <div className="flex items-center justify-between text-xs text-ink/60">
                <span>{formatDate(post.created_at)}</span>
                <span>{post.like_count} likes</span>
              </div>
              <p className="text-sm text-ink/70 mt-2">{post.content}</p>

              <div className="mt-3 flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em] text-ink/60">
                <span>{comments.length} comments</span>
                <span>{repliesCount} replies</span>
              </div>

              {tree.length > 0 && (
                <div className="mt-3 border border-line rounded-2xl p-3 bg-cream">
                  <p className="text-xs uppercase tracking-[0.2em] text-ink/60">Latest thread</p>
                  <p className="text-sm text-ink/70 mt-2">{tree[0].content}</p>
                </div>
              )}
            </a>
          );
        })}

        <div ref={sentinelRef} />

        {isFetchingNextPage && (
          <div className="border border-line rounded-2xl p-4 bg-cream text-xs text-ink/60">
            Loading more...
          </div>
        )}

        {!hasNextPage && posts.length > 0 && (
          <div className="text-xs uppercase tracking-[0.3em] text-ink/60 text-center">
            End of list
          </div>
        )}
      </div>
    </div>
  );
};
