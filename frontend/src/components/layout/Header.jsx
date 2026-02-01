import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="py-8">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full border border-line flex items-center justify-center font-display text-lg">
              P
            </div>
            <span className="font-display text-2xl">Playto</span>
          </div>

          <div className="hidden lg:flex items-center space-x-6 text-sm uppercase tracking-[0.2em] text-ink/70">
            <a href="#" className="hover:text-ink transition-colors">Feed</a>
            <a href="#leaderboard" className="hover:text-ink transition-colors">Leaderboard</a>
            <a href="#profile" className="hover:text-ink transition-colors">Profile</a>
          </div>

          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="lg:hidden w-10 h-10 rounded-full border border-line flex items-center justify-center text-ink/70 hover:text-ink hover:border-ink transition-colors"
            aria-label="Toggle menu"
          >
            <span className="sr-only">Menu</span>
            <div className="flex flex-col space-y-1">
              <span className="block w-4 h-0.5 bg-current" />
              <span className="block w-5 h-0.5 bg-current" />
              <span className="block w-4 h-0.5 bg-current" />
            </div>
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-6"
            >
              <div className="phone-frame p-4 space-y-3 text-xs uppercase tracking-[0.2em] text-ink/70">
                <a href="#" className="block hover:text-ink" onClick={() => setIsMenuOpen(false)}>
                  Feed
                </a>
                <a href="#leaderboard" className="block hover:text-ink" onClick={() => setIsMenuOpen(false)}>
                  Leaderboard
                </a>
                <a href="#profile" className="block hover:text-ink" onClick={() => setIsMenuOpen(false)}>
                  Profile
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};
