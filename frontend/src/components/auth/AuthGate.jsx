import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const AuthGate = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return children;

  return (
    <div className="phone-frame p-6">
      <h3 className="font-display text-xl mb-2">Share a moment</h3>
      <p className="text-sm text-ink/70 mb-4">
        Sign in once to post updates, comment, and unlock your profile.
      </p>
      <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em]">
        <Link
          to="/login"
          className="px-4 py-2 rounded-full bg-ink text-cream"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-4 py-2 rounded-full border border-line text-ink"
        >
          Register
        </Link>
      </div>
    </div>
  );
};
