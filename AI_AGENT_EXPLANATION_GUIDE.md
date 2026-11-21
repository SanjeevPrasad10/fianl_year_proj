# Web3 AI Wallet Co-Pilot (Aura) — Architecture & Defense Guide
**Feature:** Autonomous Web3 AI Agent using the ReAct (Reason + Act + Observe) Pattern  
**Author:** Sanjeev Prasad (Team Leader & System Architect)  
**Curriculum Foundation:** Scott Moss's Agent Architecture (AI SDK & Function Calling)  

---

## 1. Project Motivation: Why an AI Agent in a Crypto Wallet?

### The Problem in Web3 UX:
1. **Cryptographic Intimidation:** Everyday users struggle with 42-character hexadecimal addresses, calculating gas in Gwei, understanding gas limits (e.g. 21,000 for ETH vs 65,000 for ERC-20), and tracking live USD valuations.
2. **Scattered Information:** Checking your balance, finding a friend's address, and estimating transfer costs usually requires navigating 3 different pages.

### The Solution: "Aura" — An Autonomous ReAct Web3 Assistant
Instead of manually navigating tabs, the user speaks to **Aura** in natural language:
* *"What is my balance right now and how much is it in USD?"*
* *"Is gas expensive on Sepolia right now?"*
* *"Who is in my address book?"*
* *"Can you help me send 0.01 ETH to Alice?"*

Aura **autonomously decides which on-chain or database tools to call**, executes them in real time, and synthesizes the answer.

---

## 2. How the ReAct Architecture Works (Scott Moss Pattern)

The agent does **not** hardcode answers. It runs a **ReAct loop** (`Reasoning` $\rightarrow$ `Action` $\rightarrow$ `Observation`):

```
                     ┌─────────────────────────────────────────┐
                     │          User Prompt in UI              │
                     │  "Send 0.01 ETH to Alice, is gas high?" │
                     └────────────────────┬────────────────────┘
                                          │
                                          ▼
                         ┌─────────────────────────────────┐
                         │      LLM (Gemini 1.5 Flash)     │
                         │    Reasoning: "I need Alice's   │
                         │    address and current gas fee" │
                         └────────────────┬────────────────┘
                                          │
                 ┌────────────────────────┴────────────────────────┐
                 ▼ (Action)                                        ▼ (Action)
        Tool: searchContacts("Alice")                     Tool: getGasPrices()
                 │                                                 │
                 ▼                                                 ▼
        Mongo Address Book: 0x71C...                      Sepolia RPC: 1.5 Gwei
                 │                                                 │
                 └────────────────────────┬────────────────────────┘
                                          │
                                          ▼ (Observation)
                         ┌─────────────────────────────────┐
                         │   LLM receives both outputs     │
                         │   Action: prepareSendAction()   │
                         └────────────────┬────────────────┘
                                          │
                                          ▼
                         ┌─────────────────────────────────┐
                         │   Final Conversational Answer   │
                         │   + 1-Click Send Button in UI   │
                         └─────────────────────────────────┘
```

---

## 3. The 6 Production Tools (`server/agent/tools.js`)

| Tool Name | What it Does | Target Data Source |
| :--- | :--- | :--- |
| `getWalletBalances` | Queries real-time Sepolia ETH balance | Sepolia Public JSON-RPC (`eth_getBalance`) |
| `getGasPrices` | Fetches live network gas price in Gwei & standard fee | Sepolia Public JSON-RPC (`eth_gasPrice`) |
| `getTokenPrices` | Queries live cryptocurrency market prices in USD | CoinGecko API (`ETH`, `USDC`, `LINK`) |
| `searchContacts` | Searches saved friends & addresses | MongoDB `Contact` Collection |
| `getRecentTransactions` | Retrieves latest sent/received transfers | MongoDB `Transaction` Collection |
| `prepareSendAction` | Prepares transfer link for 1-click user review | Local address verification regex |

---

## 4. The ReAct Loop Code Explained (`server/agent/agent.js`)

When teachers ask you to explain your code, walk them through these **3 simple phases**:

```javascript
// Step 1: Initialize conversation with user message & active wallet context
const contents = [{
  role: 'user',
  parts: [{ text: `[Active Wallet: ${context.activeWalletAddress}]\n\nUser: ${userMessage}` }]
}];

// Step 2: The ReAct Loop (Max 5 turns to prevent infinite recursion)
while (maxTurns > 0) {
  maxTurns--;

  // Call the LLM with tool declarations
  const response = await fetch(GEMINI_API_URL, {
    method: 'POST',
    body: JSON.stringify({ contents, tools: [{ functionDeclarations: toolDeclarations }] })
  });

  const parts = candidate.content.parts;
  const functionCall = parts.find(p => p.functionCall);

  if (functionCall) {
    // ACTION: Execute the tool the model requested
    const result = await executeTool(functionCall.name, functionCall.args, context);

    // Record tool for UI badge display
    executedTools.push({ tool: functionCall.name, args: functionCall.args });

    // OBSERVATION: Feed the tool result back to the model history
    contents.push({ role: 'model', parts: [functionCall] });
    contents.push({ role: 'function', parts: [{ functionResponse: { name, response: { result } } }] });

    // Continue loop so the model can read the result!
    continue;
  }

  // Step 3: No tool called -> Model has synthesized the final answer!
  return { reply: textPart.text, executedTools, action: pendingAction };
}
```

---

## 5. Security Defense: "Can the AI Agent Steal User Funds?"

**The #1 Question Teachers Will Ask You:**  
> *"If an attacker hacks or jailbreaks your AI agent, can they steal the user's cryptocurrency?"*

### Your Confident Answer:
> **"Respected evaluators, absolutely NOT. Our wallet is strictly Non-Custodial.**
> 
> 1. **Zero Private Key Access:** The AI Agent runs on the server and has **zero access** to the user's private key or wallet password. Private keys exist exclusively inside the client's browser memory.
> 2. **Preparation vs Execution:** When the user asks to send crypto, the agent only calls `prepareSendAction`. This simply prepares the parameters (recipient, amount, asset) and opens the Send screen.
> 3. **Client-Side Signing Requirement:** The transaction cannot be broadcasted to the blockchain until the human user clicks 'Confirm & Send' and signs it locally in their browser with their decrypted in-memory signer."

---

## 6. Live Presentation Demo Script for the AI Agent

During your 5-minute presentation demo:
1. Open the wallet dashboard. Look at the bottom right corner: point to the floating **`✨ Aura AI Co-Pilot`** button.
2. Click it to open the Co-Pilot drawer.
3. Click the prompt chip: **`💰 Check Balance`**
   * *Point to the screen:* "Notice the green badge: `⚡ Tool Called: getWalletBalances()`. The agent autonomously reached out to the Ethereum Sepolia RPC, parsed the balance in Wei, and formatted it."
4. Type in: **`What is the gas fee right now? Is it safe to send?`**
   * *Point to the screen:* "Notice `⚡ Tool Called: getGasPrices()`. It reads current network congestion in Gwei."
5. Type in: **`Prepare to send 0.005 ETH to 0x71C...`**
   * *Point to the screen:* "Notice the green action button appears: `[Confirm in Send Form ↗]`. Clicking it takes us directly to the Send page with all fields pre-filled, ready for local client signing!"
