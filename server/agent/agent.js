const { toolDeclarations, executeTool } = require('./tools');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL_NAME = 'gemini-1.5-flash';

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
 * ReAct Reasoning Loop (Reason + Act + Observe)
 * @param {string} userMessage - The user's input prompt
 * @param {object} context - { userId, activeWalletAddress }
 * @returns {Promise<{ reply: string, executedTools: Array, action: object|null }>}
 */
async function runWalletAgent(userMessage, context = {}) {
  if (!GEMINI_API_KEY) {
    return {
      reply: 'Aura AI is offline: GEMINI_API_KEY is not configured in the server environment.',
      executedTools: [],
      action: null,
    };
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
  let maxTurns = 5; // Guard against infinite loops

  while (maxTurns > 0) {
    maxTurns--;

    // 1. Call Gemini LLM with declared tools
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`;
    
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
      const errText = await response.text();
      console.error('Gemini API Error:', errText);
      return {
        reply: `AI Agent temporary error: ${response.statusText}`,
        executedTools,
        action: null,
      };
    }

    const data = await response.json();
    const candidate = data.candidates?.[0];
    const parts = candidate?.content?.parts || [];

    // 2. Check if the model wants to call a tool (Action)
    const functionCallPart = parts.find((p) => p.functionCall);

    if (functionCallPart) {
      const { name, args } = functionCallPart.functionCall;

      // Execute the requested tool
      const toolResult = await executeTool(name, args, context);

      executedTools.push({
        tool: name,
        args,
        result: toolResult,
      });

      if (toolResult?.actionType === 'SEND_REDIRECT') {
        pendingAction = toolResult;
      }

      // Add the model's call to conversation history
      contents.push({
        role: 'model',
        parts: [functionCallPart],
      });

      // Add the observation (tool response) back into the conversation
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

      // Loop continues back to model with the new observation!
      continue;
    }

    // 3. No tool called -> Model returned final text answer!
    const textPart = parts.find((p) => p.text);
    const finalReply = textPart ? textPart.text : 'I processed your request.';

    return {
      reply: finalReply,
      executedTools,
      action: pendingAction,
    };
  }

  return {
    reply: 'I reached the maximum reasoning steps for this request. Please try rephrasing.',
    executedTools,
    action: pendingAction,
  };
}

module.exports = {
  runWalletAgent,
};
