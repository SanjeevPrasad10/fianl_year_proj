import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateNewWallet, encryptKeystore } from '../services/wallet';
import { useWallet } from '../context/WalletContext';

export const CreateWallet = () => {
  const navigate = useNavigate();
  const { saveAndBackupWallet } = useWallet();

  const [step, setStep] = useState(1);
  const [walletData, setWalletData] = useState(null);
  const [copied, setCopied] = useState(false);
  const [confirmedBackup, setConfirmedBackup] = useState(false);

  // Step 2 Password State
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [encrypting, setEncrypting] = useState(false);
  const [encryptProgress, setEncryptProgress] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    generateNewWallet().then((data) => {
      setWalletData(data);
    });
  }, []);

  const handleCopyPhrase = () => {
    if (!walletData?.mnemonic) return;
    navigator.clipboard.writeText(walletData.mnemonic);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadBackup = () => {
    if (!walletData) return;
    const content = `=== CRYPTO WALLET RECOVERY BACKUP ===
Generated At: ${new Date().toISOString()}
Wallet Address: ${walletData.address}

12-WORD RECOVERY PHRASE (BIP-39):
${walletData.mnemonic}

SECURITY NOTICE:
- Store this file offline.
- Anyone with this phrase can access and spend all funds.
======================================`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wallet-backup-${walletData.address.substring(0, 8)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleProceedToPassword = () => {
    if (!confirmedBackup) {
      setError('Please confirm that you have saved your 12-word recovery phrase.');
      return;
    }
    setError('');
    setStep(2);
  };

  const handleEncryptAndSave = async (e) => {
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

    setEncrypting(true);
    try {
      const jsonKeystore = await encryptKeystore(
        walletData.wallet,
        password,
        (progress) => setEncryptProgress(Math.round(progress * 100))
      );

      await saveAndBackupWallet(walletData.address, jsonKeystore, walletData.wallet);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Encryption failed. Please try again.');
      setEncrypting(false);
    }
  };

  const words = walletData?.mnemonic ? walletData.mnemonic.split(' ') : [];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Step Indicator */}
      <div className="flex items-center justify-center space-x-3 mb-8 text-xs font-mono">
        <span className={step >= 1 ? 'font-bold text-forest-800 dark:text-forest-400' : 'text-gray-400'}>
          [1. RECOVERY PHRASE]
        </span>
        <span className="text-gray-300 dark:text-gray-700">───</span>
        <span className={step >= 2 ? 'font-bold text-forest-800 dark:text-forest-400' : 'text-gray-400'}>
          [2. ENCRYPT WALLET]
        </span>
      </div>

      {step === 1 && (
        <div className="bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder rounded-xl p-6 sm:p-8">
          <div className="mb-6">
            <span className="font-mono text-[11px] font-bold text-forest-800 dark:text-forest-400 uppercase tracking-wider">
              Step 1 of 2
            </span>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              Secret Recovery Phrase
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Record these 12 words in precise sequence. These words represent the master seed for your private keys.
            </p>
          </div>

          <div className="mb-6 p-3.5 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-200 text-xs font-mono">
            WARNING: Do not share these 12 words with anyone. Loss of this phrase means permanent loss of access.
          </div>

          {/* 12 Word Matrix */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-darkborder mb-6">
            {words.map((word, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-2 px-2.5 py-1.5 rounded bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder text-xs font-mono"
              >
                <span className="text-gray-400 text-[10px] w-4">{idx + 1}.</span>
                <span className="font-semibold text-gray-900 dark:text-white">{word}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              type="button"
              onClick={handleCopyPhrase}
              className="py-1.5 px-3 rounded text-xs font-semibold border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors"
            >
              {copied ? 'Copied to Clipboard' : 'Copy Phrase'}
            </button>

            <button
              type="button"
              onClick={handleDownloadBackup}
              className="py-1.5 px-3 rounded text-xs font-semibold border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors"
            >
              Download Backup (.txt)
            </button>
          </div>

          {/* Confirmation */}
          <label className="flex items-center space-x-2.5 p-3 rounded bg-gray-50 dark:bg-gray-900 cursor-pointer mb-6 border border-gray-200 dark:border-gray-800">
            <input
              type="checkbox"
              checked={confirmedBackup}
              onChange={(e) => setConfirmedBackup(e.target.checked)}
              className="w-4 h-4 rounded text-forest-800 focus:ring-forest-700"
            />
            <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">
              I have stored my 12-word recovery phrase safely offline.
            </span>
          </label>

          {error && <p className="text-xs text-rose-600 font-mono mb-4">Error: {error}</p>}

          <button
            type="button"
            onClick={handleProceedToPassword}
            className="w-full py-2.5 px-4 rounded-lg bg-forest-800 hover:bg-forest-900 text-white font-semibold text-xs tracking-wide transition-colors"
          >
            Proceed to Set Password
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder rounded-xl p-6 sm:p-8">
          <div className="mb-6">
            <span className="font-mono text-[11px] font-bold text-forest-800 dark:text-forest-400 uppercase tracking-wider">
              Step 2 of 2
            </span>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              Set Wallet Password
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              This password locally encrypts your Web3 keystore. You will need it to unlock your wallet and approve transactions.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-300 text-xs font-mono">
              Error: {error}
            </div>
          )}

          <form onSubmit={handleEncryptAndSave} className="space-y-4">
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

            {encrypting && (
              <div className="py-2 space-y-1.5 font-mono text-xs">
                <div className="flex justify-between text-gray-500">
                  <span>Scrypt Key Derivation...</span>
                  <span>{encryptProgress}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-forest-700 transition-all duration-200"
                    style={{ width: `${encryptProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={encrypting}
              className="w-full mt-4 py-2.5 px-4 rounded-lg bg-forest-800 hover:bg-forest-900 text-white font-semibold text-xs tracking-wide transition-colors disabled:opacity-50"
            >
              {encrypting ? 'Encrypting & Backing Up...' : 'Encrypt & Enter Dashboard'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateWallet;
