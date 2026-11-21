# Complete Frontend UI & Component Master Guide
**Project:** Multi-Currency Non-Custodial Web3 Crypto Wallet  
**Target Specialist:** Member 2 (Frontend Architecture & Client Cryptography UX)  
**Tech Stack:** React 18, React Router v6, Tailwind CSS 3.4, Lucide Icons, QRCode.react, Ethers.js v6, Vite  

---

## 1. Complete UI Sitemap & Routing (`client/src/App.jsx`)

The entire application consists of **11 pages** and **3 reusable layout components**:

```
client/src/
├── components/
│   ├── Navbar.jsx           <-- Sticky Top Bar (Brand, Sepolia Badge, Lock/Unlock, Theme)
│   ├── AssetCard.jsx        <-- Token Balance & Live USD Valuation Card
│   └── TxItem.jsx           <-- Transaction Row with Etherscan External Link
│
└── pages/
    ├── Login.jsx            <-- Account Login (Email & Password)
    ├── Register.jsx         <-- User Registration (Creates Cloud Backup Account)
    ├── Welcome.jsx          <-- Wallet Choice Gateway (Create vs Import)
    ├── CreateWallet.jsx     <-- 12-Word BIP-39 Seed Grid & Scrypt Encryption
    ├── ImportWallet.jsx     <-- Restore from 12-Word Phrase or Raw Private Key
    ├── Unlock.jsx           <-- Protected Keystore Decryption & Progress Bar
    ├── Dashboard.jsx        <-- Portfolio Balance Hero Card & Assets
    ├── Send.jsx             <-- Transfer Form, Dynamic Gas Estimator & Confirm Modal
    ├── Receive.jsx          <-- QR Code Display, Address Copy, & Faucets Directory
    ├── History.jsx          <-- Transaction Audit Log with Filter Tabs (ETH/USDC/LINK)
    ├── AddressBook.jsx      <-- Saved Contacts & 1-Click Send Directory
    └── Profile.jsx          <-- Account Settings & Encrypted Keystore Backup Status
```

---

## 2. Global Navigation & Layout (`client/src/components/Navbar.jsx`)

### Role in UI:
The sticky header visible across all authenticated screens. It shows the project brand, active testnet (`Sepolia`), quick links, theme toggle (Dark/Light), wallet lock button, and logout.

### Exact JSX & CSS:
```jsx
<header className="sticky top-0 z-50 bg-white dark:bg-darkcard border-b border-gray-200 dark:border-darkborder transition-colors">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16">
      {/* Brand & Network Pill */}
      <div className="flex items-center space-x-3">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-extrabold text-base tracking-tight text-forest-900 dark:text-forest-400 uppercase">
            Crypto Wallet
          </span>
          <span className="text-[10px] tracking-wider uppercase font-semibold px-2 py-0.5 rounded bg-forest-100 text-forest-800 dark:bg-forest-950 dark:text-forest-300 border border-forest-200 dark:border-forest-800">
            Non-Custodial
          </span>
        </Link>
        <span className="hidden sm:inline-block text-[11px] font-mono font-medium px-2 py-0.5 rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
          Sepolia
        </span>
      </div>

      {/* Desktop Navigation Links */}
      <nav className="hidden md:flex items-center space-x-1">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              isActive(link.path)
                ? 'bg-forest-800 text-white dark:bg-forest-700'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>

      {/* Right Controls: Lock Wallet, Dark Mode Toggle, User Logout */}
      <div className="flex items-center space-x-2">
        <button
          onClick={handleLock}
          className="p-1.5 rounded-md text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-xs font-mono font-semibold"
          title="Lock Wallet in Memory"
        >
          [Lock]
        </button>
        <button
          onClick={toggleTheme}
          className="p-1.5 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          title="Toggle Dark/Light Mode"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </div>
  </div>
</header>
```
* **Key CSS Utilities:**
  * `sticky top-0 z-50`: Keeps navbar anchored during page scroll.
  * `h-16`: Standard 64px modern header height.
  * `hidden md:flex`: Hides desktop links on mobile, showing a hamburger menu instead.

---

## 3. Onboarding & Cryptography Screens

### A. `client/src/pages/Welcome.jsx`
* **Role:** Introduces non-custodial concepts and provides two distinct pathways: creating a new wallet or importing an existing one.
* **Layout:** `max-w-4xl mx-auto px-4 py-12` with a `grid md:grid-cols-2 gap-6` split.
* **Security Box:** A highlighted footer banner (`bg-forest-50 dark:bg-forest-950/40 border border-forest-200`) detailing that private keys are never transmitted to the server in plaintext.

---

### B. `client/src/pages/CreateWallet.jsx`
* **Role:** Generates the random BIP-39 12-word seed phrase, allows offline backup, and encrypts the keystore with a local password.

#### 1. The 12-Word Seed Phrase Grid:
```jsx
<div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 p-4 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-darkborder">
  {words.map((word, idx) => (
    <div
      key={idx}
      className="flex items-center space-x-2 py-2 px-3 rounded-lg bg-white dark:bg-darkcard border border-gray-200 dark:border-gray-800 shadow-xs"
    >
      <span className="font-mono text-[10px] text-gray-400 select-none">
        {(idx + 1).toString().padStart(2, '0')}.
      </span>
      <span className="font-mono text-xs font-bold text-gray-900 dark:text-white">
        {word}
      </span>
    </div>
  ))}
</div>
```
* **Key CSS:**
  * `grid-cols-3 sm:grid-cols-4`: 3 columns on small screens, 4 columns on desktop (clean 3x4 grid).
  * `select-none`: Disables number selection so the user only copies clean word strings.

#### 2. Scrypt Key Derivation Progress Bar:
```jsx
<div className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
  <div
    className="h-full bg-forest-700 transition-all duration-200"
    style={{ width: `${encryptProgress}%` }}
  />
</div>
```
* **Key CSS:** `h-1.5 rounded-full overflow-hidden` with dynamic inline width percentage reflecting Web3 Scrypt CPU iterations.

---

### C. `client/src/pages/ImportWallet.jsx`
* **Role:** Restores a wallet from either a 12-word mnemonic phrase or a 64-character raw private key hex string.
* **UI Features:**
  * Tab toggle: `[12-Word Phrase]` vs `[Private Key Hex]`.
  * Multi-line textarea with `font-mono text-xs` and real-time checksum validation.
  * Password encryption inputs to store the newly restored keystore securely.

---

### D. `client/src/pages/Unlock.jsx`
* **Role:** The secure memory gatekeeper. When locked, keys are purged from RAM.
* **Layout:** Centered modal container (`min-h-[80vh] flex items-center justify-center`).
* **UI Features:** Password field with `Show / Hide` toggle and real-time decryption progress bar (`0% → 100%`).

---

## 4. Main Application Hub & Transactions

### A. `client/src/pages/Dashboard.jsx`

#### 1. Active Address & Explorer Bar:
```jsx
<div className="bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
  <div className="flex flex-col">
    <span className="text-[10px] uppercase font-mono font-bold text-gray-500">
      Active Wallet Address
    </span>
    <div className="flex items-center space-x-2 mt-0.5">
      <span className="font-mono text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
        {truncateAddress(walletAddress, 10, 8)}
      </span>
      <button onClick={handleCopy} className="text-[11px] font-mono text-forest-800 dark:text-forest-400 hover:underline">
        {copied ? '[Copied]' : '[Copy]'}
      </button>
      <a href={explorerAddressUrl} target="_blank" className="text-[11px] font-mono text-gray-500 underline">
        [Explorer]
      </a>
    </div>
  </div>
</div>
```

#### 2. Multi-Stop Gradient Hero Card (Total Estimated Portfolio):
```jsx
<div className="p-6 rounded-2xl bg-gradient-to-br from-forest-900 via-forest-800 to-emerald-900 text-white shadow-lg space-y-4">
  <div className="flex justify-between items-center text-xs text-emerald-200 font-mono">
    <span>TOTAL ESTIMATED PORTFOLIO</span>
    <span className="bg-white/10 px-2 py-0.5 rounded border border-white/20">Sepolia Testnet</span>
  </div>
  <div>
    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{totalUsdValue}</h2>
    <p className="text-xs text-emerald-100 mt-1">
      Live USD valuation calculated via CoinGecko pricing API
    </p>
  </div>
</div>
```

#### 3. Quick Action Buttons:
* **Send Button:** Routes directly to `/send`.
* **Receive Button:** Routes directly to `/receive`.
* **History Button:** Routes to `/history`.

#### 4. Token Cards List (`client/src/components/AssetCard.jsx`):
Renders balances for:
* **ETH** (Native Sepolia Ethereum)
* **USDC** (Sepolia ERC-20 Token)
* **LINK** (Sepolia Chainlink Token)
Displays token balance, current USD price, total USD holding value, and direct `[Send]` link.

---

### B. `client/src/pages/Send.jsx`
* **Role:** Constructs and signs transactions on client-side.

#### 1. Dynamic Gas Fee Estimator Box:
```jsx
<div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-darkborder text-xs space-y-1">
  <div className="flex justify-between items-center text-gray-600 dark:text-gray-400">
    <span>Estimated Gas Fee:</span>
    <span className="font-mono font-semibold text-gray-900 dark:text-white">
      {estimatingFee ? 'Calculating...' : `${feeData?.feeEth || '0.00042'} ETH`}
    </span>
  </div>
  <div className="flex justify-between text-[11px] text-gray-400 font-mono">
    <span>Gas Price: {feeData?.gasPriceGwei || '~1.5'} Gwei</span>
    <span>Gas Limit: {feeData?.gasLimit || '21,000'}</span>
  </div>
</div>
```

#### 2. 2-Step Confirmation Modal (Anti-Phishing / Safety Check):
```jsx
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
  <div className="w-full max-w-md bg-white dark:bg-darkcard border border-gray-200 dark:border-darkborder rounded-2xl p-6 shadow-2xl space-y-4">
    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
      Confirm Transaction
    </h3>
    <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border space-y-2 text-xs font-mono">
      <div className="flex justify-between">
        <span className="text-gray-500">Asset:</span>
        <span className="font-bold">{selectedAsset}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-500">Amount:</span>
        <span className="font-bold">{amount} {selectedAsset}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-500">Recipient:</span>
        <span className="font-bold">{truncateAddress(recipient, 6, 6)}</span>
      </div>
    </div>
    <div className="flex gap-3">
      <button onClick={() => setShowConfirmModal(false)} className="flex-1 py-2 border rounded-lg text-xs">
        Cancel
      </button>
      <button onClick={handleExecuteTransaction} className="flex-1 py-2 bg-forest-800 text-white rounded-lg text-xs font-bold">
        Confirm & Send
      </button>
    </div>
  </div>
</div>
```

---

### C. `client/src/pages/Receive.jsx`
* **Role:** Generates live QR code for the public Ethereum address and provides testnet faucet links.
* **QR Component:**
  ```jsx
  <div className="inline-block p-4 rounded-xl bg-white border border-gray-200 dark:border-gray-800 shadow-sm mb-6">
    <QRCodeSVG
      value={walletAddress}
      size={180}
      level="H"
      includeMargin={true}
      fgColor="#052e16"
    />
  </div>
  ```
* **Testnet Faucet Directory:** 3 curated cards linking directly to Google Cloud Web3 Faucet, Alchemy Sepolia Faucet, and PoW Faucet.

---

### D. `client/src/pages/History.jsx`
* **Role:** Audit trail of all sent/received transactions with links to Sepolia Etherscan.
* **Filter Pills:** `ALL`, `ETH`, `USDC`, `LINK` buttons styled with `bg-forest-800 text-white` when active.
* **Transaction Row (`TxItem.jsx`):** Displays status badge (`Confirmed` / `Pending`), timestamp, recipient/sender, amount, and an external link to `sepolia.etherscan.io/tx/{hash}`.

---

### E. `client/src/pages/AddressBook.jsx`
* **Role:** Fast contact management for frequent transfers.
* **Features:**
  * Contact list with Name, Avatar initial circle (`w-9 h-9 rounded-full bg-forest-100 font-bold`), and Truncated Ethereum address.
  * Action buttons: `[Copy Address]`, `[Send Crypto]` (auto-fills `/send?to={address}`), and `[Delete]`.
  * Add Contact Modal with live Ethereum address format validation.

---

### F. `client/src/pages/Profile.jsx`
* **Role:** User account settings and keystore backup inspection.
* **Features:**
  * Account email and creation date.
  * Encrypted Keystore status indicator (`Backed Up to Cloud [Encrypted]`).
  * Account password update form.

---

## 5. Master Tailwind CSS Cheat Sheet for Member 2

| Class Pattern | Purpose in this Project | Example Usage |
| :--- | :--- | :--- |
| `max-w-6xl mx-auto px-4` | Centers content and prevents ultra-wide distortion on large desktop monitors | Used on `Dashboard.jsx`, `Send.jsx` |
| `dark:bg-darkcard` | Custom dark-slate background (`#18191c`) for cards in dark mode | Used across all card containers |
| `border-forest-200 dark:border-forest-800` | Subtle green borders that change smoothly between light & dark mode | Used for security tags and cards |
| `font-mono` | Monospace typography for keys, addresses, and hashes | Seed phrase pills, hashes, Gwei numbers |
| `backdrop-blur-xs` | Glassmorphism blur on modal backgrounds | Transaction confirmation overlay |
| `break-all select-all` | Allows users to click once to highlight an entire 42-character address | `Receive.jsx` address display |
| `transition-colors duration-200` | Smooth color animation when toggling dark/light theme | Root `App.jsx` container |

---

## 6. What Member 2 Should Say in the Viva / Presentation

* **On Styling Strategy:**
  > *"We used Tailwind CSS 3.4 because utility-first styling allows us to enforce strict design tokens directly in markup. Dark mode is handled seamlessly via CSS variables and Tailwind's `dark:` variant, ensuring high contrast and accessibility across all cryptographic data displays."*

* **On Responsive Engineering:**
  > *"The wallet is 100% mobile-responsive. On desktop, the seed phrase renders in 4 columns and transactions in wide tables; on mobile phones, it shifts gracefully to 3 columns and stacked flex cards, ensuring users can securely manage crypto on any viewport size."*

* **On UX Security:**
  > *"Every destructive action has a confirmation boundary: transactions require a 2-step review modal with live gas estimation, and the wallet automatically locks its private key from browser memory on timeout or manual lock."*
