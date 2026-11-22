/**
 * build_clean_quantum_slides.js
 * Generates an official Quantum University presentation PDF with:
 * 1. ZERO overlapping elements (fully calibrated margins for image1 and image3)
 * 2. Solid white card backgrounds so background watermarks never obscure text
 * 3. Simple, direct, conversational bullet points that any student can speak aloud easily
 * 4. 12 clean slides with assigned speaker tags
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

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
      size: 10in 7.5in; /* Standard 4:3 slide ratio */
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
      font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
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

    /* =========================================================
       SLIDE 1: TITLE SLIDE (Calibrated to image1.jpeg)
       ========================================================= */
    .title-slide {
      background-image: url('${img1Uri}');
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }

    /* Left half of purple banner (Leaves right-side Quantum logo untouched) */
    .title-left-purple {
      position: absolute;
      top: 0.65in;
      left: 0.8in;
      width: 4.5in;
      color: #ffffff;
    }
    .title-badge {
      display: inline-block;
      background: rgba(255, 255, 255, 0.22);
      border: 1px solid rgba(255, 255, 255, 0.45);
      color: #fde047;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 8.5pt;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-bottom: 10px;
    }
    .title-heading {
      font-size: 22pt;
      font-weight: 900;
      line-height: 1.2;
      color: #ffffff;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin: 0 0 10px 0;
      text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }
    .title-subtext {
      font-size: 11pt;
      line-height: 1.4;
      color: #f3e8ff;
      margin-bottom: 12px;
    }
    .title-degree {
      font-size: 10.5pt;
      font-weight: 700;
      color: #fde047;
      border-left: 3px solid #fde047;
      padding-left: 8px;
    }

    /* Bottom white area card: Covers background cleanly without any text collision */
    .title-bottom-card {
      position: absolute;
      top: 5.0in;
      left: 0.8in;
      right: 0.8in;
      bottom: 0.32in;
      background: #ffffff;
      border: 2px solid #701c64;
      border-radius: 8px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.15);
      padding: 10px 16px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      z-index: 10;
    }
    .title-card-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #f3e8ff;
      padding-bottom: 4px;
    }
    .title-card-top strong {
      font-size: 9.5pt;
      color: #701c64;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .title-card-top span {
      font-size: 8.5pt;
      color: #64748b;
    }
    .title-team-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      margin: 4px 0;
    }
    .team-col {
      background: #fdfafd;
      border: 1px solid #fae8f6;
      border-radius: 6px;
      padding: 6px 10px;
    }
    .team-col-name {
      font-size: 9.5pt;
      font-weight: 700;
      color: #701c64;
      white-space: nowrap;
    }
    .team-col-role {
      font-size: 8pt;
      color: #475569;
      font-weight: 600;
    }
    .team-col-roll {
      font-size: 8pt;
      color: #64748b;
    }
    .title-card-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 8.5pt;
      color: #475569;
      border-top: 1px solid #f1f5f9;
      padding-top: 4px;
    }

    /* =========================================================
       CONTENT SLIDES (Calibrated to image3.jpeg)
       ========================================================= */
    .content-slide {
      background-image: url('${img3Uri}');
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }

    /* Yellow banner title (Sits directly on the pre-printed yellow stripe) */
    .slide-yellow-stripe {
      position: absolute;
      top: 1.15in;
      left: 0.8in;
      right: 0.8in;
      height: 0.42in;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 4px;
    }
    .slide-title-text {
      font-size: 15pt;
      font-weight: 900;
      color: #701c64;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin: 0;
    }
    .slide-speaker-pill {
      background: #701c64;
      color: #ffffff;
      padding: 3px 12px;
      border-radius: 20px;
      font-size: 8.5pt;
      font-weight: 700;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }

    /* Content Canvas: Safe bounds above footer (y=1.65in to y=6.65in) */
    .slide-content-area {
      position: absolute;
      top: 1.65in;
      left: 0.8in;
      right: 0.8in;
      height: 4.95in;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-sizing: border-box;
    }

    /* Slide sub-lead sentence */
    .slide-lead-bar {
      background: #ffffff;
      border-left: 4px solid #701c64;
      border-top: 1px solid #f3e8ff;
      border-right: 1px solid #f3e8ff;
      border-bottom: 1px solid #f3e8ff;
      padding: 6px 12px;
      border-radius: 0 4px 4px 0;
      font-size: 10pt;
      font-weight: 700;
      color: #701c64;
      margin-bottom: 8px;
    }

    /* Layout Grids */
    .deck-grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      flex: 1;
      margin-bottom: 6px;
    }
    .deck-grid-3 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 12px;
      flex: 1;
      margin-bottom: 6px;
    }
    .deck-grid-4 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 10px;
      flex: 1;
      margin-bottom: 6px;
    }

    /* Content Card: Solid white background prevents background watermark interference */
    .deck-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 12px 14px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.06);
      display: flex;
      flex-direction: column;
    }
    .deck-card-purple {
      border-top: 3px solid #701c64;
      background: #ffffff;
    }
    .deck-card-gold {
      border-top: 3px solid #eab308;
      background: #ffffff;
    }
    .deck-card-red {
      border-top: 3px solid #dc2626;
      background: #ffffff;
    }
    .deck-card-green {
      border-top: 3px solid #15803d;
      background: #ffffff;
    }

    .deck-card h4 {
      margin: 0 0 8px 0;
      font-size: 11pt;
      font-weight: 700;
      color: #701c64;
      border-bottom: 1px solid rgba(112, 28, 100, 0.12);
      padding-bottom: 4px;
    }
    .deck-card h4.red {
      color: #b91c1c;
      border-bottom-color: rgba(185, 28, 28, 0.15);
    }
    .deck-card h4.green {
      color: #15803d;
      border-bottom-color: rgba(21, 128, 61, 0.15);
    }

    /* Direct, Easy-to-Speak Bullet Points */
    ul.direct-points {
      margin: 0;
      padding-left: 18px;
      font-size: 9.5pt;
      line-height: 1.5;
      color: #334155;
    }
    ul.direct-points li {
      margin-bottom: 6px;
    }
    ul.direct-points li strong {
      color: #0f172a;
    }

    /* Speaking takeaway box */
    .speak-highlight {
      background: #fdfafd;
      border-left: 3px solid #701c64;
      padding: 5px 8px;
      font-size: 8.5pt;
      color: #701c64;
      border-radius: 0 4px 4px 0;
      margin-top: auto;
      font-weight: 700;
    }

    /* Clean Clean Table */
    table.clean-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 8.5pt;
      margin-top: 4px;
    }
    table.clean-table th {
      background: #701c64;
      color: #ffffff;
      padding: 6px 10px;
      font-weight: 700;
      text-align: left;
    }
    table.clean-table td {
      padding: 6px 10px;
      border: 1px solid #e2e8f0;
      color: #1e293b;
    }
    table.clean-table tr:nth-child(even) td {
      background: #fdfafd;
    }

    .slide-counter {
      font-size: 8pt;
      color: #94a3b8;
      text-align: right;
      padding-top: 2px;
      font-weight: 600;
    }
  </style>
</head>
<body>

  <!-- =========================================================================
       SLIDE 1: OFFICIAL QUANTUM UNIVERSITY TITLE SLIDE
       ========================================================================= -->
  <div class="slide title-slide">
    <div class="title-left-purple">
      <div class="title-badge">Department of Computer Applications • 2026</div>
      <h1 class="title-heading">
        Non-Custodial Crypto Wallet
      </h1>
      <div class="title-subtext">
        Multi-Asset Web3 Wallet on Ethereum Sepolia Testnet with Client-Side Encryption
      </div>
      <div class="title-degree">
        Bachelor of Computer Applications (BCA) • Quantum University, Roorkee
      </div>
    </div>

    <!-- Bottom white card (No collision with background text) -->
    <div class="title-bottom-card">
      <div class="title-card-top">
        <strong>Final Year Project Presentation</strong>
        <span>Quantum University, Roorkee (Uttarakhand)</span>
      </div>
      <div class="title-team-grid">
        <div class="team-col">
          <div class="team-col-name">Sanjiv Prasad</div>
          <div class="team-col-role">Leader &amp; Architect</div>
          <div class="team-col-roll">Roll: 22001015001</div>
        </div>
        <div class="team-col">
          <div class="team-col-name">Team Member 2</div>
          <div class="team-col-role">Frontend &amp; UI</div>
          <div class="team-col-roll">Roll: 22001015002</div>
        </div>
        <div class="team-col">
          <div class="team-col-name">Team Member 3</div>
          <div class="team-col-role">Blockchain Integration</div>
          <div class="team-col-roll">Roll: 22001015003</div>
        </div>
        <div class="team-col">
          <div class="team-col-name">Team Member 4</div>
          <div class="team-col-role">Backend &amp; Database</div>
          <div class="team-col-roll">Roll: 22001015004</div>
        </div>
      </div>
      <div class="title-card-bottom">
        <div><strong>Project Guide:</strong> Faculty Mentor</div>
        <div><strong>Program Officer:</strong> Dr. Ankur Rana</div>
        <div><strong>Head of Department:</strong> Dr. Mridula</div>
      </div>
    </div>
  </div>

  <!-- =========================================================================
       SLIDE 2: THE PROBLEM WE ARE SOLVING
       ========================================================================= -->
  <div class="slide content-slide">
    <div class="slide-yellow-stripe">
      <h2 class="slide-title-text">1. The Problem We Are Solving</h2>
      <div class="slide-speaker-pill">Speaker: Member 1 (Team Leader)</div>
    </div>

    <div class="slide-content-area">
      <div class="slide-lead-bar">
        Why traditional cryptocurrency storage on central exchanges puts user money at risk
      </div>

      <div class="deck-grid-2">
        <div class="deck-card deck-card-red">
          <h4 class="red">The Danger of Centralized Exchanges (CEX)</h4>
          <ul class="direct-points">
            <li><strong>You Don't Own Your Keys:</strong> When using exchanges like FTX or WazirX, they hold your private keys, not you.</li>
            <li><strong>"Not Your Keys, Not Your Coins":</strong> If the exchange gets hacked or goes bankrupt, your money is gone.</li>
            <li><strong>Real Disasters:</strong> FTX collapsed with <strong>$8.9 Billion</strong> lost; Mt. Gox lost 850,000 Bitcoins.</li>
            <li><strong>Accounts Can Be Frozen:</strong> A centralized company can freeze your funds at any time.</li>
          </ul>
          <div class="speak-highlight">Key Takeaway: Users need a wallet where ONLY THEY control the password.</div>
        </div>

        <div class="deck-card deck-card-green">
          <h4 class="green">Our Non-Custodial Solution</h4>
          <ul class="direct-points">
            <li><strong>True Ownership:</strong> Your private keys are generated inside your browser and never leave your computer.</li>
            <li><strong>Zero Server Access:</strong> Even our own backend server CANNOT see your password or steal your coins.</li>
            <li><strong>No Extensions Needed:</strong> Works directly in any web browser without downloading extra plugins.</li>
            <li><strong>Self-Sovereign:</strong> You have 100% control over your assets with mathematical proof.</li>
          </ul>
          <div class="speak-highlight">Key Takeaway: Even if our server is hacked, user funds remain 100% safe.</div>
        </div>
      </div>

      <div class="slide-counter">Quantum University • Department of Computer Applications • Slide 2 of 12</div>
    </div>
  </div>

  <!-- =========================================================================
       SLIDE 3: WHAT OUR WALLET DOES (FEATURES)
       ========================================================================= -->
  <div class="slide content-slide">
    <div class="slide-yellow-stripe">
      <h2 class="slide-title-text">2. Key Features of Our Wallet</h2>
      <div class="slide-speaker-pill">Speaker: Member 1 (Team Leader)</div>
    </div>

    <div class="slide-content-area">
      <div class="slide-lead-bar">
        Everything a user needs to store, send, and track multiple cryptocurrencies safely
      </div>

      <div class="deck-grid-3">
        <div class="deck-card deck-card-purple">
          <h4>Multi-Crypto Assets</h4>
          <ul class="direct-points">
            <li><strong>Native Sepolia ETH:</strong> Transfer and track real Ethereum testnet coins.</li>
            <li><strong>USDC Token:</strong> Full ERC-20 stablecoin balance and transfer support.</li>
            <li><strong>LINK Token:</strong> Chainlink token smart contract integration.</li>
            <li><strong>Live Dollar Prices:</strong> Real-time USD portfolio valuation from CoinGecko.</li>
          </ul>
        </div>

        <div class="deck-card deck-card-gold">
          <h4>Security &amp; Backup</h4>
          <ul class="direct-points">
            <li><strong>12-Word Secret Phrase:</strong> Standard BIP-39 recovery words to restore on any device.</li>
            <li><strong>Military-Grade Cipher:</strong> Encrypted using AES-128 and Scrypt before saving.</li>
            <li><strong>Encrypted Cloud Sync:</strong> Safe cross-device backup to MongoDB database.</li>
            <li><strong>Auto-Lock Memory:</strong> Zeros out private keys when you lock the wallet.</li>
          </ul>
        </div>

        <div class="deck-card deck-card-purple">
          <h4>User Convenience</h4>
          <ul class="direct-points">
            <li><strong>One-Click Send &amp; Receive:</strong> Clean interface with instant QR code generator.</li>
            <li><strong>Address Book:</strong> Save friend and business addresses for quick sending.</li>
            <li><strong>Audit History:</strong> View past transactions with live Etherscan links.</li>
            <li><strong>Auto Gas Calculation:</strong> Computes the exact network fee in seconds.</li>
          </ul>
        </div>
      </div>

      <div class="slide-counter">Quantum University • Department of Computer Applications • Slide 3 of 12</div>
    </div>
  </div>

  <!-- =========================================================================
       SLIDE 4: SYSTEM ARCHITECTURE (SIMPLE 3-TIER)
       ========================================================================= -->
  <div class="slide content-slide">
    <div class="slide-yellow-stripe">
      <h2 class="slide-title-text">3. How the System Works (Architecture)</h2>
      <div class="slide-speaker-pill">Speaker: Member 1 (Team Leader)</div>
    </div>

    <div class="slide-content-area">
      <div class="slide-lead-bar">
        Clear separation between the User's Browser, the Backend Server, and the Blockchain
      </div>

      <div class="deck-grid-3">
        <div class="deck-card deck-card-purple">
          <h4>1. User's Browser (Frontend)</h4>
          <ul class="direct-points">
            <li>Built with <strong>React 18 &amp; Tailwind CSS</strong>.</li>
            <li>Generates the 12-word recovery phrase.</li>
            <li>Encrypts the keystore with user password.</li>
            <li>Signs transactions locally using <code>ethers.js</code>.</li>
            <li><strong>Private key stays in RAM only.</strong></li>
          </ul>
        </div>

        <div class="deck-card deck-card-gold">
          <h4>2. Backend Server (Node.js)</h4>
          <ul class="direct-points">
            <li>Built with <strong>Node.js &amp; Express API</strong>.</li>
            <li>Authenticates users with secure JWT tokens.</li>
            <li>Saves the <em>already-encrypted</em> backup blob.</li>
            <li>Stores transaction history in <strong>MongoDB</strong>.</li>
            <li><strong>Server has ZERO private key knowledge.</strong></li>
          </ul>
        </div>

        <div class="deck-card deck-card-purple">
          <h4>3. Ethereum Blockchain</h4>
          <ul class="direct-points">
            <li>Runs on <strong>Ethereum Sepolia Testnet</strong>.</li>
            <li>Connected via JSON-RPC 2.0 (HTTPS).</li>
            <li>Executes transfers and ERC-20 smart contracts.</li>
            <li>Blocks confirm in ~12 seconds.</li>
            <li><strong>Viewable live on Sepolia Etherscan.</strong></li>
          </ul>
        </div>
      </div>

      <div class="slide-counter">Quantum University • Department of Computer Applications • Slide 4 of 12</div>
    </div>
  </div>

  <!-- =========================================================================
       SLIDE 5: SECURITY MODEL
       ========================================================================= -->
  <div class="slide content-slide">
    <div class="slide-yellow-stripe">
      <h2 class="slide-title-text">4. How We Keep Keys 100% Safe</h2>
      <div class="slide-speaker-pill">Speaker: Member 2 (Frontend &amp; Crypto)</div>
    </div>

    <div class="slide-content-area">
      <div class="slide-lead-bar">
        Three strict security layers protecting user funds against hackers and database leaks
      </div>

      <div class="deck-grid-3">
        <div class="deck-card deck-card-purple">
          <h4>1. Client-Side Signing</h4>
          <ul class="direct-points">
            <li>When you click "Send", the transfer is signed <strong>inside your browser</strong>.</li>
            <li>Only the final signed string is sent to the network.</li>
            <li>Your private key is NEVER transmitted across the internet.</li>
          </ul>
          <div class="speak-highlight">Result: Impossible for hackers to steal keys in transit.</div>
        </div>

        <div class="deck-card deck-card-gold">
          <h4>2. Dual Password Defense</h4>
          <ul class="direct-points">
            <li><strong>Login Password:</strong> Used to open the website (hashed with bcrypt on server).</li>
            <li><strong>Wallet Password:</strong> Used inside your browser to decrypt your private key.</li>
            <li>Two completely independent security boundaries.</li>
          </ul>
          <div class="speak-highlight">Result: Database breach gives the attacker zero wallet access.</div>
        </div>

        <div class="deck-card deck-card-purple">
          <h4>3. In-Memory Session Wipe</h4>
          <ul class="direct-points">
            <li>When you click <strong>"Lock Wallet"</strong>, the private key is wiped from RAM immediately.</li>
            <li>No keys saved in unencrypted storage.</li>
            <li>Must enter wallet password again to send funds.</li>
          </ul>
          <div class="speak-highlight">Result: Immune to browser inspection and screen snooping.</div>
        </div>
      </div>

      <div class="slide-counter">Quantum University • Department of Computer Applications • Slide 5 of 12</div>
    </div>
  </div>

  <!-- =========================================================================
       SLIDE 6: WALLET CREATION & RECOVERY
       ========================================================================= -->
  <div class="slide content-slide">
    <div class="slide-yellow-stripe">
      <h2 class="slide-title-text">5. Wallet Creation &amp; Recovery Process</h2>
      <div class="slide-speaker-pill">Speaker: Member 2 (Frontend &amp; Crypto)</div>
    </div>

    <div class="slide-content-area">
      <div class="slide-lead-bar">
        Standard BIP-39 mnemonic seed generation and deterministic wallet recovery
      </div>

      <div class="deck-grid-2">
        <div class="deck-card deck-card-purple">
          <h4>Creating a New Wallet (BIP-39 Standard)</h4>
          <ul class="direct-points">
            <li><strong>Random Generation:</strong> Browser creates 128 bits of secure random numbers using <code>crypto.getRandomValues()</code>.</li>
            <li><strong>12 Secret Words:</strong> The random numbers are mapped to 12 simple English words (e.g., <em>"forest, galaxy, silver, brave..."</em>).</li>
            <li><strong>Custody Verification:</strong> The app challenges the user to re-select the words in correct order to make sure they saved them.</li>
            <li><strong>Address Generation:</strong> The words deterministically create your public Ethereum address starting with <code>0x...</code>.</li>
          </ul>
        </div>

        <div class="deck-card deck-card-gold">
          <h4>Recovering an Existing Wallet</h4>
          <ul class="direct-points">
            <li><strong>Lost Your Phone or Laptop?</strong> You can recover your exact wallet and all balances on any new computer.</li>
            <li><strong>Option A (12 Words):</strong> Enter your 12 recovery words to restore your complete wallet.</li>
            <li><strong>Option B (Private Key):</strong> Paste your 64-character private key for instant direct import.</li>
            <li><strong>Encrypted Cloud Sync:</strong> Log into your account to fetch your password-protected backup file automatically.</li>
          </ul>
        </div>
      </div>

      <div class="slide-counter">Quantum University • Department of Computer Applications • Slide 6 of 12</div>
    </div>
  </div>

  <!-- =========================================================================
       SLIDE 7: SENDING CRYPTO & GAS FEES
       ========================================================================= -->
  <div class="slide content-slide">
    <div class="slide-yellow-stripe">
      <h2 class="slide-title-text">6. Sending Crypto &amp; Gas Fee Calculation</h2>
      <div class="slide-speaker-pill">Speaker: Member 3 (Blockchain Specialist)</div>
    </div>

    <div class="slide-content-area">
      <div class="slide-lead-bar">
        How blockchain transactions work and how our wallet calculates network fees automatically
      </div>

      <div class="deck-grid-2">
        <div class="deck-card deck-card-purple">
          <h4>What is Gas &amp; How Does It Work?</h4>
          <ul class="direct-points">
            <li><strong>Gas is the Fuel of Ethereum:</strong> A tiny transaction fee paid to blockchain validators for confirming your transfer.</li>
            <li><strong>EIP-1559 Dynamic Fee Model:</strong>
              <br>• <strong>Base Fee:</strong> Set automatically by network traffic (burned by protocol).
              <br>• <strong>Priority Tip:</strong> Small reward paid to validators for quick confirmation.
            </li>
            <li><strong>Automated Calculation:</strong> Our wallet fetches live network fees so users never overpay or underpay.</li>
            <li><strong>Shown in USD:</strong> Displays the gas cost in both Gwei/ETH and real US Dollars.</li>
          </ul>
        </div>

        <div class="deck-card deck-card-gold">
          <h4>Steps in Sending a Transaction</h4>
          <ul class="direct-points">
            <li><strong>1. Select Asset:</strong> Choose between native Sepolia ETH, USDC, or LINK.</li>
            <li><strong>2. Choose Recipient:</strong> Paste an address or pick directly from your saved Address Book.</li>
            <li><strong>3. Review &amp; Confirm:</strong> Check the recipient, amount, and estimated gas fee.</li>
            <li><strong>4. Local Signature:</strong> The browser signs the transfer using your decrypted private key.</li>
            <li><strong>5. Instant Receipt:</strong> Broadcasts to Sepolia and gives you a direct link to view it on <strong>Sepolia Etherscan</strong>.</li>
          </ul>
        </div>
      </div>

      <div class="slide-counter">Quantum University • Department of Computer Applications • Slide 7 of 12</div>
    </div>
  </div>

  <!-- =========================================================================
       SLIDE 8: BACKEND & DATABASE DESIGN
       ========================================================================= -->
  <div class="slide content-slide">
    <div class="slide-yellow-stripe">
      <h2 class="slide-title-text">7. Backend API &amp; Database Design</h2>
      <div class="slide-speaker-pill">Speaker: Member 4 (Backend Lead)</div>
    </div>

    <div class="slide-content-area">
      <div class="slide-lead-bar">
        Fast Node.js microservices and MongoDB database collections for a seamless user experience
      </div>

      <div class="deck-grid-2">
        <div class="deck-card deck-card-purple">
          <h4>3 Simple MongoDB Collections</h4>
          <ul class="direct-points">
            <li><strong>1. Users Collection:</strong>
              <br>Stores username, email, password hash (bcrypt), and the <em>encrypted keystore ciphertext</em>.
            </li>
            <li><strong>2. Transactions Collection:</strong>
              <br>Caches past transfers (hash, sender, recipient, amount, date) for lightning-fast dashboard display.
            </li>
            <li><strong>3. Contacts Collection:</strong>
              <br>Stores user's saved contacts (name, wallet address) for one-click sending.
            </li>
          </ul>
        </div>

        <div class="deck-card deck-card-gold">
          <h4>Express.js REST API Endpoints</h4>
          <table class="clean-table">
            <thead>
              <tr><th>Endpoint</th><th>Method</th><th>Purpose</th></tr>
            </thead>
            <tbody>
              <tr><td><code>/api/auth/register</code></td><td>POST</td><td>Creates new user account</td></tr>
              <tr><td><code>/api/auth/login</code></td><td>POST</td><td>Verifies password &amp; issues JWT</td></tr>
              <tr><td><code>/api/wallet/keystore</code></td><td>GET/POST</td><td>Saves/fetches encrypted backup</td></tr>
              <tr><td><code>/api/transactions</code></td><td>GET/POST</td><td>Logs and fetches past transfers</td></tr>
              <tr><td><code>/api/contacts</code></td><td>GET/POST</td><td>Manages address book contacts</td></tr>
            </tbody>
          </table>
          <div class="speak-highlight" style="margin-top: 8px;">Zero-Knowledge: All backup data is encrypted before reaching the database.</div>
        </div>
      </div>

      <div class="slide-counter">Quantum University • Department of Computer Applications • Slide 8 of 12</div>
    </div>
  </div>

  <!-- =========================================================================
       SLIDE 9: LIVE DEMO WORKFLOW
       ========================================================================= -->
  <div class="slide content-slide">
    <div class="slide-yellow-stripe">
      <h2 class="slide-title-text">8. Live Demonstration Plan</h2>
      <div class="slide-speaker-pill">Speakers: All Team Members (Live Handoff)</div>
    </div>

    <div class="slide-content-area">
      <div class="slide-lead-bar">
        Step-by-step live walkthrough to prove our application works in real time
      </div>

      <div class="deck-grid-4">
        <div class="deck-card deck-card-purple">
          <h4>Step 1: Login &amp; UI</h4>
          <p style="font-size: 8pt; color: #701c64; font-weight: 700;">Member 2 (Frontend)</p>
          <ul class="direct-points" style="font-size: 8pt;">
            <li>Log into user account.</li>
            <li>Show Multi-Asset Dashboard.</li>
            <li>Display ETH, USDC, LINK balances.</li>
            <li>Show live CoinGecko USD rates.</li>
          </ul>
        </div>

        <div class="deck-card deck-card-gold">
          <h4>Step 2: Lock / Unlock</h4>
          <p style="font-size: 8pt; color: #701c64; font-weight: 700;">Member 2 (Frontend)</p>
          <ul class="direct-points" style="font-size: 8pt;">
            <li>Click <strong>"Lock Wallet"</strong> on screen.</li>
            <li>Show that private key is wiped from RAM.</li>
            <li>Enter wallet password to unlock it again.</li>
          </ul>
        </div>

        <div class="deck-card deck-card-purple">
          <h4>Step 3: Live Transfer</h4>
          <p style="font-size: 8pt; color: #701c64; font-weight: 700;">Member 3 (Blockchain)</p>
          <ul class="direct-points" style="font-size: 8pt;">
            <li>Select contact from Address Book.</li>
            <li>Show automatic gas calculation.</li>
            <li>Sign &amp; broadcast to Sepolia network.</li>
            <li><strong>Open Etherscan link to show confirmed block!</strong></li>
          </ul>
        </div>

        <div class="deck-card deck-card-gold">
          <h4>Step 4: DB Audit</h4>
          <p style="font-size: 8pt; color: #701c64; font-weight: 700;">Member 4 (Backend)</p>
          <ul class="direct-points" style="font-size: 8pt;">
            <li>Open MongoDB Compass on screen.</li>
            <li>Show the recorded transaction log.</li>
            <li>Prove keystore is stored <strong>only as encrypted ciphertext</strong>.</li>
          </ul>
        </div>
      </div>

      <div class="slide-counter">Quantum University • Department of Computer Applications • Slide 9 of 12</div>
    </div>
  </div>

  <!-- =========================================================================
       SLIDE 10: TESTING & VERIFICATION
       ========================================================================= -->
  <div class="slide content-slide">
    <div class="slide-yellow-stripe">
      <h2 class="slide-title-text">9. Testing &amp; System Verification</h2>
      <div class="slide-speaker-pill">Speaker: Member 4 (Backend Lead)</div>
    </div>

    <div class="slide-content-area">
      <div class="slide-lead-bar">
        Rigorous testing and verification proving the software is stable and secure
      </div>

      <div class="deck-grid-2">
        <div class="deck-card deck-card-purple">
          <h4>20 / 20 Test Cases Passed (100% Success)</h4>
          <ul class="direct-points">
            <li><strong>Wallet Creation:</strong> 12 words generated and verified successfully.</li>
            <li><strong>Wallet Recovery:</strong> Restored exact same address using seed phrase.</li>
            <li><strong>Password Protection:</strong> Wrong password blocked with decryption error.</li>
            <li><strong>Live Transfers:</strong> Confirmed native ETH and ERC-20 transfers on Sepolia.</li>
            <li><strong>Address Book:</strong> Tested adding, editing, and deleting contacts.</li>
            <li><strong>Mobile Responsive:</strong> Verified on desktop, tablet, and mobile browsers.</li>
          </ul>
        </div>

        <div class="deck-card deck-card-gold">
          <h4>Security &amp; Performance Verification</h4>
          <ul class="direct-points">
            <li><strong>Network Inspection:</strong> Monitored browser network traffic — 0 private keys or seed words ever sent across internet.</li>
            <li><strong>Sub-Second Unlock (~342ms):</strong> Fast, smooth user experience while using military-grade Scrypt encryption.</li>
            <li><strong>Gas Efficiency:</strong> 21,000 exact gas units used for native ETH transfers with zero wasted fees.</li>
            <li><strong>Postman API Suite:</strong> All 10 backend endpoints tested and validated.</li>
          </ul>
        </div>
      </div>

      <div class="slide-counter">Quantum University • Department of Computer Applications • Slide 10 of 12</div>
    </div>
  </div>

  <!-- =========================================================================
       SLIDE 11: FUTURE ENHANCEMENTS
       ========================================================================= -->
  <div class="slide content-slide">
    <div class="slide-yellow-stripe">
      <h2 class="slide-title-text">10. Future Enhancements &amp; Roadmap</h2>
      <div class="slide-speaker-pill">Speaker: Member 4 (Backend Lead)</div>
    </div>

    <div class="slide-content-area">
      <div class="slide-lead-bar">
        Exciting production features planned for the next development versions
      </div>

      <div class="deck-grid-3">
        <div class="deck-card deck-card-purple">
          <h4>1. Social Recovery (ERC-4337)</h4>
          <ul class="direct-points">
            <li><strong>Smart Contract Wallets:</strong> Transform accounts into smart contracts.</li>
            <li><strong>Guardian Recovery:</strong> Let trusted friends or family help you recover your wallet if you lose your password.</li>
            <li><strong>Gasless Transactions:</strong> Pay gas fees directly in USDC stablecoins.</li>
          </ul>
        </div>

        <div class="deck-card deck-card-gold">
          <h4>2. Biometric Unlock</h4>
          <ul class="direct-points">
            <li><strong>Face ID &amp; Touch ID:</strong> Unlock wallet using fingerprint or face recognition (WebAuthn / Passkeys).</li>
            <li><strong>Hardware Wallets:</strong> Plug in Ledger or Trezor USB hardware wallets for maximum cold storage security.</li>
          </ul>
        </div>

        <div class="deck-card deck-card-purple">
          <h4>3. Mobile App &amp; Swaps</h4>
          <ul class="direct-points">
            <li><strong>Mobile App:</strong> Launch on Google Play Store and Apple App Store using React Native.</li>
            <li><strong>In-App Swaps:</strong> Swap directly between ETH and USDC inside the wallet using Uniswap.</li>
            <li><strong>Layer-2 Rollups:</strong> Support Arbitrum &amp; Optimism for 95% cheaper fees.</li>
          </ul>
        </div>
      </div>

      <div class="slide-counter">Quantum University • Department of Computer Applications • Slide 11 of 12</div>
    </div>
  </div>

  <!-- =========================================================================
       SLIDE 12: CONCLUSION & Q&A
       ========================================================================= -->
  <div class="slide content-slide">
    <div class="slide-yellow-stripe">
      <h2 class="slide-title-text">11. Conclusion &amp; Acknowledgements</h2>
      <div class="slide-speaker-pill">Session Lead: Member 1 (Team Leader)</div>
    </div>

    <div class="slide-content-area">
      <div class="slide-lead-bar">
        Summary of achievements and open evaluation panel viva defense
      </div>

      <div class="deck-grid-2">
        <div class="deck-card deck-card-purple" style="justify-content: center;">
          <h4>Summary of Achievements</h4>
          <ul class="direct-points">
            <li>Built a full-stack, working non-custodial cryptocurrency wallet from scratch.</li>
            <li>Eliminated third-party exchange risks by keeping private keys in the user's browser.</li>
            <li>Implemented military-grade Scrypt and AES-128 encryption with zero-knowledge cloud backup.</li>
            <li>Successfully executed real live transactions on the Ethereum Sepolia blockchain.</li>
          </ul>
        </div>

        <div class="deck-card" style="border: 2px dashed #701c64; text-align: center; justify-content: center; padding: 18px; background: #fdfafd;">
          <h3 style="font-size: 26pt; color: #701c64; margin: 0 0 8px 0; font-weight: 900; letter-spacing: 1px;">
            THANK YOU
          </h3>
          <p style="font-size: 9pt; color: #475569; margin-bottom: 12px; line-height: 1.4;">
            We express our sincere gratitude to our Project Guide, <strong>Dr. Ankur Rana</strong> (Program Officer, CA), <strong>Dr. Mridula</strong> (HoD, CA), and the evaluation panel of Quantum University.
          </p>
          <div style="background: #701c64; color: #fde047; padding: 10px 16px; border-radius: 6px; font-weight: 800; font-size: 11pt; text-transform: uppercase;">
            Floor Open for Questions from the Panel
          </div>
          <div style="font-size: 8pt; color: #94a3b8; margin-top: 10px;">
            GitHub: <code>github.com/SanjeevPrasad10/fianl_year_proj</code>
          </div>
        </div>
      </div>

      <div class="slide-counter">Quantum University • Department of Computer Applications • Slide 12 of 12</div>
    </div>
  </div>

</body>
</html>
`;

const outputPath = path.join(__dirname, 'QUANTUM_UNIVERSITY_PRESENTATION_SLIDES.html');
const pdfOutputPath = path.join(__dirname, 'QUANTUM_UNIVERSITY_PRESENTATION_SLIDES.pdf');

fs.writeFileSync(outputPath, html, 'utf8');
console.log('Saved clean QUANTUM_UNIVERSITY_PRESENTATION_SLIDES.html');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const args = [
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  '--no-pdf-header-footer',
  `--print-to-pdf=${pdfOutputPath}`,
  outputPath
];

console.log('Compiling clean presentation PDF...');
const result = spawnSync(chromePath, args, { encoding: 'utf8' });

if (fs.existsSync(pdfOutputPath)) {
  const stat = fs.statSync(pdfOutputPath);
  console.log(`SUCCESS! Generated clean PDF: ${stat.size} bytes at ${pdfOutputPath}`);
} else {
  console.error('Failed to compile PDF. Exit code:', result.status, 'stderr:', result.stderr);
}
