# PROJECT SYNOPSIS
## FINAL YEAR BACHELOR OF COMPUTER APPLICATIONS (BCA) PROJECT
### ACADEMIC SESSION 2023 - 2026 (GRADUATION YEAR: 2026)

---

# **CRYPTO WALLET: A SECURE NON-CUSTODIAL MULTI-CURRENCY WEB3 WALLET WITH ENCRYPTED CLOUD BACKUP AND AI CO-PILOT**

**Submitted in partial fulfillment of the requirements for the award of the Degree of**  
### **BACHELOR OF COMPUTER APPLICATIONS**

**Department of Computer Applications**  
**School of Technology**  
**Quantum University, Roorkee, Uttarakhand**

---

### **Project Information Matrix**

| Parameter | Academic Specifications |
| :--- | :--- |
| **Project Title** | Crypto Wallet: Secure Non-Custodial Multi-Currency Web3 Wallet with Encrypted Cloud Backup & AI Copilot |
| **Academic Session** | 2023 - 2026 (Graduating Batch: 2026) |
| **Course & Degree** | Bachelor of Computer Applications (BCA) |
| **Department** | Department of Computer Applications, School of Technology |
| **Institution** | Quantum University, Roorkee - Dehradun Highway, Roorkee, Uttarakhand |
| **Project Leader** | **Sanjiv Prasad** (Roll No. 2401311158) - Full-Stack Architecture & Cryptography Lead |
| **Project Teammates** | **Satyam Saini** (Roll No. 2401311160) - Frontend UI/UX Lead<br>**Saurabh Kashyap** (Roll No. 2401311161) - Blockchain QA & Testing Lead |
| **Project Guide** | **Prof. Mayank Chauhan**, Assistant Professor, Dept. of Computer Applications |
| **Program Officer** | **Dr. Ankur Rana**, Program Officer, Dept. of Computer Applications |
| **Head of Department** | **Dr. Mridula**, Head of Department (HoD), Dept. of Computer Applications |

---

## 1. Introduction & Background

The exponential rise of decentralized ledger technologies, public blockchains, and decentralized finance (DeFi) has introduced trustless, censorship-resistant peer-to-peer financial systems. Unlike legacy centralized banking architectures governed by custodial intermediaries, Web3 transactions are cryptographically signed by end-users and permanently validated across distributed node consensus. In this ecosystem, cryptocurrency wallets serve as the foundational gateway, safeguarding private keys, deriving cryptographic accounts, executing smart contract calls, and tracking asset portfolios.

However, existing cryptocurrency wallet paradigms suffer from a profound usability-security dichotomy:
1. **Centralized Custodial Exchanges (e.g., Binance, Coinbase, FTX):** Hold user private keys on company servers. This exposes users to catastrophic counterparty risk, systemic insolvency, regulatory seizures, and honeypot server breaches—demonstrated by the historic collapse of FTX in 2022.
2. **Pure Decentralized Wallets (e.g., MetaMask, Hardware Wallets):** Enforce absolute user responsibility: users must manually transcribe a 12-word BIP-39 mnemonic seed phrase. If this physical backup is lost or destroyed, user funds are mathematically frozen forever with zero customer recourse. Furthermore, complex 42-character hexadecimal addresses and fluctuating gas calculations pose intimidating barriers for everyday consumers.

The proposed **"Crypto Wallet"** resolves this paradox by combining **non-custodial cryptographic sovereignty** with **zero-knowledge password-encrypted cloud keystore backups** and an autonomous **Google Gemini AI Co-Pilot ("Aura")**.

---

## 2. Problem Statement

Mainstream adoption of cryptocurrency is hindered by three structural vulnerabilities:
* **Centralized Custodial Vulnerability:** Users depositing assets into centralized exchanges forfeit mathematical ownership of their private keys, exposing their financial sovereignty to exchange hacks, embezzlement, and unilateral account freezes ("Not your keys, not your crypto").
* **The Non-Custodial Key Loss Trap:** Conventional decentralized wallets require manual seed phrase safekeeping. A single lost piece of paper, damaged hard drive, or cleared browser cache results in permanent, irreversible loss of all digital capital.
* **High Usability & Transaction Anxiety:** Non-technical users struggle with calculating EIP-1559 gas fees, verifying checksummed recipient hex strings, distinguishing smart contract tokens (ERC-20) from native Ether, and interpreting on-chain failure codes.

---

## 3. Objectives of the Proposed System

* **Client-Side Cryptographic Sovereignty:** Generate 12-word BIP-39 mnemonic phrases and derive secp256k1 keypairs exclusively inside the client browser RAM using Ethers.js v6. Raw private keys are never transmitted across the network or persisted unencrypted.
* **Zero-Knowledge Cloud Keystore Backup:** Encrypt the derived private key client-side using Scrypt Key Derivation Function ($N=8192, r=8, p=1$) and AES-128 in Counter Mode (CTR) before cloud storage, enabling seamless multi-device recovery via password without compromising self-custody.
* **Multi-Asset EVM Integration:** Establish persistent JSON-RPC connectivity with the Ethereum Sepolia Testnet to support real-time balance tracking and transactions for Native Ether (ETH) and ERC-20 tokens (Mock USDC & LINK).
* **Dynamic Gas Fee Estimation:** Implement real-time gas calculations (Base Fee + Priority Tip) in Gwei, ETH, and live USD equivalent pricing via public APIs.
* **Integrated AI Agent Co-Pilot ("Aura"):** Deploy a server-side natural language assistant powered by Google Gemini 1.5 Flash to parse natural language instructions, validate addresses, estimate costs, and pre-fill transaction forms safely without key exposure.

---

## 4. Scope & Delimitations

### In-Scope Features:
* 12-Word BIP-39 mnemonic phrase generation and dictionary validation.
* Ethereum Standard Web3 Version 3 Keystore encryption (AES-128-CTR + Scrypt).
* Local client-side transaction signing (EIP-1559 and legacy EVM formats).
* Native Sepolia ETH and ERC-20 token transfers with interactive QR codes.
* Full transaction history with instant Etherscan explorer block verification.
* Interactive AI Co-Pilot ("Aura") with custom tool calling for portfolio and transfer operations.

### Out-of-Scope Delimitations:
* **Testnet Environment:** The system operates on the Ethereum Sepolia Testnet; real fiat off-ramping and mainnet real money transfers are omitted to prevent academic financial liability.
* **Non-EVM Blockchains:** Non-Ethereum architectures (e.g., Bitcoin UTXO, Solana Sealevel, or Cardano eUTXO) are excluded from the initial release.

---

## 5. Literature Survey & Comparative Analysis

| Feature / Dimension | Centralized Exchanges (CEX) | MetaMask / Trust Wallet | Proposed "Crypto Wallet" |
| :--- | :--- | :--- | :--- |
| **Key Custody** | Custodial (Platform holds key) | Non-Custodial (Local browser) | Non-Custodial (Local browser RAM) |
| **Cloud Backup Model** | Plaintext centralized DB | None (Seed phrase only) | Zero-Knowledge AES-128 Keystore |
| **Recovery Method** | Email / SMS OTP | 12 Words only (Permanent loss if lost) | Password-encrypted cloud sync + 12 Words |
| **AI Natural Language Agent** | None | None | Integrated Gemini 1.5 Flash ("Aura") |
| **Gas Fee Transparency** | Arbitrary flat withdrawal fee | Gwei slider (confusing to novices) | Automated Gwei, ETH & USD conversion |
| **Multi-Asset Support** | Internal ledger SQL update | Requires manual token import | Auto-detected ETH, USDC, LINK tokens |

---

## 6. Methodology & System Architecture

The system is built upon a **Three-Tier Decoupled Architecture** following strict zero-knowledge cryptographic separation:
1. **Tier 1 - Presentation & Cryptographic Signer (Frontend):** React 18 SPA compiled via Vite. Manages user interface, address book, QR rendering, and holds the active `ethers.Signer` object strictly in volatile JavaScript heap memory. Private keys are cleared immediately on logout or lock.
2. **Tier 2 - Application & AI Intelligence Layer (Backend):** Node.js and Express.js REST API. Manages user registration, JWT token generation, MongoDB communication, and runs the Gemini AI Agent tool executor. The backend has zero visibility into user private keys.
3. **Tier 3 - Persistence & Blockchain Layer:** MongoDB Atlas database storing user profiles and ciphertext keystores, combined with Ethereum Sepolia nodes via Alchemy / Infura JSON-RPC endpoints.

---

## 7. System Hardware & Software Requirements

| Component | Requirement Specifications |
| :--- | :--- |
| **Hardware (Dev)** | Intel Core i5 / AMD Ryzen 5, 8 GB RAM (16 GB Recommended), 256 GB SSD, Broadband Internet |
| **Hardware (User)** | Any device running modern Chrome / Firefox / Edge / Safari with at least 2 GB RAM |
| **Operating System** | Microsoft Windows 10/11, macOS Monterey+, or Ubuntu Linux 22.04 LTS |
| **Frontend Stack** | React.js 18, Vite 5, Tailwind CSS, Lucide React, HTML5 Canvas QR Generator |
| **Backend Stack** | Node.js 20 LTS, Express.js 4, JSON Web Tokens (JWT), bcryptjs (10 salt rounds) |
| **Cryptography** | Ethers.js v6.17.0, BIP-39 Mnemonic SDK, Web3 Secret Storage Definition (V3 Keystore) |
| **AI Framework** | Google Gemini 1.5 Flash via official `@google/genai` SDK with function calling |
| **Database & RPC** | MongoDB Atlas (Mongoose ODM), Ethereum Sepolia Testnet (Alchemy / Infura RPC endpoints) |

---

## 8. Project Schedule & Work Breakdown (SDLC Timeline)

| Phase | Duration | Key Milestones & Deliverables | Status |
| :--- | :--- | :--- | :--- |
| **Phase 1: SRS & Design** | Weeks 1 - 2 | Literature review, problem definition, UML modeling & database schemas | Completed |
| **Phase 2: Cryptographic Engine** | Weeks 3 - 5 | BIP-39 mnemonic generator, Ethers key derivation, AES-128/Scrypt encryption | Completed |
| **Phase 3: Backend API** | Weeks 6 - 8 | Node.js/Express REST endpoints, JWT auth, MongoDB encrypted backup routes | Completed |
| **Phase 4: Frontend UI & Web3** | Weeks 9 - 11 | React dashboard, multi-asset tracking, Send/Receive workflows, QR scanner | Completed |
| **Phase 5: AI Co-Pilot ("Aura")** | Weeks 12 - 13 | Gemini 1.5 Flash integration, function-calling tools, safety validation | Completed |
| **Phase 6: Verification & Testing** | Weeks 14 - 15 | 20 black-box test cases, gas estimation calibration, Sepolia testnet execution | Completed |
| **Phase 7: Final Documentation** | Week 16 | Final thesis report, presentation deck, synopsis, viva preparations | Completed |

---

## 9. Expected Outcomes & Impact

* **Sovereign Digital Ownership:** Users retain 100% mathematical ownership of their cryptographic keys, immune to third-party bank runs or platform insolvency.
* **Resilient Recovery:** Eliminates the catastrophic risk of seed phrase loss through zero-knowledge encrypted cloud backups.
* **Intuitive AI Assistant:** Democratizes blockchain interaction for everyday non-technical users via natural language processing.

---

## 10. Recommendations & Faculty Signatures

```
Submitted By:                          Supervised & Recommended By:           Approved By:

___________________________            ___________________________            ___________________________
Sanjiv Prasad (2401311158)             Prof. Mayank Chauhan                   Dr. Ankur Rana (Program Officer)
Satyam Saini (2401311160)              Assistant Professor, CA                Dr. Mridula (Head of Department)
Saurabh Kashyap (2401311161)           Quantum University, Roorkee            School of Technology
BCA Final Year Students                                                       Quantum University, Roorkee
```
