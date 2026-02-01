import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { useAuth } from '../hooks/useAuth';

export const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="min-h-screen canvas-bg text-ink relative overflow-hidden">
      <svg
        className="absolute -left-10 top-16 hidden lg:block"
        width="380"
        height="260"
        viewBox="0 0 380 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 120C90 40 160 170 250 95C320 40 355 70 370 25"
          strokeWidth="2"
          className="ink-line"
        />
      </svg>
      <svg
        className="absolute right-0 bottom-10 hidden lg:block"
        width="320"
        height="220"
        viewBox="0 0 320 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 40C70 70 50 140 120 155C190 170 225 110 275 125C300 135 310 175 315 210"
          strokeWidth="2"
          className="ink-line"
        />
      </svg>

      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="phone-frame p-8 relative overflow-hidden">
            <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full bg-accent/20" />
            <div className="absolute -left-10 bottom-8 w-28 h-28 rounded-full bg-haze/60" />
            <p className="text-xs uppercase tracking-[0.3em] text-ink/60">Welcome back</p>
            <h1 className="font-display text-4xl mt-4">Sign in to Playto</h1>
            <p className="text-sm text-ink/70 mt-3 max-w-sm">
              Return to your conversations, keep your streaks alive, and share what matters next.
            </p>
            <div className="mt-10 space-y-4 text-sm text-ink/70">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full border border-line flex items-center justify-center text-xs">01</div>
                <span>Continue your threads</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full border border-line flex items-center justify-center text-xs">02</div>
                <span>Track your 24h karma</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full border border-line flex items-center justify-center text-xs">03</div>
                <span>Unlock profile insights</span>
              </div>
            </div>
          </div>

          <div className="phone-frame p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-ink/60">Account access</p>
            <h2 className="font-display text-2xl mt-3">Login</h2>
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
                <div className="relative mt-2">
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={handleChange}
                    className="w-full bg-cream border border-line rounded-xl px-3 py-2 pr-10 text-sm"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/60 hover:text-ink"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
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
      </div>
      <Footer />
    </div>
  );
};
