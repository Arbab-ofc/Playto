import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { UserPostsPanel } from '../components/profile/UserPostsPanel';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { usePublicUserProfile } from '../hooks/useUsers';
import { formatDate } from '../utils/formatDate';

export const PublicProfile = () => {
  const { username } = useParams();
  const { data, isLoading, isError } = usePublicUserProfile(username);
  const joinedLabel = useMemo(() => (data?.created_at ? formatDate(data.created_at) : null), [data]);

  return (
    <div className="min-h-screen canvas-bg text-ink relative overflow-hidden">
      <svg
        className="absolute left-0 top-24 hidden lg:block z-0 opacity-70 pointer-events-none"
        width="420"
        height="240"
        viewBox="0 0 420 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 90C100 30 170 140 260 80C330 40 380 60 410 20"
          strokeWidth="2"
          className="ink-line"
        />
      </svg>
      <svg
        className="absolute right-0 top-32 hidden lg:block z-0 opacity-70 pointer-events-none"
        width="340"
        height="280"
        viewBox="0 0 340 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 40C60 70 50 140 110 160C170 180 210 120 260 140C300 155 320 210 330 260"
          strokeWidth="2"
          className="ink-line"
        />
      </svg>

      <div className="relative z-10">
        <Header />
        <div className="container mx-auto px-4 py-12">
          {isLoading && (
            <div className="flex justify-center py-16">
              <LoadingSpinner />
            </div>
          )}

          {isError && (
            <div className="phone-frame p-6 text-center text-sm text-ink/70">
              Unable to load this profile right now.
            </div>
          )}

          {!isLoading && !isError && !data && (
            <div className="phone-frame p-6 text-center text-sm text-ink/70">
              User not found.
            </div>
          )}

          {!isLoading && !isError && data && (
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8">
              <div className="phone-frame p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-ink/60">Profile</p>
                    <h1 className="font-display text-3xl mt-3">{data.username}</h1>
                    <p className="text-sm text-ink/60 mt-2">{data.first_name || 'Community member'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-[0.2em] text-ink/60">Joined</p>
                    <p className="font-display text-2xl mt-2">{joinedLabel || '—'}</p>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border border-line rounded-2xl p-4 bg-cream">
                    <p className="text-xs uppercase tracking-[0.2em] text-ink/60">Total Karma</p>
                    <p className="text-2xl font-display mt-2">{data.total_karma ?? 0}</p>
                  </div>
                  <div className="border border-line rounded-2xl p-4 bg-cream">
                    <p className="text-xs uppercase tracking-[0.2em] text-ink/60">Last 24h</p>
                    <p className="text-2xl font-display mt-2">{data.karma_last_24h ?? 0}</p>
                  </div>
                  <div className="border border-line rounded-2xl p-4 bg-cream">
                    <p className="text-xs uppercase tracking-[0.2em] text-ink/60">Post Likes</p>
                    <p className="text-2xl font-display mt-2">{data.total_post_likes ?? 0}</p>
                  </div>
                </div>

                <div className="mt-8 border border-line rounded-2xl p-6 bg-cream">
                  <p className="text-xs uppercase tracking-[0.2em] text-ink/60">Bio</p>
                  <p className="text-sm text-ink/70 mt-2">
                    {data.bio || 'No bio shared yet.'}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="phone-frame p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-ink/60">Highlights</p>
                  <h2 className="font-display text-2xl mt-3">Community footprint</h2>
                  <p className="text-sm text-ink/70 mt-2">
                    A quick snapshot of how this member has been showing up in Playto.
                  </p>
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between border border-line rounded-2xl px-4 py-3 bg-cream">
                      <span className="text-xs uppercase tracking-[0.2em] text-ink/60">Threads started</span>
                      <span className="text-sm font-semibold">{data.total_posts ?? 0}</span>
                    </div>
                    <div className="flex items-center justify-between border border-line rounded-2xl px-4 py-3 bg-cream">
                      <span className="text-xs uppercase tracking-[0.2em] text-ink/60">Replies sent</span>
                      <span className="text-sm font-semibold">{data.total_comments ?? 0}</span>
                    </div>
                  </div>
                </div>

                <UserPostsPanel userId={data.id} title="Posts" />
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};
