import { motion } from 'framer-motion';

export const ThemeToggle = ({ theme, onToggle }) => {
  const isDark = theme === 'dark';

  return (
    <button
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="relative w-14 h-8 rounded-full border border-line bg-cream flex items-center px-1 transition-colors"
    >
      <motion.span
        className="absolute left-1 top-1 w-6 h-6 rounded-full bg-ink"
        animate={{ x: isDark ? 24 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
      <span className="absolute left-2 text-[10px] uppercase tracking-[0.2em] text-ink/60">L</span>
      <span className="absolute right-2 text-[10px] uppercase tracking-[0.2em] text-ink/60">D</span>
    </button>
  );
};
