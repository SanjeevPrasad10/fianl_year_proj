/**
 * build_quantum_slides.js
 * Generates an official Quantum University branded presentation deck (PDF)
 * using the exact university slide templates (image1.jpeg for title, image3.jpeg for content).
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

// Load template images as base64
const img1Path = path.join(__dirname, 'assets', 'quantum_template', 'image1.jpeg');
const img3Path = path.join(__dirname, 'assets', 'quantum_template', 'image3.jpeg');

const img1Base64 = fs.readFileSync(img1Path).toString('base64');
const img3Base64 = fs.readFileSync(img3Path).toString('base64');

const img1Uri = `data:image/jpeg;base64,${img1Base64}`;
const img3Uri = `data:image/jpeg;base64,${img3Base64}`;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Quantum University BCA Final Year Presentation</title>
  <style>
    @page {
      size: 10in 7.5in; /* Exact 4:3 standard presentation ratio */
      margin: 0;
    }
    *, *:before, *:after {
      box-sizing: border-box;
    }
    html, body {
      margin: 0;
      padding: 0;
      width: 10in;
      height: 7.5in;
      font-family: 'Segoe UI', Arial, sans-serif;
      color: #1f2937;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .slide {
      width: 10in;
      height: 7.5in;
      max-height: 7.5in;
      page-break-after: always;
      page-break-inside: avoid;
      position: relative;
      overflow: hidden;
      box-sizing: border-box;
    }
    .slide:last-child {
      page-break-after: avoid;
    }

    /* ===================================================
       SLIDE 1: OFFICIAL QUANTUM TITLE SLIDE
       =================================================== */
    .title-slide {
      background-image: url('${img1Uri}');
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .title-purple-content {
      position: absolute;
      top: 0.6in;
      left: 0.8in;
      width: 5.6in;
      color: #ffffff;
    }
    .title-dept-badge {
      display: inline-block;
      background: rgba(255, 255, 255, 0.18);
      border: 1px solid rgba(255, 255, 255, 0.35);
      color: #fde047;
      padding: 3px 10px;
      border-radius: 20px;
      font-size: 9pt;
      font-weight: 700;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      margin-bottom: 12px;
    }
    .title-main-heading {
      font-size: 20pt;
      font-weight: 900;
      line-height: 1.25;
      color: #ffffff;
      margin: 0 0 10px 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }
    .title-sub-heading {
      font-size: 10.5pt;
      line-height: 1.4;
      color: #f3e8ff;
      margin-bottom: 14px;
    }
    .title-degree-tag {
      font-size: 11pt;
      font-weight: 700;
      color: #fde047;
      border-left: 3px solid #fde047;
      padding-left: 8px;
    }

    .title-white-content {
      position: absolute;
      top: 5.4in;
      left: 4.8in;
      width: 4.8in;
      color: #1f2937;
    }
    .title-members-box {
      background: rgba(255, 255, 255, 0.95);
      border-left: 4px solid #701c64;
      border-radius: 0 6px 6px 0;
      padding: 8px 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    }
    .title-members-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
      font-size: 8.5pt;
    }
    .tm-item strong {
      color: #701c64;
      display: block;
      font-size: 9pt;
    }
    .tm-item span {
      color: #64748b;
      font-size: 8pt;
    }
    .title-guide-row {
      margin-top: 8px;
      font-size: 8pt;
      color: #475569;
      border-top: 1px solid #e2e8f0;
      padding-top: 4px;
      display: flex;
      justify-content: space-between;
    }
    .title-guide-row strong {
      color: #0f172a;
    }

    /* ===================================================
       CONTENT SLIDES: OFFICIAL QUANTUM TEMPLATE
       =================================================== */
    .content-slide {
      background-image: url('${img3Uri}');
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    /* The yellow stripe area on image3.jpeg is from ~15% to 21% height */
    .slide-yellow-banner {
      position: absolute;
      top: 1.15in;
      left: 0.6in;
      right: 0.6in;
      height: 0.42in;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px;
    }
    .slide-main-title {
      font-size: 14pt;
      font-weight: 900;
      color: #701c64;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin: 0;
    }
    .slide-speaker-tag {
      background: #701c64;
      color: #ffffff;
      padding: 3px 10px;
      border-radius: 4px;
      font-size: 8pt;
      font-weight: 700;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }

    /* Content Canvas Area (Between yellow stripe and footer watermark) */
    .slide-canvas {
      position: absolute;
      top: 1.65in;
      left: 0.6in;
      right: 0.6in;
      height: 4.85in;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    /* Typography & Component Utilities */
    .slide-lead {
      font-size: 9.5pt;
      font-weight: 600;
      color: #4b5563;
      margin: 0 0 8px 0;
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 4px;
    }

    .grid-2col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      flex: 1;
    }
    .grid-3col {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 12px;
      flex: 1;
    }
    .grid-4col {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 10px;
      flex: 1;
    }

    .q-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 10px 14px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
      display: flex;
      flex-direction: column;
    }
    .q-card-purple {
      border-top: 3px solid #701c64;
      background: #fdfafd;
    }
    .q-card-gold {
      border-top: 3px solid #eab308;
      background: #fffdfa;
    }
    .q-card-dark {
      background: #701c64;
      color: #ffffff;
      border: none;
    }
    .q-card-dark h4 {
      color: #fde047 !important;
    }
    .q-card-dark p, .q-card-dark li {
      color: #f1f5f9 !important;
    }

    .q-card h4 {
      margin: 0 0 6px 0;
      font-size: 10.5pt;
      font-weight: 700;
      color: #701c64;
    }
    .q-card p {
      margin: 0 0 6px 0;
      font-size: 8.5pt;
      line-height: 1.45;
      color: #374151;
    }

    ul.q-list {
      margin: 0;
      padding-left: 16px;
      font-size: 8.5pt;
      line-height: 1.45;
      color: #374151;
    }
    ul.q-list li {
      margin-bottom: 4px;
    }
    ul.q-list li strong {
      color: #111827;
    }

    table.q-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 8pt;
      margin-top: 4px;
    }
    table.q-table th {
      background: #701c64;
      color: #ffffff;
      padding: 5px 8px;
      font-weight: 700;
      text-align: left;
      border: 1px solid #701c64;
    }
    table.q-table td {
      padding: 4px 8px;
      border: 1px solid #e2e8f0;
      color: #1e293b;
    }
    table.q-table tr:nth-child(even) td {
      background: #fdfafd;
    }

    .q-ascii-box {
      background: #1e1b4b;
      border-left: 4px solid #fde047;
      border-radius: 4px;
      padding: 8px 12px;
      color: #f8fafc;
      font-family: Consolas, monospace;
      font-size: 7.5pt;
      line-height: 1.35;
      white-space: pre;
      overflow-x: auto;
    }

    .formula-tag {
      background: #f3f4f6;
      border: 1px solid #d1d5db;
      border-radius: 4px;
      padding: 3px 6px;
      font-family: Consolas, monospace;
      font-size: 8pt;
      color: #701c64;
      font-weight: 700;
      display: inline-block;
      margin: 2px 0;
    }

    .slide-page-badge {
      font-size: 7.5pt;
      color: #94a3b8;
      text-align: right;
      margin-top: 2px;
    }
  </style>
</head>
<body>

  <!-- =========================================================================
       SLIDE 1: OFFICIAL QUANTUM UNIVERSITY TITLE SLIDE
       ========================================================================= -->
  <div class="slide title-slide">
    <!-- Top purple region -->
    <div class="title-purple-content">
      <div class="title-dept-badge">Dept. of Computer Applications • BCA Project Viva 2026</div>
      <h1 class="title-main-heading">
        Multi-Asset Non-Custodial Cryptocurrency Wallet Architecture
      </h1>
      <div class="title-sub-heading">
        Client-Side Scrypt/AES-128 Encryption, BIP-39 Deterministic Derivation &amp; Ethereum Sepolia Testnet Integration
      </div>
      <div class="title-degree-tag">
        Degree of Bachelor of Computer Applications (BCA) • Quantum University, Roorkee
      </div>
    </div>

    <!-- Bottom white region -->
    <div class="title-white-content">
      <div class="title-members-box">
        <div style="font-size: 8pt; font-weight: 700; color: #701c64; text-transform: uppercase; margin-bottom: 4px;">
          Project Team &amp; Task Allocation:
        </div>
        <div class="title-members-grid">
          <div class="tm-item">
            <strong>Sanjiv Prasad (Leader)</strong>
            <span>Roll No: 22001015001 • Architect</span>
          </div>
          <div class="tm-item">
            <strong>Team Member 2</strong>
            <span>Roll No: 22001015002 • Frontend</span>
          </div>
          <div class="tm-item">
            <strong>Team Member 3</strong>
            <span>Roll No: 22001015003 • Blockchain</span>
          </div>
          <div class="tm-item">
            <strong>Team Member 4</strong>
            <span>Roll No: 22001015004 • Backend</span>
          </div>
        </div>
        <div class="title-guide-row">
          <div><strong>Project Guide:</strong> Faculty Mentor</div>
          <div><strong>Program Officer:</strong> Dr. Ankur Rana</div>
          <div><strong>HoD:</strong> Dr. Mridula</div>
        </div>
      </div>
    </div>
  </div>

  <!-- =========================================================================
       SLIDE 2: MOTIVATION & PROBLEM STATEMENT
       ========================================================================= -->
  <div class="slide content-slide">
    <div class="slide-yellow-banner">
      <h2 class="slide-main-title">1. Introduction &amp; Problem Statement</h2>
      <div class="slide-speaker-tag">Speaker: Member 1 (Team Leader)</div>
    </div>

    <div class="slide-canvas">
      <div class="slide-lead">
        Addressing the catastrophic security single points of failure in centralized digital asset custody
      </div>

      <div class="grid-2col">
        <div class="q-card" style="border-top: 3px solid #dc2626;">
          <h4 style="color: #dc2626;">The Centralized Custody Hazard (CEXs)</h4>
          <p>Over 70% of crypto users store funds on centralized exchanges where they do not possess their keys:</p>
          <ul class="q-list">
            <li><strong>"Not Your Keys, Not Your Coins":</strong> Users hold promissory ledger rows on central databases. Private keys remain with the custodian.</li>
            <li><strong>Catastrophic Historic Insolvencies:</strong> FTX ($8.9B lost), Mt. Gox ($460M stolen), Celsius ($4.7B deficit) proved custodians can freeze or lose assets without warning.</li>
            <li><strong>Single Point of Failure:</strong> Centralized databases attract APT hacks, SQL injection, credential stuffing, and insider embezzlement.</li>
          </ul>
        </div>

        <div class="q-card q-card-purple">
          <h4>The Non-Custodial Solution Paradigm</h4>
          <p>We engineered a self-sovereign web wallet where user autonomy is mathematically enforced:</p>
          <ul class="q-list">
            <li><strong>Client-Side Cryptographic Sovereignty:</strong> Seed generation, key derivation, and transaction signing occur <em>strictly in browser RAM</em>.</li>
            <li><strong>Zero-Knowledge Application Server:</strong> The Node/Express backend never sees, handles, or stores plaintext private keys or seed phrases.</li>
            <li><strong>Memory-Hard Key Encryption:</strong> Scrypt KDF + AES-128-CTR protects keystores against offline dictionary &amp; GPU brute-force attacks.</li>
          </ul>
        </div>
      </div>

      <div class="slide-page-badge">Quantum University • Department of Computer Applications • Slide 2 of 12</div>
    </div>
  </div>

  <!-- =========================================================================
       SLIDE 3: PROJECT OBJECTIVES & SCOPE
       ========================================================================= -->
  <div class="slide content-slide">
    <div class="slide-yellow-banner">
      <h2 class="slide-main-title">2. Project Objectives &amp; System Scope</h2>
      <div class="slide-speaker-tag">Speaker: Member 1 (Team Leader)</div>
    </div>

    <div class="slide-canvas">
      <div class="slide-lead">
        Bridging the gap between Web3 cryptographic self-custody and modern Web2 ease of use
      </div>

      <div class="grid-4col">
        <div class="q-card q-card-purple">
          <h4>1. Client Autonomy</h4>
          <ul class="q-list">
            <li>128-bit CSPRNG entropy via WebCrypto API.</li>
            <li>BIP-39 12-word mnemonic phrase generation.</li>
            <li>BIP-44 standard path derivation: <code>m/44'/60'/0'/0/0</code>.</li>
            <li>Zero browser extension installation required.</li>
          </ul>
        </div>

        <div class="q-card q-card-gold">
          <h4>2. Keystore Security</h4>
          <ul class="q-list">
            <li>Memory-hard Scrypt Key Derivation Function.</li>
            <li>Symmetric AES-128-CTR keystore encryption.</li>
            <li>Keccak-256 MAC integrity check for password verification.</li>
            <li>Ephemeral memory wiping upon wallet locking.</li>
          </ul>
        </div>

        <div class="q-card q-card-purple">
          <h4>3. Multi-Asset EVM</h4>
          <ul class="q-list">
            <li>Native <strong>Sepolia ETH</strong> (Layer-1 transfers).</li>
            <li><strong>Mock USDC</strong> (ERC-20 Token smart contract).</li>
            <li><strong>Mock LINK</strong> (Chainlink ERC-20 contract).</li>
            <li>Real-time CoinGecko USD pricing integration.</li>
          </ul>
        </div>

        <div class="q-card q-card-gold">
          <h4>4. Cloud Middleware</h4>
          <ul class="q-list">
            <li>Node.js &amp; Express.js RESTful API endpoints.</li>
            <li>Stateless JWT Bearer token authentication.</li>
            <li>MongoDB encrypted cloud keystore backup.</li>
            <li>Persistent address book &amp; transaction history.</li>
          </ul>
        </div>
      </div>

      <div class="slide-page-badge">Quantum University • Department of Computer Applications • Slide 3 of 12</div>
    </div>
  </div>

  <!-- =========================================================================
       SLIDE 4: SYSTEM ARCHITECTURE
       ========================================================================= -->
  <div class="slide content-slide">
    <div class="slide-yellow-banner">
      <h2 class="slide-main-title">3. Tripartite System Architecture</h2>
      <div class="slide-speaker-tag">Speaker: Member 1 (Team Leader)</div>
    </div>

    <div class="slide-canvas">
      <div class="slide-lead">
        Strict physical and architectural separation of concerns between Client, Server, and Blockchain
      </div>

      <div class="grid-2col">
        <div>
          <div class="q-ascii-box">
+-------------------------------------------------------------+
|              CLIENT BROWSER (React 18 + Vite)               |
|  - BIP-39 Key Generation (12-Word Seed Phrase)              |
|  - Memory-Hard Scrypt KDF + AES-128-CTR Keystore Encryption |
|  - In-Browser ECDSA Transaction Signing (ethers.js v6)      |
+------------------------------+------------------------------+
               |                               |
      (1) Signed Raw Tx Hex          (2) Bearer JWT Auth &amp;
      Over JSON-RPC 2.0 (HTTPS)          Encrypted Keystore Blob
               |                               |
               v                               v
+-------------------------------+  +--------------------------+
|  ETHEREUM SEPOLIA TESTNET     |  | NODE.JS / EXPRESS SERVER |
|  - JSON-RPC Provider (Node)   |  | - JWT Authentication     |
|  - EVM Smart Contracts        |  | - bcrypt Password Hash   |
|  - Etherscan Block Explorer   |  | - Zero-Knowledge Backup  |
+-------------------------------+  +------------+-------------+
                                                |
                                                v
                                   +--------------------------+
                                   |     MONGODB DATABASE     |
                                   |  - Users Collection      |
                                   |  - Transactions Ledger   |
                                   |  - Address Book Contacts |
                                   +--------------------------+</div>
        </div>

        <div class="q-card q-card-purple">
          <h4>Architectural Security Invariants</h4>
          <ul class="q-list">
            <li><strong>Complete Client-Side Isolation:</strong> Unencrypted private keys exist strictly in browser volatile RAM and are destroyed on session lock/logout.</li>
            <li><strong>Zero-Knowledge Application Server:</strong> The server acts as an untrusted synchronization bridge. It receives only AES-128 ciphertext strings.</li>
            <li><strong>Direct Blockchain Broadcast:</strong> Transaction payloads are signed locally and broadcast directly to public Sepolia RPC nodes.</li>
            <li><strong>Database Leak Immunity:</strong> In the event of a total database dump, attackers cannot access or decrypt user funds without the client passwords.</li>
          </ul>
        </div>
      </div>

      <div class="slide-page-badge">Quantum University • Department of Computer Applications • Slide 4 of 12</div>
    </div>
  </div>

  <!-- =========================================================================
       SLIDE 5: CRYPTOGRAPHIC DERIVATION PIPELINE
       ========================================================================= -->
  <div class="slide content-slide">
    <div class="slide-yellow-banner">
      <h2 class="slide-main-title">4. Cryptographic Derivation Pipeline</h2>
      <div class="slide-speaker-tag">Speaker: Member 2 (Frontend &amp; Crypto)</div>
    </div>

    <div class="slide-canvas">
      <div class="slide-lead">
        Mathematical progression from raw cryptographic entropy to deterministic Ethereum public addresses
      </div>

      <div class="grid-2col">
        <div class="q-card q-card-purple">
          <h4>BIP-39 &amp; BIP-44 Mathematical Flow</h4>
          <ul class="q-list">
            <li><strong>1. Entropy Sampling:</strong> CSPRNG generates 128 bits of true entropy: <span class="formula-tag">E ∈ {0, 1}^128</span></li>
            <li><strong>2. Checksum Calculation:</strong> SHA-256 hash yields 4-bit checksum: <span class="formula-tag">CS = MSB_4(SHA-256(E))</span></li>
            <li><strong>3. 12-Word Mnemonic:</strong> 132 bits split into 12 segments of 11 bits, mapped to the standard 2,048-word BIP-39 English dictionary.</li>
            <li><strong>4. PBKDF2 Seed Generation:</strong> Transformed into 512-bit binary seed via PBKDF2 using 2,048 rounds of HMAC-SHA512.</li>
            <li><strong>5. BIP-44 Derivation:</strong> Primary Ethereum private key derived along standard path: <span class="formula-tag">m / 44' / 60' / 0' / 0 / 0</span></li>
          </ul>
        </div>

        <div class="q-card q-card-gold">
          <h4>Secp256k1 &amp; Keccak-256 Address Generation</h4>
          <ul class="q-list">
            <li><strong>Elliptic Curve Equation:</strong> Secp256k1 short Weierstrass form:
              <br><span class="formula-tag">y^2 ≡ x^3 + 7 (mod p)</span>
            </li>
            <li><strong>Public Key Derivation:</strong> Scalar multiplication with generator point G:
              <br><span class="formula-tag">K = k × G</span> (Discrete Logarithm hardness).
            </li>
            <li><strong>Uncompressed Serialization:</strong> Public key coordinate bytes (x || y) concatenated (64 bytes).</li>
            <li><strong>Ethereum Address Derivation:</strong> Keccak-256 hash truncated to least significant 20 bytes:
              <br><span class="formula-tag">Address = "0x" || LSB_20(Keccak-256(x || y))</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="slide-page-badge">Quantum University • Department of Computer Applications • Slide 5 of 12</div>
    </div>
  </div>

  <!-- =========================================================================
       SLIDE 6: CLIENT-SIDE ENCRYPTION & SECURITY
       ========================================================================= -->
  <div class="slide content-slide">
    <div class="slide-yellow-banner">
      <h2 class="slide-main-title">5. Client-Side Encryption &amp; Security Model</h2>
      <div class="slide-speaker-tag">Speaker: Member 2 (Frontend &amp; Crypto)</div>
    </div>

    <div class="slide-canvas">
      <div class="slide-lead">
        Protecting private keys at rest via memory-hard Scrypt KDF, AES-128-CTR, and MAC integrity verification
      </div>

      <div class="grid-3col">
        <div class="q-card q-card-purple">
          <h4>1. Memory-Hard Scrypt KDF</h4>
          <p>Neutralizing GPU and ASIC brute-force parallel cracking:</p>
          <ul class="q-list">
            <li><strong>Cost Parameters:</strong> N = 131,072, r = 8, p = 1.</li>
            <li><strong>RAM Allocation:</strong> Demands <strong>128 MB RAM</strong> per guess, rendering mass parallel hardware attacks non-viable.</li>
            <li>Generates 32-byte Derived Key split into Cipher Key &amp; MAC Key.</li>
          </ul>
        </div>

        <div class="q-card q-card-gold">
          <h4>2. AES-128-CTR Cipher</h4>
          <p>Military-grade symmetric encryption of private key:</p>
          <ul class="q-list">
            <li>Encrypted in Counter (CTR) mode with 16-byte random IV.</li>
            <li><strong>Integrity MAC:</strong> <span class="formula-tag">Keccak-256(MK || Ciphertext)</span></li>
            <li>Prevents padding oracle attacks and immediately detects wrong unlock passwords.</li>
          </ul>
        </div>

        <div class="q-card q-card-purple">
          <h4>3. Dual-Password Model</h4>
          <p>Complete separation of portal access from cryptographic authority:</p>
          <ul class="q-list">
            <li><strong>Portal Password:</strong> Hashed with bcrypt (10 rounds) for website authentication.</li>
            <li><strong>Wallet Password:</strong> Exclusively used in browser memory for Scrypt key derivation.</li>
            <li>Server database leak cannot decrypt funds.</li>
          </ul>
        </div>
      </div>

      <div class="slide-page-badge">Quantum University • Department of Computer Applications • Slide 6 of 12</div>
    </div>
  </div>

  <!-- =========================================================================
       SLIDE 7: BLOCKCHAIN OPERATIONS & GAS MECHANICS
       ========================================================================= -->
  <div class="slide content-slide">
    <div class="slide-yellow-banner">
      <h2 class="slide-main-title">6. Blockchain Operations &amp; Gas Mechanics</h2>
      <div class="slide-speaker-tag">Speaker: Member 3 (Blockchain Specialist)</div>
    </div>

    <div class="slide-canvas">
      <div class="slide-lead">
        Executing real-time transactions on Ethereum Sepolia Testnet with EIP-1559 dynamic fee optimization
      </div>

      <div class="grid-2col">
        <div class="q-card q-card-purple">
          <h4>EIP-1559 Dynamic Fee Calculation</h4>
          <p>Algorithmic gas optimization replacing legacy first-price auctions:</p>
          <ul class="q-list">
            <li><strong>Total Max Fee Formula:</strong> <span class="formula-tag">Max Fee = (2 × Base Fee) + Max Priority Fee</span></li>
            <li><strong>Base Fee:</strong> Calculated algorithmically by EVM block congestion and burned. Queried dynamically via <code>eth_feeHistory</code>.</li>
            <li><strong>Priority Fee (Tip):</strong> Paid directly to proof-of-stake validators to guarantee block priority.</li>
            <li><strong>Gas Limits:</strong>
              <br>• Native ETH Transfer: Fixed at <code>21,000</code> units (100% efficient).
              <br>• ERC-20 Tokens: Dynamically estimated via <code>contract.estimateGas.transfer()</code> with a 20% safety margin (~46,000 units).
            </li>
          </ul>
        </div>

        <div class="q-card q-card-gold">
          <h4>Sepolia Testnet &amp; Smart Contract Infrastructure</h4>
          <ul class="q-list">
            <li><strong>Network Target:</strong> Ethereum Sepolia Testnet (Chain ID: <code>11155111</code>) with high-availability Infura/Alchemy JSON-RPC endpoints.</li>
            <li><strong>EIP-155 Replay Protection:</strong> Chain ID embedded into ECDSA signature payload prevents replay on mainnet or other testnets.</li>
            <li><strong>ERC-20 ABI Interfacing:</strong> Read-only <code>eth_call</code> for <code>balanceOf()</code> and signed state-modifying <code>transfer(address,uint256)</code> calls.</li>
            <li><strong>Live Portfolio Valuation:</strong> Real-time USD conversion via CoinGecko REST API with fallback caching.</li>
          </ul>
        </div>
      </div>

      <div class="slide-page-badge">Quantum University • Department of Computer Applications • Slide 7 of 12</div>
    </div>
  </div>

  <!-- =========================================================================
       SLIDE 8: BACKEND ARCHITECTURE & DATABASE
       ========================================================================= -->
  <div class="slide content-slide">
    <div class="slide-yellow-banner">
      <h2 class="slide-main-title">7. Backend REST API &amp; Database Design</h2>
      <div class="slide-speaker-tag">Speaker: Member 4 (Backend Lead)</div>
    </div>

    <div class="slide-canvas">
      <div class="slide-lead">
        Node.js microservices, stateless JWT verification, and MongoDB zero-knowledge storage schemas
      </div>

      <div class="grid-2col">
        <div class="q-card q-card-purple">
          <h4>MongoDB Document Schemas (3 Collections)</h4>
          <ul class="q-list">
            <li><strong>1. Users Collection:</strong>
              <br><code>username</code>, <code>email</code> (unique), <code>passwordHash</code> (bcrypt), <code>walletAddress</code>, <code>encryptedKeystore</code> (ciphertext blob), <code>createdAt</code>.
            </li>
            <li><strong>2. Transactions Ledger:</strong>
              <br><code>userId</code>, <code>txHash</code> (unique index), <code>from</code>, <code>to</code>, <code>value</code>, <code>asset</code> (ETH/USDC/LINK), <code>status</code>, <code>timestamp</code>.
            </li>
            <li><strong>3. Address Book Contacts:</strong>
              <br><code>userId</code>, <code>name</code>, <code>address</code> (hex validated), <code>notes</code>, <code>createdAt</code>.
            </li>
          </ul>
        </div>

        <div class="q-card q-card-gold">
          <h4>RESTful API Specification (Express.js)</h4>
          <table class="q-table">
            <thead>
              <tr><th>Endpoint</th><th>Method</th><th>Auth</th><th>Description</th></tr>
            </thead>
            <tbody>
              <tr><td><code>/api/auth/register</code></td><td>POST</td><td>Public</td><td>Registers account &amp; issues JWT</td></tr>
              <tr><td><code>/api/auth/login</code></td><td>POST</td><td>Public</td><td>Bcrypt password check + JWT</td></tr>
              <tr><td><code>/api/wallet/keystore</code></td><td>POST/GET</td><td>Bearer JWT</td><td>Syncs encrypted keystore blob</td></tr>
              <tr><td><code>/api/transactions</code></td><td>POST/GET</td><td>Bearer JWT</td><td>Logs &amp; queries tx history</td></tr>
              <tr><td><code>/api/contacts</code></td><td>GET/POST</td><td>Bearer JWT</td><td>Manages recipient address book</td></tr>
              <tr><td><code>/api/health</code></td><td>GET</td><td>Public</td><td>Verifies server &amp; DB connectivity</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="slide-page-badge">Quantum University • Department of Computer Applications • Slide 8 of 12</div>
    </div>
  </div>

  <!-- =========================================================================
       SLIDE 9: LIVE DEMONSTRATION WORKFLOW
       ========================================================================= -->
  <div class="slide content-slide">
    <div class="slide-yellow-banner">
      <h2 class="slide-main-title">8. Live System Demonstration Workflow</h2>
      <div class="slide-speaker-tag">Speakers: All Team Members (Live Handoff)</div>
    </div>

    <div class="slide-canvas">
      <div class="slide-lead">
        End-to-end operational verification across User Interface, In-Memory Security, and Ethereum Testnet
      </div>

      <div class="grid-4col">
        <div class="q-card q-card-purple">
          <h4 style="font-size: 9.5pt;">Phase 1: Onboarding</h4>
          <p style="font-size: 8pt; color: #701c64;"><strong>Member 2 (Frontend)</strong></p>
          <ul class="q-list" style="font-size: 8pt;">
            <li>User registration &amp; authentication.</li>
            <li>12-word mnemonic phrase generation.</li>
            <li>Word verification challenge.</li>
            <li>Scrypt keystore password setup.</li>
          </ul>
        </div>

        <div class="q-card q-card-gold">
          <h4 style="font-size: 9.5pt;">Phase 2: In-Memory Lock</h4>
          <p style="font-size: 8pt; color: #701c64;"><strong>Member 2 (Frontend)</strong></p>
          <ul class="q-list" style="font-size: 8pt;">
            <li>Dashboard balance display (ETH, USDC, LINK).</li>
            <li>Click <strong>"Lock Wallet"</strong>: Proves Signer is cleared from RAM.</li>
            <li>Unlock with password to decrypt keystore via Scrypt.</li>
          </ul>
        </div>

        <div class="q-card q-card-purple">
          <h4 style="font-size: 9.5pt;">Phase 3: Live Transfer</h4>
          <p style="font-size: 8pt; color: #701c64;"><strong>Member 3 (Blockchain)</strong></p>
          <ul class="q-list" style="font-size: 8pt;">
            <li>Select recipient from Address Book.</li>
            <li>Dynamic EIP-1559 gas fee estimation.</li>
            <li>Sign transaction locally; broadcast raw hex to Sepolia.</li>
            <li>Verify confirmed block on Sepolia Etherscan!</li>
          </ul>
        </div>

        <div class="q-card q-card-gold">
          <h4 style="font-size: 9.5pt;">Phase 4: DB Audit</h4>
          <p style="font-size: 8pt; color: #701c64;"><strong>Member 4 (Backend)</strong></p>
          <ul class="q-list" style="font-size: 8pt;">
            <li>Inspect MongoDB Compass to view new transaction log.</li>
            <li>Show <code>encryptedKeystore</code> is purely ciphertext.</li>
            <li>Proves zero-knowledge server invariant.</li>
          </ul>
        </div>
      </div>

      <div class="slide-page-badge">Quantum University • Department of Computer Applications • Slide 9 of 12</div>
    </div>
  </div>

  <!-- =========================================================================
       SLIDE 10: BENCHMARKING & QA RESULTS
       ========================================================================= -->
  <div class="slide content-slide">
    <div class="slide-yellow-banner">
      <h2 class="slide-main-title">9. Benchmarking &amp; Quality Assurance</h2>
      <div class="slide-speaker-tag">Speaker: Member 4 (Backend Lead)</div>
    </div>

    <div class="slide-canvas">
      <div class="slide-lead">
        Empirical key derivation benchmarking and rigorous systematic validation across 20 test cases
      </div>

      <div class="grid-2col">
        <div class="q-card q-card-purple">
          <h4>KDF Performance Benchmarks (50 Iterations)</h4>
          <table class="q-table">
            <thead>
              <tr><th>Algorithm</th><th>Cost Parameters</th><th>Mean Latency</th><th>Memory</th></tr>
            </thead>
            <tbody>
              <tr><td>PBKDF2-SHA256</td><td>c = 10,000</td><td>42.6 ms</td><td>&lt; 2 MB (GPU vulnerable)</td></tr>
              <tr><td>PBKDF2-SHA256</td><td>c = 100,000</td><td>385.2 ms</td><td>&lt; 2 MB (GPU vulnerable)</td></tr>
              <tr><td>Scrypt (Selected)</td><td>N=131072, r=8</td><td>342.8 ms</td><td><strong>128 MB RAM (Hardware bounded)</strong></td></tr>
              <tr><td>Scrypt (Paranoid)</td><td>N=262144, r=8</td><td>718.5 ms</td><td>256 MB RAM</td></tr>
            </tbody>
          </table>
          <p style="margin-top: 6px; font-size: 8pt; color: #64748b;">
            <em>Finding:</em> Scrypt (N=131072) achieves sub-second browser unlock (~342ms) while enforcing a 128 MB RAM barrier per guess.
          </p>
        </div>

        <div class="q-card q-card-gold">
          <h4>Systematic QA Validation (100% Pass Rate)</h4>
          <ul class="q-list">
            <li><strong>20/20 Test Cases Passed:</strong> End-to-end verification of mnemonic generation, recovery, Scrypt encryption, gas estimation, and mobile responsiveness.</li>
            <li><strong>Gas Utilization Efficiency:</strong>
              <br>• Native ETH Transfer: 21,000 units consumed (100% efficiency).
              <br>• ERC-20 Transfer: 46,128 units consumed out of 65,000 allocated.</li>
            <li><strong>Security Penetration Audit:</strong> Network packet inspection confirmed zero leakage of private keys or plaintext seed phrases.</li>
            <li><strong>Postman API Collection:</strong> Automated testing of 10/10 endpoints with JWT validation and edge cases.</li>
          </ul>
        </div>
      </div>

      <div class="slide-page-badge">Quantum University • Department of Computer Applications • Slide 10 of 12</div>
    </div>
  </div>

  <!-- =========================================================================
       SLIDE 11: FUTURE WORK & ROADMAP
       ========================================================================= -->
  <div class="slide content-slide">
    <div class="slide-yellow-banner">
      <h2 class="slide-main-title">10. Future Roadmap &amp; Scalability</h2>
      <div class="slide-speaker-tag">Speaker: Member 4 (Backend Lead)</div>
    </div>

    <div class="slide-canvas">
      <div class="slide-lead">
        Next-generation Web3 paradigms: Account Abstraction, Threshold Signatures, and Layer-2 Rollups
      </div>

      <div class="grid-3col">
        <div class="q-card q-card-purple">
          <h4>1. ERC-4337 Account Abstraction</h4>
          <p>Smart contract wallets with programmable rules:</p>
          <ul class="q-list">
            <li><strong>Social Recovery:</strong> Eliminate single seed loss using guardian contacts.</li>
            <li><strong>Gasless Transactions:</strong> Paymaster sponsorship or gas payment directly in USDC stablecoin.</li>
            <li><strong>Session Keys:</strong> Automated micro-transactions without repetitive passwords.</li>
          </ul>
        </div>

        <div class="q-card q-card-gold">
          <h4>2. Multi-Party Computation (MPC)</h4>
          <p>Threshold Signature Schemes (TSS):</p>
          <ul class="q-list">
            <li>Private key split into 3 mathematical secret shares (2-of-3 threshold).</li>
            <li>Share 1 on client, Share 2 on server, Share 3 on backup device.</li>
            <li>Private key is never assembled in complete form anywhere.</li>
          </ul>
        </div>

        <div class="q-card q-card-purple">
          <h4>3. Biometrics &amp; Layer-2 Rollups</h4>
          <p>Hardware security and high scalability:</p>
          <ul class="q-list">
            <li><strong>WebAuthn / Passkeys:</strong> Biometric unlock via Apple Touch ID, Face ID, Windows Hello.</li>
            <li><strong>WebHID Integration:</strong> Direct USB signing with Ledger &amp; Trezor hardware wallets.</li>
            <li><strong>L2 Rollups:</strong> Arbitrum, Optimism, and Base connectivity for 95%+ gas reduction.</li>
          </ul>
        </div>
      </div>

      <div class="slide-page-badge">Quantum University • Department of Computer Applications • Slide 11 of 12</div>
    </div>
  </div>

  <!-- =========================================================================
       SLIDE 12: CONCLUSION & ACKNOWLEDGEMENTS
       ========================================================================= -->
  <div class="slide content-slide">
    <div class="slide-yellow-banner">
      <h2 class="slide-main-title">11. Conclusion &amp; Acknowledgements</h2>
      <div class="slide-speaker-tag">Session Lead: Member 1 (Team Leader)</div>
    </div>

    <div class="slide-canvas">
      <div class="slide-lead">
        Summary of project achievements, institutional acknowledgements, and open evaluation panel viva defense
      </div>

      <div class="grid-2col">
        <div class="q-card q-card-dark">
          <h4>Project Summary &amp; Contributions</h4>
          <ul class="q-list">
            <li><strong>Eliminated Centralized Risk:</strong> Built an institutional non-custodial wallet guaranteeing mathematical asset ownership.</li>
            <li><strong>Production Cryptographic Rigor:</strong> BIP-39 12-word mnemonic derivation, Scrypt memory-hard encryption, AES-128-CTR with MAC integrity.</li>
            <li><strong>Live Network Proof:</strong> Real-time ETH, USDC, and LINK transactions verified on the Ethereum Sepolia testnet.</li>
            <li><strong>Zero-Knowledge Cloud Sync:</strong> Secure backup convenience without compromising private key isolation.</li>
          </ul>
        </div>

        <div class="q-card" style="border: 2px dashed #701c64; text-align: center; justify-content: center; padding: 14px;">
          <h3 style="font-size: 24pt; color: #701c64; margin: 0 0 6px 0; font-weight: 900; letter-spacing: 1px;">
            THANK YOU
          </h3>
          <p style="font-size: 9pt; color: #4b5563; margin-bottom: 10px;">
            We express our deepest gratitude to our Project Guide, <strong>Dr. Ankur Rana</strong> (Program Officer, CA), <strong>Dr. Mridula</strong> (HoD, CA), and the esteemed evaluation panel of Quantum University.
          </p>
          <div style="background: #701c64; color: #fde047; padding: 8px 12px; border-radius: 6px; font-weight: 800; font-size: 11pt; text-transform: uppercase; letter-spacing: 0.5px;">
            Floor Open for Questions from the Panel
          </div>
          <div style="font-size: 8pt; color: #94a3b8; margin-top: 8px;">
            GitHub: <code>github.com/SanjeevPrasad10/fianl_year_proj</code>
          </div>
        </div>
      </div>

      <div class="slide-page-badge">Quantum University • Department of Computer Applications • Slide 12 of 12</div>
    </div>
  </div>

</body>
</html>
`;

const outputPath = path.join(__dirname, 'QUANTUM_UNIVERSITY_PRESENTATION_SLIDES.html');
const pdfOutputPath = path.join(__dirname, 'QUANTUM_UNIVERSITY_PRESENTATION_SLIDES.pdf');

fs.writeFileSync(outputPath, html, 'utf8');
console.log('Saved QUANTUM_UNIVERSITY_PRESENTATION_SLIDES.html successfully.');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const args = [
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  '--no-pdf-header-footer',
  `--print-to-pdf=${pdfOutputPath}`,
  outputPath
];

console.log('Compiling official Quantum University presentation PDF...');
const result = spawnSync(chromePath, args, { encoding: 'utf8' });

if (fs.existsSync(pdfOutputPath)) {
  const stat = fs.statSync(pdfOutputPath);
  console.log(`SUCCESS! Generated Quantum University Presentation PDF: ${stat.size} bytes at ${pdfOutputPath}`);
} else {
  console.error('Failed to compile PDF. Exit code:', result.status, 'stderr:', result.stderr);
}
