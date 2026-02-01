import { useAuth } from '../hooks/useAuth';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

const THREADS = [
  {
    id: 1,
    title: 'Morning ritual check-in',
    snippet: 'Sharing the top three priorities I want to protect today.',
    replies: 8,
    status: 'Open'
  },
  {
    id: 2,
    title: 'Design critique request',
    snippet: 'Feedback needed on the latest booking-inspired layout.',
    replies: 5,
    status: 'Active'
  },
  {
    id: 3,
    title: 'Productivity stack',
    snippet: 'Tools I use to keep the community feed moving.',
    replies: 3,
    status: 'Archived'
  }
];

export const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen canvas-bg text-ink">
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

          <div className="mt-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl">Threads</h2>
              <p className="text-xs uppercase tracking-[0.3em] text-ink/60">Recent</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {THREADS.map((thread) => (
                <div key={thread.id} className="border border-line rounded-2xl p-5 bg-cream">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs uppercase tracking-[0.2em] text-ink/60">{thread.status}</p>
                    <span className="text-xs text-ink/60">{thread.replies} replies</span>
                  </div>
                  <h3 className="font-display text-lg mb-2">{thread.title}</h3>
                  <p className="text-sm text-ink/70">{thread.snippet}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
