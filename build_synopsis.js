/**
 * build_synopsis.js
 * Generates an official, publication-quality Project Synopsis for Quantum University BCA (2026)
 * Outputs:
 * 1. PROJECT_SYNOPSIS_BCA_QUANTUM_UNIVERSITY.docx (genuine Microsoft Word document)
 * 2. PROJECT_SYNOPSIS_PRINTABLE.html (A4 styled HTML with Quantum green theme)
 * 3. PROJECT_SYNOPSIS_BCA_QUANTUM_UNIVERSITY.pdf (Print-ready PDF via Chrome Headless)
 * 4. PROJECT_SYNOPSIS_BCA_QUANTUM_UNIVERSITY.md (Clean academic markdown)
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const docx = require('docx');

const {
  Document, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, BorderStyle, AlignmentType, HeadingLevel,
  Header, Footer, PageNumber, PageBreak, ShadingType
} = docx;

const FONT_FAMILY = 'Times New Roman';
const COLOR_PRIMARY = '052E16'; // Deep institutional forest green
const COLOR_SECONDARY = '14532D';
const COLOR_TEXT = '111827';
const COLOR_MUTED = '4B5563';

function createTitle(text, size = 32, bold = true, color = COLOR_PRIMARY) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 240, after: 120 },
    children: [
      new TextRun({
        text,
        bold,
        size,
        font: FONT_FAMILY,
        color,
      }),
    ],
  });
}

function createSectionHeading(number, title) {
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { before: 260, after: 100 },
    keepWithNext: true,
    children: [
      new TextRun({
        text: `${number}. ${title.toUpperCase()}`,
        bold: true,
        size: 26, // 13pt
        font: FONT_FAMILY,
        color: COLOR_PRIMARY,
      }),
    ],
  });
}

function createSubHeading(title) {
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { before: 180, after: 80 },
    keepWithNext: true,
    children: [
      new TextRun({
        text: title,
        bold: true,
        size: 24, // 12pt
        font: FONT_FAMILY,
        color: COLOR_SECONDARY,
      }),
    ],
  });
}

function createBody(text, options = {}) {
  return new Paragraph({
    alignment: options.alignment || AlignmentType.JUSTIFIED,
    spacing: { before: 60, after: 90, line: 360 }, // 1.5 line spacing
    children: [
      new TextRun({
        text,
        font: FONT_FAMILY,
        size: 24, // 12pt
        color: COLOR_TEXT,
        bold: options.bold || false,
        italics: options.italics || false,
      }),
    ],
  });
}

function createBullet(boldPrefix, text) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { before: 40, after: 60, line: 340 },
    bullet: { level: 0 },
    children: [
      new TextRun({
        text: boldPrefix ? `${boldPrefix} ` : '',
        bold: true,
        font: FONT_FAMILY,
        size: 24,
        color: COLOR_PRIMARY,
      }),
      new TextRun({
        text,
        font: FONT_FAMILY,
        size: 24,
        color: COLOR_TEXT,
      }),
    ],
  });
}

function createTable(headers, rows, colWidths = []) {
  const tableRows = [];

  tableRows.push(
    new TableRow({
      tableHeader: true,
      children: headers.map((h, i) =>
        new TableCell({
          width: colWidths[i] ? { size: colWidths[i], type: WidthType.PERCENTAGE } : undefined,
          shading: { type: ShadingType.SOLID, color: COLOR_PRIMARY, fill: COLOR_PRIMARY },
          margins: { top: 100, bottom: 100, left: 120, right: 120 },
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: h,
                  bold: true,
                  font: FONT_FAMILY,
                  size: 22,
                  color: 'FFFFFF',
                }),
              ],
            }),
          ],
        })
      ),
    })
  );

  rows.forEach((row, rowIndex) => {
    const isEven = rowIndex % 2 === 0;
    const bgFill = isEven ? 'F9FAFB' : 'FFFFFF';
    tableRows.push(
      new TableRow({
        children: row.map((cellText, i) =>
          new TableCell({
            width: colWidths[i] ? { size: colWidths[i], type: WidthType.PERCENTAGE } : undefined,
            shading: { type: ShadingType.SOLID, color: bgFill, fill: bgFill },
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 1, color: 'E5E7EB' },
              bottom: { style: BorderStyle.SINGLE, size: 1, color: 'E5E7EB' },
              left: { style: BorderStyle.SINGLE, size: 1, color: 'E5E7EB' },
              right: { style: BorderStyle.SINGLE, size: 1, color: 'E5E7EB' },
            },
            children: [
              new Paragraph({
                alignment: i === 0 ? AlignmentType.LEFT : AlignmentType.LEFT,
                spacing: { before: 30, after: 30 },
                children: [
                  new TextRun({
                    text: cellText,
                    font: FONT_FAMILY,
                    size: 21,
                    color: COLOR_TEXT,
                  }),
                ],
              }),
            ],
          })
        ),
      })
    );
  });

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: tableRows,
  });
}

async function generateDocx() {
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440, // 1 inch
              bottom: 1440,
              left: 1440,
              right: 1440,
            },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: 'Quantum University | BCA Final Year Project Synopsis (2026)',
                    font: FONT_FAMILY,
                    size: 18,
                    color: COLOR_MUTED,
                    italics: true,
                  }),
                ],
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: 'Page ',
                    font: FONT_FAMILY,
                    size: 18,
                    color: COLOR_MUTED,
                  }),
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    font: FONT_FAMILY,
                    size: 18,
                    color: COLOR_MUTED,
                  }),
                  new TextRun({
                    text: ' of ',
                    font: FONT_FAMILY,
                    size: 18,
                    color: COLOR_MUTED,
                  }),
                  new TextRun({
                    children: [PageNumber.TOTAL_PAGES],
                    font: FONT_FAMILY,
                    size: 18,
                    color: COLOR_MUTED,
                  }),
                ],
              }),
            ],
          }),
        },
        children: [
          // Cover Header
          createTitle('PROJECT SYNOPSIS', 36, true, COLOR_PRIMARY),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 140 },
            children: [
              new TextRun({
                text: 'ON',
                bold: true,
                size: 22,
                font: FONT_FAMILY,
                color: COLOR_MUTED,
              }),
            ],
          }),
          createTitle('CRYPTO WALLET: A SECURE NON-CUSTODIAL MULTI-CURRENCY WEB3 WALLET WITH ENCRYPTED CLOUD BACKUP AND AI CO-PILOT', 28, true, COLOR_SECONDARY),

          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 180, after: 120 },
            children: [
              new TextRun({
                text: 'Submitted in partial fulfillment of the requirements for the degree of',
                italics: true,
                size: 22,
                font: FONT_FAMILY,
                color: COLOR_TEXT,
              }),
            ],
          }),

          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 60, after: 200 },
            children: [
              new TextRun({
                text: 'BACHELOR OF COMPUTER APPLICATIONS (BCA)',
                bold: true,
                size: 26,
                font: FONT_FAMILY,
                color: COLOR_PRIMARY,
              }),
            ],
          }),

          // Metadata Table
          createTable(
            ['Project Parameter', 'Details'],
            [
              ['Project Title', 'Crypto Wallet: Secure Non-Custodial Web3 Multi-Currency Wallet with AI Copilot'],
              ['Academic Session', '2023 - 2026 (Graduating Year: 2026)'],
              ['Course & Branch', 'Bachelor of Computer Applications (BCA)'],
              ['Department', 'Department of Computer Applications, School of Technology'],
              ['Institution', 'Quantum University, Roorkee, Uttarakhand, India'],
              ['Project Leader', 'Sanjiv Prasad (Roll No. 2401311158) - Full-Stack & Cryptography Lead'],
              ['Team Member 2', 'Satyam Saini (Roll No. 2401311160) - Frontend UI/UX & React Integration'],
              ['Team Member 3', 'Saurabh Kashyap (Roll No. 2401311161) - Blockchain Testing & QA Lead'],
              ['Project Guide', 'Prof. Mayank Chauhan, Assistant Professor, Department of Computer Applications'],
              ['Program Officer', 'Dr. Ankur Rana, Program Officer, Department of Computer Applications'],
              ['Head of Department', 'Dr. Mridula, Head of Department (HoD), Department of Computer Applications'],
            ],
            [35, 65]
          ),

          new Paragraph({ children: [new PageBreak()] }),

          // 1. Introduction
          createSectionHeading(1, 'Introduction & Background'),
          createBody('The advent of blockchain technology and decentralized finance (DeFi) has transformed financial transactions into peer-to-peer, transparent, and cryptographically verified exchanges without relying on conventional banking intermediaries. In Web3 ecosystems, cryptocurrency wallets function as the definitive digital gateway, facilitating key management, asset transfers, and decentralized application (dApp) interactions. However, contemporary cryptocurrency solutions face a critical usability-security trade-off.'),
          createBody('Centralized custodial exchanges (e.g., Binance, Coinbase, FTX) hold private keys on remote company servers. This exposes users to catastrophic counterparty risks, institutional insolvency, and centralized server breaches—summarized by the cryptographic axiom, "Not your keys, not your crypto." Conversely, traditional decentralized non-custodial wallets (such as raw browser extensions) place the entire burden of key storage on the user. A lost 12-word mnemonic seed phrase permanently freezes user funds with zero recovery mechanisms. Furthermore, non-expert users are routinely intimidated by complex hexadecimal addresses, fluctuating gas fee computations, and cryptographic signing screens.'),
          createBody('The proposed project, "Crypto Wallet," bridges this critical gap. It implements a production-grade, non-custodial Web3 cryptocurrency wallet built on the Ethereum Sepolia Testnet that guarantees true user sovereignty while providing password-encrypted cloud keystore backups and an intelligent Google Gemini AI Co-Pilot ("Aura") to guide users seamlessly through their on-chain activities.'),

          // 2. Problem Statement
          createSectionHeading(2, 'Problem Statement'),
          createBody('Mainstream digital asset management is hindered by three core vulnerabilities:'),
          createBullet('1. Centralized Custodial Risk:', 'Users depositing funds in centralized exchanges forfeit cryptographic ownership of their private keys, leaving their capital vulnerable to platform insolvency, hacks, and arbitrary withdrawal halts.'),
          createBullet('2. The Non-Custodial Key Loss Trap:', 'Traditional decentralized wallets require users to store 12-word recovery phrases entirely offline. Hardware failure, misplaced paper notes, or accidental cache wiping leads to permanent, irreversible loss of all digital wealth.'),
          createBullet('3. High Technical Barrier of Entry:', 'Novice Web3 users struggle with estimating transaction gas limits, verifying 42-character recipient addresses, identifying ERC-20 token contracts, and executing error-free transfers.'),

          // 3. Objectives
          createSectionHeading(3, 'Objectives of the Project'),
          createBody('The primary technical and academic objectives of this project are:'),
          createBullet('Client-Side Cryptographic Sovereignty:', 'To implement client-side key generation (BIP-39 mnemonic phrases and BIP-32/44 hierarchical deterministic derivation) using Ethers.js, ensuring private keys are generated strictly in the browser RAM and never transmitted to any server in plaintext.'),
          createBullet('Zero-Knowledge Encrypted Cloud Keystore Backup:', 'To design an encrypted backup mechanism utilizing Scrypt Key Derivation Function (KDF) and AES-128-CTR symmetric encryption, enabling users to restore their wallet from any device using their personal password without compromising self-custody.'),
          createBullet('Multi-Asset Ethereum Sepolia Integration:', 'To establish live bi-directional RPC connectivity with the Ethereum Sepolia Testnet, enabling real-time balance queries and on-chain transfers for Native Ether (ETH) and ERC-20 smart contract tokens (USDC and LINK).'),
          createBullet('Dynamic EIP-1559 Gas Estimation:', 'To integrate automated gas fee computation in Gwei, ETH, and real-time fiat USD conversion, protecting users against failed transactions or excessive fee payments.'),
          createBullet('Integrated AI Co-Pilot ("Aura"):', 'To embed an autonomous conversational AI agent powered by Google Gemini 1.5 Flash that interprets natural language prompts (e.g., "Prepare 0.01 ETH to Bob"), parses addresses, validates balances, and safely drafts transactions for client-side user approval.'),

          // 4. Scope
          createSectionHeading(4, 'Scope of the Project'),
          createSubHeading('In-Scope Deliverables:'),
          createBullet('Cryptographic Engine:', '12-word BIP-39 mnemonic generation, 256-bit private key derivation, Web3 standard JSON keystore encryption/decryption, and local EIP-191 / EIP-1559 cryptographic signing.'),
          createBullet('Full-Stack Web Architecture:', 'Responsive, dark-themed React 18 single-page application (SPA), Node.js/Express REST backend, and MongoDB database for user authentication, contact book, and ciphertext keystore backups.'),
          createBullet('Blockchain Operations:', 'Native ETH send/receive, ERC-20 token contract execution (transfer and balanceOf), real-time gas fee estimation via Infura/Alchemy RPC endpoints, and live Sepolia Etherscan transaction tracking.'),
          createBullet('Intelligent Co-Pilot:', 'Conversational assistance, balance inquiry, recipient validation, and automatic transfer form pre-filling with zero access to private keys.'),
          createSubHeading('Delimitations (Out of Scope):'),
          createBullet('Network Environment:', 'The project targets the Ethereum Sepolia Proof-of-Stake (PoS) Testnet. Real fiat off-ramping and live mainnet real-money transactions are excluded to safeguard academic resources.'),
          createBullet('Non-EVM Blockchains:', 'Non-EVM networks (such as Bitcoin Script, Solana, and Cardano) are excluded from the current scope.'),

          // 5. Literature Survey
          createSectionHeading(5, 'Literature Survey & Comparative Analysis'),
          createBody('A comparative study of existing cryptocurrency storage mechanisms reveals significant technical trade-offs:'),
          createTable(
            ['Feature / Dimension', 'Centralized Exchanges (CEX)', 'MetaMask / Trust Wallet', 'Proposed Crypto Wallet'],
            [
              ['Private Key Custody', 'Custodial (Exchange holds key)', 'Non-Custodial (Local client)', 'Non-Custodial (Local client)'],
              ['Key Recovery Mechanism', 'Email / Phone OTP', '12-word seed phrase only', 'Password-encrypted cloud keystore + 12 words'],
              ['Server Knowledge of Key', 'Full plaintext access', 'Zero knowledge', 'Zero knowledge (AES-128-CTR encrypted)'],
              ['AI Natural Language Agent', 'None', 'None', 'Built-in Gemini AI Co-Pilot ("Aura")'],
              ['Gas Fee Transparency', 'Fixed platform withdrawal fee', 'Dynamic Gwei slider', 'Real-time Gwei, ETH, and live USD equivalent'],
              ['Multi-Device Sync', 'Seamless login', 'Manual seed phrase re-entry', 'Secure encrypted keystore cloud sync'],
            ],
            [25, 25, 25, 25]
          ),

          // 6. Methodology & System Architecture
          createSectionHeading(6, 'Methodology & System Architecture'),
          createBody('The project follows an Agile Iterative Development Lifecycle, allowing incremental development, rigorous security auditing, and continuous testing across sprints.'),
          createSubHeading('Three-Tier Architectural Framework:'),
          createBullet('1. Presentation & Cryptographic Tier (Frontend):', 'Developed with React 18, Vite, and Tailwind CSS. All cryptographic operations—including seed generation, private key handling, and transaction signing—occur entirely inside browser memory via Ethers.js v6. Private keys are never logged, persisted in plaintext, or transmitted over the network.'),
          createBullet('2. Application & AI Engine Tier (Backend):', 'Constructed with Node.js and Express.js. Handles user authentication (JWT + bcrypt), transaction logging, address book management, and houses the AI Co-Pilot controller integrated with the Google Gemini 1.5 Flash API.'),
          createBullet('3. Persistence & Blockchain Tier:', 'Comprises MongoDB Atlas for storing hashed user credentials and AES-128 encrypted keystore blobs, alongside the Ethereum Sepolia Testnet accessed via high-speed JSON-RPC nodes.'),
          createSubHeading('Zero-Knowledge Security Workflow:'),
          createBody('When a user creates an account, a 12-word BIP-39 mnemonic is generated client-side. The user enters a local wallet password. Ethers.js applies the Scrypt Key Derivation Function (N=8192, r=8, p=1) to generate a derived cryptographic key, which then encrypts the private key using AES-128 in Counter Mode (CTR). Only this encrypted ciphertext is synchronized with MongoDB. Neither university administrators nor database breaches can decipher the wallet without the user\'s master password.'),

          // 7. Hardware & Software Requirements
          createSectionHeading(7, 'System Requirements'),
          createSubHeading('Hardware Requirements:'),
          createBullet('Development Machine:', 'Intel Core i5 (8th Gen or higher) / AMD Ryzen 5, 8 GB RAM (16 GB recommended), 256 GB SSD storage, broadband Internet connectivity.'),
          createBullet('Client Deployment Device:', 'Any modern computing device (Desktop/Laptop/Tablet) with at least 4 GB RAM and modern web browser support.'),
          createSubHeading('Software Requirements:'),
          createBullet('Operating System:', 'Microsoft Windows 10/11, macOS, or Ubuntu Linux 22.04 LTS.'),
          createBullet('Frontend Framework:', 'React.js 18.x, Vite 5.x, Tailwind CSS 3.x, Lucide React Icons.'),
          createBullet('Backend Framework:', 'Node.js 20.x LTS, Express.js 4.x, JSON Web Tokens (jsonwebtoken), bcryptjs.'),
          createBullet('Cryptography & Web3:', 'Ethers.js v6.17.0, BIP-39 library, QR-Code canvas generator.'),
          createBullet('Database Management:', 'MongoDB Community Edition / MongoDB Atlas, Mongoose ODM.'),
          createBullet('Artificial Intelligence:', 'Google Gemini 1.5 Flash via @google/genai SDK.'),
          createBullet('Blockchain Infrastructure:', 'Ethereum Sepolia Testnet, Sepolia Etherscan Block Explorer, Alchemy/Infura RPC.'),

          // 8. Module Description
          createSectionHeading(8, 'Project Modules & Technical Specifications'),
          createBullet('Module 1 - Authentication & Security:', 'Handles user registration and login with bcrypt-hashed passwords (10 salt rounds) and stateless JWT token authorization stored securely in client memory.'),
          createBullet('Module 2 - Non-Custodial Key Generator:', 'Generates cryptographically random 128-bit entropy, formats it into 12 English words per BIP-39, derives the primary secp256k1 keypair at path m/44\'/60\'/0\'/0/0, and executes client-side Scrypt/AES encryption.'),
          createBullet('Module 3 - Asset Management & Balance Engine:', 'Queries RPC providers for real-time Ether balance and queries standard ERC-20 contract ABIs for token balances (Mock USDC & LINK). Fetches real-time price feeds via CoinGecko APIs.'),
          createBullet('Module 4 - Transaction Signing & Broadcasting Engine:', 'Constructs raw EIP-1559 Ethereum transactions with dynamic base fees and priority tips. The client-side signer signs the transaction hash using the private key in RAM and broadcasts the signed hex string to Sepolia.'),
          createBullet('Module 5 - Address Book & Transaction History:', 'Allows users to store named recipient contacts and displays paginated historical transfers with status badges and one-click Etherscan links.'),
          createBullet('Module 6 - AI Agent Co-Pilot ("Aura"):', 'Provides interactive chat assistance. Natural language instructions are analyzed using function-calling tools to draft transactions, evaluate gas costs, and answer blockchain concepts without accessing private keys.'),

          // 9. Work Schedule / Timeline
          createSectionHeading(9, 'Project Schedule & Milestones (SDLC Timeline)'),
          createTable(
            ['Phase / Milestone', 'Duration', 'Key Deliverables', 'Status'],
            [
              ['1. Requirements & SRS', 'Week 1 - 2', 'Literature review, problem definition, architecture specs', 'Completed'],
              ['2. Cryptographic Core', 'Week 3 - 5', 'BIP-39 mnemonic, Ethers.js keypair, Scrypt/AES keystore', 'Completed'],
              ['3. Backend & REST API', 'Week 6 - 8', 'Express server, MongoDB schemas, JWT auth, backup routes', 'Completed'],
              ['4. Frontend UI & Web3', 'Week 9 - 11', 'React dashboard, Send/Receive screens, Etherscan integration', 'Completed'],
              ['5. AI Agent Co-Pilot', 'Week 12 - 13', 'Gemini 1.5 Flash tool calling, chat interface, error handling', 'Completed'],
              ['6. Testing & Auditing', 'Week 14 - 15', '20 functional test cases, security audit, gas fee verification', 'Completed'],
              ['7. Documentation & Viva', 'Week 16', 'Word project report, synopsis, slide presentation, code sync', 'Completed'],
            ],
            [22, 18, 45, 15]
          ),

          // 10. Expected Outcomes
          createSectionHeading(10, 'Expected Deliverables & Outcomes'),
          createBullet('Fully Functional Web Application:', 'A production-grade, deployed Web3 wallet running on Ethereum Sepolia Testnet with full multi-asset sending and receiving capabilities.'),
          createBullet('Enhanced User Security:', 'Total immunity from centralized custodian bankruptcy; user keys remain confidential, self-custodied, and recoverable via password-encrypted keystores.'),
          createBullet('AI-Augmented Usability:', 'Dramatically reduced barrier for non-technical users to interact with blockchain infrastructure using natural language.'),
          createBullet('Comprehensive Academic Documentation:', '38-page university project report, official project synopsis, presentation slide deck, and public Git repository.'),

          // 11. Signatures
          createSectionHeading(11, 'Faculty Approval & Signatures'),
          new Paragraph({ spacing: { before: 200, after: 120 } }),
          createTable(
            ['Prepared & Submitted By', 'Supervised & Recommended By', 'Verified & Approved By'],
            [
              [
                'Sanjiv Prasad (Roll: 2401311158)\nSatyam Saini (Roll: 2401311160)\nSaurabh Kashyap (Roll: 2401311161)\n\n\n___________________________\nStudent Signature(s)',
                'Prof. Mayank Chauhan\nAssistant Professor\nDepartment of Computer Applications\n\n\n___________________________\nProject Guide Signature',
                'Dr. Ankur Rana (Program Officer)\nDr. Mridula (Head of Department)\nDepartment of Computer Applications\n\n\n___________________________\nDepartment Seal & Signature',
              ],
            ],
            [34, 33, 33]
          ),

          // 12. References
          new Paragraph({ children: [new PageBreak()] }),
          createSectionHeading(12, 'References & Bibliography'),
          createBullet('[1]', 'Nakamoto, S. (2008). "Bitcoin: A Peer-to-Peer Electronic Cash System." Decentralized Business Review, 21260.'),
          createBullet('[2]', 'Buterin, V. (2014). "Ethereum: A Next-Generation Smart Contract and Decentralized Application Platform." Ethereum Whitepaper.'),
          createBullet('[3]', 'Palatinus, M., & Rusnak, P. (2013). "Bitcoin Improvement Proposal 39 (BIP-39): Mnemonic code for generating deterministic keys." Bitcoin GitHub Repository.'),
          createBullet('[4]', 'National Institute of Standards and Technology (NIST). (2001). "Advanced Encryption Standard (AES)." FIPS PUB 197.'),
          createBullet('[5]', 'Percival, C. (2009). "Stronger Key Derivation via Sequential Memory-Hard Functions." BSDCan 2009.'),
          createBullet('[6]', 'Ethers.js Documentation (v6). "Complete Ethereum wallet implementation and utilities in JavaScript and TypeScript." https://docs.ethers.org/v6/'),
          createBullet('[7]', 'Google AI for Developers. (2024). "Gemini 1.5 Flash Model Overview and Function Calling Architecture." Google Cloud.'),
        ],
      },
    ],
  });

  const buffer = await docx.Packer.toBuffer(doc);
  const docxPath = path.resolve(__dirname, 'PROJECT_SYNOPSIS_BCA_QUANTUM_UNIVERSITY.docx');
  fs.writeFileSync(docxPath, buffer);
  console.log('Created DOCX:', docxPath, `(${buffer.length} bytes)`);
}

function generateHtml() {
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Project Synopsis - BCA 2026 - Quantum University</title>
  <style>
    @page {
      size: A4;
      margin: 20mm 20mm 20mm 20mm;
    }
    body {
      font-family: 'Times New Roman', Times, serif;
      font-size: 11pt;
      line-height: 1.5;
      color: #111827;
      margin: 0;
      padding: 0;
    }
    .header-bar {
      text-align: right;
      font-size: 9pt;
      color: #6b7280;
      font-style: italic;
      border-bottom: 1px solid #d1d5db;
      padding-bottom: 4px;
      margin-bottom: 24px;
    }
    .title-main {
      text-align: center;
      font-size: 18pt;
      font-weight: bold;
      color: #052e16;
      margin-top: 10px;
      margin-bottom: 4px;
      letter-spacing: 0.5px;
    }
    .title-sub {
      text-align: center;
      font-size: 10pt;
      color: #4b5563;
      margin-bottom: 12px;
      font-weight: bold;
    }
    .title-project {
      text-align: center;
      font-size: 13pt;
      font-weight: bold;
      color: #14532d;
      line-height: 1.3;
      margin-bottom: 16px;
      padding: 0 10px;
    }
    .degree-box {
      text-align: center;
      font-size: 10.5pt;
      margin-bottom: 20px;
      font-style: italic;
    }
    .degree-box strong {
      font-size: 12pt;
      font-style: normal;
      color: #052e16;
      display: block;
      margin-top: 4px;
    }
    table.meta-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
      font-size: 10pt;
    }
    table.meta-table th {
      background-color: #052e16;
      color: #ffffff;
      padding: 8px 10px;
      text-align: left;
      font-weight: bold;
      border: 1px solid #052e16;
    }
    table.meta-table td {
      padding: 7px 10px;
      border: 1px solid #e5e7eb;
    }
    table.meta-table tr:nth-child(even) td {
      background-color: #f9fafb;
    }
    h2.section-heading {
      font-size: 12.5pt;
      font-weight: bold;
      color: #052e16;
      border-bottom: 1.5px solid #052e16;
      padding-bottom: 3px;
      margin-top: 24px;
      margin-bottom: 10px;
      text-transform: uppercase;
      page-break-after: avoid;
    }
    h3.sub-heading {
      font-size: 11pt;
      font-weight: bold;
      color: #14532d;
      margin-top: 14px;
      margin-bottom: 6px;
      page-break-after: avoid;
    }
    p {
      text-align: justify;
      margin-top: 0;
      margin-bottom: 10px;
      text-indent: 0;
    }
    ul {
      margin-top: 4px;
      margin-bottom: 12px;
      padding-left: 24px;
    }
    li {
      margin-bottom: 6px;
      text-align: justify;
    }
    .page-break {
      page-break-after: always;
    }
    table.data-table {
      width: 100%;
      border-collapse: collapse;
      margin: 12px 0 18px 0;
      font-size: 9.5pt;
    }
    table.data-table th {
      background-color: #052e16;
      color: #ffffff;
      padding: 6px 8px;
      border: 1px solid #052e16;
      text-align: left;
    }
    table.data-table td {
      padding: 6px 8px;
      border: 1px solid #e5e7eb;
    }
    table.data-table tr:nth-child(even) td {
      background-color: #f9fafb;
    }
    .signatures-box {
      margin-top: 30px;
      page-break-inside: avoid;
    }
    .sig-grid {
      display: flex;
      justify-content: space-between;
      gap: 15px;
      margin-top: 10px;
    }
    .sig-col {
      flex: 1;
      border: 1px solid #d1d5db;
      border-radius: 4px;
      padding: 12px;
      background: #fdfdfd;
      font-size: 9.5pt;
    }
    .sig-col strong {
      color: #052e16;
      display: block;
      margin-bottom: 6px;
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 4px;
    }
    .sig-line {
      margin-top: 35px;
      border-top: 1px dashed #9ca3af;
      padding-top: 4px;
      font-style: italic;
      color: #4b5563;
      font-size: 8.5pt;
    }
  </style>
</head>
<body>

  <div class="header-bar">
    Quantum University, Roorkee | Department of Computer Applications | BCA Final Year Project Synopsis 2026
  </div>

  <div class="title-main">PROJECT SYNOPSIS</div>
  <div class="title-sub">FINAL YEAR BACHELOR OF COMPUTER APPLICATIONS (BCA) PROJECT</div>
  <div class="title-project">
    CRYPTO WALLET: A SECURE NON-CUSTODIAL MULTI-CURRENCY WEB3 WALLET WITH ENCRYPTED CLOUD BACKUP AND AI CO-PILOT
  </div>

  <div class="degree-box">
    Submitted in partial fulfillment of the requirements for the award of the Degree of
    <strong>BACHELOR OF COMPUTER APPLICATIONS</strong>
  </div>

  <table class="meta-table">
    <tr>
      <th style="width: 32%;">Parameter</th>
      <th style="width: 68%;">Academic Specifications</th>
    </tr>
    <tr>
      <td><strong>Project Title</strong></td>
      <td>Crypto Wallet: Secure Non-Custodial Multi-Currency Web3 Wallet with Encrypted Cloud Backup &amp; AI Copilot</td>
    </tr>
    <tr>
      <td><strong>Academic Year</strong></td>
      <td>2023 - 2026 (Graduating Batch 2026)</td>
    </tr>
    <tr>
      <td><strong>Course &amp; Department</strong></td>
      <td>Department of Computer Applications, School of Technology</td>
    </tr>
    <tr>
      <td><strong>Institution</strong></td>
      <td>Quantum University, Mandawar, 22km Milestone, Roorkee-Dehradun Highway, Roorkee, Uttarakhand</td>
    </tr>
    <tr>
      <td><strong>Project Lead &amp; Architect</strong></td>
      <td><strong>Sanjiv Prasad</strong> (Roll No. 2401311158) - Full-Stack &amp; Cryptography Lead</td>
    </tr>
    <tr>
      <td><strong>Project Team Members</strong></td>
      <td>
        <strong>Satyam Saini</strong> (Roll No. 2401311160) - Frontend UI/UX Lead<br>
        <strong>Saurabh Kashyap</strong> (Roll No. 2401311161) - Blockchain QA &amp; Testing Lead
      </td>
    </tr>
    <tr>
      <td><strong>Project Supervisor / Guide</strong></td>
      <td><strong>Prof. Mayank Chauhan</strong>, Assistant Professor, Department of Computer Applications</td>
    </tr>
    <tr>
      <td><strong>Department Leadership</strong></td>
      <td>
        <strong>Dr. Ankur Rana</strong>, Program Officer, Department of Computer Applications<br>
        <strong>Dr. Mridula</strong>, Head of Department (HoD), Department of Computer Applications
      </td>
    </tr>
  </table>

  <div class="page-break"></div>

  <h2 class="section-heading">1. Introduction &amp; Background</h2>
  <p>
    The exponential rise of decentralized ledger technologies, public blockchains, and decentralized finance (DeFi) has introduced trustless, censorship-resistant peer-to-peer financial systems. Unlike legacy centralized banking architectures governed by custodial intermediaries, Web3 transactions are cryptographically signed by end-users and permanently validated across distributed node consensus. In this ecosystem, cryptocurrency wallets serve as the primary foundational gateway, safeguarding private keys, deriving cryptographic accounts, executing smart contract calls, and tracking asset portfolios.
  </p>
  <p>
    However, existing cryptocurrency wallet paradigms suffer from a profound usability-security dichotomy. Centralized custodial exchanges (such as FTX, Binance, and Coinbase) hold the private keys on behalf of users. While convenient, this custodial model reintroduces catastrophic counterparty risk, systemic insolvency, regulatory seizures, and honeypot server breaches—demonstrated by the historic collapse of FTX in 2022. Conversely, pure decentralized wallets (like MetaMask or hardware wallets) enforce absolute user responsibility: users must manually transcribe a 12-word BIP-39 mnemonic seed phrase. If this physical backup is lost, corrupted, or destroyed, user funds are mathematically frozen forever with zero customer recourse. Furthermore, complex hexadecimal addresses (42-character hex) and fluctuating gas calculations pose intimidating barriers for everyday consumers.
  </p>
  <p>
    The proposed <strong>"Crypto Wallet"</strong> resolves this paradox by combining <strong>non-custodial cryptographic sovereignty</strong> with <strong>zero-knowledge password-encrypted cloud keystore backups</strong> and an autonomous <strong>Google Gemini AI Co-Pilot ("Aura")</strong>.
  </p>

  <h2 class="section-heading">2. Problem Statement</h2>
  <p>
    Mainstream adoption of cryptocurrency is hindered by three structural vulnerabilities:
  </p>
  <ul>
    <li><strong>Centralized Custodial Vulnerability:</strong> Users depositing assets into centralized exchanges forfeit mathematical ownership of their private keys, exposing their financial sovereignty to exchange hacks, embezzlement, and unilateral account freezes.</li>
    <li><strong>The Non-Custodial Key Loss Trap:</strong> Conventional decentralized wallets require manual seed phrase safekeeping. A single lost piece of paper, damaged hard drive, or cleared browser cache results in permanent, irreversible loss of all digital capital.</li>
    <li><strong>High Usability &amp; Transaction Anxiety:</strong> Non-technical users struggle with calculating EIP-1559 gas fees, verifying checksummed recipient hex strings, distinguishing smart contract tokens (ERC-20) from native Ether, and interpreting on-chain failure codes.</li>
  </ul>

  <h2 class="section-heading">3. Objectives of the Proposed System</h2>
  <p>
    The primary research and engineering objectives of this project are:
  </p>
  <ul>
    <li><strong>Client-Side Cryptographic Sovereignty:</strong> Generate 12-word BIP-39 mnemonic phrases and derive secp256k1 keypairs exclusively inside the client browser RAM using Ethers.js v6. Raw private keys are never transmitted across the network or persisted unencrypted.</li>
    <li><strong>Zero-Knowledge Cloud Keystore Backup:</strong> Encrypt the derived private key client-side using Scrypt Key Derivation Function (N=8192, r=8, p=1) and AES-128 in Counter Mode (CTR) before cloud storage, enabling seamless multi-device recovery via password without compromising self-custody.</li>
    <li><strong>Multi-Asset EVM Integration:</strong> Establish persistent JSON-RPC connectivity with the Ethereum Sepolia Testnet to support real-time balance tracking and transactions for Native Ether (ETH) and ERC-20 tokens (Mock USDC &amp; LINK).</li>
    <li><strong>Dynamic Gas Fee Estimation:</strong> Implement real-time gas calculations (Base Fee + Priority Tip) in Gwei, ETH, and live USD equivalent pricing via public APIs.</li>
    <li><strong>Integrated AI Agent Co-Pilot ("Aura"):</strong> Deploy a server-side natural language assistant powered by Google Gemini 1.5 Flash to parse natural language instructions, validate addresses, estimate costs, and pre-fill transaction forms safely without key exposure.</li>
  </ul>

  <h2 class="section-heading">4. Scope &amp; Delimitations</h2>
  <h3 class="sub-heading">In-Scope Features:</h3>
  <ul>
    <li>12-Word BIP-39 mnemonic phrase generation and dictionary validation.</li>
    <li>Ethereum Standard Web3 Version 3 Keystore encryption (AES-128-CTR + Scrypt).</li>
    <li>Local client-side transaction signing (EIP-1559 and legacy EVM formats).</li>
    <li>Native Sepolia ETH and ERC-20 token transfers with interactive QR codes.</li>
    <li>Full transaction history with instant Etherscan explorer block verification.</li>
    <li>Interactive AI Co-Pilot ("Aura") with custom tool calling for portfolio and transfer operations.</li>
  </ul>
  <h3 class="sub-heading">Out-of-Scope Delimitations:</h3>
  <ul>
    <li><strong>Testnet Environment:</strong> System operates on Ethereum Sepolia Testnet; real fiat off-ramping and mainnet real money transfers are omitted to prevent academic financial liability.</li>
    <li><strong>Non-EVM Blockchains:</strong> Non-Ethereum architectures (e.g., Bitcoin UTXO, Solana Sealevel, or Cardano eUTXO) are excluded from the initial release.</li>
  </ul>

  <div class="page-break"></div>

  <h2 class="section-heading">5. Literature Survey &amp; Comparative Analysis</h2>
  <table class="data-table">
    <tr>
      <th>Feature / Dimension</th>
      <th>Centralized Exchanges (CEX)</th>
      <th>MetaMask / Trust Wallet</th>
      <th>Proposed "Crypto Wallet"</th>
    </tr>
    <tr>
      <td><strong>Key Custody</strong></td>
      <td>Custodial (Platform holds key)</td>
      <td>Non-Custodial (Local browser)</td>
      <td>Non-Custodial (Local browser RAM)</td>
    </tr>
    <tr>
      <td><strong>Cloud Backup Model</strong></td>
      <td>Plaintext centralized DB</td>
      <td>None (Seed phrase only)</td>
      <td>Zero-Knowledge AES-128 Keystore</td>
    </tr>
    <tr>
      <td><strong>Recovery Method</strong></td>
      <td>Email / SMS OTP</td>
      <td>12 Words only (Permanent loss if lost)</td>
      <td>Password-encrypted cloud sync + 12 Words</td>
    </tr>
    <tr>
      <td><strong>AI Natural Language Agent</strong></td>
      <td>None</td>
      <td>None</td>
      <td>Integrated Gemini 1.5 Flash ("Aura")</td>
    </tr>
    <tr>
      <td><strong>Gas Fee Transparency</strong></td>
      <td>Arbitrary flat withdrawal fee</td>
      <td>Gwei slider (confusing to novices)</td>
      <td>Automated Gwei, ETH &amp; USD conversion</td>
    </tr>
    <tr>
      <td><strong>Multi-Asset Support</strong></td>
      <td>Internal ledger SQL update</td>
      <td>Requires manual token import</td>
      <td>Auto-detected ETH, USDC, LINK tokens</td>
    </tr>
  </table>

  <h2 class="section-heading">6. Methodology &amp; System Architecture</h2>
  <p>
    The system is built upon a <strong>Three-Tier Decoupled Architecture</strong> following strict zero-knowledge cryptographic separation:
  </p>
  <ul>
    <li><strong>Tier 1 - Presentation &amp; Cryptographic Signer (Frontend):</strong> React 18 SPA compiled via Vite. Manages user interface, address book, QR rendering, and holds the active <code>ethers.Signer</code> object strictly in volatile JavaScript heap memory. Private keys are cleared immediately on logout or lock.</li>
    <li><strong>Tier 2 - Application &amp; AI Intelligence Layer (Backend):</strong> Node.js and Express.js REST API. Manages user registration, JWT token generation, MongoDB communication, and runs the Gemini AI Agent tool executor. The backend has zero visibility into user private keys.</li>
    <li><strong>Tier 3 - Persistence &amp; Blockchain Layer:</strong> MongoDB Atlas database storing user profiles and ciphertext keystores, combined with Ethereum Sepolia nodes via Alchemy / Infura JSON-RPC endpoints.</li>
  </ul>

  <h2 class="section-heading">7. System Hardware &amp; Software Requirements</h2>
  <table class="data-table">
    <tr>
      <th style="width: 25%;">Component</th>
      <th style="width: 75%;">Requirement Specifications</th>
    </tr>
    <tr>
      <td><strong>Hardware (Dev)</strong></td>
      <td>Intel Core i5 / AMD Ryzen 5, 8 GB RAM (16 GB Recommended), 256 GB SSD, Broadband Internet</td>
    </tr>
    <tr>
      <td><strong>Hardware (User)</strong></td>
      <td>Any device running modern Chrome / Firefox / Edge / Safari with at least 2 GB RAM</td>
    </tr>
    <tr>
      <td><strong>Operating System</strong></td>
      <td>Microsoft Windows 10/11, macOS Monterey+, or Ubuntu Linux 22.04 LTS</td>
    </tr>
    <tr>
      <td><strong>Frontend Stack</strong></td>
      <td>React.js 18, Vite 5, Tailwind CSS, Lucide React, HTML5 Canvas QR Generator</td>
    </tr>
    <tr>
      <td><strong>Backend Stack</strong></td>
      <td>Node.js 20 LTS, Express.js 4, JSON Web Tokens (JWT), bcryptjs (10 salt rounds)</td>
    </tr>
    <tr>
      <td><strong>Cryptography</strong></td>
      <td>Ethers.js v6.17.0, BIP-39 Mnemonic SDK, Web3 Secret Storage Definition (V3 Keystore)</td>
    </tr>
    <tr>
      <td><strong>AI Framework</strong></td>
      <td>Google Gemini 1.5 Flash via official <code>@google/genai</code> SDK with function calling</td>
    </tr>
    <tr>
      <td><strong>Database &amp; RPC</strong></td>
      <td>MongoDB Atlas (Mongoose ODM), Ethereum Sepolia Testnet (Alchemy / Infura RPC endpoints)</td>
    </tr>
  </table>

  <div class="page-break"></div>

  <h2 class="section-heading">8. Project Schedule &amp; Work Breakdown (SDLC Timeline)</h2>
  <table class="data-table">
    <tr>
      <th>Phase</th>
      <th>Duration</th>
      <th>Key Milestones &amp; Deliverables</th>
      <th>Status</th>
    </tr>
    <tr>
      <td><strong>Phase 1: SRS &amp; Design</strong></td>
      <td>Weeks 1 - 2</td>
      <td>Literature review, problem definition, UML modeling &amp; database schemas</td>
      <td>Completed</td>
    </tr>
    <tr>
      <td><strong>Phase 2: Cryptographic Engine</strong></td>
      <td>Weeks 3 - 5</td>
      <td>BIP-39 mnemonic generator, Ethers key derivation, AES-128/Scrypt encryption</td>
      <td>Completed</td>
    </tr>
    <tr>
      <td><strong>Phase 3: Backend API</strong></td>
      <td>Weeks 6 - 8</td>
      <td>Node.js/Express REST endpoints, JWT auth, MongoDB encrypted backup routes</td>
      <td>Completed</td>
    </tr>
    <tr>
      <td><strong>Phase 4: Frontend UI &amp; Web3</strong></td>
      <td>Weeks 9 - 11</td>
      <td>React dashboard, multi-asset tracking, Send/Receive workflows, QR scanner</td>
      <td>Completed</td>
    </tr>
    <tr>
      <td><strong>Phase 5: AI Co-Pilot ("Aura")</strong></td>
      <td>Weeks 12 - 13</td>
      <td>Gemini 1.5 Flash integration, function-calling tools, safety validation</td>
      <td>Completed</td>
    </tr>
    <tr>
      <td><strong>Phase 6: Verification &amp; Testing</strong></td>
      <td>Weeks 14 - 15</td>
      <td>20 black-box test cases, gas estimation calibration, Sepolia testnet execution</td>
      <td>Completed</td>
    </tr>
    <tr>
      <td><strong>Phase 7: Final Documentation</strong></td>
      <td>Week 16</td>
      <td>Final thesis report, presentation deck, synopsis, viva preparations</td>
      <td>Completed</td>
    </tr>
  </table>

  <h2 class="section-heading">9. Expected Outcomes &amp; Impact</h2>
  <p>
    The successful completion of this project provides an innovative, academic-grade solution demonstrating that blockchain security and mainstream accessibility can harmoniously coexist:
  </p>
  <ul>
    <li><strong>Sovereign Digital Ownership:</strong> Users retain 100% mathematical ownership of their cryptographic keys, immune to third-party bank runs or platform insolvency.</li>
    <li><strong>Resilient Recovery:</strong> Eliminates the catastrophic risk of seed phrase loss through zero-knowledge encrypted cloud backups.</li>
    <li><strong>Intuitive AI Assistant:</strong> Democratizes blockchain interaction for everyday non-technical users via natural language processing.</li>
  </ul>

  <div class="signatures-box">
    <h2 class="section-heading">10. Recommendations &amp; Signatures</h2>
    <div class="sig-grid">
      <div class="sig-col">
        <strong>Submitted By:</strong>
        Sanjiv Prasad (2401311158)<br>
        Satyam Saini (2401311160)<br>
        Saurabh Kashyap (2401311161)<br>
        BCA Final Year Students
        <div class="sig-line">Signatures of Candidates</div>
      </div>
      <div class="sig-col">
        <strong>Project Supervisor:</strong>
        Prof. Mayank Chauhan<br>
        Assistant Professor<br>
        Dept. of Computer Applications<br>
        Quantum University, Roorkee
        <div class="sig-line">Signature of Project Guide</div>
      </div>
      <div class="sig-col">
        <strong>Department Approval:</strong>
        Dr. Ankur Rana (Program Officer)<br>
        Dr. Mridula (Head of Department)<br>
        School of Technology<br>
        Quantum University, Roorkee
        <div class="sig-line">HoD Signature &amp; Seal</div>
      </div>
    </div>
  </div>

  <h2 class="section-heading" style="margin-top: 24px;">11. Key References</h2>
  <p style="font-size: 9pt; margin-bottom: 4px;">[1] S. Nakamoto, "Bitcoin: A Peer-to-Peer Electronic Cash System," 2008.</p>
  <p style="font-size: 9pt; margin-bottom: 4px;">[2] V. Buterin, "Ethereum Whitepaper: A Next-Generation Smart Contract and Decentralized Application Platform," 2014.</p>
  <p style="font-size: 9pt; margin-bottom: 4px;">[3] M. Palatinus and P. Rusnak, "BIP-39: Mnemonic code for generating deterministic keys," Bitcoin Core, 2013.</p>
  <p style="font-size: 9pt; margin-bottom: 4px;">[4] NIST, "Advanced Encryption Standard (AES)," Federal Information Processing Standards Publication 197, 2001.</p>
  <p style="font-size: 9pt; margin-bottom: 4px;">[5] Ethers.js v6 Library Documentation, https://docs.ethers.org/v6/, 2024.</p>

</body>
</html>`;

  const htmlPath = path.resolve(__dirname, 'PROJECT_SYNOPSIS_PRINTABLE.html');
  fs.writeFileSync(htmlPath, htmlContent, 'utf8');
  console.log('Created HTML:', htmlPath);
  return htmlPath;
}

function generatePdf(htmlPath) {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const pdfPath = path.resolve(__dirname, 'PROJECT_SYNOPSIS_BCA_QUANTUM_UNIVERSITY.pdf');

  console.log('Compiling PDF with Chrome Headless...');
  const res = spawnSync(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--no-pdf-header-footer',
    `--print-to-pdf=${pdfPath}`,
    htmlPath
  ], { encoding: 'utf8' });

  if (fs.existsSync(pdfPath)) {
    const stats = fs.statSync(pdfPath);
    console.log('Created PDF:', pdfPath, `(${stats.size} bytes)`);

    // Copy to report/ folder as well for safe keeping
    const reportPdf = path.resolve(__dirname, 'report', 'PROJECT_SYNOPSIS_BCA_QUANTUM_UNIVERSITY.pdf');
    fs.copyFileSync(pdfPath, reportPdf);
    console.log('Archived PDF to report folder:', reportPdf);
  } else {
    console.error('Failed to generate PDF');
  }
}

async function main() {
  console.log('--- STARTING SYNOPSIS GENERATION ---');
  await generateDocx();
  const htmlPath = generateHtml();
  generatePdf(htmlPath);
  console.log('--- ALL SYNOPSIS DELIVERABLES GENERATED SUCCESSFULLY ---');
}

main().catch(err => {
  console.error('Error generating synopsis:', err);
  process.exit(1);
});
