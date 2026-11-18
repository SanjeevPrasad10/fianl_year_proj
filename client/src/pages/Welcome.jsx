import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center space-y-3 mb-10">
        <span className="inline-block text-[11px] font-mono font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded bg-forest-100 text-forest-900 dark:bg-forest-950 dark:text-forest-300 border border-forest-300 dark:border-forest-800">
          Non-Custodial Architecture
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Crypto Wallet Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
          Client-side key derivation and non-custodial transaction execution on Ethereum Sepolia Testnet.
          Private keys remain on this device and are never transmitted in plaintext.
        </p>
      </div>

      {/* Choice Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {/* Create Card */}
        <div className="bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder rounded-xl p-6 flex flex-col justify-between">
          <div className="space-y-3">
            <span className="font-mono text-xs font-bold text-forest-800 dark:text-forest-400">
              [NEW WALLET]
            </span>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Create New Wallet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
              Generates a cryptographically random 12-word BIP-39 mnemonic recovery phrase and encrypts the keystore with a local password.
            </p>
            <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-darkborder font-mono">
              <p>• BIP-39 12-word standard phrase</p>
              <p>• Scrypt key derivation function</p>
              <p>• Client-side encrypted backup</p>
            </div>
          </div>

          <button
            onClick={() => navigate('/create-wallet')}
            className="mt-6 w-full py-2.5 px-4 rounded-lg bg-forest-800 hover:bg-forest-900 text-white font-semibold text-xs tracking-wide transition-colors"
          >
            Create Wallet
          </button>
        </div>

        {/* Import Card */}
        <div className="bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder rounded-xl p-6 flex flex-col justify-between">
          <div className="space-y-3">
            <span className="font-mono text-xs font-bold text-gray-700 dark:text-gray-300">
              [RESTORE WALLET]
            </span>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Import Existing Wallet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
              Restores an existing wallet using your 12-word recovery phrase or raw 64-character private key hex string.
            </p>
            <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-darkborder font-mono">
              <p>• Import via 12-word mnemonic</p>
              <p>• Import via raw private key</p>
              <p>• Re-encrypt with local password</p>
            </div>
          </div>

          <button
            onClick={() => navigate('/import-wallet')}
            className="mt-6 w-full py-2.5 px-4 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white font-semibold text-xs tracking-wide transition-colors"
          >
            Import Wallet
          </button>
        </div>
      </div>

      {/* Security Architecture Box */}
      <div className="rounded-xl p-5 bg-forest-50 dark:bg-forest-950/40 border border-forest-200 dark:border-forest-900 text-xs text-forest-900 dark:text-forest-200 space-y-1">
        <span className="font-mono font-bold uppercase tracking-wider text-[11px] block">
          Security Architecture Specification
        </span>
        <p className="leading-relaxed">
          The server stores only public metadata (wallet address, transaction hashes, contacts) and the browser-encrypted JSON keystore.
          Signing happens exclusively in the browser using the in-memory signer. Use a distinct password for wallet encryption than for account login.
        </p>
      </div>
    </div>
  );
};

export default Welcome;
