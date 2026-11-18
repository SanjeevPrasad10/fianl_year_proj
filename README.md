# Crypto Wallet - Non-Custodial Multi-Currency Web3 Wallet

> **Final Year Project**  
> **Tech Stack:** React (Vite) + Tailwind CSS + Ethers.js v6 + Node.js/Express + MongoDB + Sepolia Testnet  
> **Security Model:** Client-Side Non-Custodial Signing & Encrypted Keystore Cloud Backup

---

## 📌 Executive Summary

**Crypto Wallet** is a full-stack, non-custodial cryptocurrency web wallet operating on the Ethereum Sepolia Testnet. It enables users to create, import, store, send, and receive multiple cryptocurrencies (native **ETH** and ERC-20 tokens like **USDC** and **LINK**).

The application is engineered on the principle of **absolute client sovereignty**: private keys and mnemonic recovery phrases are generated, encrypted, and stored strictly in the client's browser using industry-standard cryptography (`Scrypt` and `AES-128-CTR`). The backend server and MongoDB database **never receive or store unencrypted private keys or plaintext passwords**.

---

## 🚀 Key Features

### 1. Frontend (Client-Side Wallet)
- **Deterministic HD Wallet Generation:** BIP-39 standard 12-word mnemonic phrase generated once with copy and download backup options.
- **Wallet Import:** Restore wallets seamlessly via 12/24-word recovery phrases or 64-character raw private keys.
- **Web3 Keystore Encryption:** Passwords encrypt private keys into standard Ethereum JSON keystore files before anything is persisted.
- **Multi-Asset Dashboard:** Real-time balances for Sepolia ETH, Circle USDC, and Chainlink LINK with live USD portfolio valuation via CoinGecko.
- **Receive with QR Code:** Crisp vector QR code generation (`qrcode.react`) and one-click public address clipboard copying.
- **Send with Gas Estimation:** Live network gas estimation (Gwei, ETH, USD equivalent), recipient address validation (`0x...`), and a two-step confirm review screen before signing.
- **Lock & Unlock Sessions:** Clears private keys and signers from browser memory upon lock or inactivity, requiring the wallet password to sign again.
- **Institutional Fintech Styling:** Minimalist dark green and crisp white interface with monospace data readouts, free of clutter or AI-style icons/emojis, with dark mode support.

### 2. Backend & Database (Node.js, Express & MongoDB)
- **User Authentication:** Email and password registration/login powered by `bcryptjs` (salt rounds: 10) and stateless JSON Web Tokens (JWT).
- **Encrypted Keystore Backup:** Stores the already-encrypted JSON keystore string in MongoDB so users can log in from other browsers and restore their wallets with their wallet password.
- **Transaction Audit Log:** Automatically saves transfer details (`txHash`, `from`, `to`, `amount`, `asset`, `network`, `status`, `createdAt`) upon broadcasting.
- **Address Book (Contacts):** Save, view, and delete frequently used recipient contacts with one-click "Send Crypto" integration.
- **Profile Management:** View registered account details, wallet address, cloud backup status, and export raw keystore JSON.

---

## 🏛️ Security Architecture & Viva Preparation

> [!IMPORTANT]
> **Key Viva Question: How does this wallet protect user funds against a compromised server?**
> 
> In traditional custodial exchanges, the server holds the user's private key. If the server is hacked, all funds can be stolen.
> 
> In this **Non-Custodial Architecture**:
> 1. **Client-Side Generation:** Mnemonic phrases and private keys are generated in the browser memory using `ethers.HDNodeWallet.createRandom()`.
> 2. **Client-Side Encryption:** The wallet is encrypted inside the browser with `wallet.encrypt(password)` using Scrypt key derivation and AES-128-CTR cipher.
> 3. **Server Zero-Knowledge:** The backend server only receives and stores the *encrypted ciphertext* (JSON keystore), the public address (`0x...`), and transaction history.
> 4. **Browser-Only Signing:** When a user initiates a transaction on the Send page, the transaction payload is signed in the browser using the in-memory `signer.sendTransaction()`. Only the signed raw transaction is broadcasted to the Sepolia RPC.
> 5. **Dual Password Defense:** Users are instructed to choose a distinct wallet encryption password different from their web login password. Even if an attacker compromises the web account password, they cannot decrypt the wallet without the wallet password.

### Common Viva Q&A Table

| Question | Answer / Architecture Detail |
| :--- | :--- |
| **What standard is used for mnemonic phrases?** | BIP-39 (12 words mapped to 128 bits of cryptographic entropy). |
| **Which Ethereum network is used?** | Sepolia Testnet (Chain ID `11155111`). |
| **What algorithm derives keys from passwords?** | `Scrypt` (CPU/memory-hard key derivation function) + `AES-128-CTR`. |
| **How does gas estimation work?** | Queries `provider.getFeeData()` and `estimateGas()` on the target contract. |
| **What happens when the wallet is "Locked"?** | The `ethers.Signer` instance is zeroed out and removed from React state/memory. |

---

## 📁 Project Structure

```
final_year_proj/
├── client/                     # Frontend Application (React + Vite + Tailwind CSS)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx      # Navigation, theme toggle, wallet lock, network badge
│   │   │   ├── AssetCard.jsx   # Multi-currency asset card with balances & live USD
│   │   │   ├── TxItem.jsx      # Transaction row with status badges & Etherscan link
│   │   │   └── ProtectedRoute.jsx # Authentication & lock state route guarding
│   │   ├── context/
│   │   │   ├── AuthContext.jsx # User JWT auth state & profile management
│   │   │   └── WalletContext.jsx # Non-custodial wallet, balances, signer in memory
│   │   ├── pages/
│   │   │   ├── Welcome.jsx     # Onboarding hero
│   │   │   ├── Login.jsx       # Account sign in with JWT
│   │   │   ├── Register.jsx    # Account registration
│   │   │   ├── CreateWallet.jsx # 12-word phrase generation & password encryption
│   │   │   ├── ImportWallet.jsx # Restore via phrase or private key
│   │   │   ├── Unlock.jsx      # Keystore decryption screen
│   │   │   ├── Dashboard.jsx   # Portfolio valuation, asset cards & recent activity
│   │   │   ├── Send.jsx        # Transfer form, gas estimator & confirm screen
│   │   │   ├── Receive.jsx     # QR code & Sepolia faucet guide
│   │   │   ├── History.jsx     # Filterable database transaction log
│   │   │   ├── AddressBook.jsx # Contact management
│   │   │   └── Profile.jsx     # User info, keystore export & Viva Q&A guide
│   │   ├── services/
│   │   │   ├── api.js          # Axios client with JWT interceptor
│   │   │   ├── chain.js        # Sepolia RPC, balances, gas estimation, CoinGecko
│   │   │   └── wallet.js       # Ethers.js v6 keygen, import, Scrypt encryption
│   │   ├── App.jsx             # React Router routing configuration
│   │   ├── index.css           # Tailwind base styles
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/                     # Backend API (Node.js + Express + MongoDB)
│   ├── middleware/
│   │   └── auth.js             # Bearer JWT verification middleware
│   ├── models/
│   │   ├── User.js             # User accounts & encrypted keystore schema
│   │   ├── Transaction.js      # Transaction history schema
│   │   └── Contact.js          # Address book contacts schema
│   ├── routes/
│   │   ├── auth.js             # Register, Login, /me routes
│   │   ├── wallet.js           # Encrypted keystore backup (PUT / GET)
│   │   ├── transactions.js     # Transaction audit log (POST / GET)
│   │   └── contacts.js         # Contacts CRUD (GET, POST, DELETE)
│   ├── app.js                  # Express app, MongoDB connection & CORS
│   ├── package.json
│   └── .env.example
├── postman_collection.json     # Ready-to-import Postman API collection
├── package.json                # Root orchestration package
└── README.md
```

---

## 🛠️ Installation & Setup Guide

### Prerequisites
- **Node.js** v18+ or v20+
- **MongoDB** (Local `mongod` or free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster)

### Step 1: Configure Environment Variables

**Server Configuration (`server/.env`):**
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/crypto_wallet?retryWrites=true&w=majority
JWT_SECRET=super_secure_final_year_project_crypto_wallet_secret_key_2026
CLIENT_URL=http://localhost:5173
```
*(If testing locally with a local MongoDB instance, use `mongodb://127.0.0.1:27017/crypto_wallet`)*

**Client Configuration (`client/.env`):**
```env
VITE_API_URL=http://localhost:5000/api
VITE_SEPOLIA_RPC=https://ethereum-sepolia-rpc.publicnode.com
VITE_EXPLORER_URL=https://sepolia.etherscan.io
```

### Step 2: Install Dependencies & Run

From the root project folder:

```bash
# 1. Install server dependencies
npm run install:server

# 2. Install client dependencies
npm run install:client

# 3. Start Backend Server (runs on http://localhost:5000)
npm run server

# 4. In a second terminal, start Frontend (runs on http://localhost:5173)
npm run client
```

Now open `http://localhost:5173` in your browser.

---

## 📡 API Endpoint Reference

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Create user account | No |
| `POST` | `/api/auth/login` | Authenticate user & return JWT | No |
| `GET` | `/api/auth/me` | Fetch profile & wallet backup status | Yes (Bearer Token) |
| `PUT` | `/api/wallet` | Save public address & encrypted keystore | Yes (Bearer Token) |
| `GET` | `/api/wallet` | Fetch encrypted keystore for cross-device restore | Yes (Bearer Token) |
| `POST` | `/api/transactions` | Record transaction after browser broadcast | Yes (Bearer Token) |
| `GET` | `/api/transactions` | List user transaction history (filter by asset) | Yes (Bearer Token) |
| `GET` | `/api/contacts` | List address book contacts | Yes (Bearer Token) |
| `POST` | `/api/contacts` | Add new contact | Yes (Bearer Token) |
| `DELETE` | `/api/contacts/:id` | Delete contact | Yes (Bearer Token) |
| `GET` | `/api/health` | Server & database connection status | No |

---

## 🚰 Getting Free Sepolia Testnet ETH

To test transactions on Ethereum Sepolia, obtain free testnet ETH from any of these faucets:
1. **Google Cloud Web3 Faucet:** [https://cloud.google.com/application/web3/faucet/ethereum/sepolia](https://cloud.google.com/application/web3/faucet/ethereum/sepolia) (Fastest, no captcha)
2. **Alchemy Sepolia Faucet:** [https://sepoliafaucet.com](https://sepoliafaucet.com)
3. **Sepolia PoW Faucet:** [https://sepolia-faucet.pk910.de](https://sepolia-faucet.pk910.de) (Browser mining)

---

## 🔮 Future Scope for Project Report

1. **Bitcoin (BTC) & Multi-Chain Support:** Integrate `bitcoinjs-lib` and BIP-44 multi-coin derivation (`m/44'/0'/0'` for BTC, `m/44'/60'/0'` for ETH).
2. **Uniswap / DEX Token Swaps:** Integrate Uniswap v3 Router contracts on Sepolia for in-wallet token swapping.
3. **Price Alert Push Notifications:** WebSockets or Web Push API for live crypto price threshold triggers.
4. **Hardware Wallet & WebAuthn / Biometrics:** WebAuthn Passkeys and Ledger/Trezor USB integration.
5. **Cross-Platform Mobile Application:** React Native / Expo application utilizing the identical non-custodial cryptography services.
