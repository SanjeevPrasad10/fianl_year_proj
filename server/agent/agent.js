const { toolDeclarations, executeTool } = require('./tools');

const MODEL_NAME = 'gemini-3.5-flash-lite';

const SYSTEM_INSTRUCTION = `You are Aura, an intelligent and conversational AI Web3 Wallet Co-Pilot integrated into a non-custodial cryptocurrency wallet on Ethereum Sepolia Testnet.

PERSONALITY & COMMUNICATION STYLE:
- Warm, professional, helpful, and natural. Speak like a knowledgeable Web3 peer.
- If the user greets you ("hello", "hi", "hey"), greet them back warmly and dynamically, offering assistance.
- If the user asks general questions about crypto, blockchain, or non-custodial security, explain clearly in accessible terms.
- If the user asks you to do something you cannot do (e.g. sign a transaction, reveal or manage private keys, delete a blockchain, hack a wallet, or perform non-wallet tasks), explain politely and dynamically why you cannot do it, emphasizing your non-custodial security boundaries.

YOUR 6 AVAILABLE TOOLS:
1. getWalletBalances: Fetch real-time Ethereum (ETH) balance for an address on Sepolia.
2. getGasPrices: Fetch live Sepolia network gas price in Gwei and estimate transfer cost.
3. getTokenPrices: Fetch live USD prices for ETH, LINK, and USDC from CoinGecko.
4. searchContacts: Search the user's saved Address Book in MongoDB.
5. getRecentTransactions: Audit recent transactions from MongoDB history.
6. prepareSendAction: Prepare transfer parameters for user confirmation (never signs).

NON-CUSTODIAL SAFETY RULES:
- You DO NOT have access to private keys or seed phrases.
- You CANNOT sign transactions. You only prepare the transfer parameters for the client to review and sign locally with their wallet password.
- Always execute tools when real-time on-chain data, token prices, or contacts are requested. Never hallucinate balances or fees.
`;

/**
 * Dynamic fallback agent for offline or fallback scenarios
 * Speaks conversationally and handles unknown requests gracefully
 */
async function runFallbackAgent(userMessage, context = {}) {
  const query = (userMessage || '').trim().toLowerCase();
  const executedTools = [];
  let pendingAction = null;
  let reply = '';

  // Greetings
  if (/^(hi|hello|hey|good\s*(morning|afternoon|evening)|howdy|sup)\b/i.test(query)) {
    reply = `Hello! 👋 I'm Aura, your Web3 Wallet Co-Pilot. I'm connected to the Sepolia testnet and ready to help. You can ask me to check your live balances, estimate gas fees, view current crypto prices, or draft a transfer!`;
    return { reply, executedTools, action: null };
  }

  // Who are you / Identity
  if (query.includes('who are you') || query.includes('what are you') || query.includes('your name')) {
    reply = `I'm Aura, your autonomous AI assistant built into this non-custodial Web3 wallet. I operate under a zero-knowledge security model—meaning I help you navigate the blockchain, check balances, and prepare transactions, but I never have access to your private keys or funds.`;
    return { reply, executedTools, action: null };
  }

  // Balances
  if (query.includes('balance') || query.includes('eth') || query.includes('how much') || query.includes('holding') || query.includes('funds')) {
    const res = await executeTool('getWalletBalances', { address: context.activeWalletAddress }, context);
    executedTools.push({ tool: 'getWalletBalances', args: { address: context.activeWalletAddress }, result: res });
    if (res.error) {
      reply = `I checked the Sepolia network, but couldn't detect an active unlocked wallet address. Make sure your wallet is unlocked and try again!`;
    } else {
      reply = `Your active wallet (${res.address.slice(0, 6)}...${res.address.slice(-4)}) currently holds **${res.balanceEth} ETH** on Ethereum Sepolia Testnet.`;
    }
    return { reply, executedTools, action: null };
  }

  // Gas Prices
  if (query.includes('gas') || query.includes('gwei') || query.includes('network fee') || query.includes('cost to send')) {
    const res = await executeTool('getGasPrices', {}, context);
    executedTools.push({ tool: 'getGasPrices', args: {}, result: res });
    reply = `The current Sepolia network gas price is **${res.gasPriceGwei} Gwei**. A standard ETH transfer is estimated to cost ~**${res.estimatedTransferCostEth} ETH** (approx. **$${res.estimatedCostUsd} USD**).`;
    return { reply, executedTools, action: null };
  }

  // Live Token Prices
  if (query.includes('price') || query.includes('market') || query.includes('rate') || query.includes('usd') || query.includes('usdc') || query.includes('link')) {
    const res = await executeTool('getTokenPrices', {}, context);
    executedTools.push({ tool: 'getTokenPrices', args: {}, result: res });
    reply = `Here are the latest live prices from CoinGecko:\n• **Ethereum (ETH):** $${res.ETH.toLocaleString()}\n• **Chainlink (LINK):** $${res.LINK}\n• **USD Coin (USDC):** $${res.USDC}`;
    return { reply, executedTools, action: null };
  }

  // Contacts / Address Book
  if (query.includes('contact') || query.includes('address book') || query.includes('friend') || query.includes('who do i have')) {
    const res = await executeTool('searchContacts', {}, context);
    executedTools.push({ tool: 'searchContacts', args: {}, result: res });
    if (!res.contacts || res.contacts.length === 0) {
      reply = `Your address book is currently empty. You can add frequent recipients in the Contacts tab for convenient 1-click transfers.`;
    } else {
      const list = res.contacts.map((c) => `**${c.name}** (\`${c.address.slice(0, 6)}...${c.address.slice(-4)}\`)`).join(', ');
      reply = `You have ${res.count} contact(s) saved: ${list}.`;
    }
    return { reply, executedTools, action: null };
  }

  // Send / Transfers
  if (query.includes('send') || query.includes('transfer')) {
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
      reply = `I have drafted a transfer of **${amount} ${asset}** to \`${recipient}\`. Click the confirmation action below to review gas fees and sign locally in your Send tab.`;
    } else {
      reply = `I can help you prepare that transfer! Please provide a valid 42-character Ethereum address (0x...) or the name of a saved contact (e.g. *"Send ${amount} ${asset} to Alice"*).`;
    }
    return { reply, executedTools, action: pendingAction };
  }

  // Transactions / History
  if (query.includes('history') || query.includes('transaction') || query.includes('activity')) {
    const res = await executeTool('getRecentTransactions', { limit: 3 }, context);
    executedTools.push({ tool: 'getRecentTransactions', args: { limit: 3 }, result: res });
    if (!res.transactions || res.transactions.length === 0) {
      reply = `No previous transactions found for this account. Outgoing transfers broadcast from this wallet will be logged here.`;
    } else {
      reply = `Here is your recent activity: latest transfer was **${res.transactions[0].amount} ${res.transactions[0].asset}** (${res.transactions[0].status}). Check the History tab for full details!`;
    }
    return { reply, executedTools, action: null };
  }

  // Out of scope / Unsupported requests
  reply = `I cannot perform that request. As a non-custodial Web3 assistant, I am designed strictly for wallet operations:
• Checking live balances on Sepolia
• Estimating network gas fees
• Fetching real-time token prices
• Searching your address book contacts
• Preparing transfer parameters for your review

I cannot sign transactions, execute external code, or access your private keys. How can I help you with your wallet?`;

  return {
    reply,
    executedTools,
    action: null,
  };
}

/**
 * Autonomous ReAct Reasoning Loop (Reason + Act + Observe)
 * Powered by Google Gemini with dynamic function calling
 */
async function runWalletAgent(userMessage, context = {}) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return runFallbackAgent(userMessage, context);
  }

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
    while (maxTurns > 0) {
      maxTurns--;

      const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${apiKey}`;

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
        console.warn(`Gemini returned status ${response.status}, switching to dynamic tool engine.`);
        return runFallbackAgent(userMessage, context);
      }

      const data = await response.json();
      const candidate = data.candidates?.[0];
      const parts = candidate?.content?.parts || [];

      // Check if Gemini invoked a tool (Action)
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

        // Add model's tool decision to conversation history (including thoughtSignature)
        contents.push({
          role: 'model',
          parts,
        });

        // Add tool observation back to conversation history with role 'user'
        contents.push({
          role: 'user',
          parts: [
            {
              functionResponse: {
                name,
                response: { result: toolResult },
              },
            },
          ],
        });

        // Loop continues so Gemini can synthesize the observation
        continue;
      }

      // No tool called -> Model generated final conversational response
      const textPart = parts.find((p) => p.text);
      const finalReply = textPart ? textPart.text : 'I processed your request.';

      return {
        reply: finalReply,
        executedTools,
        action: pendingAction,
      };
    }
  } catch (err) {
    console.warn('Gemini inference error, using dynamic tool fallback:', err.message);
    return runFallbackAgent(userMessage, context);
  }

  return runFallbackAgent(userMessage, context);
}

module.exports = {
  runWalletAgent,
  runFallbackAgent,
};
