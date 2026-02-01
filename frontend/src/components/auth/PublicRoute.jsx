import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen canvas-bg flex items-center justify-center">
        <div className="phone-frame p-6 text-sm text-ink/60">Loading account...</div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};
