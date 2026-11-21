import { ethers } from 'ethers';
import axios from 'axios';

// Sanitize RPC URL to avoid "Failed to construct 'URL'" errors
const sanitizeRpc = (rpc) => {
  if (!rpc || typeof rpc !== 'string') return null;
  let clean = rpc.trim().replace(/\/+$/, '');
  if (!clean || clean === 'undefined' || clean === 'null') return null;
  if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
    clean = `https://${clean}`;
  }
  try {
    const parsed = new URL(clean);
    return parsed.href;
  } catch {
    return null;
  }
};

const DEFAULT_SEPOLIA_RPC = 'https://ethereum-sepolia-rpc.publicnode.com';
const envRpc = sanitizeRpc(import.meta.env.VITE_SEPOLIA_RPC);

// Default Sepolia Public RPC endpoints (with fallback redundancy)
const SEPOLIA_RPCS = [
  envRpc || DEFAULT_SEPOLIA_RPC,
  'https://rpc.sepolia.org',
  'https://1rpc.io/sepolia',
];

// Pre-configured assets on Ethereum Sepolia Testnet (clean, professional asset list)
export const SUPPORTED_ASSETS = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    isNative: true,
    decimals: 18,
    badge: 'ETH',
    contractAddress: null,
  },
  {
    symbol: 'USDC',
    name: 'USD Coin (Sepolia)',
    isNative: false,
    decimals: 6,
    badge: 'USDC',
    contractAddress: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
  },
  {
    symbol: 'LINK',
    name: 'Chainlink (Sepolia)',
    isNative: false,
    decimals: 18,
    badge: 'LINK',
    contractAddress: '0x779877A7B0D9E8603169DdbD7836e478b4624789',
  },
];

// Minimal standard ERC-20 ABI
const ERC20_ABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function balanceOf(address owner) view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'event Transfer(address indexed from, address indexed to, uint256 value)',
];

/**
 * Returns an ethers JsonRpcProvider connected to Sepolia
 */
export const getProvider = () => {
  return new ethers.JsonRpcProvider(SEPOLIA_RPCS[0]);
};

/**
 * Fetches ETH balance for a given address
 * @param {string} address
 * @returns {Promise<string>} Balance formatted in ETH
 */
export const getEthBalance = async (address) => {
  try {
    const provider = getProvider();
    const balanceWei = await provider.getBalance(address);
    return ethers.formatEther(balanceWei);
  } catch (err) {
    console.error('Error fetching ETH balance:', err);
    return '0.0';
  }
};

/**
 * Fetches ERC-20 token balance for a given address
 * @param {string} tokenAddress
 * @param {string} userAddress
 * @param {number} decimals
 * @returns {Promise<string>} Formatted token balance
 */
export const getTokenBalance = async (tokenAddress, userAddress, decimals = 18) => {
  try {
    const provider = getProvider();
    const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
    const balance = await contract.balanceOf(userAddress);
    return ethers.formatUnits(balance, decimals);
  } catch (err) {
    console.warn(`Error fetching token balance (${tokenAddress}):`, err.message);
    return '0.0';
  }
};

/**
 * Estimates transaction gas fee
 * @param {string} from
 * @param {string} to
 * @param {string} amount
 * @param {boolean} isToken
 * @param {string} [tokenAddress]
 * @param {number} [decimals]
 * @returns {Promise<{ gasLimit: bigint, gasPrice: bigint, feeEth: string, feeGwei: string }>}
 */
export const estimateGasFee = async (from, to, amount, isToken = false, tokenAddress = null, decimals = 18) => {
  const provider = getProvider();
  const feeData = await provider.getFeeData();
  const gasPrice = feeData.gasPrice || ethers.parseUnits('20', 'gwei');

  let gasLimit;
  if (!isToken) {
    gasLimit = 21000n;
  } else {
    try {
      const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
      const parsedAmount = ethers.parseUnits(amount || '0', decimals);
      gasLimit = await contract.transfer.estimateGas(to, parsedAmount, { from });
      gasLimit = (gasLimit * 120n) / 100n;
    } catch {
      gasLimit = 65000n;
    }
  }

  const totalFeeWei = gasLimit * gasPrice;
  const feeEth = ethers.formatEther(totalFeeWei);
  const feeGwei = ethers.formatUnits(gasPrice, 'gwei');

  return {
    gasLimit,
    gasPrice,
    feeEth,
    feeGwei,
  };
};

/**
 * Sends native ETH to recipient
 * @param {ethers.Signer} signer
 * @param {string} to
 * @param {string} amount
 * @returns {Promise<ethers.TransactionResponse>}
 */
export const sendEth = async (signer, to, amount) => {
  const tx = await signer.sendTransaction({
    to,
    value: ethers.parseEther(amount),
  });
  return tx;
};

/**
 * Sends ERC-20 token to recipient
 * @param {ethers.Signer} signer
 * @param {string} tokenAddress
 * @param {string} to
 * @param {string} amount
 * @param {number} decimals
 * @returns {Promise<ethers.TransactionResponse>}
 */
export const sendToken = async (signer, tokenAddress, to, amount, decimals = 18) => {
  const contract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
  const parsedAmount = ethers.parseUnits(amount, decimals);
  const tx = await contract.transfer(to, parsedAmount);
  return tx;
};

/**
 * Fetches live USD prices for ETH, USDC, LINK via CoinGecko with offline fallback
 * @returns {Promise<{ ETH: number, USDC: number, LINK: number }>}
 */
export const fetchLivePrices = async () => {
  const fallback = { ETH: 3100.5, USDC: 1.0, LINK: 14.8 };
  try {
    const res = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,usd-coin,chainlink&vs_currencies=usd',
      { timeout: 4000 }
    );
    return {
      ETH: res.data?.ethereum?.usd || fallback.ETH,
      USDC: res.data?.['usd-coin']?.usd || fallback.USDC,
      LINK: res.data?.chainlink?.usd || fallback.LINK,
    };
  } catch (err) {
    console.warn('CoinGecko price fetch warning (using fallback):', err.message);
    return fallback;
  }
};
