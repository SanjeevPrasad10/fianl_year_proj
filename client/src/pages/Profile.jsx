import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useWallet } from '../context/WalletContext';

export const Profile = () => {
  const { user } = useAuth();
  const { walletAddress, encryptedKeystore } = useWallet();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!walletAddress) return;
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadKeystore = () => {
    if (!encryptedKeystore) {
      alert('No encrypted keystore found to export.');
      return;
    }
    const blob = new Blob([encryptedKeystore], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `utc--keystore--${walletAddress?.substring(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const vivaQuestions = [
    {
      q: 'Why is this wallet classified as "Non-Custodial"?',
      a: 'In a custodial service, an intermediary manages your private keys. In this non-custodial architecture, key derivation (BIP-39) and cryptographic signing happen exclusively inside the user browser. The server never has access to the user plaintext private key or recovery phrase.',
    },
    {
      q: 'What data is persisted on the backend server / MongoDB?',
      a: 'The server stores only public metadata: user name, email, transaction records (hash, from, to, amount, network, status), contacts, and the ALREADY-ENCRYPTED keystore JSON string. The server cannot decrypt the keystore without the separate wallet password.',
    },
    {
      q: 'How does the cross-device encrypted wallet backup work?',
      a: 'The browser encrypts the wallet via Scrypt key derivation and AES-128-CTR cipher using the wallet password. That ciphertext is saved to MongoDB. On a new device, the encrypted JSON is fetched and decrypted locally in the client browser with the user wallet password.',
    },
    {
      q: 'Why must the wallet password differ from the account login password?',
      a: 'Separation of concerns: Even if the server database or login session was compromised, the attacker only acquires ciphertext. Without the independent wallet password, the attacker cannot sign transactions or steal assets.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Profile Card */}
      <div className="bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder rounded-xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="font-mono text-[11px] font-bold text-forest-800 dark:text-forest-400 uppercase tracking-wider">
              Account Overview
            </span>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-0.5">
              {user?.name || 'User Profile'}
            </h2>
            <p className="text-xs text-gray-500 font-mono mt-0.5">
              Email: {user?.email}
            </p>
          </div>

          <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-forest-100 text-forest-900 dark:bg-forest-950 dark:text-forest-300 border border-forest-300 dark:border-forest-800">
            Authenticated Session
          </span>
        </div>

        {/* Wallet Address Section */}
        <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-darkborder">
          <div>
            <label className="block text-[10px] uppercase font-mono font-bold text-gray-500 mb-1">
              Public Wallet Address
            </label>
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-darkborder font-mono text-xs">
              <span className="text-gray-900 dark:text-white break-all">
                {walletAddress || 'No wallet address linked'}
              </span>
              <button
                onClick={handleCopy}
                className="text-forest-800 dark:text-forest-400 hover:underline ml-2 flex-shrink-0"
              >
                {copied ? '[Copied]' : '[Copy]'}
              </button>
            </div>
          </div>

          {/* Keystore Cloud Backup Status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-darkborder gap-3 text-xs">
            <div>
              <p className="font-bold text-gray-900 dark:text-white">
                Encrypted Keystore Backup
              </p>
              <p className="text-gray-500 text-[11px] font-mono mt-0.5">
                Stored in MongoDB as Scrypt + AES-128-CTR ciphertext
              </p>
            </div>

            <button
              onClick={handleDownloadKeystore}
              className="py-1.5 px-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-darkcard text-gray-800 dark:text-gray-200 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Download Keystore JSON
            </button>
          </div>
        </div>
      </div>

      {/* Viva Q&A Guide */}
      <div className="bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder rounded-xl p-6 sm:p-8">
        <div className="mb-6">
          <span className="font-mono text-[11px] font-bold text-forest-800 dark:text-forest-400 uppercase tracking-wider">
            Evaluation Guide
          </span>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-0.5">
            Security Architecture & Viva Defense Reference
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Core technical answers for examiners regarding non-custodial crypto architecture
          </p>
        </div>

        <div className="space-y-4">
          {vivaQuestions.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-darkborder space-y-1.5"
            >
              <h4 className="font-bold text-xs text-gray-900 dark:text-white">
                <span className="font-mono text-forest-800 dark:text-forest-400 mr-1.5">
                  Q{idx + 1}.
                </span>
                {item.q}
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 pl-6 leading-relaxed">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
