import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWallet } from '../context/WalletContext';

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { hasWallet } = useWallet();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await login(email, password);
      if (data?.user?.hasWallet) {
        navigate('/unlock');
      } else {
        navigate(from === '/login' ? '/' : from);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = () => {
    setEmail('alice@crypto.dev');
    setPassword('wallet1234');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder rounded-xl p-8 shadow-sm">
        <div className="mb-6">
          <span className="font-mono text-[11px] font-bold text-forest-800 dark:text-forest-400 uppercase tracking-wider">
            Authentication
          </span>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            Sign In to Wallet
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Access your encrypted Web3 wallet and transaction records
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-300 text-xs font-mono">
            Error: {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-darkborder bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-xs focus:ring-1 focus:ring-forest-700 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Account Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-darkborder bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-xs focus:ring-1 focus:ring-forest-700 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2.5 px-4 rounded-lg bg-forest-800 hover:bg-forest-900 text-white font-semibold text-xs tracking-wide transition-colors disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-darkborder flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={fillDemo}
            className="font-mono text-[11px] font-semibold text-forest-800 dark:text-forest-400 hover:underline"
          >
            [Fill Demo Credentials]
          </button>

          <Link
            to="/register"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white underline"
          >
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
