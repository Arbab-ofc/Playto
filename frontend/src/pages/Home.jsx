import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Sidebar } from '../components/layout/Sidebar';
import { CreatePost } from '../components/feed/CreatePost';
import { PostList } from '../components/feed/PostList';

export const Home = () => {
  return (
    <div className="min-h-screen canvas-bg text-ink relative overflow-hidden">

      <Header />

      <main className="container mx-auto px-4 pb-16">
        <section className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.4em] text-ink/60">Community feed</p>
          <h1 className="font-display text-4xl md:text-5xl mt-4">Threaded stories with a soft, tactile rhythm</h1>
          <p className="text-ink/70 mt-4 max-w-2xl mx-auto">
            Post, reply, and climb the leaderboard. Inspired by the calm flow of booking interfaces,
            Playto keeps conversation focused and elegant.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <section className="space-y-6">
            <CreatePost />
            <div className="phone-frame p-6">
              <h3 className="font-display text-xl mb-2">Add context</h3>
              <p className="text-sm text-ink/70">
                Keep every post clear and lightweight. Let replies carry the story forward.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <div className="phone-frame p-6">
              <h3 className="font-display text-xl mb-3">Latest posts</h3>
              <PostList />
            </div>
          </section>

          <section className="space-y-6" id="profile">
            <Sidebar />
            <div className="phone-frame p-6">
              <h3 className="font-display text-xl mb-2">Progress</h3>
              <p className="text-sm text-ink/70">Earn karma by contributing thoughtful takes and replies.</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};
