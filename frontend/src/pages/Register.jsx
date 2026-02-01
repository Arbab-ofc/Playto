import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { useAuth } from '../hooks/useAuth';

const passwordRule =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export const Register = () => {
  const [form, setForm] = useState({ full_name: '', username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (!passwordRule.test(form.password)) {
      setError('Password must be 8+ chars with uppercase, lowercase, number, and symbol.');
      setLoading(false);
      return;
    }
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
    <div className="min-h-screen canvas-bg text-ink relative overflow-hidden">
      <svg
        className="absolute left-0 bottom-12 hidden lg:block"
        width="360"
        height="240"
        viewBox="0 0 360 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 40C70 70 60 140 130 165C200 190 240 120 300 140C330 150 345 200 350 230"
          strokeWidth="2"
          className="ink-line"
        />
      </svg>
      <svg
        className="absolute right-0 top-10 hidden lg:block"
        width="360"
        height="240"
        viewBox="0 0 360 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 110C90 40 170 160 260 90C320 40 345 70 350 20"
          strokeWidth="2"
          className="ink-line"
        />
      </svg>

      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="phone-frame p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-ink/60">Create account</p>
            <h2 className="font-display text-2xl mt-3">Register</h2>
            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-ink/60">Full name</label>
                <input
                  name="full_name"
                  value={form.full_name}
                  onChange={handleChange}
                  className="w-full mt-2 bg-cream border border-line rounded-xl px-3 py-2 text-sm"
                  placeholder="Your full name"
                  required
                />
              </div>
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
                <div className="relative mt-2">
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={handleChange}
                    className="w-full bg-cream border border-line rounded-xl px-3 py-2 pr-10 text-sm"
                    placeholder="Create a password"
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
                <p className="text-xs text-ink/60 mt-2">
                  Use 8+ chars with uppercase, lowercase, number, and symbol.
                </p>
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

          <div className="phone-frame p-8 relative overflow-hidden">
            <div className="absolute -left-10 -top-10 w-36 h-36 rounded-full bg-accent/20" />
            <div className="absolute right-6 bottom-6 w-24 h-24 rounded-full bg-haze/60" />
            <p className="text-xs uppercase tracking-[0.3em] text-ink/60">Start here</p>
            <h1 className="font-display text-4xl mt-4">Build your Playto presence</h1>
            <p className="text-sm text-ink/70 mt-3 max-w-sm">
              Create a profile, post your first moment, and earn karma with meaningful replies.
            </p>
            <div className="mt-10 space-y-4 text-sm text-ink/70">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full border border-line flex items-center justify-center text-xs">01</div>
                <span>Setup your profile snapshot</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full border border-line flex items-center justify-center text-xs">02</div>
                <span>Share your first moment</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full border border-line flex items-center justify-center text-xs">03</div>
                <span>Watch your rank climb</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
