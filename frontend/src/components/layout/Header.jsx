import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { ThemeToggle } from '../ui/ThemeToggle';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="py-8 relative z-20">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center space-x-3">
            <span className="font-display text-2xl">Playto</span>
          </a>

          <div className="hidden lg:flex items-center space-x-6 text-sm uppercase tracking-[0.2em] text-ink/70">
            <a href="/" className="nav-link hover:text-ink transition-colors">Home</a>
            {isAuthenticated && (
              <a href="/profile" className="nav-link hover:text-ink transition-colors">Profile</a>
            )}
            {isAuthenticated ? (
              <button onClick={logout} className="nav-link hover:text-ink transition-colors">Logout</button>
            ) : (
              <a href="/login" className="nav-link hover:text-ink transition-colors">Login</a>
            )}
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>

          <button
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden w-11 h-11 rounded-full border border-line flex items-center justify-center text-ink/70 hover:text-ink hover:border-ink transition-colors"
            aria-label="Open menu"
          >
            <span className="sr-only">Menu</span>
            <div className="flex flex-col space-y-1">
              <span className="block w-5 h-0.5 bg-current" />
              <span className="block w-3 h-0.5 bg-current" />
              <span className="block w-4 h-0.5 bg-current" />
            </div>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              className="absolute inset-0 bg-black/30"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu overlay"
            />
            <motion.aside
              className="absolute right-0 top-0 h-full w-72 bg-cream border-l border-line shadow-lift p-6"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            >
              <div className="flex items-center justify-between mb-10">
                <span className="font-display text-xl">Navigation</span>
                <button
                  className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-ink/70 hover:text-ink hover:border-ink"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <span className="text-lg">×</span>
                </button>
              </div>

              <div className="space-y-6 text-xs uppercase tracking-[0.3em] text-ink/70">
                <a href="/" className="nav-link block hover:text-ink" onClick={() => setIsMenuOpen(false)}>
                  Home
                </a>
                {isAuthenticated && (
                  <a href="/profile" className="nav-link block hover:text-ink" onClick={() => setIsMenuOpen(false)}>
                    Profile
                  </a>
                )}
                {isAuthenticated ? (
                  <button
                    className="nav-link block hover:text-ink text-left w-full"
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                  >
                    Logout
                  </button>
                ) : (
                  <a href="/login" className="nav-link block hover:text-ink" onClick={() => setIsMenuOpen(false)}>
                    Login
                  </a>
                )}
                <div className="pt-2">
                  <ThemeToggle
                    theme={theme}
                    onToggle={() => {
                      toggleTheme();
                      setIsMenuOpen(false);
                    }}
                  />
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
