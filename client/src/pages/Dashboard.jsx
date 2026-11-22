import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { truncateAddress } from '../services/wallet';
import { SUPPORTED_ASSETS } from '../services/chain';
import { AssetCard } from '../components/AssetCard';
import { TxItem } from '../components/TxItem';
import { transactionsApi } from '../services/api';

export const Dashboard = () => {
  const navigate = useNavigate();
  const {
    walletAddress,
    balances,
    prices,
    loadingBalances,
    refreshBalances,
    isLocked,
    lockWallet,
  } = useWallet();

  const [copied, setCopied] = useState(false);
  const [recentTxs, setRecentTxs] = useState([]);
  const [loadingTxs, setLoadingTxs] = useState(false);

  const handleCopy = () => {
    if (!walletAddress) return;
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const fetchRecentTxs = async () => {
      setLoadingTxs(true);
      try {
        const res = await transactionsApi.getAll();
        if (res.data?.success) {
          setRecentTxs(res.data.transactions.slice(0, 3));
        }
      } catch (err) {
        console.warn('Could not load recent txs:', err.message);
      } finally {
        setLoadingTxs(false);
      }
    };
    fetchRecentTxs();
  }, []);

  const totalUsdValue = SUPPORTED_ASSETS.reduce((acc, asset) => {
    const bal = parseFloat(balances[asset.symbol]) || 0;
    const price = parseFloat(prices[asset.symbol]) || 0;
    return acc + bal * price;
  }, 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  const explorerAddressUrl = `https://sepolia.etherscan.io/address/${walletAddress}`;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Top Address & Network Bar */}
      <div className="bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-mono font-bold text-gray-500">
              Active Wallet Address
            </span>
            <div className="flex items-center space-x-2 mt-0.5">
              <span className="font-mono text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
                {truncateAddress(walletAddress, 10, 8)}
              </span>
              <button
                onClick={handleCopy}
                className="text-[11px] font-mono text-forest-800 dark:text-forest-400 hover:underline px-1 py-0.5 rounded"
              >
                {copied ? '[Copied]' : '[Copy]'}
              </button>
              <a
                href={explorerAddressUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-mono text-gray-500 hover:text-gray-900 dark:hover:text-white underline"
              >
                [Explorer]
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 w-full md:w-auto justify-end">
          <button
            onClick={refreshBalances}
            disabled={loadingBalances}
            className="py-1 px-3 rounded text-xs font-semibold border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
          >
            {loadingBalances ? 'Refreshing...' : 'Refresh'}
          </button>

          {!isLocked ? (
            <button
              onClick={() => {
                lockWallet();
                navigate('/unlock');
              }}
              className="py-1 px-3 rounded text-xs font-semibold border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              Lock Wallet
            </button>
          ) : (
            <button
              onClick={() => navigate('/unlock')}
              className="py-1 px-3 rounded text-xs font-semibold bg-forest-800 hover:bg-forest-900 text-white"
            >
              Unlock
            </button>
          )}
        </div>
      </div>

      {/* Portfolio Valuation Header (Advanced Modern Web3 Card) */}
      <div className="rounded-2xl bg-gradient-to-br from-forest-950 via-[#072a17] to-[#04190e] border border-emerald-500/30 p-6 sm:p-8 text-white shadow-xl shadow-emerald-950/25 relative overflow-hidden backdrop-blur-xl">
        <div className="absolute -right-20 -top-20 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] uppercase font-mono font-semibold tracking-wider text-emerald-300">
                Total Portfolio Valuation (USD)
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <div className="text-3xl sm:text-4xl font-mono font-bold tracking-tight mt-1 text-white">
              {totalUsdValue}
            </div>
            <p className="text-xs text-emerald-300/80 mt-1">
              Live valuation aggregated from CoinGecko price feed
            </p>
          </div>

          <div className="flex items-center space-x-2.5">
            <button
              onClick={() => navigate('/send')}
              className="py-2.5 px-6 rounded-xl bg-white hover:bg-emerald-50 text-forest-950 font-bold text-xs tracking-wide shadow-md transition-all active:scale-95 cursor-pointer"
            >
              Send
            </button>
            <button
              onClick={() => navigate('/receive')}
              className="py-2.5 px-6 rounded-xl border border-emerald-500/40 hover:bg-emerald-950/60 text-white font-bold text-xs tracking-wide transition-all active:scale-95 cursor-pointer backdrop-blur-sm"
            >
              Receive
            </button>
          </div>
        </div>
      </div>

      {/* Crypto Assets Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-gray-900 dark:text-white">
            Available Assets
          </h2>
          <span className="text-xs font-mono text-gray-500">
            Sepolia Testnet (Chain ID: 11155111)
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {SUPPORTED_ASSETS.map((asset) => (
            <AssetCard
              key={asset.symbol}
              asset={asset}
              balance={balances[asset.symbol] || '0.00'}
              price={prices[asset.symbol] || 0}
              loading={loadingBalances}
            />
          ))}
        </div>
      </div>

      {/* Testnet Faucet Note */}
      <div className="rounded-xl p-4 bg-forest-50 dark:bg-forest-950/40 border border-forest-200 dark:border-forest-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div>
          <span className="font-bold text-forest-900 dark:text-forest-200">
            Need free Sepolia ETH for testing?
          </span>
          <p className="text-forest-800/80 dark:text-forest-300/80 mt-0.5">
            Testnet Ether is free and used to pay for transaction gas fees on Sepolia.
          </p>
        </div>
        <a
          href="https://cloud.google.com/application/web3/faucet/ethereum/sepolia"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs font-bold text-forest-800 dark:text-forest-400 hover:underline flex-shrink-0"
        >
          [Open Google Faucet]
        </a>
      </div>

      {/* Recent Activity */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-gray-900 dark:text-white">
            Recent Activity
          </h2>
          <Link
            to="/history"
            className="text-xs font-semibold text-forest-800 dark:text-forest-400 hover:underline"
          >
            View All Transactions →
          </Link>
        </div>

        {loadingTxs ? (
          <div className="space-y-2">
            {[1, 2].map((i) => (
              <div key={i} className="h-14 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : recentTxs.length > 0 ? (
          <div className="space-y-2">
            {recentTxs.map((tx) => (
              <TxItem key={tx._id || tx.txHash} tx={tx} currentAddress={walletAddress} />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder rounded-xl p-8 text-center text-xs text-gray-500">
            No transactions recorded yet. Transfers broadcast from this wallet will appear here.
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
