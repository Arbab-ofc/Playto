import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { useAuth } from '../hooks/useAuth';

export const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(form);
      navigate('/');
    } catch {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen canvas-bg text-ink">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="phone-frame p-8 max-w-md mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/60">Welcome back</p>
          <h1 className="font-display text-3xl mt-3">Sign in</h1>
          <p className="text-sm text-ink/60 mt-2">Access your profile and share moments.</p>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-ink/60">Username</label>
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full mt-2 bg-cream border border-line rounded-xl px-3 py-2 text-sm"
                placeholder="Your username"
                required
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-ink/60">Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="w-full mt-2 bg-cream border border-line rounded-xl px-3 py-2 text-sm"
                placeholder="••••••••"
                required
              />
            </div>
            {error && <p className="text-sm text-accentDark">{error}</p>}
            <button
              type="submit"
              className="w-full bg-ink text-cream rounded-full py-2 text-xs uppercase tracking-[0.3em]"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p className="text-sm text-ink/60 mt-6">
            New here?{' '}
            <Link to="/register" className="text-ink underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};
