# 📊 PowerPoint Presentation Guide for Final Year Project

> **Project Name:** Multi-Cryptocurrency Non-Custodial Web3 Wallet with AI Copilot  
> **Prepared for:** PPT Slide Maker & Presentation Team  
> **Goal:** Clean, high-impact slides with surface-level concepts that are easy to explain and defend without memorizing complex math or deep code.

---

## 🎯 Quick Rules for the PPT Maker
1. **Keep it visual:** Maximum **4–5 bullet points per slide**. Use icons and screenshots instead of walls of text.
2. **Surface level only:** Do not put raw code or mathematical formulas on slides. Use simple real-world analogies.
3. **Consistent Theme:** Use dark/clean colors (e.g., Deep Slate/Dark Green `#0a2e1d` or Clean Navy `#0f172a` with Emerald `#10b981` accents) to match the live wallet app.

---

## 📑 Slide-by-Slide Blueprint (11 Slides Total)

---

### Slide 1: Title Slide
* **Slide Title:** Next-Generation Non-Custodial Web3 Crypto Wallet with Autonomous AI Copilot
* **Subtitle:** Final Year Computer Science Engineering Project (2026)
* **Team Details:**
  * Member 1: Project Lead & Architecture
  * Member 2: Frontend & Client Cryptography
  * Member 3: Blockchain & Smart Contract Integration
  * Member 4: Backend API & Database
* **Project Guide / Supervisor:** [Supervisor Name / Department]
* **Speaker Script (What to say):**  
  > *"Good morning respected evaluators. Today, our team is presenting our final year project: a secure, non-custodial multi-cryptocurrency Web3 wallet featuring an integrated autonomous AI Copilot."*

---

### Slide 2: Problem Statement (Why did we build this?)
* **Slide Title:** The Problem: Centralization & Usability in Crypto
* **Key Bullet Points:**
  * **"Not your keys, not your crypto":** When users store funds on centralized exchanges (like FTX or WazirX), they do not own their funds. If the company collapses, user money is lost.
  * **Security Vulnerabilities:** Storing private keys on centralized servers creates a single point of failure for hackers.
  * **High Barrier to Entry:** Web3 is confusing for beginners—gas fees, 0x addresses, and transaction hashes scare everyday users.
* **Visual Suggestion:** An image showing "Centralized vs Decentralized" or a red warning lock icon.
* **Speaker Script:**  
  > *"Most people lose their crypto because they trust third-party centralized servers with their passwords and private keys. Our project solves this by ensuring that users have 100% true ownership of their assets, combined with a beginner-friendly assistant to guide them."*

---

### Slide 3: Proposed Solution
* **Slide Title:** Our Solution: Non-Custodial + AI Assistance
* **Key Bullet Points:**
  * **100% Non-Custodial:** Private keys are generated and encrypted directly in the user's browser—the server never sees them.
  * **Multi-Asset Support:** Seamlessly handles native Ethereum (ETH) and ERC-20 tokens (USDC, LINK) on the Sepolia network.
  * **Smart Address Book:** Save friendly contact names (e.g., 'Alice') instead of typing long 42-character hex addresses.
  * **Aura AI Copilot:** Built-in AI assistant that understands plain English to fetch live balances, estimate gas fees, and draft transfers.
* **Visual Suggestion:** Screenshot of the Wallet Dashboard showing the total portfolio valuation and clean UI.
* **Speaker Script:**  
  > *"We built a complete Web3 wallet where the user has absolute ownership. To make it effortless to use, we combined client-side encryption with a conversational AI agent that can execute wallet tasks through simple text prompts."*

---

### Slide 4: Key Features at a Glance
* **Slide Title:** Core Features of the Wallet
* **4-Box Grid Layout:**
  1. **Wallet Lifecycle:** 12-word BIP-39 mnemonic phrase creation, seed phrase recovery, and password-protected session locking.
  2. **Live On-Chain Transfers:** Real-time transaction broadcasting on Ethereum Sepolia Testnet with dynamic gas estimation.
  3. **Live Market Feed:** Real-time USD portfolio valuation with live price updates for ETH, USDC, and LINK via CoinGecko.
  4. **Emergency Paper Wallet:** Downloadable, printable recovery backup containing your encrypted keystore and public address.
* **Speaker Script:**  
  > *"Our wallet covers the entire lifecycle of crypto management: instant setup with standard 12-word recovery phrases, real-time blockchain sending/receiving, live portfolio valuation, and secure offline paper backups."*

---

### Slide 5: Security Architecture (Simple & Easy to Explain)
* **Slide Title:** Security: How User Funds Are Protected
* **Key Bullet Points:**
  * **Browser-Level Cryptography:** Key generation and transaction signing happen strictly inside the browser memory.
  * **Dual-Password Model:**
    * Password 1 (Account Password): Used to sign in to the web app.
    * Password 2 (Wallet Password): Used to encrypt and decrypt the private key with the Scrypt algorithm.
  * **Zero-Knowledge Backend:** Even if our MongoDB database is hacked, attackers only get encrypted cipher-text—no one can steal user funds without the local wallet password.
* **Visual Suggestion:** A simple flow diagram:
  `[Browser Generates Key] ---> [Encrypted Locally with Password] ---> [Only Encrypted Text Saved to DB]`
* **Speaker Script:**  
  > *"The key security differentiator is our Dual-Password Model. The server only stores encrypted text. The actual private key is never sent over the internet or saved on our server, ensuring zero-knowledge security."*

---

### Slide 6: Intelligent AI Copilot (Aura)
* **Slide Title:** Aura: The Autonomous Web3 AI Assistant
* **Key Bullet Points:**
  * **Natural Language Web3:** Users can ask questions like *"What is my ETH balance?"* or *"How much is gas right now?"* in plain English.
  * **Autonomous ReAct Engine:** The AI doesn't just chat—it reasons and executes specific tools (fetching live RPC data, querying address books, checking token prices).
  * **1-Click Smart Actions:** The AI can pre-fill the transfer form for you (e.g. *"Send 0.01 ETH to Bob"*), letting the user review and confirm with one click.
  * **Powered by Google Gemini:** Fast, cost-efficient, and responsive reasoning.
* **Visual Suggestion:** Screenshot of the floating Aura AI Copilot chat window showing the green `⚡ Tool Called` badge.
* **Speaker Script:**  
  > *"Instead of navigating through multiple menus, users can talk directly to Aura, our AI Copilot. Powered by an autonomous ReAct reasoning loop, Aura identifies what the user wants, calls the appropriate on-chain tools, and gives actionable answers in seconds."*

---

### Slide 7: Technology Stack
* **Slide Title:** Technologies & Tools Used
* **Categories:**
  * **Frontend:** React 18, Vite, Tailwind CSS (Modern, fast, dark-mode responsive UI)
  * **Blockchain Engine:** Ethers.js v6, Ethereum Sepolia Testnet, JSON-RPC Providers
  * **Backend API:** Node.js, Express.js (REST API, JWT authentication, CORS preflight)
  * **Database:** MongoDB & Mongoose (Stores user profiles, encrypted keystore backups, contacts)
  * **AI Intelligence:** Google Gemini API (Natural language reasoning & tool execution)
  * **Deployment:** Vercel (Frontend SPA) + Render Cloud (Backend Web Service)
* **Speaker Script:**  
  > *"Our architecture uses a modern MERN stack paired with Ethers.js for blockchain interactions, Google Gemini for autonomous AI reasoning, and high-availability cloud deployment on Vercel and Render."*

---

### Slide 8: System Architecture Diagram
* **Slide Title:** High-Level System Architecture
* **Diagram Flow (Draw 3 horizontal columns or boxes):**
  * **Column 1: Client Tier (User Browser)**
    * React UI + Ethers.js Client
    * Local Private Key In-Memory Signer
    * Scrypt Decryption Engine
  * **Column 2: Application Tier (Backend)**
    * Node.js & Express REST API
    * JWT Authentication & Protected Routes
    * AI Agent Tool Orchestration Engine
    * MongoDB (Encrypted Keystore Storage)
  * **Column 3: Blockchain Tier (Decentralized Network)**
    * Ethereum Sepolia Testnet Nodes
    * Smart Contracts (USDC & LINK ERC-20)
    * Etherscan Block Explorer
* **Speaker Script:**  
  > *"Here is our high-level architecture. Notice that the client tier connects directly to the blockchain for signing and broadcasting transactions, while the backend tier handles authentication, user metadata, and AI assistance."*

---

### Slide 9: Live Demonstration Steps
* **Slide Title:** Live Demonstration Walkthrough
* **What to Show the Evaluators (4 Quick Steps):**
  1. **Login & Session Unlock:** Log in and demonstrate how entering the wallet password decrypts the keystore in real-time. *(Or use the 1-click Demo Mode for instant presentation!)*
  2. **Dashboard & Live Valuation:** Showcase live balances (ETH, USDC, LINK) and real-time total USD valuation.
  3. **Send Crypto on Sepolia:** Enter an address, preview dynamic gas fee calculation, and broadcast the transaction.
  4. **Chat with Aura AI Copilot:** Ask Aura: *"What are the current gas prices on Sepolia?"* and show the live tool execution badge.
* **Speaker Script:**  
  > *"Now, we will demonstrate the live system running on the Sepolia network, followed by a quick interaction with our AI copilot."*

---

### Slide 10: Future Scope & Enhancements
* **Slide Title:** Future Scope & Roadmap
* **Key Bullet Points:**
  * **Multi-Chain Expansion:** Adding support for Ethereum Layer-2 networks (Polygon, Arbitrum, Optimism) for lower gas fees.
  * **Mobile Application:** Developing React Native cross-platform apps for iOS and Android with biometric authentication (FaceID / Fingerprint).
  * **Hardware Wallet Integration:** USB/NFC support for Ledger and Trezor hardware wallets.
  * **DeFi Swaps & Staking:** Native in-app token swapping using Uniswap decentralized liquidity pools.
* **Speaker Script:**  
  > *"In future iterations, we plan to expand this into a multi-chain mobile application with biometric security and native DeFi token swapping."*

---

### Slide 11: Conclusion
* **Slide Title:** Conclusion & Key Achievements
* **Key Bullet Points:**
  * Successfully developed a fully operational, non-custodial Web3 crypto wallet.
  * Implemented client-side cryptography that eliminates server-side private key vulnerabilities.
  * Integrated an autonomous ReAct AI Copilot that simplifies complex Web3 operations for mainstream users.
  * Deployed live on the Ethereum Sepolia Testnet with full block explorer transparency.
* **Closing Line:** *"Thank you! We are now open for questions."*
* **Speaker Script:**  
  > *"To conclude, our project bridges the gap between decentralized security and everyday usability. Thank you for your time, and we welcome your questions."*

---

## 💡 Top 5 Easy Viva Questions & 10-Second Answers

If the professors ask these common questions during the presentation, here are the simple answers:

1. **Q: Why is your wallet called "non-custodial"?**  
   * **Answer:** *"Because the user holds their own private keys. Our server never has access to the user's secret key or recovery phrase."*

2. **Q: What happens if the user forgets their wallet password?**  
   * **Answer:** *"They can restore their wallet anytime using their 12-word BIP-39 recovery phrase and choose a new password."*

3. **Q: Where is the private key stored?**  
   * **Answer:** *"It is never saved in plaintext anywhere. It only exists temporarily in the browser's volatile memory while the wallet is unlocked, and is cleared as soon as the user locks the wallet or logs out."*

4. **Q: What network are you using for transactions?**  
   * **Answer:** *"Ethereum Sepolia Testnet (Chain ID 11155111), which mirrors Ethereum mainnet mechanics without requiring real fiat money."*

5. **Q: Can the AI Copilot steal user funds or make unauthorized transfers?**  
   * **Answer:** *"No. The AI cannot sign transactions. It can only look up data or pre-fill the transfer form. The user must manually review and confirm every transaction with their own password."*

---

## 🎨 Recommended Slide Layout Summary

| Slide # | Slide Title | Recommended Layout / Visual |
| :---: | :--- | :--- |
| **1** | Title Slide | Minimalist Dark Green / Slate background with project badge |
| **2** | Problem Statement | 2-column comparison: Centralized Risks vs User Frustrations |
| **3** | Proposed Solution | Screenshot of Wallet Dashboard |
| **4** | Core Features | 4-box feature grid with icons |
| **5** | Security Architecture | Clean 3-step encryption flowchart |
| **6** | AI Copilot (Aura) | Screenshot of the chat window with tool badges |
| **7** | Technology Stack | Tech stack logos (React, Node, Mongo, Ethers, Gemini) |
| **8** | System Architecture | 3-tier diagram (Frontend $\rightarrow$ Backend $\rightarrow$ Blockchain) |
| **9** | Live Demo | Step-by-step checklist of what is being demonstrated |
| **10** | Future Scope | Roadmap timeline with 4 milestones |
| **11** | Conclusion & Q&A | Clean thank-you slide with team contact info |
