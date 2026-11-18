import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useWallet } from '../context/WalletContext';

export const Receive = () => {
  const { walletAddress } = useWallet();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!walletAddress) return;
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const faucets = [
    {
      name: 'Google Cloud Web3 Faucet',
      url: 'https://cloud.google.com/application/web3/faucet/ethereum/sepolia',
      desc: 'Fast distribution of 0.05 Sepolia ETH daily without requiring logins.',
    },
    {
      name: 'Alchemy Sepolia Faucet',
      url: 'https://sepoliafaucet.com',
      desc: 'Official Alchemy faucet offering 0.5 Sepolia ETH per 24 hours.',
    },
    {
      name: 'Sepolia PoW Faucet',
      url: 'https://sepolia-faucet.pk910.de',
      desc: 'Proof-of-Work browser mining faucet to generate test ETH without authentication.',
    },
  ];

  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-6">
      <div className="bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder rounded-xl p-6 sm:p-8 text-center">
        <span className="font-mono text-[11px] font-bold text-forest-800 dark:text-forest-400 uppercase tracking-wider block">
          Inbound Transfer
        </span>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
          Receive Cryptocurrency
        </h2>
        <p className="text-xs text-gray-500 mt-1 mb-6">
          Scan the QR code or share your public address to receive Sepolia ETH and supported tokens.
        </p>

        {/* QR Code Container */}
        <div className="inline-block p-4 rounded-xl bg-white border border-gray-200 dark:border-gray-800 shadow-sm mb-6">
          {walletAddress ? (
            <QRCodeSVG
              value={walletAddress}
              size={180}
              level="H"
              includeMargin={true}
              fgColor="#052e16"
            />
          ) : (
            <div className="w-44 h-44 flex items-center justify-center text-xs text-gray-400 font-mono">
              No address available
            </div>
          )}
        </div>

        {/* Public Address */}
        <div className="mb-6">
          <label className="block text-[10px] uppercase font-mono font-bold text-gray-500 mb-1.5">
            Public Ethereum Address
          </label>
          <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-darkborder font-mono text-xs text-gray-900 dark:text-gray-100 break-all select-all">
            {walletAddress || '0x...'}
          </div>
        </div>

        {/* Copy Address Button */}
        <button
          onClick={handleCopy}
          className="w-full py-2.5 px-4 rounded-lg bg-forest-800 hover:bg-forest-900 text-white font-semibold text-xs tracking-wide transition-colors"
        >
          {copied ? 'Address Copied to Clipboard' : 'Copy Public Address'}
        </button>

        <div className="mt-4 p-2.5 rounded bg-forest-50 dark:bg-forest-950/40 border border-forest-200 dark:border-forest-900 text-forest-900 dark:text-forest-300 text-xs font-mono">
          Network: Ethereum Sepolia Testnet (Chain ID 11155111)
        </div>
      </div>

      {/* Free Testnet Faucets Guide */}
      <div className="bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder rounded-xl p-6">
        <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-1">
          Sepolia Testnet Faucets
        </h3>
        <p className="text-xs text-gray-500 mb-4">
          Testnet coins hold no real monetary value. Use these verified endpoints to claim test ETH:
        </p>

        <div className="space-y-3">
          {faucets.map((faucet, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-darkborder"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-gray-900 dark:text-white">
                  {faucet.name}
                </span>
                <a
                  href={faucet.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono font-bold text-forest-800 dark:text-forest-400 hover:underline"
                >
                  [Open Faucet]
                </a>
              </div>
              <p className="text-[11px] text-gray-500 mt-1">
                {faucet.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Receive;
