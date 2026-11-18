import { ethers } from 'ethers';

/**
 * Creates a brand new random HD wallet with 12-word mnemonic phrase
 * @returns {Promise<{ wallet: ethers.HDNodeWallet, mnemonic: string, address: string, privateKey: string }>}
 */
export const generateNewWallet = async () => {
  const wallet = ethers.HDNodeWallet.createRandom();
  return {
    wallet,
    mnemonic: wallet.mnemonic.phrase,
    address: wallet.address,
    privateKey: wallet.privateKey,
  };
};

/**
 * Restores a wallet from a 12 or 24 word mnemonic phrase
 * @param {string} phrase
 * @returns {Promise<{ wallet: ethers.HDNodeWallet, mnemonic: string, address: string, privateKey: string }>}
 */
export const restoreFromMnemonic = async (phrase) => {
  const cleanPhrase = phrase.trim().toLowerCase().replace(/\s+/g, ' ');
  if (!ethers.Mnemonic.isValidMnemonic(cleanPhrase)) {
    throw new Error('Invalid recovery phrase. Please check the 12 words and spelling.');
  }

  const wallet = ethers.HDNodeWallet.fromPhrase(cleanPhrase);
  return {
    wallet,
    mnemonic: cleanPhrase,
    address: wallet.address,
    privateKey: wallet.privateKey,
  };
};

/**
 * Restores a wallet from a private key hex string
 * @param {string} privateKey
 * @returns {Promise<{ wallet: ethers.Wallet, address: string, privateKey: string }>}
 */
export const restoreFromPrivateKey = async (privateKey) => {
  let cleanKey = privateKey.trim();
  if (!cleanKey.startsWith('0x')) {
    cleanKey = '0x' + cleanKey;
  }

  if (!/^0x[a-fA-F0-9]{64}$/.test(cleanKey)) {
    throw new Error('Invalid private key format. Must be a 64-character hexadecimal string.');
  }

  const wallet = new ethers.Wallet(cleanKey);
  return {
    wallet,
    address: wallet.address,
    privateKey: wallet.privateKey,
  };
};

/**
 * Encrypts a wallet using a password into a Web3 JSON keystore string
 * @param {ethers.Wallet | ethers.HDNodeWallet} wallet
 * @param {string} password
 * @param {function} [onProgress]
 * @returns {Promise<string>} Stringified encrypted JSON keystore
 */
export const encryptKeystore = async (wallet, password, onProgress) => {
  if (!password || password.length < 6) {
    throw new Error('Wallet password must be at least 6 characters long.');
  }
  // wallet.encrypt returns a JSON string
  const jsonKeystore = await wallet.encrypt(password, onProgress);
  return jsonKeystore;
};

/**
 * Decrypts a Web3 JSON keystore using the wallet password
 * @param {string} jsonKeystore
 * @param {password} password
 * @param {function} [onProgress]
 * @returns {Promise<ethers.Wallet>}
 */
export const decryptKeystore = async (jsonKeystore, password, onProgress) => {
  if (!jsonKeystore) {
    throw new Error('No encrypted keystore found to decrypt.');
  }
  try {
    const wallet = await ethers.Wallet.fromEncryptedJson(jsonKeystore, password, onProgress);
    return wallet;
  } catch (err) {
    if (err.message && err.message.toLowerCase().includes('password')) {
      throw new Error('Incorrect wallet password. Please try again.');
    }
    throw new Error('Failed to decrypt wallet. Please verify your password.');
  }
};

/**
 * Checks if a string is a valid Ethereum address
 * @param {string} address
 * @returns {boolean}
 */
export const isValidAddress = (address) => {
  if (!address || typeof address !== 'string') return false;
  return ethers.isAddress(address.trim());
};

/**
 * Formats an Ethereum address for UI display (e.g., 0x1234...5678)
 * @param {string} address
 * @param {number} startChars
 * @param {number} endChars
 * @returns {string}
 */
export const truncateAddress = (address, startChars = 6, endChars = 4) => {
  if (!address) return '';
  if (address.length <= startChars + endChars) return address;
  return `${address.substring(0, startChars)}...${address.substring(address.length - endChars)}`;
};
