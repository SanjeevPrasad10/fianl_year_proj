import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { decryptKeystore } from '../services/wallet';
import {
  getProvider,
  getEthBalance,
  getTokenBalance,
  fetchLivePrices,
  SUPPORTED_ASSETS,
} from '../services/chain';
import { walletApi } from '../services/api';
import { useAuth } from './AuthContext';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const { user, token, updateUser } = useAuth();

  // Local keystore & address
  const [walletAddress, setWalletAddress] = useState(() => localStorage.getItem('cw_wallet_address') || '');
  const [encryptedKeystore, setEncryptedKeystore] = useState(() => localStorage.getItem('cw_keystore') || '');

  // Active in-memory signer (NEVER stored on disk or server!)
  const [signer, setSigner] = useState(null);
  const [isLocked, setIsLocked] = useState(true);

  // Balances & live prices
  const [balances, setBalances] = useState({
    ETH: '0.0000',
    USDC: '0.00',
    LINK: '0.00',
  });
  const [prices, setPrices] = useState({
    ETH: 3100.0,
    USDC: 1.0,
    LINK: 14.8,
  });
  const [loadingBalances, setLoadingBalances] = useState(false);

  // Dark mode theme
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('cw_theme') || 'dark';
  });

  // Apply dark mode class to <html>
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('cw_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Sync address & keystore with localStorage
  useEffect(() => {
    if (walletAddress) {
      localStorage.setItem('cw_wallet_address', walletAddress);
    } else {
      localStorage.removeItem('cw_wallet_address');
    }
  }, [walletAddress]);

  useEffect(() => {
    if (encryptedKeystore) {
      localStorage.setItem('cw_keystore', encryptedKeystore);
    } else {
      localStorage.removeItem('cw_keystore');
    }
  }, [encryptedKeystore]);

  // Lock wallet when user logs out
  useEffect(() => {
    const handleLogout = () => {
      lockWallet();
      setWalletAddress('');
      setEncryptedKeystore('');
      localStorage.removeItem('cw_wallet_address');
      localStorage.removeItem('cw_keystore');
    };
    window.addEventListener('cw_auth_logout', handleLogout);
    return () => window.removeEventListener('cw_auth_logout', handleLogout);
  }, []);

  // Check if wallet backup exists on backend if local keystore is missing
  useEffect(() => {
    const syncBackupFromBackend = async () => {
      if (token && user?.hasWallet && !encryptedKeystore) {
        try {
          const res = await walletApi.getBackup();
          if (res.data?.success && res.data.wallet) {
            setWalletAddress(res.data.wallet.address);
            setEncryptedKeystore(res.data.wallet.encryptedKeystore);
          }
        } catch (err) {
          console.warn('Could not restore wallet backup from server:', err.message);
        }
      }
    };
    syncBackupFromBackend();
  }, [token, user?.hasWallet, encryptedKeystore]);

  // Fetch live prices on mount and every 60s
  useEffect(() => {
    let isMounted = true;
    const loadPrices = async () => {
      const live = await fetchLivePrices();
      if (isMounted) setPrices(live);
    };
    loadPrices();
    const interval = setInterval(loadPrices, 60000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Fetch balances for wallet address
  const refreshBalances = useCallback(async () => {
    if (!walletAddress) return;
    setLoadingBalances(true);
    try {
      const ethBal = await getEthBalance(walletAddress);

      // ERC20 balances
      const usdcAsset = SUPPORTED_ASSETS.find((a) => a.symbol === 'USDC');
      const linkAsset = SUPPORTED_ASSETS.find((a) => a.symbol === 'LINK');

      const usdcBal = await getTokenBalance(
        usdcAsset.contractAddress,
        walletAddress,
        usdcAsset.decimals
      );
      const linkBal = await getTokenBalance(
        linkAsset.contractAddress,
        walletAddress,
        linkAsset.decimals
      );

      setBalances({
        ETH: Number(ethBal).toFixed(4),
        USDC: Number(usdcBal).toFixed(2),
        LINK: Number(linkBal).toFixed(2),
      });
    } catch (err) {
      console.error('Failed to load balances:', err);
    } finally {
      setLoadingBalances(false);
    }
  }, [walletAddress]);

  // Trigger balance fetch when walletAddress changes
  useEffect(() => {
    if (walletAddress) {
      refreshBalances();
    }
  }, [walletAddress, refreshBalances]);

  /**
   * Unlock wallet with wallet password:
   * Decrypts the stored encryptedKeystore in the browser and attaches the signer to Sepolia provider
   */
  const unlockWallet = async (password, onProgress) => {
    if (!encryptedKeystore) {
      throw new Error('No encrypted wallet found. Please create or import a wallet first.');
    }
    const decryptedWallet = await decryptKeystore(encryptedKeystore, password, onProgress);
    const provider = getProvider();
    const connectedSigner = decryptedWallet.connect(provider);

    setSigner(connectedSigner);
    setWalletAddress(connectedSigner.address);
    setIsLocked(false);
    return connectedSigner;
  };

  /**
   * Locks the wallet by clearing the in-memory signer
   */
  const lockWallet = () => {
    setSigner(null);
    setIsLocked(true);
  };

  /**
   * Saves newly created or imported wallet:
   * Sets local state, saves to server backup, and marks user as hasWallet
   */
  const saveAndBackupWallet = async (address, keystoreJson, activeWallet) => {
    setWalletAddress(address);
    setEncryptedKeystore(keystoreJson);

    if (activeWallet) {
      const provider = getProvider();
      const connected = activeWallet.connect(provider);
      setSigner(connected);
      setIsLocked(false);
    }

    // Backup encrypted keystore to server database
    try {
      await walletApi.saveBackup(address, keystoreJson);
      updateUser({ walletAddress: address, hasWallet: true });
    } catch (err) {
      console.warn('Failed to backup wallet to server database:', err.message);
    }
  };

  const hasWallet = !!(encryptedKeystore || walletAddress || user?.hasWallet);

  return (
    <WalletContext.Provider
      value={{
        walletAddress,
        encryptedKeystore,
        signer,
        isLocked,
        hasWallet,
        balances,
        prices,
        loadingBalances,
        theme,
        toggleTheme,
        unlockWallet,
        lockWallet,
        saveAndBackupWallet,
        refreshBalances,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
