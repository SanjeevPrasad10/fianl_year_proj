/**
 * generate_slides_pdf.js
 * Generates a high-quality 12-slide academic presentation deck in PDF format
 * tailored for Quantum University evaluators and BCA final year project viva.
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Final Year Project Presentation - Non-Custodial Crypto Wallet</title>
  <style>
    @page {
      size: A4 landscape;
      margin: 0;
    }
    *, *:before, *:after {
      box-sizing: border-box;
    }
    html, body {
      margin: 0;
      padding: 0;
      width: 297mm;
      height: 210mm;
      background: #f1f5f9;
      font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .slide {
      width: 297mm;
      height: 210mm;
      max-height: 210mm;
      page-break-after: always;
      page-break-inside: avoid;
      box-sizing: border-box;
      padding: 16mm 20mm 12mm 20mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: #ffffff;
      position: relative;
      overflow: hidden;
    }
    .slide:last-child {
      page-break-after: avoid;
    }

    /* Decorative top bar */
    .top-accent {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 6mm;
      background: linear-gradient(90deg, #052e16 0%, #14532d 50%, #166534 100%);
    }

    /* Header styling */
    .slide-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 3mm;
      margin-top: 2mm;
    }
    .header-titles {
      max-width: 75%;
    }
    .project-tag {
      font-size: 8.5pt;
      font-weight: 700;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      color: #15803d;
      margin-bottom: 1.5mm;
    }
    .slide-title {
      font-size: 19pt;
      font-weight: 800;
      color: #052e16;
      margin: 0;
      line-height: 1.2;
    }
    .slide-subtitle {
      font-size: 10pt;
      color: #475569;
      margin-top: 1mm;
    }
    .speaker-badge {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 6px;
      padding: 2.5mm 4mm;
      text-align: right;
    }
    .speaker-label {
      font-size: 8pt;
      font-weight: 600;
      text-transform: uppercase;
      color: #166534;
      letter-spacing: 0.8px;
    }
    .speaker-name {
      font-size: 10.5pt;
      font-weight: 700;
      color: #052e16;
    }

    /* Content Layouts */
    .slide-body {
      flex: 1;
      margin: 4.5mm 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 5mm;
      height: 100%;
    }
    .grid-3 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 4.5mm;
      height: 100%;
    }
    .grid-4 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 4mm;
      height: 100%;
    }

    /* Cards */
    .card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 4mm 5mm;
      display: flex;
      flex-direction: column;
    }
    .card-primary {
      background: #f0fdf4;
      border-color: #bbf7d0;
      border-left: 5px solid #15803d;
    }
    .card-dark {
      background: #052e16;
      color: #ffffff;
      border: none;
    }
    .card-dark h4 {
      color: #86efac !important;
    }
    .card-dark p, .card-dark li {
      color: #e2e8f0 !important;
    }

    .card h4 {
      margin: 0 0 2mm 0;
      font-size: 11.5pt;
      font-weight: 700;
      color: #052e16;
      display: flex;
      align-items: center;
      gap: 2mm;
    }
    .card p {
      margin: 0 0 2mm 0;
      font-size: 9.5pt;
      line-height: 1.45;
      color: #334155;
    }

    ul.bullet-list {
      margin: 0;
      padding-left: 5mm;
      font-size: 9.5pt;
      line-height: 1.5;
      color: #334155;
    }
    ul.bullet-list li {
      margin-bottom: 2mm;
    }
    ul.bullet-list li strong {
      color: #0f172a;
    }

    /* Callout & Highlights */
    .highlight-banner {
      background: #052e16;
      color: #ffffff;
      border-radius: 8px;
      padding: 3.5mm 5mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4mm;
    }
    .highlight-text {
      font-size: 11pt;
      font-weight: 700;
      color: #ffffff;
    }
    .highlight-sub {
      font-size: 9pt;
      color: #86efac;
    }

    /* Tables */
    table.slide-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 9pt;
      margin-top: 1mm;
    }
    table.slide-table th {
      background: #052e16;
      color: #ffffff;
      padding: 2.5mm 3.5mm;
      font-weight: 700;
      text-align: left;
      border: 1px solid #14532d;
    }
    table.slide-table td {
      padding: 2.2mm 3.5mm;
      border: 1px solid #cbd5e1;
      color: #1e293b;
    }
    table.slide-table tr:nth-child(even) td {
      background: #f8fafc;
    }

    /* Diagram blocks */
    .arch-diagram {
      background: #0f172a;
      border-radius: 8px;
      padding: 4mm;
      color: #f8fafc;
      font-family: Consolas, monospace;
      font-size: 8.5pt;
      line-height: 1.35;
      white-space: pre;
      overflow-x: auto;
      border-left: 4px solid #22c55e;
    }

    /* Footer styling */
    .slide-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #e2e8f0;
      padding-top: 2.5mm;
      font-size: 8.5pt;
      color: #64748b;
    }
    .footer-left {
      font-weight: 600;
      color: #15803d;
    }
    .footer-center {
      color: #94a3b8;
    }
    .footer-right {
      font-weight: 700;
      color: #052e16;
    }

    /* Title Slide Specifics */
    .title-slide {
      background: linear-gradient(135deg, #052e16 0%, #14532d 60%, #064e3b 100%);
      color: #ffffff;
      padding: 16mm 22mm 14mm 22mm;
    }
    .title-slide .top-accent {
      background: #22c55e;
      height: 4mm;
    }
    .title-badge {
      display: inline-block;
      background: rgba(34, 197, 94, 0.2);
      border: 1px solid #22c55e;
      color: #86efac;
      padding: 2mm 4mm;
      border-radius: 50px;
      font-size: 9pt;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-bottom: 5mm;
    }
    .title-main {
      font-size: 23pt;
      font-weight: 900;
      line-height: 1.25;
      color: #ffffff;
      margin: 0 0 3mm 0;
      max-width: 90%;
    }
    .title-sub {
      font-size: 12.5pt;
      color: #cbd5e1;
      margin-bottom: 7mm;
      font-weight: 400;
    }
    .title-members-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 4mm;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      padding: 4mm 5mm;
      margin-bottom: 5mm;
    }
    .member-box {
      border-right: 1px solid rgba(255, 255, 255, 0.15);
      padding-right: 3mm;
    }
    .member-box:last-child {
      border-right: none;
    }
    .member-role {
      font-size: 8pt;
      text-transform: uppercase;
      color: #86efac;
      font-weight: 700;
      margin-bottom: 1mm;
    }
    .member-name {
      font-size: 10.5pt;
      font-weight: 700;
      color: #ffffff;
    }
    .member-roll {
      font-size: 8.5pt;
      color: #94a3b8;
    }
    .title-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid rgba(255, 255, 255, 0.15);
      padding-top: 3mm;
      font-size: 9.5pt;
      color: #cbd5e1;
    }
  </style>
</head>
<body>

  <!-- ================= SLIDE 1: TITLE SLIDE ================= -->
  <div class="slide title-slide">
    <div class="top-accent"></div>
    <div>
      <div class="title-badge">Department of Computer Applications • BCA Project Viva 2026</div>
      <h1 class="title-main">Design &amp; Implementation of a Multi-Asset Non-Custodial Cryptocurrency Wallet</h1>
      <div class="title-sub">Client-Side Scrypt/AES-128 Encryption, BIP-39 Deterministic Derivation &amp; Ethereum Sepolia Testnet Integration</div>
    </div>

    <div>
      <div class="title-members-grid">
        <div class="member-box">
          <div class="member-role">Team Leader &amp; Architect</div>
          <div class="member-name">Sanjiv Prasad</div>
          <div class="member-roll">Roll No: 22001015001</div>
        </div>
        <div class="member-box">
          <div class="member-role">Frontend &amp; Cryptography</div>
          <div class="member-name">Team Member 2</div>
          <div class="member-roll">Roll No: 22001015002</div>
        </div>
        <div class="member-box">
          <div class="member-role">Blockchain &amp; Web3 Engine</div>
          <div class="member-name">Team Member 3</div>
          <div class="member-roll">Roll No: 22001015003</div>
        </div>
        <div class="member-box">
          <div class="member-role">Backend API &amp; Database</div>
          <div class="member-name">Team Member 4</div>
          <div class="member-roll">Roll No: 22001015004</div>
        </div>
      </div>

      <div class="title-footer">
        <div><strong>Institution:</strong> School of Technology, Quantum University, Roorkee</div>
        <div><strong>Mentorship:</strong> Project Guide &amp; Dr. Ankur Rana (Program Officer, CA)</div>
        <div><strong>Academic Year:</strong> 2026</div>
      </div>
    </div>
  </div>

  <!-- ================= SLIDE 2: MOTIVATION & PROBLEM STATEMENT ================= -->
  <div class="slide">
    <div class="top-accent"></div>
    <div class="slide-header">
      <div class="header-titles">
        <div class="project-tag">Project Motivation &amp; Problem Definition</div>
        <h2 class="slide-title">Why Non-Custodial Cryptocurrency Custody?</h2>
        <div class="slide-subtitle">Centralized vulnerability honeypots vs. mathematical self-sovereignty</div>
      </div>
      <div class="speaker-badge">
        <div class="speaker-label">Speaker</div>
        <div class="speaker-name">Member 1 (Leader)</div>
      </div>
    </div>

    <div class="slide-body">
      <div class="grid-2">
        <div class="card" style="border-left: 5px solid #dc2626;">
          <h4 style="color: #dc2626;">The Centralized Custody Hazard (CEXs)</h4>
          <p>Over 70% of digital asset users surrender their private keys to centralized exchanges, creating catastrophic single points of failure:</p>
          <ul class="bullet-list">
            <li><strong>"Not Your Keys, Not Your Coins":</strong> Centralized servers hold omnibus hot wallets. Users only hold promissory database balances.</li>
            <li><strong>Historical Insolvencies:</strong> FTX ($8.9B lost), Mt. Gox ($460M stolen), Celsius ($4.7B deficit) proved custodians freeze assets arbitrarily.</li>
            <li><strong>Honeypot Exploits:</strong> Central databases attract sophisticated APT attacks, credential stuffing, and insider threats.</li>
          </ul>
        </div>

        <div class="card card-primary">
          <h4>Our Non-Custodial Solution Architecture</h4>
          <p>We engineered a self-sovereign web wallet where user autonomy is guaranteed by client-side mathematics:</p>
          <ul class="bullet-list">
            <li><strong>Zero Server Key Knowledge:</strong> Private keys and mnemonics are generated, encrypted, and signed <em>strictly in client RAM</em>.</li>
            <li><strong>Memory-Hard Encryption:</strong> Scrypt Key Derivation Function (KDF) + AES-128-CTR prevents offline password cracking.</li>
            <li><strong>EVM Compatibility:</strong> Real-time transfer and balance queries across Ethereum Sepolia testnet and ERC-20 smart contracts.</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <div class="footer-left">Quantum University • Department of Computer Applications</div>
      <div class="footer-center">BCA Final Year Project Report Presentation</div>
      <div class="footer-right">Slide 2 of 12</div>
    </div>
  </div>

  <!-- ================= SLIDE 3: PROPOSED SOLUTION & CORE CAPABILITIES ================= -->
  <div class="slide">
    <div class="top-accent"></div>
    <div class="slide-header">
      <div class="header-titles">
        <div class="project-tag">System Features &amp; Scope</div>
        <h2 class="slide-title">Proposed Solution &amp; Technical Capabilities</h2>
        <div class="slide-subtitle">Bridging decentralized cryptographic sovereignty with enterprise user experience</div>
      </div>
      <div class="speaker-badge">
        <div class="speaker-label">Speaker</div>
        <div class="speaker-name">Member 1 (Leader)</div>
      </div>
    </div>

    <div class="slide-body">
      <div class="grid-3">
        <div class="card">
          <h4>Multi-Asset EVM Support</h4>
          <p>Seamless concurrent tracking and transfer of multiple crypto assets on Sepolia:</p>
          <ul class="bullet-list">
            <li>Native <strong>Sepolia ETH</strong> (Layer-1)</li>
            <li><strong>USDC</strong> (Mock ERC-20 Token)</li>
            <li><strong>LINK</strong> (Chainlink Mock Token)</li>
            <li>Live USD conversion via CoinGecko API</li>
          </ul>
        </div>

        <div class="card">
          <h4>Client-Side Cryptography</h4>
          <p>Standardized Web3 key derivation and storage protocols:</p>
          <ul class="bullet-list">
            <li><strong>BIP-39 Mnemonic:</strong> 128-bit CSPRNG entropy yielding 12 dictionary words</li>
            <li><strong>BIP-44 Derivation:</strong> <code>m/44'/60'/0'/0/0</code></li>
            <li><strong>Scrypt + AES-128-CTR:</strong> Standard Web3 JSON keystore with MAC check</li>
          </ul>
        </div>

        <div class="card">
          <h4>Full-Stack Integration</h4>
          <p>Modern cloud services without compromising zero-knowledge posture:</p>
          <ul class="bullet-list">
            <li><strong>Encrypted Cloud Sync:</strong> Backup keystore to MongoDB for cross-device access</li>
            <li><strong>Dynamic EIP-1559:</strong> Automated base fee &amp; priority tip calculation</li>
            <li><strong>Address Book:</strong> Rapid verified recipient directory</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <div class="footer-left">Quantum University • Department of Computer Applications</div>
      <div class="footer-center">BCA Final Year Project Report Presentation</div>
      <div class="footer-right">Slide 3 of 12</div>
    </div>
  </div>

  <!-- ================= SLIDE 4: SYSTEM ARCHITECTURE ================= -->
  <div class="slide">
    <div class="top-accent"></div>
    <div class="slide-header">
      <div class="header-titles">
        <div class="project-tag">Architecture &amp; Data Flow</div>
        <h2 class="slide-title">Tripartite System Architecture</h2>
        <div class="slide-subtitle">Strict boundary isolation between Client Browser, Application Server, and Blockchain RPC</div>
      </div>
      <div class="speaker-badge">
        <div class="speaker-label">Speaker</div>
        <div class="speaker-name">Member 1 (Leader)</div>
      </div>
    </div>

    <div class="slide-body">
      <div class="grid-2">
        <div>
          <div class="arch-diagram">
+-------------------------------------------------------------+
|               CLIENT BROWSER (React 18 + Vite)              |
|  - BIP-39 Keygen &amp; 12-Word Mnemonic Display                 |
|  - Scrypt Password Derivation &amp; AES-128-CTR Keystore        |
|  - Local ECDSA Transaction Signing (ethers.js v6)           |
+------------------------------+------------------------------+
               |                               |
  (1) Signed Raw Tx Hex          (2) Bearer JWT Auth &amp;
      Over JSON-RPC 2.0              Encrypted Keystore Blob
               |                               |
               v                               v
+-------------------------------+  +--------------------------+
|  ETHEREUM SEPOLIA TESTNET     |  | NODE.JS / EXPRESS SERVER |
|  - JSON-RPC Provider (Node)   |  | - JWT Verification       |
|  - Mempool &amp; EVM Execution    |  | - bcrypt Password Hash   |
|  - Etherscan Block Explorer   |  | - Zero-Knowledge Storage |
+-------------------------------+  +------------+-------------+
                                                |
                                                v
                                   +--------------------------+
                                   |     MONGODB DATABASE     |
                                   | - Users Collection       |
                                   | - Transactions History   |
                                   | - Address Book Contacts  |
                                   +--------------------------+</div>
        </div>

        <div class="card card-primary">
          <h4>Key Architectural Invariants</h4>
          <ul class="bullet-list">
            <li><strong>Cryptographic Isolation:</strong> Unencrypted private keys and seed phrases exist exclusively in transient React Context memory.</li>
            <li><strong>Untrusted Server Model:</strong> The Node/Express backend never sees private keys. It only receives the AES-128 ciphertext keystore for backup.</li>
            <li><strong>Direct Blockchain Communication:</strong> Balance queries and signed raw transactions are sent directly from browser to Sepolia RPC nodes.</li>
            <li><strong>Non-Custodial Invariant:</strong> Even if the backend server and MongoDB database are compromised, funds cannot be stolen.</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <div class="footer-left">Quantum University • Department of Computer Applications</div>
      <div class="footer-center">BCA Final Year Project Report Presentation</div>
      <div class="footer-right">Slide 4 of 12</div>
    </div>
  </div>

  <!-- ================= SLIDE 5: SECURITY MODEL (CRITICAL VIVA TOPIC) ================= -->
  <div class="slide">
    <div class="top-accent"></div>
    <div class="slide-header">
      <div class="header-titles">
        <div class="project-tag">Cryptographic Defense &amp; Threat Modeling</div>
        <h2 class="slide-title">The Non-Custodial Security Model</h2>
        <div class="slide-subtitle">Dual-password defense, memory-hard derivation, and ephemeral session sanitization</div>
      </div>
      <div class="speaker-badge">
        <div class="speaker-label">Speaker</div>
        <div class="speaker-name">Member 1 (Leader)</div>
      </div>
    </div>

    <div class="slide-body">
      <div class="grid-3">
        <div class="card">
          <h4>1. Dual-Password Paradigm</h4>
          <p>Complete decoupling of user identity from cryptographic spending authority:</p>
          <ul class="bullet-list">
            <li><strong>Account Login Password:</strong> Hashed on the backend via <code>bcryptjs</code> (10 salt rounds) for portal authentication.</li>
            <li><strong>Wallet Keystore Password:</strong> Used exclusively in the browser to derive the AES symmetric key via <code>Scrypt</code>.</li>
            <li><strong>Defense:</strong> Database administrators cannot decrypt user wallets.</li>
          </ul>
        </div>

        <div class="card card-primary">
          <h4>2. Memory-Hard Scrypt KDF</h4>
          <p>Guarding against offline brute-force and dictionary attacks:</p>
          <ul class="bullet-list">
            <li><strong>Cost Parameters:</strong> <code>N = 131,072</code>, <code>r = 8</code>, <code>p = 1</code>.</li>
            <li><strong>RAM Requirement:</strong> Demands <strong>128 MB RAM</strong> per guess, rendering ASIC/GPU parallel cracking cost-prohibitive.</li>
            <li><strong>Integrity MAC:</strong> <code>Keccak-256(MK || Ciphertext)</code> detects invalid password attempts immediately.</li>
          </ul>
        </div>

        <div class="card">
          <h4>3. Ephemeral Memory Lifecycle</h4>
          <p>Preventing cross-site scripting (XSS) and heap inspection:</p>
          <ul class="bullet-list">
            <li>No plaintext keys stored in <code>localStorage</code> or <code>sessionStorage</code>.</li>
            <li><strong>Session Lock:</strong> Clicking "Lock Wallet" zeros out the active <code>ethers.Wallet</code> instance in React state.</li>
            <li>Garbage collector immediately sweeps cryptographic variables from RAM.</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <div class="footer-left">Quantum University • Department of Computer Applications</div>
      <div class="footer-center">BCA Final Year Project Report Presentation</div>
      <div class="footer-right">Slide 5 of 12</div>
    </div>
  </div>

  <!-- ================= SLIDE 6: FRONTEND & CLIENT CRYPTOGRAPHY ================= -->
  <div class="slide">
    <div class="top-accent"></div>
    <div class="slide-header">
      <div class="header-titles">
        <div class="project-tag">Frontend Engineering &amp; UX</div>
        <h2 class="slide-title">Client-Side Cryptography &amp; UI Architecture</h2>
        <div class="slide-subtitle">Hierarchical deterministic derivation, mnemonic recovery, and institutional UI design</div>
      </div>
      <div class="speaker-badge">
        <div class="speaker-label">Speaker</div>
        <div class="speaker-name">Member 2 (Frontend)</div>
      </div>
    </div>

    <div class="slide-body">
      <div class="grid-2">
        <div class="card">
          <h4>BIP-39 &amp; BIP-44 Mathematical Pipeline</h4>
          <p>Step-by-step key derivation executed entirely inside the browser sandbox:</p>
          <ul class="bullet-list">
            <li><strong>Entropy Sampling:</strong> <code>window.crypto.getRandomValues()</code> produces 128 bits of cryptographically secure pseudo-random entropy.</li>
            <li><strong>Mnemonic Mapping:</strong> Concatenated with 4-bit SHA-256 checksum to produce 132 bits, divided into twelve 11-bit segments mapped to the BIP-39 English dictionary.</li>
            <li><strong>Seed Derivation:</strong> PBKDF2 with HMAC-SHA512 (2,048 rounds) transforms the mnemonic into a 512-bit binary seed.</li>
            <li><strong>BIP-44 Tree:</strong> Derives child private key at path <code>m/44'/60'/0'/0/0</code>.</li>
            <li><strong>Address Generation:</strong> Keccak-256 hash of the Secp256k1 public key coordinates; rightmost 20 bytes prefixed with <code>0x</code>.</li>
          </ul>
        </div>

        <div class="card card-primary">
          <h4>Frontend Engineering Highlights</h4>
          <ul class="bullet-list">
            <li><strong>Modern Framework:</strong> Built with React 18, Vite bundler, and Tailwind CSS.</li>
            <li><strong>Institutional Design System:</strong> Clean forest green (<code>#052e16</code>, <code>#14532d</code>) and white palette with zero decorative emojis/icons for financial sobriety.</li>
            <li><strong>Mnemonic Custody Check:</strong> Enforces interactive re-ordering of seed words before wallet creation completes.</li>
            <li><strong>Dual Recovery Paths:</strong> Supports wallet import via 12-word seed phrase or 64-character raw private key hex.</li>
            <li><strong>Modular State:</strong> Clean separation between <code>AuthContext</code> (JWT identity) and <code>WalletContext</code> (cryptographic keys).</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <div class="footer-left">Quantum University • Department of Computer Applications</div>
      <div class="footer-center">BCA Final Year Project Report Presentation</div>
      <div class="footer-right">Slide 6 of 12</div>
    </div>
  </div>

  <!-- ================= SLIDE 7: BLOCKCHAIN & WEB3 ENGINE ================= -->
  <div class="slide">
    <div class="top-accent"></div>
    <div class="slide-header">
      <div class="header-titles">
        <div class="project-tag">Web3 Engine &amp; Smart Contracts</div>
        <h2 class="slide-title">Blockchain Operations &amp; Gas Mechanics</h2>
        <div class="slide-subtitle">EIP-1559 dynamic fee calculation, JSON-RPC 2.0 provider, and ERC-20 token interface</div>
      </div>
      <div class="speaker-badge">
        <div class="speaker-label">Speaker</div>
        <div class="speaker-name">Member 3 (Blockchain)</div>
      </div>
    </div>

    <div class="slide-body">
      <div class="grid-2">
        <div class="card">
          <h4>EIP-1559 Dynamic Fee Estimation</h4>
          <p>Replacing legacy first-price auctions with algorithmic gas optimization:</p>
          <ul class="bullet-list">
            <li><strong>Formula:</strong> <code>Max Fee = (2 × Base Fee) + Max Priority Fee</code>.</li>
            <li><strong>Base Fee:</strong> Queried dynamically via <code>eth_feeHistory</code> RPC call. Automatically burned by the network.</li>
            <li><strong>Priority Fee (Tip):</strong> Paid directly to proof-of-stake validators to guarantee block inclusion.</li>
            <li><strong>Gas Limits:</strong>
              <br>• Native ETH Transfer: Fixed at <code>21,000</code> units.
              <br>• ERC-20 Transfer: Estimated dynamically via <code>contract.estimateGas.transfer()</code> with a 20% buffer (typically ~46,000 units).</li>
          </ul>
        </div>

        <div class="card card-primary">
          <h4>Smart Contract &amp; RPC Infrastructure</h4>
          <ul class="bullet-list">
            <li><strong>Network Configuration:</strong> Ethereum Sepolia Testnet (Chain ID: <code>11155111</code>) with high-availability Infura/Alchemy RPC endpoints.</li>
            <li><strong>EIP-155 Replay Protection:</strong> Chain ID embedded into ECDSA signature (v-param) prevents replay attacks on Ethereum Mainnet or testnets.</li>
            <li><strong>ERC-20 ABI Interfacing:</strong> Read-only <code>eth_call</code> for <code>balanceOf()</code> and state-modifying signed <code>transfer(address,uint256)</code> calls.</li>
            <li><strong>Real-Time USD Valuation:</strong> Asynchronous CoinGecko API integration with fallback price caching.</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <div class="footer-left">Quantum University • Department of Computer Applications</div>
      <div class="footer-center">BCA Final Year Project Report Presentation</div>
      <div class="footer-right">Slide 7 of 12</div>
    </div>
  </div>

  <!-- ================= SLIDE 8: BACKEND API & DATABASE ================= -->
  <div class="slide">
    <div class="top-accent"></div>
    <div class="slide-header">
      <div class="header-titles">
        <div class="project-tag">Server Infrastructure &amp; Persistence</div>
        <h2 class="slide-title">Backend REST API &amp; Database Architecture</h2>
        <div class="slide-subtitle">Stateless JWT authentication, MongoDB schemas, and zero-knowledge cloud backup</div>
      </div>
      <div class="speaker-badge">
        <div class="speaker-label">Speaker</div>
        <div class="speaker-name">Member 4 (Backend)</div>
      </div>
    </div>

    <div class="slide-body">
      <div class="grid-2">
        <div class="card">
          <h4>MongoDB Document Schemas (3 Collections)</h4>
          <ul class="bullet-list">
            <li><strong>1. Users Collection:</strong>
              <br><code>username</code>, <code>email</code> (unique index), <code>passwordHash</code> (bcrypt), <code>walletAddress</code>, <code>encryptedKeystore</code> (Scrypt/AES blob), <code>createdAt</code>.
            </li>
            <li><strong>2. Transactions Collection:</strong>
              <br><code>userId</code>, <code>txHash</code> (unique index), <code>from</code>, <code>to</code>, <code>value</code>, <code>asset</code> (ETH/USDC/LINK), <code>status</code>, <code>timestamp</code>.
            </li>
            <li><strong>3. Contacts Collection:</strong>
              <br><code>userId</code>, <code>name</code>, <code>address</code> (hex validated), <code>notes</code>, <code>createdAt</code>.
            </li>
          </ul>
        </div>

        <div class="card card-primary">
          <h4>RESTful API Endpoints (Express.js)</h4>
          <table class="slide-table">
            <thead>
              <tr><th>Endpoint</th><th>Method</th><th>Auth</th><th>Description</th></tr>
            </thead>
            <tbody>
              <tr><td><code>/api/auth/register</code></td><td>POST</td><td>Public</td><td>Registers user &amp; issues JWT</td></tr>
              <tr><td><code>/api/auth/login</code></td><td>POST</td><td>Public</td><td>Validates password via bcrypt</td></tr>
              <tr><td><code>/api/wallet/keystore</code></td><td>POST/GET</td><td>Bearer JWT</td><td>Syncs encrypted keystore blob</td></tr>
              <tr><td><code>/api/transactions</code></td><td>POST/GET</td><td>Bearer JWT</td><td>Logs &amp; queries tx history</td></tr>
              <tr><td><code>/api/contacts</code></td><td>GET/POST</td><td>Bearer JWT</td><td>Manages verified recipient list</td></tr>
              <tr><td><code>/api/health</code></td><td>GET</td><td>Public</td><td>Verifies server &amp; DB status</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <div class="footer-left">Quantum University • Department of Computer Applications</div>
      <div class="footer-center">BCA Final Year Project Report Presentation</div>
      <div class="footer-right">Slide 8 of 12</div>
    </div>
  </div>

  <!-- ================= SLIDE 9: LIVE DEMO WORKFLOW ================= -->
  <div class="slide">
    <div class="top-accent"></div>
    <div class="slide-header">
      <div class="header-titles">
        <div class="project-tag">Practical Verification &amp; Walkthrough</div>
        <h2 class="slide-title">Live System Demonstration Workflow</h2>
        <div class="slide-subtitle">Step-by-step presentation roadmap for the live Sepolia testnet execution</div>
      </div>
      <div class="speaker-badge">
        <div class="speaker-label">Speakers</div>
        <div class="speaker-name">All Team Members</div>
      </div>
    </div>

    <div class="slide-body">
      <div class="grid-4">
        <div class="card">
          <h4 style="font-size: 10.5pt;">Step 1: Auth &amp; Keystore</h4>
          <p style="font-size: 8.5pt;"><strong>Member 2 (Frontend)</strong></p>
          <ul class="bullet-list" style="font-size: 8.5pt;">
            <li>Log into portal with user credentials.</li>
            <li>Demonstrate 12-word mnemonic phrase generation &amp; word verification.</li>
            <li>Set wallet password to trigger Scrypt KDF encryption.</li>
          </ul>
        </div>

        <div class="card">
          <h4 style="font-size: 10.5pt;">Step 2: Session Security</h4>
          <p style="font-size: 8.5pt;"><strong>Member 2 (Frontend)</strong></p>
          <ul class="bullet-list" style="font-size: 8.5pt;">
            <li>Show Multi-Asset Dashboard (ETH, USDC, LINK).</li>
            <li>Click <strong>"Lock Wallet"</strong>: Proves in-memory signer is zeroed out.</li>
            <li>Re-enter password to decrypt keystore and unlock wallet.</li>
          </ul>
        </div>

        <div class="card card-primary">
          <h4 style="font-size: 10.5pt;">Step 3: Live Transfer</h4>
          <p style="font-size: 8.5pt;"><strong>Member 3 (Blockchain)</strong></p>
          <ul class="bullet-list" style="font-size: 8.5pt;">
            <li>Select recipient from Address Book.</li>
            <li>Show dynamic EIP-1559 gas fee estimation.</li>
            <li>Sign transaction in browser; broadcast raw hex to Sepolia.</li>
            <li>Open Etherscan link to verify confirmed block!</li>
          </ul>
        </div>

        <div class="card">
          <h4 style="font-size: 10.5pt;">Step 4: Database Audit</h4>
          <p style="font-size: 8.5pt;"><strong>Member 4 (Backend)</strong></p>
          <ul class="bullet-list" style="font-size: 8.5pt;">
            <li>Open MongoDB Compass to inspect transaction record.</li>
            <li>Demonstrate that <code>encryptedKeystore</code> is pure ciphertext.</li>
            <li>Zero-knowledge proof: server cannot access private keys.</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <div class="footer-left">Quantum University • Department of Computer Applications</div>
      <div class="footer-center">BCA Final Year Project Report Presentation</div>
      <div class="footer-right">Slide 9 of 12</div>
    </div>
  </div>

  <!-- ================= SLIDE 10: TESTING & BENCHMARKING ================= -->
  <div class="slide">
    <div class="top-accent"></div>
    <div class="slide-header">
      <div class="header-titles">
        <div class="project-tag">Empirical Results &amp; Quality Assurance</div>
        <h2 class="slide-title">Testing, Benchmarking &amp; Performance Metrics</h2>
        <div class="slide-subtitle">Cryptographic latency benchmarks, gas utilization, and 100% test case pass rate</div>
      </div>
      <div class="speaker-badge">
        <div class="speaker-label">Speaker</div>
        <div class="speaker-name">Member 4 (Backend)</div>
      </div>
    </div>

    <div class="slide-body">
      <div class="grid-2">
        <div class="card">
          <h4>Key Derivation Benchmarking (50 Iterations)</h4>
          <table class="slide-table">
            <thead>
              <tr><th>KDF Algorithm</th><th>Parameters</th><th>Mean Latency</th><th>Memory</th></tr>
            </thead>
            <tbody>
              <tr><td>PBKDF2-SHA256</td><td>c = 10,000</td><td>42.6 ms</td><td>&lt; 2 MB (GPU vulnerable)</td></tr>
              <tr><td>PBKDF2-SHA256</td><td>c = 100,000</td><td>385.2 ms</td><td>&lt; 2 MB (GPU vulnerable)</td></tr>
              <tr><td>Scrypt (Selected)</td><td>N=131072, r=8</td><td>342.8 ms</td><td><strong>128 MB RAM (Hardware bounded)</strong></td></tr>
              <tr><td>Scrypt (Paranoid)</td><td>N=262144, r=8</td><td>718.5 ms</td><td>256 MB RAM</td></tr>
            </tbody>
          </table>
          <p style="margin-top: 2mm; font-size: 8.5pt; color: #475569;">
            <em>Conclusion:</em> <code>Scrypt (N=131072)</code> provides the optimal balance of sub-second UX latency and 128 MB RAM brute-force resistance.
          </p>
        </div>

        <div class="card card-primary">
          <h4>QA &amp; Test Suite Validation (20 Test Cases)</h4>
          <ul class="bullet-list">
            <li><strong>100% Test Case Pass Rate:</strong> All 20 formal test scenarios (TC-01 through TC-20) verified across team members.</li>
            <li><strong>Gas Utilization Efficiency:</strong>
              <br>• Native ETH Transfer: 21,000 units consumed (100% efficiency).
              <br>• ERC-20 Transfer: 46,128 units consumed out of 65,000 allocated.</li>
            <li><strong>Security Auditing:</strong> Network payload sniffing verified zero transmission of private keys or unencrypted seed words.</li>
            <li><strong>API Robustness:</strong> Automated Postman collection verified 10/10 endpoints with JWT and edge cases.</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <div class="footer-left">Quantum University • Department of Computer Applications</div>
      <div class="footer-center">BCA Final Year Project Report Presentation</div>
      <div class="footer-right">Slide 10 of 12</div>
    </div>
  </div>

  <!-- ================= SLIDE 11: FUTURE SCOPE & ROADMAP ================= -->
  <div class="slide">
    <div class="top-accent"></div>
    <div class="slide-header">
      <div class="header-titles">
        <div class="project-tag">Roadmap &amp; Scalability</div>
        <h2 class="slide-title">Future Scope &amp; Production Roadmap</h2>
        <div class="slide-subtitle">Account Abstraction (ERC-4337), Multi-Party Computation, and Layer-2 Scaling</div>
      </div>
      <div class="speaker-badge">
        <div class="speaker-label">Speaker</div>
        <div class="speaker-name">Member 4 (Backend)</div>
      </div>
    </div>

    <div class="slide-body">
      <div class="grid-3">
        <div class="card">
          <h4>1. ERC-4337 Account Abstraction</h4>
          <p>Transforming Externally Owned Accounts into smart contract wallets:</p>
          <ul class="bullet-list">
            <li><strong>Social Recovery:</strong> Eliminate single seed loss using guardian contacts.</li>
            <li><strong>Paymaster Gas Sponsorship:</strong> Allow dApps to sponsor gas or pay fees directly in USDC stablecoin.</li>
            <li><strong>Session Keys:</strong> Automated permissioned micro-transactions.</li>
          </ul>
        </div>

        <div class="card card-primary">
          <h4>2. Multi-Party Computation (MPC)</h4>
          <p>Threshold Signature Schemes (TSS) without single points of failure:</p>
          <ul class="bullet-list">
            <li>Split private key into 3 mathematical secret shares (2-of-3 threshold).</li>
            <li>Share 1 on client, Share 2 on server, Share 3 on recovery backup.</li>
            <li>Private key is never reconstructed anywhere in complete form.</li>
          </ul>
        </div>

        <div class="card">
          <h4>3. Hardware &amp; Layer-2 Rollups</h4>
          <p>Production hardware enclaves and high-throughput scaling:</p>
          <ul class="bullet-list">
            <li><strong>WebAuthn / Passkeys:</strong> Biometric authentication via Touch ID, Face ID, and Windows Hello.</li>
            <li><strong>WebHID Integration:</strong> Direct USB signing with Ledger &amp; Trezor hardware wallets.</li>
            <li><strong>Layer-2 Rollups:</strong> Integration with Arbitrum, Optimism, and Base for 95% gas reduction.</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <div class="footer-left">Quantum University • Department of Computer Applications</div>
      <div class="footer-center">BCA Final Year Project Report Presentation</div>
      <div class="footer-right">Slide 11 of 12</div>
    </div>
  </div>

  <!-- ================= SLIDE 12: CONCLUSION & VIVA DEFENSE ================= -->
  <div class="slide" style="background: linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%);">
    <div class="top-accent"></div>
    <div class="slide-header">
      <div class="header-titles">
        <div class="project-tag">Project Conclusion &amp; Acknowledgements</div>
        <h2 class="slide-title">Conclusion &amp; Evaluator Q&amp;A Session</h2>
        <div class="slide-subtitle">Summary of academic outcomes and open panel viva defense</div>
      </div>
      <div class="speaker-badge">
        <div class="speaker-label">Session Lead</div>
        <div class="speaker-name">Member 1 (Leader)</div>
      </div>
    </div>

    <div class="slide-body">
      <div class="grid-2">
        <div class="card card-dark">
          <h4>Project Summary &amp; Core Contributions</h4>
          <ul class="bullet-list">
            <li><strong>Self-Sovereign Architecture:</strong> Successfully eliminated centralized third-party custody risks by enforcing client-side key generation and transaction signing.</li>
            <li><strong>Industrial Security Standards:</strong> Engineered memory-hard Scrypt (N=131072) + AES-128-CTR keystore encryption with Keccak-256 MAC verification.</li>
            <li><strong>Live Blockchain Proof:</strong> Confirmed real-world asset transfers and smart contract interactions on the public Ethereum Sepolia network.</li>
            <li><strong>Zero-Knowledge Cloud Sync:</strong> Delivered cross-device convenience without sacrificing cryptographic privacy.</li>
          </ul>
        </div>

        <div class="card" style="border: 2px dashed #15803d; justify-content: center; text-align: center; padding: 6mm;">
          <h3 style="font-size: 16pt; color: #052e16; margin-bottom: 2mm;">Thank You!</h3>
          <p style="font-size: 10pt; color: #475569; margin-bottom: 4mm;">
            We express our deepest gratitude to our Project Guide, <strong>Dr. Ankur Rana</strong> (Program Officer, CA), <strong>Dr. Mridula</strong> (HoD, CA), and the esteemed evaluation panel of Quantum University.
          </p>
          <div style="background: #052e16; color: #ffffff; border-radius: 6px; padding: 3mm; font-weight: 700; font-size: 11pt;">
            We now welcome questions from the honorable panel.
          </div>
          <p style="font-size: 8.5pt; color: #64748b; margin-top: 3mm;">
            GitHub Repository: <code>github.com/SanjeevPrasad10/fianl_year_proj</code>
          </p>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <div class="footer-left">Quantum University • Department of Computer Applications</div>
      <div class="footer-center">BCA Final Year Project Report Presentation</div>
      <div class="footer-right">Slide 12 of 12</div>
    </div>
  </div>

</body>
</html>
`;

const htmlPath = path.join(__dirname, 'PRESENTATION_SLIDES.html');
const pdfPath = path.join(__dirname, 'PRESENTATION_SLIDES.pdf');

fs.writeFileSync(htmlPath, htmlContent, 'utf8');
console.log('Saved PRESENTATION_SLIDES.html successfully.');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const args = [
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  '--no-pdf-header-footer',
  `--print-to-pdf=${pdfPath}`,
  htmlPath
];

console.log('Compiling 12-slide presentation PDF via headless Chrome...');
const result = spawnSync(chromePath, args, { encoding: 'utf8' });

if (fs.existsSync(pdfPath)) {
  const stat = fs.statSync(pdfPath);
  console.log(`SUCCESS! Generated presentation PDF: ${stat.size} bytes at ${pdfPath}`);
} else {
  console.error('Failed to generate PDF. Exit code:', result.status, 'stderr:', result.stderr);
}
