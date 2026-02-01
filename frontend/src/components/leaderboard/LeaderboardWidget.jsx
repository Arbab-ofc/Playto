import { motion } from 'framer-motion';
import { Trophy, TrendingUp } from 'lucide-react';
import { useLeaderboard } from '../../hooks/useLeaderboard';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export const LeaderboardWidget = () => {
  const { data: leaderboard, isLoading } = useLeaderboard();

  return (
    <div id="leaderboard" className="phone-frame p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-accent/20 rounded-full">
          <Trophy size={20} className="text-accentDark" />
        </div>
        <div>
          <h3 className="font-display text-xl">Top Users</h3>
          <p className="text-xs uppercase tracking-[0.2em] text-ink/60">Last 24 hours</p>
        </div>
      </div>

      <div className="space-y-3">
        {isLoading ? (
          <div className="space-y-3">
            {[0, 1, 2].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between p-3 rounded-2xl border border-line/60 bg-cream"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full border border-line animate-pulse" />
                  <div className="h-3 w-24 bg-line/60 rounded-full animate-pulse" />
                </div>
                <div className="h-3 w-12 bg-line/60 rounded-full animate-pulse" />
              </div>
            ))}
          </div>
        ) : leaderboard?.length ? (
          leaderboard.map((user, index) => (
            <motion.div
              key={user.username}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-2xl border border-line/60"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border border-line">
                  {index + 1}
                </div>
                <span className="text-sm">{user.username}</span>
              </div>

              <div className="flex items-center space-x-2 text-ink/70">
                <TrendingUp size={14} />
                <span className="text-sm font-semibold">{user.karma_24h}</span>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-sm text-ink/60 border border-line rounded-2xl p-4 bg-cream">
            Top users coming soon.
          </div>
        )}
      </div>
    </div>
  );
};
