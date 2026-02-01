import { LeaderboardWidget } from '../leaderboard/LeaderboardWidget';

export const Sidebar = () => {
  return (
    <aside className="space-y-6">
      <LeaderboardWidget />
      <div className="phone-frame p-6">
        <h3 className="font-display text-lg mb-3">Community Notes</h3>
        <ul className="space-y-2 text-sm text-ink/70">
          <li>Keep updates crisp.</li>
          <li>Use replies to add context.</li>
          <li>Reward thoughtful takes.</li>
        </ul>
      </div>
    </aside>
  );
};
