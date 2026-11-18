import React from 'react';
import { truncateAddress } from '../services/wallet';

export const TxItem = ({ tx, currentAddress }) => {
  const isSender = !currentAddress || tx.from.toLowerCase() === currentAddress.toLowerCase();
  const dateFormatted = new Date(tx.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const getStatusBadge = () => {
    switch (tx.status) {
      case 'confirmed':
        return (
          <span className="text-[10px] font-mono uppercase font-semibold px-1.5 py-0.5 rounded bg-forest-100 text-forest-800 dark:bg-forest-950 dark:text-forest-300 border border-forest-200 dark:border-forest-800">
            Confirmed
          </span>
        );
      case 'pending':
        return (
          <span className="text-[10px] font-mono uppercase font-semibold px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            Pending
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-mono uppercase font-semibold px-1.5 py-0.5 rounded bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
            Failed
          </span>
        );
    }
  };

  const explorerUrl = `https://sepolia.etherscan.io/tx/${tx.txHash}`;

  return (
    <div className="flex items-center justify-between p-3.5 bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder rounded-lg text-xs">
      <div className="flex items-center space-x-3">
        <span
          className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded border ${
            isSender
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'
              : 'bg-forest-50 dark:bg-forest-950 text-forest-800 dark:text-forest-300 border-forest-200 dark:border-forest-800'
          }`}
        >
          {isSender ? 'OUT' : 'IN'}
        </span>

        <div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-900 dark:text-white">
              {isSender ? 'Sent' : 'Received'} {tx.asset || 'ETH'}
            </span>
            {getStatusBadge()}
          </div>
          <p className="text-[11px] font-mono text-gray-500 mt-0.5">
            {isSender ? `To: ${truncateAddress(tx.to)}` : `From: ${truncateAddress(tx.from)}`} • {dateFormatted}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="text-right">
          <div
            className={`font-mono font-bold ${
              isSender ? 'text-gray-900 dark:text-white' : 'text-forest-700 dark:text-forest-400'
            }`}
          >
            {isSender ? '-' : '+'}
            {tx.amount} {tx.asset || 'ETH'}
          </div>
          <span className="text-[10px] uppercase font-mono text-gray-500">
            {tx.network || 'Sepolia'}
          </span>
        </div>

        <a
          href={explorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] font-semibold text-forest-800 dark:text-forest-400 hover:underline"
        >
          Explorer
        </a>
      </div>
    </div>
  );
};

export default TxItem;
