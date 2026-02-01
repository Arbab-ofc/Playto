import { useAuth } from '../hooks/useAuth';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

export const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen canvas-bg text-ink relative overflow-hidden">
      <svg
        className="absolute left-0 top-24 hidden lg:block -z-10 pointer-events-none"
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
        className="absolute right-0 top-32 hidden lg:block -z-10 pointer-events-none"
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

      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="phone-frame p-8 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-ink/60">Profile</p>
              <h1 className="font-display text-3xl mt-3">{user?.username || 'Guest'} Profile</h1>
              <p className="text-sm text-ink/60 mt-2">Overview of your contributions and karma.</p>
            </div>
            <div className="w-16 h-16 rounded-full border border-line flex items-center justify-center font-display text-2xl">
              {user?.username?.[0]?.toUpperCase() || 'P'}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
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

          <div className="mt-8">
            <h2 className="font-display text-xl mb-3">Recent activity</h2>
            <div className="border border-line rounded-2xl p-5 bg-cream text-sm text-ink/60">
              Activity feed coming soon.
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
