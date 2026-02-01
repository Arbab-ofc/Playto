import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Sidebar } from '../components/layout/Sidebar';
import { CreatePost } from '../components/feed/CreatePost';
import { PostList } from '../components/feed/PostList';
import { AuthGate } from '../components/auth/AuthGate';

export const Home = () => {
  return (
    <div className="min-h-screen canvas-bg text-ink relative overflow-hidden">
      <svg
        className="absolute left-0 top-24 hidden lg:block"
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
        className="absolute right-0 top-32 hidden lg:block"
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

      <main className="container mx-auto px-4 pb-16">
        <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-center mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-ink/60">Community feed</p>
            <h1 className="font-display text-4xl md:text-5xl mt-4">
              Curated moments, threaded with care.
            </h1>
            <p className="text-ink/70 mt-4 max-w-xl">
              Playto captures short-form updates and the reply trails that matter. Move fast, stay thoughtful,
              and climb the 24-hour leaderboard.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em]">
              <span className="px-4 py-2 rounded-full border border-line bg-cream">Realtime karma</span>
              <span className="px-4 py-2 rounded-full border border-line bg-cream">Threaded replies</span>
              <span className="px-4 py-2 rounded-full border border-line bg-cream">Daily leaderboard</span>
            </div>
          </div>
          <div className="phone-frame p-6">
            <div className="border border-line rounded-2xl p-5 bg-cream">
              <p className="text-xs uppercase tracking-[0.2em] text-ink/60">Quick snapshot</p>
              <h2 className="font-display text-2xl mt-3">Top momentum</h2>
              <p className="text-sm text-ink/70 mt-2">
                Watch the leaderboard update in real time as fresh conversations land.
              </p>
            </div>
            <div className="mt-4 border border-line rounded-2xl p-5 bg-cream">
              <p className="text-xs uppercase tracking-[0.2em] text-ink/60">Create</p>
              <p className="text-sm text-ink/70 mt-2">
                Post something short. Let the replies build the story.
              </p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
          <section className="space-y-6">
            <AuthGate>
              <CreatePost />
            </AuthGate>
            <div className="phone-frame p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-xl">Latest posts</h3>
                <p className="text-xs uppercase tracking-[0.2em] text-ink/60">Live</p>
              </div>
              <PostList />
            </div>
          </section>

          <section className="space-y-6">
            <Sidebar />
            <div className="phone-frame p-6">
              <h3 className="font-display text-xl mb-2">Community notes</h3>
              <p className="text-sm text-ink/70">
                Keep posts concise and meaningful. Replies are where the depth lives.
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};
