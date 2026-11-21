import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useWallet } from '../context/WalletContext';
import { getApiBaseUrl } from '../services/api';

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginDemo } = useAuth();
  const { hasWallet } = useWallet();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Backend API URL management
  const [currentApiUrl, setCurrentApiUrl] = useState(() => getApiBaseUrl());
  const [inputUrl, setInputUrl] = useState(() => getApiBaseUrl());
  const [showConfig, setShowConfig] = useState(() => getApiBaseUrl().includes('your-service-name'));
  const [pingStatus, setPingStatus] = useState(null); // { loading, ok, message }

  const isPlaceholder = currentApiUrl.includes('your-service-name');
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
      const msg = err.response?.data?.message || err.message || 'Login failed. Please verify your credentials.';
      setError(msg);
      if (msg.toLowerCase().includes('network error') || isPlaceholder) {
        setShowConfig(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = () => {
    setEmail('alice@crypto.dev');
    setPassword('wallet1234');
  };

  const handleInstantDemo = () => {
    loginDemo();
    if (hasWallet) {
      navigate('/unlock');
    } else {
      navigate(from === '/login' ? '/' : from);
    }
  };

  const formatTargetUrl = (val) => {
    if (!val || typeof val !== 'string') return '';
    let clean = val.trim();
    if (!clean || clean === 'undefined' || clean === 'null') return '';
    if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
      clean = `https://${clean}`;
    }
    return clean.replace(/\/+$/, '');
  };

  const testConnection = async (urlToTest) => {
    const raw = formatTargetUrl(urlToTest || inputUrl || '');
    if (!raw) {
      setPingStatus({ loading: false, ok: false, message: 'Please enter a valid URL.' });
      return;
    }

    try {
      new URL(raw);
    } catch {
      setPingStatus({ loading: false, ok: false, message: 'Invalid URL format. Example: https://app.onrender.com/api' });
      return;
    }

    setPingStatus({ loading: true, ok: false, message: 'Pinging backend health endpoint...' });

    // Clean endpoint: if ends in /api, ping /api/health; else ping /api/health
    const healthUrl = raw.endsWith('/api') ? `${raw}/health` : `${raw}/api/health`;

    try {
      const res = await axios.get(healthUrl, { timeout: 10000 });
      if (res.data?.status === 'online') {
        setPingStatus({
          loading: false,
          ok: true,
          message: `Online! DB: ${res.data.database || 'ready'}`,
        });
      } else {
        setPingStatus({
          loading: false,
          ok: true,
          message: 'Backend reached successfully.',
        });
      }
    } catch (err) {
      setPingStatus({
        loading: false,
        ok: false,
        message: err.code === 'ECONNABORTED'
          ? 'Timed out (Render free tier wakes up in ~45s, retry shortly).'
          : `Connection failed (${err.message}). Check URL.`,
      });
    }
  };

  const handleSaveApiUrl = () => {
    let clean = formatTargetUrl(inputUrl);
    if (!clean) return;
    if (!clean.endsWith('/api')) {
      clean = `${clean}/api`;
    }
    try {
      new URL(clean);
      localStorage.setItem('cw_api_url', clean);
      setCurrentApiUrl(clean);
      setInputUrl(clean);
      testConnection(clean);
    } catch {
      setPingStatus({ loading: false, ok: false, message: 'Invalid URL format.' });
    }
  };

  const handleResetApiUrl = () => {
    localStorage.removeItem('cw_api_url');
    const def = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    setCurrentApiUrl(def);
    setInputUrl(def);
    setPingStatus(null);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder rounded-xl p-8 shadow-sm">
        
        {/* Header */}
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

        {/* Warning if still pointing to placeholder */}
        {isPlaceholder && (
          <div className="mb-4 p-3.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs">
            <div className="font-bold flex items-center gap-1.5 mb-1">
              <span>⚠️</span> Backend URL is set to placeholder!
            </div>
            <p className="text-[11px] leading-relaxed">
              Your frontend is requesting <code>https://your-service-name.onrender.com</code>. The browser blocks this as a &quot;CORS error&quot; because that domain does not exist.
            </p>
            <p className="text-[11px] mt-1 font-semibold">
              👉 Paste your real Render URL below or click &quot;Demo Mode&quot; to test immediately.
            </p>
          </div>
        )}

        {/* Error Notice */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-300 text-xs font-mono space-y-1.5">
            <div className="font-bold">Error: {error}</div>
            {error.toLowerCase().includes('network error') && (
              <div className="text-[11px] text-rose-700 dark:text-rose-400 font-sans">
                💡 <strong>Why this happens:</strong> The backend server at <code className="font-mono">{currentApiUrl}</code> was unreachable. If you host on Render Free tier, it may be waking up from sleep (~45s).
              </div>
            )}
          </div>
        )}

        {/* Form */}
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

        {/* Instant Demo Mode Option */}
        <div className="mt-3">
          <button
            type="button"
            onClick={handleInstantDemo}
            className="w-full py-2 px-3 rounded-lg border border-dashed border-forest-400 dark:border-forest-600 hover:bg-forest-50 dark:hover:bg-forest-950/40 text-forest-800 dark:text-forest-300 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <span>⚡</span> Instant Demo Mode (Offline Viva / Review)
          </button>
        </div>

        {/* Links & Helpers */}
        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-darkborder flex items-center justify-between text-xs">
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

        {/* Collapsible Backend Server Settings */}
        <div className="mt-5 pt-3 border-t border-gray-100 dark:border-darkborder">
          <button
            type="button"
            onClick={() => setShowConfig(!showConfig)}
            className="w-full flex items-center justify-between text-[11px] font-mono text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
          >
            <span className="flex items-center gap-1">
              <span>⚙️</span> Backend API Connection
            </span>
            <span>{showConfig ? '▲ Hide' : '▼ Configure'}</span>
          </button>

          {showConfig && (
            <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-900/60 rounded-lg border border-gray-200 dark:border-gray-800 space-y-2.5 text-xs">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                  Target Backend URL
                </label>
                <input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="https://your-service.onrender.com/api"
                  className="w-full px-2.5 py-1.5 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-mono text-[11px] focus:outline-none focus:ring-1 focus:ring-forest-700"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSaveApiUrl}
                  className="py-1 px-2.5 rounded bg-forest-800 hover:bg-forest-900 text-white font-semibold text-[11px]"
                >
                  Save & Ping
                </button>
                <button
                  type="button"
                  onClick={() => testConnection()}
                  className="py-1 px-2 rounded border border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 text-[11px]"
                >
                  Test Connection
                </button>
                <button
                  type="button"
                  onClick={handleResetApiUrl}
                  className="py-1 px-2 text-gray-500 hover:underline text-[11px] ml-auto"
                >
                  Reset
                </button>
              </div>

              {pingStatus && (
                <div
                  className={`p-2 rounded text-[11px] font-mono ${
                    pingStatus.loading
                      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200'
                      : pingStatus.ok
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200'
                      : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-200'
                  }`}
                >
                  {pingStatus.message}
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Login;
