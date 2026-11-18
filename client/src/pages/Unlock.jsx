import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';

export const Unlock = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { unlockWallet } = useWallet();

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  const from = location.state?.from?.pathname || '/';

  const handleUnlock = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await unlockWallet(password, (p) => setProgress(Math.round(p * 100)));
      navigate(from === '/unlock' ? '/' : from);
    } catch (err) {
      setError(err.message || 'Incorrect password. Decryption failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder rounded-xl p-8 shadow-sm">
        <div className="mb-6">
          <span className="font-mono text-[11px] font-bold text-forest-800 dark:text-forest-400 uppercase tracking-wider">
            Protected Keystore
          </span>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            Unlock Wallet
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Enter your wallet encryption password to decrypt your private key in browser memory.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-300 text-xs font-mono">
            Error: {error}
          </div>
        )}

        <form onSubmit={handleUnlock} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                Wallet Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[11px] text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 underline"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter wallet password"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-darkborder bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-xs focus:ring-1 focus:ring-forest-700 focus:outline-none"
            />
          </div>

          {loading && (
            <div className="space-y-1.5 py-1 font-mono text-xs">
              <div className="flex justify-between text-gray-500">
                <span>Decrypting Scrypt Keystore...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-forest-700 transition-all duration-200"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2.5 px-4 rounded-lg bg-forest-800 hover:bg-forest-900 text-white font-semibold text-xs tracking-wide transition-colors disabled:opacity-50"
          >
            {loading ? 'Decrypting...' : 'Unlock Wallet'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-darkborder text-xs text-gray-500">
          Forgot your wallet password?{' '}
          <button
            type="button"
            onClick={() => navigate('/import-wallet')}
            className="font-semibold text-forest-800 dark:text-forest-400 hover:underline"
          >
            Restore with recovery phrase
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unlock;
