const { toolDeclarations, executeTool } = require('./tools');

const SYSTEM_INSTRUCTION = `You are Aura, an intelligent AI Web3 Wallet Co-Pilot integrated into a non-custodial multi-currency cryptocurrency wallet running on Ethereum Sepolia Testnet.

Your mission:
1. Help users check real-time wallet balances, gas fees, and live cryptocurrency USD valuations.
2. Search user contacts from their Address Book when they mention names (e.g. "Send 0.01 ETH to Alice").
3. Prepare transfer parameters via the 'prepareSendAction' tool so the user can review and sign with 1 click.
4. Explain transactions and network security in simple, helpful terms.

CRITICAL SECURITY RULES:
- You operate under a strict Non-Custodial Architecture: You CANNOT sign transactions or view private keys. You only prepare the transfer parameters for the client to sign locally.
- Never guess or hallucinate on-chain balances or gas prices. ALWAYS invoke the provided tools.
- Keep your answers concise, helpful, and professional.
`;

/**
 * Deterministic Fallback Agent
 * Directly matches intents and executes the real on-chain / database tools
 * Guarantees 100% uptime even if external Gemini LLM is rate-limited or offline
 */
async function runFallbackAgent(userMessage, context = {}) {
  const query = (userMessage || '').toLowerCase();
  const executedTools = [];
  let pendingAction = null;
  let reply = '';

  if (query.includes('balance') || query.includes('eth') || query.includes('how much') || query.includes('holding')) {
    const res = await executeTool('getWalletBalances', { address: context.activeWalletAddress }, context);
    executedTools.push({ tool: 'getWalletBalances', args: { address: context.activeWalletAddress }, result: res });
    if (res.error) {
      reply = `I checked your wallet, but no active wallet address is currently available. Please make sure your wallet is unlocked.`;
    } else {
      reply = `Your active wallet (${res.address.slice(0, 6)}...${res.address.slice(-4)}) holds ${res.balanceEth} ETH on Ethereum Sepolia Testnet.`;
    }
  } else if (query.includes('gas') || query.includes('fee') || query.includes('gwei')) {
    const res = await executeTool('getGasPrices', {}, context);
    executedTools.push({ tool: 'getGasPrices', args: {}, result: res });
    reply = `Current Sepolia Network Gas Price is ${res.gasPriceGwei} Gwei. A standard ETH transfer estimated gas fee is ~${res.estimatedTransferCostEth} ETH (around $${res.estimatedCostUsd}).`;
  } else if (query.includes('price') || query.includes('market') || query.includes('usd') || query.includes('rate') || query.includes('usdc') || query.includes('link')) {
    const res = await executeTool('getTokenPrices', {}, context);
    executedTools.push({ tool: 'getTokenPrices', args: {}, result: res });
    reply = `Live market prices from CoinGecko:\n• Ethereum (ETH): $${res.ETH.toLocaleString()}\n• Chainlink (LINK): $${res.LINK}\n• USD Coin (USDC): $${res.USDC}`;
  } else if (query.includes('contact') || query.includes('address book') || query.includes('who') || query.includes('friend')) {
    const res = await executeTool('searchContacts', {}, context);
    executedTools.push({ tool: 'searchContacts', args: {}, result: res });
    if (!res.contacts || res.contacts.length === 0) {
      reply = `Your address book currently has no contacts saved. You can add frequent recipients on the Contacts page.`;
    } else {
      const names = res.contacts.map((c) => `${c.name} (${c.address.slice(0, 6)}...${c.address.slice(-4)})`).join(', ');
      reply = `You have ${res.count} saved contact(s): ${names}.`;
    }
  } else if (query.includes('history') || query.includes('transaction') || query.includes('recent') || query.includes('transfer')) {
    if (query.includes('send') || query.includes('transfer to')) {
      const matchAmount = query.match(/(\d+(\.\d+)?)/);
      const amount = matchAmount ? matchAmount[1] : '0.01';
      let asset = 'ETH';
      if (query.includes('usdc')) asset = 'USDC';
      if (query.includes('link')) asset = 'LINK';

      const matchAddress = query.match(/0x[a-fA-F0-9]{40}/);
      let recipient = matchAddress ? matchAddress[0] : '';

      if (!recipient) {
        const contactsRes = await executeTool('searchContacts', {}, context);
        if (contactsRes.contacts?.length > 0) {
          for (const c of contactsRes.contacts) {
            if (query.includes(c.name.toLowerCase())) {
              recipient = c.address;
              break;
            }
          }
        }
      }

      if (recipient) {
        const actionRes = await executeTool('prepareSendAction', { asset, recipient, amount }, context);
        executedTools.push({ tool: 'prepareSendAction', args: { asset, recipient, amount }, result: actionRes });
        pendingAction = actionRes;
        reply = `I prepared a transfer of ${amount} ${asset} to ${recipient}. Click the confirmation button below to review and sign locally!`;
      } else {
        reply = `To prepare a transfer, please mention a valid 0x address or a saved contact name (e.g. "Send ${amount} ${asset} to Alice").`;
      }
    } else {
      const res = await executeTool('getRecentTransactions', { limit: 3 }, context);
      executedTools.push({ tool: 'getRecentTransactions', args: { limit: 3 }, result: res });
      if (!res.transactions || res.transactions.length === 0) {
        reply = `No recent transactions found for your account on Sepolia.`;
      } else {
        reply = `Found ${res.transactions.length} recent transaction(s). The latest was ${res.transactions[0].amount} ${res.transactions[0].asset} (${res.transactions[0].status}).`;
      }
    }
  } else {
    reply = `👋 Hi! I'm Aura, your Web3 Wallet Co-Pilot. I can check your live Sepolia balances, estimate current network gas fees, fetch live token prices, or prepare a transfer for you! What would you like to do?`;
  }

  return {
    reply,
    executedTools,
    action: pendingAction,
  };
}

/**
 * ReAct Reasoning Loop (Reason + Act + Observe)
 * Tries Gemini LLM first; gracefully falls back to deterministic tool execution
 */
async function runWalletAgent(userMessage, context = {}) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY not configured, using built-in tool reasoning engine.');
    return runFallbackAgent(userMessage, context);
  }

  // Conversation contents array in Gemini format
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: `[Active User Wallet Address: ${context.activeWalletAddress || 'None'}]\n\nUser Question: ${userMessage}`,
        },
      ],
    },
  ];

  const executedTools = [];
  let pendingAction = null;
  let maxTurns = 5;

  try {
    const candidateModels = ['gemini-2.5-flash-lite', 'gemini-flash-latest'];
    let chosenModel = candidateModels[0];

    while (maxTurns > 0) {
      maxTurns--;

      const url = `https://generativelanguage.googleapis.com/v1beta/models/${chosenModel}:generateContent?key=${apiKey}`;

      const requestBody = {
        systemInstruction: {
          parts: [{ text: SYSTEM_INSTRUCTION }],
        },
        contents,
        tools: [
          {
            functionDeclarations: toolDeclarations,
          },
        ],
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        console.warn(`Gemini (${chosenModel}) returned ${response.status}, falling back to deterministic tool engine.`);
        return runFallbackAgent(userMessage, context);
      }

      const data = await response.json();
      const candidate = data.candidates?.[0];
      const parts = candidate?.content?.parts || [];

      // Check for tool call
      const functionCallPart = parts.find((p) => p.functionCall);

      if (functionCallPart) {
        const { name, args } = functionCallPart.functionCall;
        const toolResult = await executeTool(name, args, context);

        executedTools.push({
          tool: name,
          args,
          result: toolResult,
        });

        if (toolResult?.actionType === 'SEND_REDIRECT') {
          pendingAction = toolResult;
        }

        contents.push({
          role: 'model',
          parts: [functionCallPart],
        });

        contents.push({
          role: 'function',
          parts: [
            {
              functionResponse: {
                name,
                response: { result: toolResult },
              },
            },
          ],
        });

        continue;
      }

      const textPart = parts.find((p) => p.text);
      const finalReply = textPart ? textPart.text : 'I processed your request.';

      return {
        reply: finalReply,
        executedTools,
        action: pendingAction,
      };
    }
  } catch (err) {
    console.warn('Gemini invocation error, executing fallback agent:', err.message);
    return runFallbackAgent(userMessage, context);
  }

  return runFallbackAgent(userMessage, context);
}

module.exports = {
  runWalletAgent,
  runFallbackAgent,
};
