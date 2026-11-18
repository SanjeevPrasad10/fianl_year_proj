import React, { useState, useEffect } from 'react';
import { transactionsApi } from '../services/api';
import { TxItem } from '../components/TxItem';
import { useWallet } from '../context/WalletContext';

export const History = () => {
  const { walletAddress } = useWallet();
  const [transactions, setTransactions] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState('ALL');
  const [loading, setLoading] = useState(true);

  const fetchHistory = async (asset) => {
    setLoading(true);
    try {
      const res = await transactionsApi.getAll(asset === 'ALL' ? undefined : asset);
      if (res.data?.success) {
        setTransactions(res.data.transactions);
      }
    } catch (err) {
      console.warn('Failed to fetch transactions:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory(selectedAsset);
  }, [selectedAsset]);

  const assetFilters = ['ALL', 'ETH', 'USDC', 'LINK'];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="font-mono text-[11px] font-bold text-forest-800 dark:text-forest-400 uppercase tracking-wider">
            Audit Trail
          </span>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            Transaction History
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Cryptographic transactions recorded and persisted in MongoDB
          </p>
        </div>

        <button
          onClick={() => fetchHistory(selectedAsset)}
          className="self-start sm:self-auto py-1.5 px-3 rounded text-xs font-semibold border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
        >
          {loading ? 'Refreshing...' : 'Refresh History'}
        </button>
      </div>

      {/* Asset Filter Tabs */}
      <div className="flex items-center space-x-2 border-b border-gray-200 dark:border-darkborder pb-3 overflow-x-auto text-xs">
        <span className="font-mono text-gray-500 mr-2">
          Filter:
        </span>
        {assetFilters.map((asset) => (
          <button
            key={asset}
            onClick={() => setSelectedAsset(asset)}
            className={`py-1 px-3 rounded text-xs font-semibold transition-colors ${
              selectedAsset === asset
                ? 'bg-forest-800 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {asset}
          </button>
        ))}
      </div>

      {/* Transactions List */}
      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>
          ))}
        </div>
      ) : transactions.length > 0 ? (
        <div className="space-y-2">
          {transactions.map((tx) => (
            <TxItem key={tx._id || tx.txHash} tx={tx} currentAddress={walletAddress} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder rounded-xl p-12 text-center text-xs text-gray-500">
          {selectedAsset === 'ALL'
            ? 'No recorded transactions found in database.'
            : `No transactions found matching ${selectedAsset}.`}
        </div>
      )}
    </div>
  );
};

export default History;
