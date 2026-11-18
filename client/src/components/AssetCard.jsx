import React from 'react';
import { useNavigate } from 'react-router-dom';

export const AssetCard = ({ asset, balance, price, loading }) => {
  const navigate = useNavigate();

  const numBalance = parseFloat(balance) || 0;
  const numPrice = parseFloat(price) || 0;
  const usdValue = (numBalance * numPrice).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div className="bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder rounded-xl p-5 flex flex-col justify-between">
      {/* Top Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-forest-100 dark:bg-forest-950 text-forest-900 dark:text-forest-300 border border-forest-200 dark:border-forest-800">
              {asset.symbol}
            </span>
            <h3 className="font-semibold text-sm text-gray-900 dark:text-white">
              {asset.name}
            </h3>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] uppercase font-mono text-gray-500">Unit Price</span>
          <p className="text-xs font-mono font-medium text-gray-800 dark:text-gray-200">
            ${numPrice.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Balance Details */}
      <div className="my-5">
        {loading ? (
          <div className="space-y-2 animate-pulse">
            <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/3"></div>
          </div>
        ) : (
          <div>
            <div className="text-2xl font-mono font-bold text-gray-900 dark:text-white tracking-tight">
              {balance}{' '}
              <span className="text-xs font-sans font-semibold text-forest-700 dark:text-forest-400">
                {asset.symbol}
              </span>
            </div>
            <div className="text-xs font-mono text-gray-500 mt-0.5">
              ≈ {usdValue}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100 dark:border-darkborder">
        <button
          onClick={() => navigate(`/send?asset=${asset.symbol}`)}
          className="py-1.5 px-3 rounded text-xs font-semibold bg-gray-100 hover:bg-forest-800 hover:text-white dark:bg-gray-800 dark:hover:bg-forest-700 text-gray-800 dark:text-gray-200 transition-colors"
        >
          Send
        </button>

        <button
          onClick={() => navigate('/receive')}
          className="py-1.5 px-3 rounded text-xs font-semibold border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors"
        >
          Receive
        </button>
      </div>
    </div>
  );
};

export default AssetCard;
