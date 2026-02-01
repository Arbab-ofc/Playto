export const Header = () => {
  return (
    <header className="py-8">
      <nav className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full border border-line flex items-center justify-center font-display text-lg">
            P
          </div>
          <span className="font-display text-2xl">Playto</span>
        </div>
        <div className="hidden md:flex items-center space-x-6 text-sm uppercase tracking-[0.2em] text-ink/70">
          <a href="#" className="hover:text-ink transition-colors">Feed</a>
          <a href="#leaderboard" className="hover:text-ink transition-colors">Leaderboard</a>
          <a href="#profile" className="hover:text-ink transition-colors">Profile</a>
        </div>
      </nav>
    </header>
  );
};
