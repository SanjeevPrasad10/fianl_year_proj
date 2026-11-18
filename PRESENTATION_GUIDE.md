# Final Year Project: Presentation & Team Work Distribution Guide
## Project: Crypto Wallet (Multi-Currency Non-Custodial Web3 Wallet)
**Target Audience:** 3 Evaluators / Professors  
**Team Size:** 4 Members (Team Leader + 3 Teammates)  
**Total Presentation Time:** ~15–20 minutes (10 mins slides + 5 mins live demo + 5 mins Q&A)

---

## Part 1: Strategic Role & Work Distribution

To impress the teachers, **every member must own a distinct technical pillar**. Teachers immediately detect when only 1 or 2 people did the work. This distribution proves clear separation of concerns:

```
┌────────────────────────────────────────────────────────────────────────┐
│                      TEAM LEADER (Member 1)                            │
│           Project Lead, Architecture & Cryptographic Security          │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
         ┌─────────────────────────┼─────────────────────────┐
         ▼                         ▼                         ▼
┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│     MEMBER 2     │      │     MEMBER 3     │      │     MEMBER 4     │
│    Frontend &    │      │  Blockchain &    │      │   Backend API    │
│  Client Crypto   │      │   Web3 Engine    │      │   & Database     │
└──────────────────┘      └──────────────────┘      └──────────────────┘
```

---

### Member 1: Team Leader (System Architect & Security Lead)
- **Primary Domain:** Project Vision, Architecture, Non-Custodial Security & Viva Defense.
- **Pre-Presentation Prep:**
  - Coordinates the overall slides and ensures the flow between speakers is seamless.
  - Masters the security architecture answers (why client-side signing is safe, Scrypt key derivation, dual password model).
- **During Presentation:**
  - Speaks on Slides 1, 2, 3, 4, 5, and 12.
  - Introduces the team, sets the professional tone, and explains why non-custodial wallets are essential in Web3.
  - Moderates the teacher Q&A (decides who answers which technical question).

---

### Member 2: Frontend & Client Cryptography Specialist
- **Primary Domain:** User Interface, Key Generation, Local Keystore Encryption & Session Management.
- **Pre-Presentation Prep:**
  - Prepares the browser demo environment (clears old browser cache, opens `http://localhost:5173`).
  - Knows the frontend codebase (`client/src/pages/CreateWallet.jsx`, `Unlock.jsx`, `Dashboard.jsx`, `wallet.js`).
- **During Presentation:**
  - Speaks on Slides 6 and 9 (Part 1 of Live Demo).
  - Explains BIP-39 mnemonic seed phrases (12 words), Scrypt local password encryption, and how memory locking protects keys.
  - **In Live Demo:** Shows wallet creation, copying the 12-word seed phrase, and unlocking the wallet with password.

---

### Member 3: Blockchain & Smart Contract / Web3 Specialist
- **Primary Domain:** Ethers.js v6, Sepolia Testnet, Gas Estimation & ERC-20 Tokens.
- **Pre-Presentation Prep:**
  - Ensures the demo wallet has at least 0.05 Sepolia testnet ETH (from Google Faucet) before the presentation.
  - Has [Sepolia Etherscan](https://sepolia.etherscan.io) open in a browser tab.
- **During Presentation:**
  - Speaks on Slides 7 and 9 (Part 2 of Live Demo).
  - Explains JSON-RPC providers, gas calculation (`gasLimit * gasPrice`), native ETH transfers vs ERC-20 token contracts (`USDC`, `LINK`).
  - **In Live Demo:** Executes the live "Send Crypto" transaction on Sepolia, verifies gas calculation, and shows the confirmed transaction on Etherscan block explorer.

---

### Member 4: Backend API & Database Lead
- **Primary Domain:** Node.js/Express, MongoDB Atlas/Mongoose, JWT Authentication & Encrypted Cloud Backup.
- **Pre-Presentation Prep:**
  - Ensures backend server is running (`npm run server`) and MongoDB is connected.
  - Opens MongoDB Compass or terminal/Postman to show raw database records.
- **During Presentation:**
  - Speaks on Slides 8, 10, and 11.
  - Explains the REST API endpoints, JWT token authentication, bcrypt password hashing, and the 3 MongoDB collections (`User`, `Transaction`, `Contact`).
  - **In Live Demo:** Opens MongoDB to prove that **only encrypted ciphertext** is stored in the database, verifying the server has zero knowledge of private keys.

---

## Part 2: Slide-by-Slide PowerPoint Deck (12 Slides)

You can copy these exact titles, bullet points, and speaking cues directly into PowerPoint or Google Slides:

---

### Slide 1: Title Slide
- **Title:** Crypto Wallet — Full-Stack Non-Custodial Multi-Currency Web3 Wallet
- **Subtitle:** Final Year Engineering Project Presentation
- **Presented by:**
  - [Member 1 Name] (Team Lead & Security Architecture)
  - [Member 2 Name] (Frontend & Cryptography UX)
  - [Member 3 Name] (Blockchain & Web3 Integration)
  - [Member 4 Name] (Backend API & Database)
- **Guided by:** [Professor/Guide Name], Department of Computer Science & Engineering
- **Speaker:** **Member 1 (Team Leader)**
  > *Speaking Cue:* "Respected teachers and evaluators, good morning. Today our team is presenting our final year project: Crypto Wallet, a full-stack, non-custodial cryptocurrency web wallet operating on the Ethereum Sepolia testnet."

---

### Slide 2: Motivation & Problem Statement
- **Slide Title:** Why Non-Custodial Wallets?
- **Key Points:**
  - **The Custodial Risk:** In centralized platforms (like FTX, Mt. Gox), exchanges hold the user's private keys ("Not your keys, not your coins"). If the exchange is hacked or freezes, user funds are lost.
  - **The Centralization Flaw:** Traditional web apps store credentials and sensitive data on central servers, creating a single point of failure.
  - **Our Objective:** Build a decentralized, sovereign web wallet where private keys are generated, encrypted, and signed **exclusively in the client's browser**, while utilizing a modern cloud backend for encrypted backups, contact directories, and transaction audit trails.
- **Speaker:** **Member 1**

---

### Slide 3: Proposed Solution & Core Features
- **Slide Title:** System Features & Capabilities
- **Key Points:**
  - **Multi-Currency Support:** Native Ethereum (ETH) + ERC-20 tokens (USDC, LINK).
  - **BIP-39 HD Wallet:** Deterministic 12-word mnemonic phrase generation & import.
  - **Client-Side Keystore Encryption:** Web3 standard Scrypt + AES-128-CTR encryption.
  - **Interactive Send & Receive:** Dynamic gas fee calculation, QR code generator, and 2-step transaction confirmation.
  - **Cross-Device Encrypted Backup:** Encrypted keystore backup to MongoDB without server key exposure.
  - **Enterprise Polish:** Persistent dark/light mode, real-time CoinGecko USD pricing, and integrated address book.
- **Speaker:** **Member 1**

---

### Slide 4: System Architecture Diagram
- **Slide Title:** End-to-End System Architecture
- **Visual Structure:**
  ```
  [ React Client (Vite + Tailwind) ]
      ├── ethers.js v6 (Browser Keygen & Signing) ────► [ Ethereum Sepolia Testnet RPC ]
      │                                                           │
      └── Axios (Bearer JWT)                                      ▼
             │                                          [ Sepolia Etherscan Explorer ]
             ▼
  [ Node.js + Express Backend ]
             │
             ▼
  [ MongoDB Database (User, Transaction, Contact Collections) ]
  ```
- **Key Architectural Principle:** Complete isolation between private key operations (Browser only) and data persistence (Server & Database).
- **Speaker:** **Member 1**

---

### Slide 5: The Non-Custodial Security Model (Critical Viva Topic)
- **Slide Title:** Non-Custodial Security & Zero-Knowledge Backend
- **Key Points:**
  - **Client-Side Sovereignty:** The recovery phrase, private key, and wallet password **never** leave browser memory in plaintext.
  - **Keystore Encryption Formula:** `Ciphertext = Encrypt(PrivateKey, Scrypt(WalletPassword), AES-128-CTR)`.
  - **Zero-Knowledge Server:** The server only receives the already-encrypted ciphertext string.
  - **Dual Password Defense:** Account login password (hashed with bcrypt on server) vs Wallet encryption password (used in browser Scrypt derivation). Even if the backend database leaks, funds cannot be decrypted.
- **Speaker:** **Member 1**

---

### Slide 6: Frontend Engineering & Wallet Lifecycle
- **Slide Title:** Frontend Architecture & Client Cryptography
- **Key Points:**
  - **Tech Stack:** React 18, Vite bundler, Tailwind CSS (Custom dark green institutional palette, zero AI icons).
  - **BIP-39 Implementation:** Generates 128-bit cryptographic entropy mapped to 12 English dictionary words.
  - **Wallet Restoration:** Dual recovery channels (12-word mnemonic phrase or 64-character raw private key).
  - **Memory Session Security:** "Lock Wallet" zeros out the active `ethers.Signer` instance from React memory. To broadcast another transfer, the user must decrypt the keystore again with their password.
- **Speaker:** **Member 2**

---

### Slide 7: Blockchain Integration & Gas Mechanics
- **Slide Title:** Web3 Engine & Sepolia Network Operations
- **Key Points:**
  - **Library:** Ethers.js v6 with `JsonRpcProvider` connected to Ethereum Sepolia Testnet (Chain ID `11155111`).
  - **Gas Fee Formula:** `Total Gas Fee = Gas Limit × Current Gas Price`.
    - Native ETH transfer: Fixed at `21,000` gas units.
    - ERC-20 transfer: Dynamically estimated via `contract.estimateGas.transfer()` with a 20% safety margin.
  - **Smart Contract Interactivity:** Minimal ERC-20 ABI interfacing with `balanceOf()`, `decimals()`, and `transfer()` for Circle USDC and Chainlink LINK.
  - **Live Pricing:** CoinGecko REST API with fallback caching for real-time USD portfolio valuation.
- **Speaker:** **Member 3**

---

### Slide 8: Backend API & Database Design
- **Slide Title:** Server Infrastructure & Database Schema
- **Key Points:**
  - **Runtime & Framework:** Node.js v20 with Express.js REST API.
  - **Security Middleware:** Stateless JWT authentication with Bearer tokens; password hashing using `bcryptjs` (salt rounds: 10).
  - **MongoDB Collections (3 Schemas):**
    1. `User`: `name`, `email` (unique), `passwordHash`, `walletAddress`, `encryptedKeystore`, `createdAt`.
    2. `Transaction`: `userId`, `txHash`, `from`, `to`, `amount`, `asset`, `network`, `status`, `createdAt`.
    3. `Contact`: `userId`, `name`, `address`, `createdAt`.
  - **REST Endpoints:** 10 endpoints covering auth, keystore sync, transaction history, and address book CRUD.
- **Speaker:** **Member 4**

---

### Slide 9: Live System Demonstration
- **Slide Title:** Live Demonstration Walkthrough
- **Demonstration Flow:**
  - **Step 1 (Member 2):** User Login & Wallet Dashboard overview (ETH, USDC, LINK balances and live USD conversion).
  - **Step 2 (Member 2):** Wallet lock/unlock demonstration proving in-memory security.
  - **Step 3 (Member 3):** Sending 0.001 Sepolia ETH to a recipient from the Address Book; showcasing dynamic gas estimation and 2-step confirmation.
  - **Step 4 (Member 3):** Clicking the generated transaction hash and viewing the confirmed block on Sepolia Etherscan.
  - **Step 5 (Member 4):** Inspecting the database in MongoDB Compass to show the transaction logged and the keystore encrypted.
- **Speakers:** **All Members collaborating live**

---

### Slide 10: Testing, Verification & Tools
- **Slide Title:** Testing Methodology & Developer Tools
- **Key Points:**
  - **API Validation:** 10-endpoint automated Postman collection (`postman_collection.json`) verifying all auth, wallet, and contact routes.
  - **Blockchain Verification:** Sepolia Etherscan explorer audit trails verifying transaction hashes and block confirmations.
  - **Security Auditing:** Verified that no private keys exist in network payloads (DevTools Network inspection).
  - **Testnet Funding:** Google Cloud Web3 and Alchemy Sepolia testnet faucets.
- **Speaker:** **Member 4**

---

### Slide 11: Future Scope & Roadmap
- **Slide Title:** Future Scope & Production Enhancements
- **Key Points:**
  - **Multi-Chain Expansion:** Bitcoin (BTC) integration via BIP-44 multi-chain derivation (`m/44'/0'/0'` for BTC, `m/44'/60'/0'` for ETH).
  - **DEX Token Swaps:** Integration of Uniswap v3 Router smart contracts on Sepolia for in-wallet token swapping.
  - **Push Price Alerts:** WebSocket real-time price threshold notifications.
  - **Hardware & WebAuthn:** Passkey authentication and Ledger/Trezor hardware wallet USB signing.
  - **Mobile App:** Cross-platform React Native / Expo application reusing the identical core cryptography service.
- **Speaker:** **Member 4**

---

### Slide 12: Conclusion & Q&A
- **Slide Title:** Conclusion & Acknowledgements
- **Key Points:**
  - Successfully designed, implemented, and verified a production-grade, non-custodial cryptocurrency wallet.
  - Bridges the gap between Web3 client sovereignty and Web2 seamless cloud user experience.
  - We thank our department teachers, guide, and evaluators for their mentorship.
  - *We welcome questions from the panel.*
- **Speaker:** **Member 1 (Team Leader opens panel for questions)**

---

## Part 3: Live Demonstration Script & Setup

### Preparation 15 Minutes Before the Presentation:
1. **Terminal 1:** Run `npm run server` (Confirm `Crypto Wallet Server running at http://localhost:5000`).
2. **Terminal 2:** Run `npm run client` (Confirm `VITE v5.4.21 ready at http://localhost:5173`).
3. **Browser Tabs to Pre-Open:**
   - Tab 1: `http://localhost:5173` (Frontend)
   - Tab 2: `https://sepolia.etherscan.io` (Sepolia Explorer)
   - Tab 3: MongoDB Compass or `http://localhost:5000/api/health`

### Demo Script (3 to 5 minutes total):
- **Member 1:** "Teachers, we will now demonstrate the live application running on the Ethereum Sepolia network."
- **Member 2 (on screen):**
  - "I am logging in as Alice using our demo account. As you can see, our dashboard displays real-time balances for Sepolia ETH, USDC, and LINK with live CoinGecko USD valuation."
  - "When I click 'Lock Wallet', the in-memory signer is zeroed out. Now I cannot send funds without re-entering the wallet password."
  - "I will enter the password to decrypt the keystore via Scrypt in the browser."
- **Member 3 (on screen):**
  - "Now I will demonstrate an outbound blockchain transfer. I navigate to the Send page, select ETH, and pick a contact from our Address Book."
  - "Notice that our gas estimator queries the Sepolia RPC and calculates the fee in Gwei, ETH, and USD."
  - "Upon clicking 'Sign & Broadcast', ethers.js signs the raw transaction in the browser and broadcasts it to Sepolia. Here is our live transaction hash. Clicking it opens Sepolia Etherscan showing the transaction confirmed on the Ethereum testnet."
- **Member 4 (on screen):**
  - "Finally, on the backend, this transaction is immediately recorded in our MongoDB transaction history collection."
  - "If we inspect MongoDB Compass, you can see that the user's keystore is stored strictly as an encrypted JSON ciphertext. Even with direct database access, no administrator can ever steal user keys."

---

## Part 4: Likely Teacher Questions & Who Should Answer

Teachers always ask targeted questions to test if you actually understand Web3. Here is the answer cheat-sheet:

| Teacher's Question | Assigned Speaker | Immediate Winning Answer |
| :--- | :--- | :--- |
| **"If your database gets hacked, can the hacker steal the cryptocurrency?"** | **Member 1 (Leader)** | *"No, sir/ma'am. The database holds only public addresses, transaction logs, and the already-encrypted keystore JSON. Without the user's local wallet password, the ciphertext cannot be decrypted. The private key never touched our server."* |
| **"Where is the private key stored when the user is using the app?"** | **Member 2 (Frontend)** | *"When the wallet is unlocked, the private key is held exclusively in browser volatile memory (RAM) inside the ethers.js `Signer` instance. When the user clicks 'Lock Wallet' or logs out, that instance is cleared to prevent XSS memory leaks."* |
| **"How do you calculate the gas fee before sending?"** | **Member 3 (Blockchain)** | *"We query `provider.getFeeData()` to get the current network `gasPrice`. For native ETH, standard transfer gas limit is 21,000 units. For ERC-20 tokens, we call `contract.estimateGas.transfer()` with a 20% safety margin. Total fee is `gasLimit × gasPrice`."* |
| **"Why do you use MongoDB if this is a blockchain project?"** | **Member 4 (Backend)** | *"Querying the blockchain directly for past transaction history or address book contacts on every render is slow and rate-limited. MongoDB provides fast indexing for user profiles, transaction logs, contact lists, and encrypted keystore cross-device backups."* |
| **"What encryption standard is used for the keystore?"** | **Member 2 (Frontend)** | *"We use the official Ethereum Web3 JSON keystore specification: `Scrypt` as the Key Derivation Function (KDF) to turn the password into a cryptographic key, and `AES-128-CTR` as the symmetric cipher to encrypt the private key."* |
| **"What is the difference between Sepolia ETH and mainnet ETH?"** | **Member 3 (Blockchain)** | *"Sepolia is a proof-of-stake testnet for Ethereum. Sepolia ETH uses the exact same EVM consensus and transaction formats as mainnet, but testnet tokens are distributed free via faucets so developers can test without risking real financial capital."* |

---

## Part 5: Checklist for Presentation Day

- [ ] Laptops charged and chargers brought to room.
- [ ] Local MongoDB service running (`net start MongoDB` or Atlas connection string in `server/.env`).
- [ ] Node server started (`npm run server`) and health check verified at `http://localhost:5000/api/health`.
- [ ] React app started (`npm run client`) at `http://localhost:5173`.
- [ ] Wallet has at least 0.05 Sepolia ETH loaded.
- [ ] Mobile hotspot ready as backup in case college Wi-Fi blocks port 5000 or RPC endpoints.
- [ ] Rehearsed the 15-minute timing with all 4 members at least once.
