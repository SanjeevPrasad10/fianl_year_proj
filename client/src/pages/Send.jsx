import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { isValidAddress, truncateAddress } from '../services/wallet';
import {
  SUPPORTED_ASSETS,
  estimateGasFee,
  sendEth,
  sendToken,
} from '../services/chain';
import { contactsApi, transactionsApi } from '../services/api';

export const Send = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { walletAddress, signer, isLocked, balances, prices, refreshBalances } = useWallet();

  const [selectedAsset, setSelectedAsset] = useState(() => {
    const queryAsset = searchParams.get('asset');
    return queryAsset ? queryAsset.toUpperCase() : 'ETH';
  });

  const [recipient, setRecipient] = useState(() => {
    return searchParams.get('recipient') || searchParams.get('to') || '';
  });
  const [amount, setAmount] = useState(() => {
    return searchParams.get('amount') || searchParams.get('value') || '';
  });
  const [contacts, setContacts] = useState([]);
  const [showContactsDropdown, setShowContactsDropdown] = useState(false);

  const [feeData, setFeeData] = useState(null);
  const [estimatingFee, setEstimatingFee] = useState(false);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [sending, setSending] = useState(false);
  const [txSuccess, setTxSuccess] = useState(null);
  const [error, setError] = useState('');

  // Sync with URL query parameters when navigating from AI Copilot or other pages
  useEffect(() => {
    const queryAsset = searchParams.get('asset');
    const queryRecipient = searchParams.get('recipient') || searchParams.get('to');
    const queryAmount = searchParams.get('amount') || searchParams.get('value');

    if (queryRecipient || queryAmount) {
      setTxSuccess(null);
    }
    if (queryAsset) setSelectedAsset(queryAsset.toUpperCase());
    if (queryRecipient) setRecipient(queryRecipient);
    if (queryAmount) setAmount(queryAmount);
  }, [searchParams]);

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const res = await contactsApi.getAll();
        if (res.data?.success) {
          setContacts(res.data.contacts);
        }
      } catch (err) {
        console.warn('Failed to load contacts:', err.message);
      }
    };
    loadContacts();
  }, []);

  const currentAsset = SUPPORTED_ASSETS.find((a) => a.symbol === selectedAsset) || SUPPORTED_ASSETS[0];
  const currentBalance = parseFloat(balances[selectedAsset]) || 0;
  const assetPrice = parseFloat(prices[selectedAsset]) || 0;
  const ethPrice = parseFloat(prices.ETH) || 3100;

  useEffect(() => {
    const runEstimate = async () => {
      if (!isValidAddress(recipient) || !walletAddress) {
        setFeeData(null);
        return;
      }
      setEstimatingFee(true);
      try {
        const est = await estimateGasFee(
          walletAddress,
          recipient,
          amount || '0.001',
          !currentAsset.isNative,
          currentAsset.contractAddress,
          currentAsset.decimals
        );
        setFeeData(est);
      } catch (err) {
        console.warn('Gas estimation error:', err.message);
      } finally {
        setEstimatingFee(false);
      }
    };

    const timer = setTimeout(runEstimate, 500);
    return () => clearTimeout(timer);
  }, [recipient, amount, selectedAsset, walletAddress]);

  const handleSetMax = () => {
    if (currentAsset.isNative) {
      const maxEth = Math.max(0, currentBalance - 0.002);
      setAmount(maxEth.toFixed(4));
    } else {
      setAmount(currentBalance.toString());
    }
  };

  const handleReviewTransaction = (e) => {
    e.preventDefault();
    setError('');

    if (isLocked || !signer) {
      navigate('/unlock', { state: { from: { pathname: '/send' } } });
      return;
    }

    if (!isValidAddress(recipient)) {
      setError('Please enter a valid Ethereum address format.');
      return;
    }

    if (recipient.toLowerCase() === walletAddress.toLowerCase()) {
      setError('Cannot transfer cryptocurrency to your own address.');
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError('Please specify a positive amount.');
      return;
    }

    if (numAmount > currentBalance) {
      setError(`Insufficient ${selectedAsset} balance. Available: ${currentBalance} ${selectedAsset}.`);
      return;
    }

    setShowConfirmModal(true);
  };

  const handleConfirmAndSend = async () => {
    setSending(true);
    setError('');

    try {
      let txResponse;
      if (currentAsset.isNative) {
        txResponse = await sendEth(signer, recipient, amount);
      } else {
        txResponse = await sendToken(
          signer,
          currentAsset.contractAddress,
          recipient,
          amount,
          currentAsset.decimals
        );
      }

      try {
        await transactionsApi.save({
          txHash: txResponse.hash,
          from: walletAddress,
          to: recipient,
          amount: amount,
          asset: selectedAsset,
          network: 'sepolia',
          status: 'confirmed',
        });
      } catch (saveErr) {
        console.warn('Failed to record transaction to database:', saveErr.message);
      }

      setTxSuccess({ hash: txResponse.hash });
      setShowConfirmModal(false);
      refreshBalances();
    } catch (err) {
      setError(err.reason || err.message || 'Transaction broadcast failed.');
      setShowConfirmModal(false);
    } finally {
      setSending(false);
    }
  };

  const estimatedFeeUsd = feeData
    ? (parseFloat(feeData.feeEth) * ethPrice).toFixed(3)
    : '0.00';

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      {txSuccess ? (
        <div className="bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder rounded-xl p-8 text-center">
          <span className="font-mono text-xs font-bold text-forest-800 dark:text-forest-400 uppercase tracking-wider block">
            [TRANSACTION BROADCAST]
          </span>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            Transfer Submitted
          </h2>
          <p className="text-xs text-gray-500 mt-1 mb-6">
            The signed transaction has been broadcast to the Ethereum Sepolia network.
          </p>

          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-darkborder text-left space-y-2 mb-6 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-gray-500">Asset:</span>
              <span className="font-bold text-gray-900 dark:text-white">
                {amount} {selectedAsset}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Recipient:</span>
              <span className="text-gray-900 dark:text-white">
                {truncateAddress(recipient, 8, 6)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Tx Hash:</span>
              <span className="font-bold text-forest-800 dark:text-forest-400">
                {truncateAddress(txSuccess.hash, 8, 6)}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <a
              href={`https://sepolia.etherscan.io/tx/${txSuccess.hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 px-4 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 text-xs font-semibold text-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              View on Etherscan
            </a>

            <button
              onClick={() => {
                setTxSuccess(null);
                setAmount('');
                setRecipient('');
                navigate('/');
              }}
              className="flex-1 py-2 px-4 rounded-lg bg-forest-800 hover:bg-forest-900 text-white text-xs font-semibold transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder rounded-xl p-6 sm:p-8">
          <div className="mb-6">
            <span className="font-mono text-[11px] font-bold text-forest-800 dark:text-forest-400 uppercase tracking-wider">
              Transfer Asset
            </span>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              Send Cryptocurrency
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Broadcast native ETH or ERC-20 tokens on Ethereum Sepolia Testnet
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-300 text-xs font-mono">
              Error: {error}
            </div>
          )}

          <form onSubmit={handleReviewTransaction} className="space-y-4">
            {/* Asset Selector */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Select Asset
              </label>
              <div className="grid grid-cols-3 gap-2">
                {SUPPORTED_ASSETS.map((asset) => (
                  <button
                    key={asset.symbol}
                    type="button"
                    onClick={() => setSelectedAsset(asset.symbol)}
                    className={`p-2.5 rounded-lg border text-left transition-colors ${
                      selectedAsset === asset.symbol
                        ? 'border-forest-800 bg-forest-50 dark:bg-forest-950/40'
                        : 'border-gray-200 dark:border-darkborder hover:bg-gray-50 dark:hover:bg-gray-900'
                    }`}
                  >
                    <span className="font-mono font-bold text-xs text-gray-900 dark:text-white block">
                      {asset.symbol}
                    </span>
                    <span className="text-[11px] font-mono text-gray-500 block truncate">
                      {balances[asset.symbol] || '0.00'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recipient */}
            <div className="relative">
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Recipient Address
                </label>
                {contacts.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowContactsDropdown(!showContactsDropdown)}
                    className="text-xs font-semibold text-forest-800 dark:text-forest-400 hover:underline"
                  >
                    Address Book ({contacts.length})
                  </button>
                )}
              </div>

              <input
                type="text"
                required
                value={recipient}
                onChange={(e) => {
                  setRecipient(e.target.value.trim());
                  setShowContactsDropdown(false);
                }}
                placeholder="0x..."
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-darkborder bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-xs font-mono focus:ring-1 focus:ring-forest-700 focus:outline-none"
              />

              {showContactsDropdown && (
                <div className="absolute z-20 mt-1 w-full bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder rounded-lg shadow-lg max-h-48 overflow-y-auto p-1 text-xs">
                  <div className="px-3 py-1 font-mono text-[10px] uppercase text-gray-400">
                    Contacts
                  </div>
                  {contacts.map((contact) => (
                    <button
                      key={contact._id}
                      type="button"
                      onClick={() => {
                        setRecipient(contact.address);
                        setShowContactsDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-between"
                    >
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {contact.name}
                      </span>
                      <span className="font-mono text-gray-500 text-[11px]">
                        {truncateAddress(contact.address, 6, 4)}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Amount */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Amount
                </label>
                <span className="text-xs font-mono text-gray-500">
                  Balance: {currentBalance} {selectedAsset}
                </span>
              </div>

              <div className="relative">
                <input
                  type="number"
                  step="any"
                  min="0"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-3 pr-14 py-2 rounded-lg border border-gray-300 dark:border-darkborder bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-xs font-mono focus:ring-1 focus:ring-forest-700 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleSetMax}
                  className="absolute inset-y-1 right-1.5 px-2 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-mono text-[11px] font-bold"
                >
                  MAX
                </button>
              </div>

              {amount && (
                <p className="text-[11px] font-mono text-gray-500 mt-1">
                  ≈ {((parseFloat(amount) || 0) * assetPrice).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </p>
              )}
            </div>

            {/* Gas Fee Box */}
            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-darkborder text-xs font-mono space-y-1">
              <div className="flex justify-between text-gray-500">
                <span>Estimated Gas:</span>
                <span className="text-gray-800 dark:text-gray-200 font-medium">
                  {estimatingFee ? (
                    'Calculating...'
                  ) : feeData ? (
                    `~${parseFloat(feeData.feeEth).toFixed(5)} ETH ($${estimatedFeeUsd})`
                  ) : (
                    'Enter address to estimate'
                  )}
                </span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Gas Price:</span>
                <span className="text-gray-800 dark:text-gray-200 font-medium">
                  {feeData ? `${parseFloat(feeData.feeGwei).toFixed(2)} Gwei` : '—'}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-2.5 px-4 rounded-lg bg-forest-800 hover:bg-forest-900 text-white font-semibold text-xs tracking-wide transition-colors"
            >
              Review Transaction
            </button>
          </form>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Confirm Transaction
            </h3>
            <p className="text-xs text-gray-500">
              Please review all transfer details before signing. Transactions on the blockchain cannot be cancelled or reversed.
            </p>

            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-darkborder space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-gray-500">Amount:</span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {amount} {selectedAsset}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">To:</span>
                <span className="text-gray-900 dark:text-white">
                  {truncateAddress(recipient, 8, 6)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Network:</span>
                <span className="font-bold text-forest-800 dark:text-forest-400">Sepolia</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Estimated Gas:</span>
                <span className="text-gray-900 dark:text-white">
                  {feeData ? `${parseFloat(feeData.feeEth).toFixed(5)} ETH` : 'Dynamic'}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                disabled={sending}
                className="flex-1 py-2 px-3 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 text-xs font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmAndSend}
                disabled={sending}
                className="flex-1 py-2 px-3 rounded-lg bg-forest-800 hover:bg-forest-900 text-white text-xs font-semibold transition-colors disabled:opacity-50"
              >
                {sending ? 'Signing & Sending...' : 'Sign & Broadcast'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Send;
