import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { useAuth } from '../hooks/useAuth';

export const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register(form);
      navigate('/');
    } catch {
      setError('Unable to create account. Try a different username/email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen canvas-bg text-ink">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="phone-frame p-8 max-w-md mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/60">Create account</p>
          <h1 className="font-display text-3xl mt-3">Register</h1>
          <p className="text-sm text-ink/60 mt-2">Join the community to share moments.</p>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-ink/60">Username</label>
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full mt-2 bg-cream border border-line rounded-xl px-3 py-2 text-sm"
                placeholder="Choose a username"
                required
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-ink/60">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full mt-2 bg-cream border border-line rounded-xl px-3 py-2 text-sm"
                placeholder="you@example.com"
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
                placeholder="Create a password"
                required
              />
            </div>
            {error && <p className="text-sm text-accentDark">{error}</p>}
            <button
              type="submit"
              className="w-full bg-ink text-cream rounded-full py-2 text-xs uppercase tracking-[0.3em]"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create account'}
            </button>
          </form>

          <p className="text-sm text-ink/60 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-ink underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};
