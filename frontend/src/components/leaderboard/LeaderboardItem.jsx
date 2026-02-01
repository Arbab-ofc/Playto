export const LeaderboardItem = ({ user, index }) => {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-dark-border/50">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-full flex items-center justify-center font-terminal font-bold bg-dark-border">
          {index + 1}
        </div>
        <span className="font-terminal">{user.username}</span>
      </div>
      <span className="font-terminal font-bold text-neon-green">{user.karma_24h}</span>
    </div>
  );
};
