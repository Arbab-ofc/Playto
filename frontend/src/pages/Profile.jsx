import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { UserPostsPanel } from '../components/profile/UserPostsPanel';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

export const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState(user?.bio || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await updateProfile({ bio });
    setSaving(false);
    setEditing(false);
  };

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
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8">
            <div className="phone-frame p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-ink/60">Profile</p>
                  <h1 className="font-display text-3xl mt-3">
                    {user?.username || 'Guest'}
                  </h1>
                  <p className="text-sm text-ink/60 mt-2">{user?.email || 'No email on file'}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-[0.2em] text-ink/60">First name</p>
                  <p className="font-display text-2xl mt-2">{user?.first_name || 'Guest'}</p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-line rounded-2xl p-4 bg-cream">
                  <p className="text-xs uppercase tracking-[0.2em] text-ink/60">Total Karma</p>
                  <p className="text-2xl font-display mt-2">{user?.total_karma ?? 0}</p>
                </div>
                <div className="border border-line rounded-2xl p-4 bg-cream">
                  <p className="text-xs uppercase tracking-[0.2em] text-ink/60">Last 24h</p>
                  <p className="text-2xl font-display mt-2">{user?.karma_last_24h ?? 0}</p>
                </div>
                <div className="border border-line rounded-2xl p-4 bg-cream">
                  <p className="text-xs uppercase tracking-[0.2em] text-ink/60">Status</p>
                  <p className="text-2xl font-display mt-2">Active</p>
                </div>
              </div>

              <div className="mt-8 border border-line rounded-2xl p-6 bg-cream">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.2em] text-ink/60">Bio</p>
                  <button
                    className="text-xs uppercase tracking-[0.2em] text-ink/60 hover:text-ink"
                    onClick={() => setEditing((prev) => !prev)}
                  >
                    {editing ? 'Cancel' : 'Edit'}
                  </button>
                </div>
                {editing ? (
                  <div className="mt-3 space-y-3">
                    <textarea
                      className="w-full min-h-[120px] bg-cream border border-line rounded-xl px-3 py-2 text-sm"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                    <button
                      className="px-4 py-2 rounded-full bg-ink text-cream text-xs uppercase tracking-[0.3em]"
                      onClick={handleSave}
                      disabled={saving}
                    >
                      {saving ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                ) : (
                  <p className="text-sm text-ink/70 mt-2">
                    {user?.bio || 'Add a short bio about yourself.'}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="phone-frame p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-ink/60">Highlights</p>
                <h2 className="font-display text-2xl mt-3">Momentum</h2>
                <p className="text-sm text-ink/70 mt-2">
                  Your profile reflects the energy you bring to the community. Keep posting to grow your
                  karma streak.
                </p>
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between border border-line rounded-2xl px-4 py-3 bg-cream">
                    <span className="text-xs uppercase tracking-[0.2em] text-ink/60">Threads started</span>
                    <span className="text-sm font-semibold">{user?.total_posts ?? 0}</span>
                  </div>
                  <div className="flex items-center justify-between border border-line rounded-2xl px-4 py-3 bg-cream">
                    <span className="text-xs uppercase tracking-[0.2em] text-ink/60">Replies sent</span>
                    <span className="text-sm font-semibold">{user?.total_comments ?? 0}</span>
                  </div>
                </div>
              </div>

              <UserPostsPanel userId={user?.id} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};
