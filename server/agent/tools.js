const Contact = require('../models/Contact');
const Transaction = require('../models/Transaction');

const SEPOLIA_RPC = 'https://ethereum-sepolia-rpc.publicnode.com';

// 1. Tool Declaration Schemas (Google Gemini Function Calling standard)
const toolDeclarations = [
  {
    name: 'getWalletBalances',
    description: 'Fetch the real-time Ethereum (ETH) balance on Sepolia testnet for an address',
    parameters: {
      type: 'OBJECT',
      properties: {
        address: {
          type: 'STRING',
          description: 'The 42-character 0x hexadecimal Ethereum wallet address',
        },
      },
      required: ['address'],
    },
  },
  {
    name: 'getGasPrices',
    description: 'Fetch the current network gas price in Gwei and estimated ETH fee on Ethereum Sepolia testnet',
    parameters: {
      type: 'OBJECT',
      properties: {},
    },
  },
  {
    name: 'getTokenPrices',
    description: 'Fetch live cryptocurrency USD prices for Ethereum (ETH), Chainlink (LINK), and USD Coin (USDC)',
    parameters: {
      type: 'OBJECT',
      properties: {},
    },
  },
  {
    name: 'searchContacts',
    description: 'Search the user Address Book in MongoDB for saved recipient names or addresses',
    parameters: {
      type: 'OBJECT',
      properties: {
        query: {
          type: 'STRING',
          description: 'Name or partial address to search for',
        },
      },
    },
  },
  {
    name: 'getRecentTransactions',
    description: 'Retrieve the latest recorded transactions from the user audit history in MongoDB',
    parameters: {
      type: 'OBJECT',
      properties: {
        limit: {
          type: 'NUMBER',
          description: 'Number of recent transactions to return (e.g. 3)',
        },
      },
    },
  },
  {
    name: 'prepareSendAction',
    description: 'Prepares a transfer action for the user to confirm in the UI (does NOT sign or send private keys)',
    parameters: {
      type: 'OBJECT',
      properties: {
        asset: {
          type: 'STRING',
          description: 'The cryptocurrency asset symbol: ETH, USDC, or LINK',
        },
        recipient: {
          type: 'STRING',
          description: 'The 42-character Ethereum recipient address',
        },
        amount: {
          type: 'STRING',
          description: 'The amount to transfer, e.g. "0.01"',
        },
      },
      required: ['asset', 'recipient', 'amount'],
    },
  },
];

// 2. Tool Execution Logic
async function executeTool(name, args, context) {
  const { userId, activeWalletAddress } = context;

  switch (name) {
    case 'getWalletBalances': {
      const targetAddress = args.address || activeWalletAddress;
      if (!targetAddress) {
        return { error: 'No wallet address provided or active.' };
      }

      try {
        const response = await fetch(SEPOLIA_RPC, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'eth_getBalance',
            params: [targetAddress, 'latest'],
          }),
        });
        const data = await response.json();
        const weiHex = data.result || '0x0';
        const weiBigInt = BigInt(weiHex);
        const ethBalance = Number(weiBigInt) / 1e18;

        return {
          network: 'Ethereum Sepolia Testnet',
          address: targetAddress,
          balances: {
            ETH: ethBalance.toFixed(4),
          },
        };
      } catch (err) {
        return { error: `Failed to query Sepolia balance: ${err.message}` };
      }
    }

    case 'getGasPrices': {
      try {
        const response = await fetch(SEPOLIA_RPC, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 2,
            method: 'eth_gasPrice',
            params: [],
          }),
        });
        const data = await response.json();
        const gasWei = BigInt(data.result || '0x0');
        const gasGwei = Number(gasWei) / 1e9;
        const standardTransferEth = (Number(gasWei * 21000n) / 1e18).toFixed(6);

        return {
          network: 'Sepolia Testnet',
          gasPriceGwei: gasGwei.toFixed(2),
          standardTransferLimit: '21000',
          estimatedEthCost: standardTransferEth,
          status: gasGwei < 3 ? 'Low (Fast)' : 'Normal',
        };
      } catch (err) {
        return { error: `Failed to query gas price: ${err.message}` };
      }
    }

    case 'getTokenPrices': {
      try {
        const res = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,chainlink,usd-coin&vs_currencies=usd'
        );
        const data = await res.json();
        return {
          ETH_USD: data.ethereum?.usd || 3150.0,
          LINK_USD: data.chainlink?.usd || 18.2,
          USDC_USD: data['usd-coin']?.usd || 1.0,
          timestamp: new Date().toISOString(),
        };
      } catch {
        return {
          ETH_USD: 3150.0,
          LINK_USD: 18.2,
          USDC_USD: 1.0,
          source: 'Fallback cache',
        };
      }
    }

    case 'searchContacts': {
      try {
        const filter = { userId };
        if (args.query) {
          filter.$or = [
            { name: { $regex: args.query, $options: 'i' } },
            { address: { $regex: args.query, $options: 'i' } },
          ];
        }
        const list = await Contact.find(filter).limit(5).lean();
        return {
          count: list.length,
          contacts: list.map((c) => ({ name: c.name, address: c.address })),
        };
      } catch (err) {
        return { error: `Failed searching contacts: ${err.message}` };
      }
    }

    case 'getRecentTransactions': {
      try {
        const limit = args.limit || 3;
        const txs = await Transaction.find({ userId })
          .sort({ createdAt: -1 })
          .limit(limit)
          .lean();
        return {
          transactions: txs.map((t) => ({
            txHash: t.txHash,
            to: t.to,
            amount: t.amount,
            asset: t.asset,
            status: t.status,
            date: t.createdAt,
          })),
        };
      } catch (err) {
        return { error: `Failed fetching history: ${err.message}` };
      }
    }

    case 'prepareSendAction': {
      const isValid = /^0x[a-fA-F0-9]{40}$/.test(args.recipient);
      if (!isValid) {
        return { error: 'Invalid recipient address format. Must be a 42-character 0x Ethereum address.' };
      }

      return {
        status: 'READY_TO_CONFIRM',
        actionType: 'SEND_REDIRECT',
        asset: args.asset.toUpperCase(),
        recipient: args.recipient,
        amount: args.amount,
        url: `/send?asset=${encodeURIComponent(args.asset.toUpperCase())}&to=${encodeURIComponent(
          args.recipient
        )}&amount=${encodeURIComponent(args.amount)}`,
      };
    }

    default:
      return { error: `Unknown tool: ${name}` };
  }
}

module.exports = {
  toolDeclarations,
  executeTool,
};
