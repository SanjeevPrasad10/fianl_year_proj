import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { restoreFromMnemonic, restoreFromPrivateKey, encryptKeystore } from '../services/wallet';
import { useWallet } from '../context/WalletContext';

export const ImportWallet = () => {
  const navigate = useNavigate();
  const { saveAndBackupWallet } = useWallet();

  const [importType, setImportType] = useState('phrase'); // 'phrase' or 'pk'
  const [phrase, setPhrase] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImport = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Wallet password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      let walletObj;
      if (importType === 'phrase') {
        walletObj = await restoreFromMnemonic(phrase);
      } else {
        walletObj = await restoreFromPrivateKey(privateKey);
      }

      const keystoreJson = await encryptKeystore(walletObj.wallet, password);
      await saveAndBackupWallet(walletObj.address, keystoreJson, walletObj.wallet);

      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to import wallet. Please check your recovery phrase or private key.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder rounded-xl p-6 sm:p-8">
        <div className="mb-6">
          <span className="font-mono text-[11px] font-bold text-forest-800 dark:text-forest-400 uppercase tracking-wider">
            Restore Wallet
          </span>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            Import Existing Keys
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Enter your 12-word mnemonic phrase or raw private key to restore your Ethereum wallet.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-gray-200 dark:border-darkborder mb-6">
          <button
            type="button"
            onClick={() => setImportType('phrase')}
            className={`pb-2.5 px-4 text-xs font-semibold transition-colors border-b-2 -mb-px ${
              importType === 'phrase'
                ? 'border-forest-800 text-forest-900 dark:border-forest-400 dark:text-forest-400'
                : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            12-Word Phrase
          </button>
          <button
            type="button"
            onClick={() => setImportType('pk')}
            className={`pb-2.5 px-4 text-xs font-semibold transition-colors border-b-2 -mb-px ${
              importType === 'pk'
                ? 'border-forest-800 text-forest-900 dark:border-forest-400 dark:text-forest-400'
                : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            Private Key
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-300 text-xs font-mono">
            Error: {error}
          </div>
        )}

        <form onSubmit={handleImport} className="space-y-4">
          {importType === 'phrase' ? (
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Recovery Phrase (12 or 24 Words)
              </label>
              <textarea
                required
                rows={3}
                value={phrase}
                onChange={(e) => setPhrase(e.target.value)}
                placeholder="word1 word2 word3 ... word12"
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-darkborder bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-xs font-mono focus:ring-1 focus:ring-forest-700 focus:outline-none resize-none"
              />
              <p className="text-[11px] text-gray-500 mt-1">
                Enter words separated by a single space.
              </p>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Private Key Hex String (64 characters)
              </label>
              <input
                type="text"
                required
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                placeholder="0x..."
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-darkborder bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-xs font-mono focus:ring-1 focus:ring-forest-700 focus:outline-none"
              />
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                Set Wallet Password
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-darkborder bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-xs focus:ring-1 focus:ring-forest-700 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Confirm Wallet Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-darkborder bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-xs focus:ring-1 focus:ring-forest-700 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-2.5 px-4 rounded-lg bg-forest-800 hover:bg-forest-900 text-white font-semibold text-xs tracking-wide transition-colors disabled:opacity-50"
          >
            {loading ? 'Restoring & Encrypting...' : 'Restore & Enter Wallet'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ImportWallet;
