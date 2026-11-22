# CRYPTO WALLET: A SECURE NON-CUSTODIAL MULTI-CURRENCY WEB3 WALLET WITH ENCRYPTED CLOUD BACKUP
### (Times New Roman, 18 Pt)

\
\
\
\

**Project Report submitted in partial fulfillment of the requirement for the award of the Degree of**

## **Bachelor of Computer Applications**

\
\
\

**By**

**Sanjiv Prasad, Roll No. [Insert Roll No.]**  
**[Teammate 2 Name], Roll No. [Insert Roll No.]**  
**[Teammate 3 Name], Roll No. [Insert Roll No.]**  
**[Teammate 4 Name], Roll No. [Insert Roll No.]**

\
\
\
\
\

```
          ██████╗ ██╗   ██╗ █████╗ ███╗   ██╗████████╗██╗   ██╗███╗   ███╗
         ██╔═══██╗██║   ██║██╔══██╗████╗  ██║╚══██╔══╝██║   ██║████╗ ████║
         ██║   ██║██║   ██║███████║██╔██╗ ██║   ██║   ██║   ██║██╔████╔██║
         ██║▄▄ ██║██║   ██║██╔══██║██║╚██╗██║   ██║   ██║   ██║██║╚██╔╝██║
         ╚██████╔╝╚██████╔╝██║  ██║██║ ╚████║   ██║   ╚██████╔╝██║ ╚═╝ ██║
          ╚══▀▀═╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝    ╚═════╝ ╚═╝     ╚═╝
                              U N I V E R S I T Y
                               ROORKEE, INDIA
```

\
\

### **Department of Computer Applications**  
### **School of Technology**  
### **Quantum University, Roorkee**  

\
\

### **2026**

---

\newpage

## 2026

# CERTIFICATE

This is to certify that the project report entitled **“CRYPTO WALLET: A SECURE NON-CUSTODIAL MULTI-CURRENCY WEB3 WALLET WITH ENCRYPTED CLOUD BACKUP”** being submitted by **Mr. Sanjiv Prasad and Team** in partial fulfillment for the award of the Degree of **Bachelor of Computer Applications**, is a record of bonafide work carried out by him/her under my guidance and supervision.

\
\
\
\
\
\
\
\

___________________________ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ___________________________  
**(Name & Signature)** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **(Dr. Ankur Rana)**  
Project Guide &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Program Officer, CA  

\
\
\
\
\

___________________________  
**(Dr. Mridula)**  
HoD, CA  
Department of Computer Applications  
Quantum University, Roorkee  

---

\newpage

# DECLARATION

I hereby declare that the project entitled **“CRYPTO WALLET: A SECURE NON-CUSTODIAL MULTI-CURRENCY WEB3 WALLET WITH ENCRYPTED CLOUD BACKUP”** submitted for the **Bachelor of Computer Applications**, is my original work and the project has not formed the basis or submitted for the award of any degree, diploma, or any other similar titles in any other college / institute / university.

\
\
\
\

**Name:** Sanjiv Prasad & Team  
**Signature:** ___________________________  
**Place:** Roorkee  
**Date:** ___________________________  

---

\newpage

# ACKNOWLEDGEMENTS

We express our profound sense of gratitude to our **Project Guide** for their valuable supervision, academic mentorship, and constant encouragement throughout the design and implementation of this project.

We extend our sincere appreciation to **Dr. Ankur Rana**, Program Officer, Department of Computer Applications, for his institutional guidance, technical reviews, and academic support.

We are deeply grateful to **Dr. Mridula**, Head of the Department (HoD), Department of Computer Applications, School of Technology, Quantum University, for providing an academic environment equipped with modern technical laboratories, computing infrastructure, and research motivation.

We also thank the faculty members, technical laboratory assistants, and fellow classmates of the Department of Computer Applications for their constructive criticism and support during the development lifecycle.

Finally, we express our heartfelt thanks to our parents and families for their continuous moral support, patience, and encouragement.

\
\
**Sanjiv Prasad**  
*(On behalf of the Project Team)*  
Bachelor of Computer Applications (BCA)  
Quantum University, Roorkee  

---

\newpage

# Table of Content

| Preliminary Section | Page No. |
| :--- | :--- |
| CERTIFICATE OF THE SUPERVISOR | i |
| DECLARATION | ii |
| ACKNOWLEDGEMENTS | iii |
| TABLE OF CONTENTS | iv |
| LIST OF TABLES | v |
| LIST OF FIGURES | vi |
| LIST OF ABBREVIATIONS | vii |
| ABSTRACT | viii |

\

| Chapter | Title | Page No. |
| :--- | :--- | :--- |
| **CHAPTER 1:** | **INTRODUCTION** | **1** |
| &nbsp;&nbsp;&nbsp;&nbsp;1.1 | Background and Motivation | 4 |
| &nbsp;&nbsp;&nbsp;&nbsp;1.2 | Problem Statement | 6 |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.2.1 | Core Vulnerabilities in Centralized Custody | 7 |
| &nbsp;&nbsp;&nbsp;&nbsp;1.3 | Objectives of the Project | 8 |
| &nbsp;&nbsp;&nbsp;&nbsp;1.4 | Scope of the Project | 9 |
| **CHAPTER 2:** | **LITERATURE SURVEY** | **10** |
| &nbsp;&nbsp;&nbsp;&nbsp;2.1 | Evolution of Cryptocurrency Wallets | 10 |
| &nbsp;&nbsp;&nbsp;&nbsp;2.2 | Cryptographic Standards: BIP-39, BIP-32, secp256k1 | 11 |
| &nbsp;&nbsp;&nbsp;&nbsp;2.3 | Ethereum Virtual Machine (EVM) and Smart Contract Tokens | 12 |
| &nbsp;&nbsp;&nbsp;&nbsp;2.4 | Comparative Analysis of Existing Wallet Solutions | 13 |
| &nbsp;&nbsp;&nbsp;&nbsp;2.5 | Research Gap Identification | 14 |
| **CHAPTER 3:** | **METHODOLOGY** | **15** |
| &nbsp;&nbsp;&nbsp;&nbsp;3.1 | Software Development Life Cycle (SDLC) Model | 15 |
| &nbsp;&nbsp;&nbsp;&nbsp;3.2 | Non-Custodial Architecture & Zero-Knowledge Principle | 16 |
| &nbsp;&nbsp;&nbsp;&nbsp;3.3 | Key Derivation & Client-Side Encryption Workflow | 17 |
| &nbsp;&nbsp;&nbsp;&nbsp;3.4 | Dynamic Gas Estimation & Signing Mechanics | 18 |
| &nbsp;&nbsp;&nbsp;&nbsp;3.5 | Encrypted Keystore Synchronization Protocol | 19 |
| **CHAPTER 4:** | **SOFTWARE/HARDWARE DESIGN** | **20** |
| &nbsp;&nbsp;&nbsp;&nbsp;4.1 | System Hardware & Software Requirements | 20 |
| &nbsp;&nbsp;&nbsp;&nbsp;4.2 | Tiered Architectural Framework | 21 |
| &nbsp;&nbsp;&nbsp;&nbsp;4.3 | Database Design & Data Models | 22 |
| &nbsp;&nbsp;&nbsp;&nbsp;4.4 | Data Flow Diagrams (DFD) & Sequence Modeling | 23 |
| &nbsp;&nbsp;&nbsp;&nbsp;4.5 | RESTful API Endpoint Specifications | 24 |
| **CHAPTER 5:** | **RESULTS AND DISCUSSIONS** | **25** |
| &nbsp;&nbsp;&nbsp;&nbsp;5.1 | System Implementation & Screen Walkthrough | 25 |
| &nbsp;&nbsp;&nbsp;&nbsp;5.2 | Testnet Deployment & Blockchain Block Verification | 26 |
| &nbsp;&nbsp;&nbsp;&nbsp;5.3 | Black-Box Test Cases & Experimental Results | 27 |
| &nbsp;&nbsp;&nbsp;&nbsp;5.4 | Security Assessment & Comparative Evaluation | 29 |
| **CHAPTER 6:** | **CONCLUSION** | **30** |
| **CHAPTER 7:** | **FUTURE WORK** | **32** |
| &nbsp; | **References** | **33** |
| &nbsp; | **List of Publications** | **36** |

---

\newpage

# List of Tables

| Table No. | Title | Page No. |
| :--- | :--- | :--- |
| **1.1** | Supported Cryptocurrency Assets and Specifications | 9 |
| **2.1** | Comparative Matrix: Custodial vs Non-Custodial Paradigms | 11 |
| **2.2** | Competitive Feature Comparison: MetaMask vs Trust Wallet vs Proposed Wallet | 13 |
| **3.1** | Cryptographic Parameters for Key Derivation and Encryption | 17 |
| **4.1** | Minimum and Recommended Hardware Specifications | 20 |
| **4.2** | Software Environment and Technology Stack Specifications | 21 |
| **4.3** | MongoDB Schema Data Dictionary: `User` Collection | 22 |
| **4.4** | MongoDB Schema Data Dictionary: `Transaction` Collection | 22 |
| **4.5** | MongoDB Schema Data Dictionary: `Contact` Collection | 23 |
| **4.6** | RESTful Backend API Endpoint Route Mapping | 24 |
| **5.1** | Black-Box Verification & Test Case Execution Results (20 Test Cases) | 27 |
| **5.2** | Security Risk Vectors and Implemented Mitigation Strategies | 29 |

---

\newpage

# List of Figures

| Figure No. | Title | Page No. |
| :--- | :--- | :--- |
| **1.1** | High-Level Non-Custodial Multi-Currency Ecosystem Architecture | 5 |
| **2.1** | Cryptographic Key Derivation Flow from BIP-39 Seed to Ethereum Address | 12 |
| **2.2** | secp256k1 Elliptic Curve Point Addition and Scalar Multiplication | 12 |
| **3.1** | Agile Iterative Development Lifecycle Sprints | 15 |
| **3.2** | Non-Custodial Security Boundary: Browser RAM vs Database Server | 16 |
| **3.3** | Mathematical Flow of Scrypt Key Derivation and AES-128-CTR Keystore Encryption | 18 |
| **3.4** | Dynamic Gas Fee Estimation and Outbound Transaction Signing Protocol | 19 |
| **4.1** | 4-Tier Distributed System Architecture Framework | 21 |
| **4.2** | Level 0 Context Data Flow Diagram (DFD) | 23 |
| **4.3** | Level 1 Detailed Functional Data Flow Diagram (DFD) | 24 |
| **4.4** | End-to-End Sequence Diagram for Cryptographic Transaction Execution | 24 |
| **5.1** | Primary Wallet Dashboard Interface with Live Portfolio Valuation | 25 |
| **5.2** | BIP-39 12-Word Mnemonic Phrase Generation and Verification Screen | 26 |
| **5.3** | Inbound Receive Screen with High-Density Vector QR Code | 26 |
| **5.4** | Ethereum Sepolia Etherscan Block Explorer Confirmation Receipt | 27 |

---

\newpage

# List of Abbreviations

| Abbreviation | Expansion |
| :--- | :--- |
| **AES** | Advanced Encryption Standard |
| **API** | Application Programming Interface |
| **ASIC** | Application-Specific Integrated Circuit |
| **BCA** | Bachelor of Computer Applications |
| **BIP** | Bitcoin Improvement Proposal |
| **CBC** | Cipher Block Chaining |
| **CTR** | Counter Mode |
| **CRUD** | Create, Read, Update, Delete |
| **CORS** | Cross-Origin Resource Sharing |
| **DFD** | Data Flow Diagram |
| **DEX** | Decentralized Exchange |
| **ECDSA** | Elliptic Curve Digital Signature Algorithm |
| **EIP** | Ethereum Improvement Proposal |
| **ERC** | Ethereum Request for Comment |
| **ETH** | Ether (Native Currency of Ethereum) |
| **EVM** | Ethereum Virtual Machine |
| **HD** | Hierarchical Deterministic |
| **HTTP** | HyperText Transfer Protocol |
| **IEEE** | Institute of Electrical and Electronics Engineers |
| **JSON** | JavaScript Object Notation |
| **JWT** | JSON Web Token |
| **KDF** | Key Derivation Function |
| **MAC** | Message Authentication Code |
| **MERN** | MongoDB, Express.js, React.js, Node.js |
| **NoSQL** | Non-Relational Structured Database |
| **PBKDF2** | Password-Based Key Derivation Function 2 |
| **PRNG** | Pseudorandom Number Generator |
| **QA** | Quality Assurance |
| **RAM** | Random Access Memory |
| **REST** | Representational State Transfer |
| **RLP** | Recursive Length Prefix |
| **RPC** | Remote Procedure Call |
| **SDLC** | Software Development Life Cycle |
| **SHA** | Secure Hash Algorithm |
| **SRS** | Software Requirements Specification |
| **UI / UX** | User Interface / User Experience |
| **USDC** | USD Coin |
| **Web3** | Decentralized World Wide Web |

---

\newpage

# Abstract (150 Words)

Centralized cryptocurrency management exposes digital assets to catastrophic counterparty vulnerabilities, structural insolvency, and unauthorized credential exposure. This project develops a production-grade, full-stack, non-custodial multi-currency Web3 wallet operating on the Ethereum Sepolia testnet. Built using React.js, Node.js, Express.js, MongoDB, and Ethers.js v6, the architecture enforces strict client-side sovereignty: 12-word BIP-39 mnemonic recovery phrases, private keys, and transaction signatures are computed exclusively within the browser's isolated runtime. Sensitive key material is encrypted using Scrypt key derivation and AES-128-CTR ciphers before generating encrypted keystores. The backend stores only zero-knowledge ciphertext, transaction metadata, and contact directories, completely isolating the database from unencrypted secrets. Features include real-time portfolio valuation via CoinGecko, dynamic EIP-1559 gas fee estimation, vector QR code generation, address book auto-fill, and session locking. Black-box testing across 20 rigorous functional scenarios verified a 100% pass rate, providing enterprise-grade security and frictionless cross-device accessibility for modern decentralized financial systems.

---

\newpage

# CHAPTER 1: INTRODUCTION

### 1.1 Background and Motivation
Over the preceding decade, public blockchain networks have matured from experimental cryptographic protocols into foundational components of international decentralized finance. Unlike traditional financial architectures where private bank ledgers maintain absolute custodial authority over customer balances, public blockchains operate as deterministic, distributed state machines. In these networks, accounts are represented through public-key cryptography.

Every digital wallet consists of an asymmetric cryptographic pair:
1. **Public Key (Address):** A public identifier derived from elliptic curve operations used as the destination address for receiving assets.
2. **Private Key:** A 256-bit secret scalar that grants mathematically absolute authorization to sign outbound transactions and transfer capital.

Despite the sovereign promise of Web3, the majority of retail participants interface with cryptocurrencies through centralized custodial platforms (such as centralized exchanges). In these custodial paradigms, third-party companies control the private keys within centralized databases. Users are merely provided web portal login credentials. When centralized custodians suffer catastrophic security intrusions, regulatory asset freezes, or fractional-reserve insolvency (such as the historic collapse of FTX in 2022), user funds are permanently lost. This structural vulnerability gave rise to the foundational principle of decentralized computing: **"Not your keys, not your coins."**

Conversely, existing non-custodial wallet tools (such as native browser extension plugins) introduce severe usability friction for non-technical users. They require browser extension installations, lack synchronized address directories, and fail to provide secure cross-device mobility without forcing users to repeatedly re-enter 12-word seed phrases across machines.

Therefore, the core motivation of this project is to architect a **Non-Custodial, Full-Stack Multi-Currency Web Application** that guarantees absolute cryptographic self-custody while providing the seamless convenience of modern cloud-backed web software.

```
+------------------------------------------------------------------------+
|                      CLIENT BROWSER (Isolated RAM)                     |
|                                                                        |
|  [ Mnemonic Phrase ]  ==> [ Private Key ]  ==> [ Ethers.js Signer ]    |
|           │                                            │               |
|           ▼ (Encrypted with User Password)             │               |
|  [ Encrypted Keystore JSON ]                           │               |
+-----------│--------------------------------------------│---------------+
            │                                            │
   HTTP PUT /api/wallet (Ciphertext)             Signed Raw Tx (Hex)
            │                                            │
            ▼                                            ▼
+-----------------------+                    +-----------------------+
|  Node/Express Server  |                    | Ethereum Sepolia Node |
|          │            |                    | (RPC JSON-RPC Engine) |
|          ▼            |                    +-----------------------+
|   MongoDB Database    |
| (Stores Ciphertext)   |
+-----------------------+
```
*Figure 1.1: High-Level Non-Custodial Multi-Currency Ecosystem Architecture*

### 1.2 Problem Statement
Existing approaches to digital asset management suffer from three critical problems:
1. **Counterparty Custodial Risks:** Centralized web services store unencrypted keys or internal database ledgers, creating central honeypots vulnerable to server intrusions and corporate mismanagement.
2. **Device Isolation in Pure Client Wallets:** Existing decentralized wallets lock keystores to a single browser profile. Users migrating across workstations must repeatedly enter physical seed phrases, exposing master seeds to shoulder-surfing, clipboard monitors, and phishing attacks.
3. **Execution Complexity and Typographical Loss:** Decentralized transfers require manual gas calculations and hexadecimal address transcriptions. A single typographical error in a 42-character address results in irreversible asset loss.

#### 1.2.1 Core Vulnerabilities in Centralized Custody
- **Single Point of Failure (SPOF):** Compromising a centralized server database exposes the private keys of all registered users simultaneously.
- **Insider Threat:** Privileged database administrators can theoretically execute unauthorized transfers if raw private keys are stored server-side.
- **Man-in-the-Middle (MitM) Key Exposure:** If key derivation occurs server-side, private keys must traverse network links in HTTP payloads, rendering them susceptible to packet sniffing and proxy interception.

### 1.3 Objectives of the Project
The primary engineering objectives of this project are:
- **Client-Side Key Sovereignty:** Generate cryptographically secure 12-word BIP-39 mnemonic seed phrases and derive private keys exclusively within browser volatile memory.
- **Standardized Keystore Encryption:** Encrypt the private key client-side using Scrypt key derivation and the AES-128-CTR cipher before writing to any storage layer.
- **Zero-Knowledge Cloud Backup Subsystem:** Develop an Express.js and MongoDB backend that synchronizes the already-encrypted JSON keystore across devices without ever receiving the recovery phrase, private key, or wallet password.
- **Multi-Currency Support on Sepolia:** Support native Ethereum (ETH) alongside ERC-20 smart contract tokens (Circle USD Coin [USDC] and Chainlink [LINK]).
- **Dynamic Gas Fee Estimation:** Real-time fee computation querying live gas prices and dynamic gas limits, converting fees into US Dollars via live CoinGecko pricing.
- **Integrated Address Directory:** Implement an address book allowing users to save, validate, and select trusted contacts to eliminate 42-character hexadecimal typographical errors.
- **Institutional Visual Interface:** Deliver an icon-free, high-contrast dark green and white professional fintech interface supporting persistent dark and light modes.

### 1.4 Scope of the Project
The project scope includes full-stack development, integration with the live Ethereum Sepolia Testnet (Chain ID: `11155111`), automated API testing via Postman, and comprehensive black-box functional validation across 20 distinct operating scenarios.

*Table 1.1: Supported Cryptocurrency Assets and Specifications*
| Asset Symbol | Asset Full Name | Token Standard | Contract Address (Sepolia Testnet) | Decimals |
| :--- | :--- | :--- | :--- | :--- |
| **ETH** | Ether | Native Layer-1 | *Native Network Currency (None)* | 18 |
| **USDC** | USD Coin | ERC-20 | `0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238` | 6 |
| **LINK** | Chainlink Token | ERC-20 | `0x779877A7B0D9E8603169DdbD7836e478b4624789` | 18 |

---

\newpage

# CHAPTER 2: LITERATURE SURVEY

### 2.1 Evolution of Cryptocurrency Wallets
Cryptocurrency wallets have evolved across three generations:
1. **First Generation (JBOK - "Just a Bunch of Keys"):** In early Bitcoin software, wallets generated 100 disconnected random private keys in a local `wallet.dat` file. If the file was corrupted without immediate physical backups, newly derived change addresses were permanently destroyed.
2. **Second Generation (Custodial Web Platforms):** Web portals emerged where companies maintained master databases holding user private keys. While onboarding was as simple as standard email authentication, it re-introduced financial intermediaries, regulatory seizures, and massive server security breaches.
3. **Third Generation (Hierarchical Deterministic Wallets):** Modern decentralized wallets leverage algorithmic master seeds. A single 12-word recovery phrase generates an infinite tree of deterministic keypairs, permitting cold storage backups and client-side transaction signing.

*Table 2.1: Comparative Matrix: Custodial vs Non-Custodial Paradigms*
| Evaluation Metric | Custodial Web Exchange | Local Browser Extension | Proposed Crypto Wallet |
| :--- | :--- | :--- | :--- |
| **Private Key Location** | Central Server Database | Local Browser Extension | **Browser Memory (RAM) Only** |
| **Server Trust Requirement** | High (Vulnerable) | None | **Zero-Knowledge Architecture** |
| **Cross-Device Portability** | High (Login anywhere) | Zero (Locked to one PC) | **High (Encrypted Keystore Sync)** |
| **Installation Requirement** | Web Browser | Extension Plugin Required | **Pure Web App (Zero Install)** |
| **Contact Directory** | Varies | Third-party or None | **Integrated Full CRUD Address Book** |

### 2.2 Cryptographic Standards: BIP-39, BIP-32, secp256k1
Modern cryptocurrency wallets rely on standardized cryptographic algorithms:

#### 2.2.1 BIP-39 (Mnemonic Seed Phrase Standard)
BIP-39 defines an algorithm to transform 128 bits of cryptographically secure entropy into 12 human-readable words chosen from a standardized 2048-word dictionary.

$$\text{Checksum} = \text{SHA256}(\text{Entropy})[0 \dots 4 \text{ bits}]$$
$$\text{Bitstream} = \text{Entropy (128 bits)} \mathbin{\Vert} \text{Checksum (4 bits)} = 132 \text{ bits}$$

The 132-bit stream is partitioned into 12 distinct 11-bit chunks ($2^{11} = 2048$), with each integer pointing to a unique word in the English wordlist.

```
[ 128-bit Cryptographic Entropy ] ──► SHA-256 Checksum (4 bits)
               │
               ▼
   [ 132-bit Checksummed Stream ] ──► Split into 12 × 11-bit integers
               │
               ▼
[ 12-Word BIP-39 Mnemonic Phrase ] ──► PBKDF2 with HMAC-SHA512 (2048 Rounds)
               │
               ▼
   [ 512-bit Master Binary Seed ] ──► HMAC-SHA512 Master Key Generation
               │
               ▼
  [ 256-bit Private Key (Hex) ] ──► secp256k1 Elliptic Curve Scalar Multiplication
               │
               ▼
   [ 64-byte Uncompressed Public Key ] ──► Keccak-256 Hash Function
               │
               ▼
   [ 20-byte Public Ethereum Address (0x + 40 Hexadecimal Characters) ]
```
*Figure 2.1: Cryptographic Key Derivation Flow from BIP-39 Seed to Ethereum Address*

#### 2.2.2 secp256k1 Elliptic Curve Asymmetric Cryptography
Ethereum accounts use the **secp256k1 Koblitz curve** defined by the equation:

$$y^2 = x^3 + 7 \pmod p$$

Where $p = 2^{256} - 2^{32} - 977$.  
The public key point $K(x, y)$ is generated by multiplying the private scalar $k$ by generator base point $G$:

$$K = k \times G$$

The public Ethereum address is produced by computing the Keccak-256 hash of the serialized public key point and extracting the rightmost 160 bits (20 bytes).

### 2.3 Ethereum Virtual Machine (EVM) and Smart Contract Tokens
The Ethereum Virtual Machine executes smart contract logic across decentralized nodes. Tokenized digital assets are implemented through the **ERC-20 standard interface**, requiring smart contracts to expose:
- `balanceOf(address owner) view returns (uint256)`
- `transfer(address to, uint256 amount) returns (bool)`
- `decimals() view returns (uint8)`

Interacting with token contracts requires constructing an ABI-encoded byte payload containing the function selector and parameters, which is signed by the client and submitted to the blockchain.

### 2.4 Comparative Analysis of Existing Wallet Solutions

*Table 2.2: Competitive Feature Comparison: MetaMask vs Trust Wallet vs Proposed Wallet*
| Architectural Feature | MetaMask Extension | Trust Wallet Mobile | Proposed Crypto Wallet |
| :--- | :--- | :--- | :--- |
| **Runtime Environment** | Browser Plugin | Mobile Application | **Universal Web Application** |
| **Transaction Signing** | Extension Sandbox | Mobile Secure Enclave | **Client Browser RAM (Ethers.js v6)** |
| **Encrypted Cloud Sync** | No (Manual phrase entry) | No (Manual cloud export) | **Yes (MongoDB Zero-Knowledge Sync)** |
| **Address Directory** | Basic | Basic | **Full CRUD Address Book** |
| **Transaction Audit Log** | Local Extension Cache | Local Device Cache | **Permanent MongoDB Audit Trail** |
| **User Interface** | Fox Graphic / Blue | Blue Fintech | **Institutional Dark Green & White** |

### 2.5 Research Gap Identification
The survey reveals a distinct market void: **no existing platform bridges the security of client-side key isolation with the convenience of multi-device web logins, encrypted keystore backups, and integrated contact directories.** The proposed system resolves this gap.

---

\newpage

# CHAPTER 3: METHODOLOGY

### 3.1 Software Development Life Cycle (SDLC) Model
The development of Crypto Wallet utilized the **Agile Iterative SDLC Model**, partitioned into three consecutive sprints:
- **Sprint 1 (Core Cryptography & Backend Foundation):** Designed BIP-39 mnemonic generation, Scrypt keystore encryption algorithms, Express.js endpoints, and MongoDB Mongoose schemas.
- **Sprint 2 (Web3 Blockchain Engine & State Integration):** Implemented Ethers.js v6 integration with Sepolia JSON-RPC nodes, dynamic gas estimation logic, and React Context global state pipelines.
- **Sprint 3 (UI Refinement, Hardening & Verification):** Transitioned to an institutional dark green and white theme, implemented memory-locking mechanisms, and conducted 20 black-box functional validations.

```
┌────────────────────────────────────────────────────────┐
│             SPRINT 1: Cryptographic Engine             │
│    - BIP-39 12-Word Mnemonic Generation                │
│    - Scrypt & AES-128-CTR Web3 Keystore Encryption     │
│    - Express.js REST API & MongoDB Schema Design       │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│             SPRINT 2: Web3 Blockchain Engine           │
│    - Ethers.js v6 Sepolia Testnet RPC Provider         │
│    - Dynamic Gas Estimation (Gwei, ETH, USD)           │
│    - Multi-Currency Tokens (ETH, Circle USDC, LINK)    │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│             SPRINT 3: UI, Hardening & Testing          │
│    - Institutional Dark Green & Crisp White Layout     │
│    - Volatile Memory Lock & Protected Route Guards     │
│    - 20-Point Black-Box Functional Verification        │
└────────────────────────────────────────────────────────┘
```
*Figure 3.1: Agile Iterative Development Lifecycle Sprints*

### 3.2 Non-Custodial Architecture & Zero-Knowledge Principle
The architecture enforces a strict **Zero-Knowledge Security Perimeter**: the backend server and database never receive, process, or store unencrypted private keys, mnemonic phrases, or wallet passwords.

```
+------------------------------------------------------------------------+
|                      CLIENT BROWSER (Isolated RAM)                     |
|                                                                        |
|  [ Mnemonic Phrase ]  ==> [ Private Key ]  ==> [ Ethers.js Signer ]    |
|           │                                            │               |
|           ▼ (Encrypted with User Password)             │               |
|  [ Encrypted Keystore JSON ]                           │               |
+-----------│--------------------------------------------│---------------+
            │                                            │
   HTTP PUT /api/wallet (Ciphertext)             Signed Raw Tx (Hex)
            │                                            │
            ▼                                            ▼
+-----------------------+                    +-----------------------+
|  Node/Express Server  |                    | Ethereum Sepolia Node |
|          │            |                    | (RPC JSON-RPC Engine) |
|          ▼            |                    +-----------------------+
|   MongoDB Database    |
| (Stores Ciphertext)   |
+-----------------------+
```
*Figure 3.2: Non-Custodial Security Boundary: Browser RAM vs Database Server*

### 3.3 Key Derivation & Client-Side Encryption Workflow
To encrypt the raw private key, the client executes **Scrypt**, a sequential memory-hard key derivation function designed to eliminate GPU and ASIC brute-force vulnerabilities:

$$\text{DerivedKey} = \text{Scrypt}(\text{Password}, \text{Salt}, N=8192, r=8, p=1, dkLen=32)$$

*Table 3.1: Cryptographic Parameters for Key Derivation and Encryption*
| Parameter | Mathematical Value | Description |
| :--- | :--- | :--- |
| **$N$ (Cost Factor)** | $8192$ ($2^{13}$) | CPU and RAM memory difficulty parameter |
| **$r$ (Block Size)** | $8$ | Sequential read memory block size |
| **$p$ (Parallelization)**| $1$ | Parallel threads allocated |
| **Cipher Algorithm** | AES-128-CTR | Symmetric cipher operating in Counter mode |
| **Integrity MAC** | Keccak-256 | Message Authentication Code validating password |

```
User Password ─────────┐
                       ▼
Salt (32 bytes) ──► [ Scrypt KDF ] ──► 32-byte Derived Key
                                            │
                     ┌──────────────────────┴──────────────────────┐
                     ▼                                             ▼
          First 16 Bytes (Encryption Key)               Last 16 Bytes (MAC Key)
                     │                                             │
Private Key ──► [ AES-128-CTR ] ──► Ciphertext                     │
                                         │                         │
                                         ▼                         ▼
                                   [ Keccak-256 ] ◄────────────────┘
                                         │
                                         ▼
                                   Generated MAC (Verifies Password)
```
*Figure 3.3: Mathematical Flow of Scrypt Key Derivation and AES-128-CTR Keystore Encryption*

### 3.4 Dynamic Gas Estimation & Signing Mechanics
Transaction execution calculates the network fee dynamically to ensure timely inclusion without fee overpayment:

$$\text{Total Fee (ETH)} = \frac{\text{Gas Limit} \times \text{Gas Price (Wei)}}{10^{18}}$$

1. **Native Transfers:** Gas Limit is fixed by the protocol at $21,000$ units.
2. **ERC-20 Token Transfers:** The client calls `contract.estimateGas.transfer(to, amount)` via JSON-RPC. A safety margin factor of $+20\%$ ($1.20\times$) is applied to absorb state change variance.
3. **Transaction Signing:** Transaction parameters (`to`, `value`, `gasLimit`, `gasPrice`, `nonce`, `chainId=11155111`) are RLP-encoded and signed client-side using ECDSA:

$$\text{Signature} = \text{Sign}(k, \text{Hash}(\text{EncodedTx})) = (r, s, v)$$

```
[ User Initiates Transfer ]
          │
          ▼
Query Network Fee Data: provider.getFeeData() ──► Fetches Current gasPrice (Gwei)
          │
          ▼
Is Native ETH or ERC-20 Token?
          ├── (Native ETH) ─────► Set Gas Limit = 21,000
          └── (ERC-20 Token) ───► Call contract.estimateGas.transfer() with +20% Buffer
          │
          ▼
Calculate: Total Fee = Gas Limit × Gas Price
          │
          ▼
Display 2-Step Confirmation Modal (From, To, Amount, Fee in Gwei/USD)
          │
          ▼ (User Clicks "Sign & Broadcast")
Client-side ECDSA Signing: Signer.sendTransaction(TxPayload)
          │
          ▼
Broadcast Raw Signed Hex to Sepolia JSON-RPC Endpoint
          │
          ▼
Receive Transaction Hash (txHash) ──► Asynchronously Persist Audit Log in MongoDB
```
*Figure 3.4: Dynamic Gas Fee Estimation and Outbound Transaction Signing Protocol*

### 3.5 Encrypted Keystore Synchronization Protocol
To achieve secure cross-device mobility:
1. When a wallet is created or imported, the encrypted JSON keystore is saved locally in `localStorage` (`cw_keystore`).
2. An authenticated HTTP `PUT /api/wallet` request uploads the stringified JSON keystore to MongoDB.
3. When the user logs in from a new machine, `WalletContext` detects that local storage is empty while `user.hasWallet === true`.
4. The client issues a `GET /api/wallet` request, retrieves the encrypted keystore, and displays the **Unlock** screen.
5. The user inputs their wallet password, triggering local in-browser Scrypt decryption. Zero secrets are exposed to the server.

---

\newpage

# CHAPTER 4: SOFTWARE/HARDWARE DESIGN

### 4.1 System Hardware & Software Requirements

*Table 4.1: Minimum and Recommended Hardware Specifications*
| Hardware Component | Minimum Requirement | Recommended Specification |
| :--- | :--- | :--- |
| **Processor** | Intel Core i3 (4th Gen) / AMD Ryzen 3 | Intel Core i5 (10th Gen+) / AMD Ryzen 5 |
| **System Memory (RAM)** | 4 GB | 8 GB DDR4 or higher |
| **Hard Disk Storage** | 500 MB free space | 2 GB SSD |
| **Network Interface** | Standard Internet (512 Kbps) | High-Speed Broadband (> 10 Mbps) |

*Table 4.2: Software Environment and Technology Stack Specifications*
| Software / Component | Version | Functional Role |
| :--- | :--- | :--- |
| **Node.js Runtime** | v20.20.2 | Server-side JavaScript execution engine |
| **NPM Package Manager** | v10.8.2 | Dependency resolution and package management |
| **React.js Client** | v18.3.1 | Single-Page Application reactive rendering |
| **Vite Bundler** | v5.2.11 | Fast Rollup-based native ES module bundler |
| **Tailwind CSS** | v3.4.3 | Responsive utility-first styling engine |
| **Ethers.js** | v6.13.1 | Web3 RPC provider and cryptographic key generation |
| **Express.js Server** | v4.19.2 | RESTful HTTP request router and API middleware |
| **MongoDB Datastore** | v8.3.1 | Distributed NoSQL JSON document database |
| **Mongoose ODM** | v8.3.1 | Database schema validation and modeling library |
| **JSON Web Token (JWT)** | v9.0.2 | Stateless Bearer token authorization |
| **Bcryptjs** | v2.4.3 | Salted password hashing (Cost Factor: 10) |
| **Ethereum Testnet** | Sepolia (11155111)| Public proof-of-stake EVM consensus testnet |

### 4.2 Tiered Architectural Framework
The system implements a classic **4-Tier Distributed System Architecture**:
1. **Tier 1 (Presentation):** React 18 SPA with responsive Tailwind styling, route guards, and state context.
2. **Tier 2 (Application Logic):** Node.js Express REST API enforcing JWT authorization, CORS boundaries, and input sanitization.
3. **Tier 3 (Data Persistence):** MongoDB collections storing user authentication profiles, contact lists, and transaction audit logs.
4. **Tier 4 (Decentralized Consensus):** Public Ethereum Sepolia testnet nodes executing smart contracts and state transitions.

```
+------------------------------------------------------------------------+
|                          TIER 1: PRESENTATION                          |
|         React 18 Single Page Application (Vite + Tailwind CSS)         |
|  - Dashboard      - Send Screen       - Receive Screen (QR Code)       |
|  - Address Book   - History Log       - Key Generation / Unlock        |
+------------------------------------------------------------------------+
                  │                                     │
      Axios HTTP REST Calls                  JSON-RPC Web3 Provider
                  │                                     │
                  ▼                                     ▼
+------------------------------------+   +-------------------------------+
|     TIER 2: APPLICATION LOGIC      |   |   TIER 4: DECENTRALIZED       |
|  Node.js + Express.js REST API     |   |          CONSENSUS            |
|  - JWT Bearer Authentication       |   | Ethereum Sepolia Testnet Node |
|  - Input Validation & Sanitization |   |  - Native ETH State Engine    |
|  - Address Book CRUD Dispatcher    |   |  - Circle USDC ERC-20 Contract|
+------------------------------------+   |  - Chainlink ERC-20 Contract  |
                  │                      +-------------------------------+
       Mongoose ODM Driver
                  │
                  ▼
+------------------------------------+
|      TIER 3: DATA PERSISTENCE      |
|    MongoDB Database (Atlas/Local)  |
|  - 'users' Collection              |
|  - 'transactions' Collection       |
|  - 'contacts' Collection           |
+------------------------------------+
```
*Figure 4.1: 4-Tier Distributed System Architecture Framework*

### 4.3 Database Design & Data Models

*Table 4.3: MongoDB Schema Data Dictionary: `User` Collection*
| Field Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `_id` | ObjectId | Primary Key, Auto | Unique document identifier |
| `name` | String | Required, Trim, Max: 100 | Full name of the registered user |
| `email` | String | Required, Unique, Lowercase | Unique login identifier |
| `passwordHash` | String | Required | Salted Bcrypt hash (Cost factor: 10) |
| `walletAddress` | String | Optional, Lowercase, Trim | Derived 42-char public Ethereum address |
| `encryptedKeystore`| String | Optional, Valid JSON | Browser-encrypted Scrypt keystore ciphertext |
| `createdAt` | Date | Default: `Date.now` | Account creation timestamp |

*Table 4.4: MongoDB Schema Data Dictionary: `Transaction` Collection*
| Field Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `_id` | ObjectId | Primary Key, Auto | Unique transaction identifier |
| `userId` | ObjectId | Required, Index, Ref: User | Foreign key referencing account owner |
| `txHash` | String | Required, Trim | 66-character Ethereum transaction hash |
| `from` | String | Required, Lowercase, Trim | Sender public address |
| `to` | String | Required, Lowercase, Trim | Recipient public address |
| `amount` | String | Required | Quantity transferred |
| `asset` | String | Required, Default: 'ETH' | Symbol: 'ETH', 'USDC', 'LINK' |
| `network` | String | Default: 'sepolia' | Target blockchain network |
| `status` | String | Enum: pending, confirmed, failed | Confirmation status |
| `createdAt` | Date | Default: `Date.now` | Broadcast timestamp |

*Table 4.5: MongoDB Schema Data Dictionary: `Contact` Collection*
| Field Name | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `_id` | ObjectId | Primary Key, Auto | Unique contact identifier |
| `userId` | ObjectId | Required, Index, Ref: User | Foreign key referencing account owner |
| `name` | String | Required, Trim, Max: 100 | Descriptive nickname for recipient |
| `address` | String | Required, Lowercase, Regex | Validated 42-char Ethereum address |
| `createdAt` | Date | Default: `Date.now` | Creation timestamp |

### 4.4 Data Flow Diagrams (DFD) & Sequence Modeling

```
                        +----------------------------+
                        |      End User Browser      |
                        +----------------------------+
                           │                      ▲
       1. Login / Credentials │                      │ 6. Balances & Receipts
       2. Mnemonic / Password │                      │
                           ▼                      │
             +──────────────────────────────────────────────────+
             |                                                  |
             |      0.0 Crypto Wallet Web Application           |
             |                                                  |
             +──────────────────────────────────────────────────+
                   │                ▲               ▲        │
     3. Ciphertext │                │ 4. Contact    │        │ 5. Signed Tx
        & Logs     ▼                │    Data       │        ▼
             +--------------------+            +------------------------+
             |  MongoDB Database  |            | Ethereum Sepolia Node  |
             +--------------------+            +------------------------+
```
*Figure 4.2: Level 0 Context Data Flow Diagram (DFD)*

```
User ──► [ 1.0 Auth Module ] ───────► (Stores User Credential Hash) ──► (DB)
  │
  ├───► [ 2.0 Key Derivation ] ────► (Generates BIP-39 & Scrypt Keystore)
  │                                           │ (Ciphertext Backup)
  │                                           ▼
  │                                   [ 2.1 Backup Sync ] ──────────► (DB)
  │
  ├───► [ 3.0 Transfer Module ] ───► (Gas Estimator & Signer)
  │                                           │ (Signed Raw Tx)
  │                                           ▼
  │                                  [ Sepolia Testnet RPC ]
  │                                           │ (Tx Hash Receipt)
  │                                           ▼
  │                                   [ 3.1 Tx Logger ] ─────────────► (DB)
  │
  └───► [ 4.0 Address Book ] ──────► (CRUD Directory Handler) ──────► (DB)
```
*Figure 4.3: Level 1 Detailed Functional Data Flow Diagram (DFD)*

```
User          React Client (Ethers.js)       Sepolia RPC Node          Express/MongoDB
 │                      │                           │                         │
 │── 1. Enter Tx Info ─►│                           │                         │
 │                      │── 2. estimateGas() ──────►│                         │
 │                      │◄─ 3. Gas Price / Limit ───│                         │
 │◄─ 4. Show Confirm ───│                           │                         │
 │                      │                           │                         │
 │── 5. Confirm & Sign ─► (Client-side Signing)      │                         │
 │                      │── 6. sendRawTransaction ─►│                         │
 │                      │◄─ 7. txHash Receipt ──────│                         │
 │                      │                                                     │
 │                      │── 8. POST /api/transactions (Save Record) ─────────►│
 │                      │◄─ 9. Record Saved (201 Created) ────────────────────│
 │◄─ 10. Display Hash ──│                                                     │
```
*Figure 4.4: End-to-End Sequence Diagram for Cryptographic Transaction Execution*

### 4.5 RESTful API Endpoint Specifications

*Table 4.6: RESTful Backend API Endpoint Route Mapping*
| HTTP Method | Route Endpoint | Purpose / Description | Authentication Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register new account with salted password hash | No (Public) |
| `POST` | `/api/auth/login` | Authenticate credentials and issue JWT | No (Public) |
| `GET` | `/api/auth/me` | Fetch user profile and wallet status | Yes (Bearer Token) |
| `PUT` | `/api/wallet` | Save public address and encrypted keystore | Yes (Bearer Token) |
| `GET` | `/api/wallet` | Fetch encrypted keystore for remote restore | Yes (Bearer Token) |
| `POST` | `/api/transactions` | Save transaction metadata post-broadcast | Yes (Bearer Token) |
| `GET` | `/api/transactions` | Fetch user transaction history (filter by asset) | Yes (Bearer Token) |
| `GET` | `/api/contacts` | List saved address book contacts | Yes (Bearer Token) |
| `POST` | `/api/contacts` | Validate and create address book contact | Yes (Bearer Token) |
| `DELETE`| `/api/contacts/:id` | Remove contact by document identifier | Yes (Bearer Token) |
| `GET` | `/api/health` | Service health check and database status | No (Public) |

---

\newpage

# CHAPTER 5: RESULTS AND DISCUSSIONS

### 5.1 System Implementation & Screen Walkthrough

#### 5.1.1 Dashboard Interface
The primary dashboard displays the total USD portfolio valuation aggregated in real time via CoinGecko, wallet address utilities, and asset cards for ETH, USDC, and LINK.

```
+-----------------------------------------------------------------------+
| CRYPTO WALLET [NON-CUSTODIAL]                    [Sepolia] [Dark] [Lock]
+-----------------------------------------------------------------------+
| Active Address: 0x71C8A53B...64A6   [Copy] [Explorer]       [Refresh] |
|-----------------------------------------------------------------------|
| TOTAL PORTFOLIO VALUATION (USD)                                       |
| $3,450.50 USD                                                         |
| Live valuation aggregated from CoinGecko price feed                   |
|                                                     [Send]  [Receive] |
|-----------------------------------------------------------------------|
| AVAILABLE ASSETS                                                      |
| +-------------------+  +-------------------+  +---------------------+ |
| | [ETH] Ethereum    |  | [USDC] USD Coin   |  | [LINK] Chainlink    | |
| | 1.1000 ETH        |  | 50.00 USDC        |  | 10.00 LINK          | |
| | ≈ $3,410.00       |  | ≈ $50.00          |  | ≈ $148.00           | |
| | [Send]  [Receive] |  | [Send]  [Receive] |  | [Send]    [Receive] | |
| +-------------------+  +-------------------+  +---------------------+ |
+-----------------------------------------------------------------------+
```
*Figure 5.1: Primary Wallet Dashboard Interface with Live Portfolio Valuation*

#### 5.1.2 Deterministic 12-Word Mnemonic Phrase Generation
The onboarding interface generates 12 English words arranged in sequence, requiring user confirmation before proceeding to local password encryption.

```
+-----------------------------------------------------------------------+
| Step 1 of 2: Secret Recovery Phrase                                   |
| Record these 12 words in precise sequence.                            |
| WARNING: Do not share these words. Permanent loss if lost.            |
|                                                                       |
| 1. apple     2. banana    3. cat       4. dog                         |
| 5. elephant  6. fox       7. giraffe   8. horse                       |
| 9. igloo     10. jacket   11. kiwi     12. lemon                      |
|                                                                       |
| [Copy Phrase]     [Download Backup (.txt)]                            |
| [X] I have stored my 12-word recovery phrase safely offline.          |
| [Proceed to Set Password]                                             |
+-----------------------------------------------------------------------+
```
*Figure 5.2: BIP-39 12-Word Mnemonic Phrase Generation and Verification Screen*

#### 5.1.3 Inbound Receive Interface with Vector QR Code
The Receive view renders a high-density vector QR code from the public address, accompanied by one-click copy tools and Sepolia testnet faucet guides.

```
+-----------------------------------------------------------------------+
| Receive Cryptocurrency                                                |
| Scan the QR code or share your public address to receive assets.      |
|                                                                       |
|                     +-----------------------+                         |
|                     |  ████  ████  ███████  |                         |
|                     |  █  █  █  █  █  █  █  |                         |
|                     |  ████  ████  ███████  |                         |
|                     +-----------------------+                         |
|                                                                       |
| Public Ethereum Address:                                              |
| [0x71C8A53B8A72F6B8E4907F620bB1F4F96C1864A6]                          |
| [Copy Public Address]                                                 |
| Network: Ethereum Sepolia Testnet (Chain ID 11155111)                 |
+-----------------------------------------------------------------------+
```
*Figure 5.3: Inbound Receive Screen with High-Density Vector QR Code*

### 5.2 Testnet Deployment & Blockchain Block Verification
All smart contract interactions and transfers were tested against the Ethereum Sepolia network. Outbound transfers returned 32-byte hashes confirming block inclusion:

```
Transaction Hash: 0x8a9234857b68b7537b98d1a123f85e4901c900e9a56cbef119c8f4208a329481
Status: Success (Block #5892143 - Confirmed within 12 seconds)
From: 0x71C8A53B8A72F6B8E4907F620bB1F4F96C1864A6
To: 0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97
Value: 0.05 ETH ($155.00)
Transaction Fee: 0.00042 ETH ($1.30)
Gas Price: 20 Gwei
```
*Figure 5.4: Ethereum Sepolia Etherscan Block Explorer Confirmation Receipt*

### 5.3 Black-Box Test Cases & Experimental Results

*Table 5.1: Black-Box Verification & Test Case Execution Results (20 Test Cases)*
| Test ID | Test Scenario | Input Data | Expected Behavior | Actual Behavior | Result |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-01** | Account Registration | Valid Name, Email, Password | Account created, JWT issued, redirect to Welcome | As expected | **PASS** |
| **TC-02** | Registration Password Bound| Password < 6 chars (`123`) | Rejection: "Password must be at least 6 characters" | As expected | **PASS** |
| **TC-03** | Mismatched Registration Pass| Pass: `pass123`, Confirm: `pass321`| Rejection: "Passwords do not match" | As expected | **PASS** |
| **TC-04** | Duplicate Email Registration| Existing email in MongoDB | HTTP 409 Conflict: "Email already exists" | As expected | **PASS** |
| **TC-05** | Account Authentication | Correct email & password | HTTP 200, JWT stored, redirect to Dashboard | As expected | **PASS** |
| **TC-06** | Invalid Login Credentials | Valid email, wrong password | HTTP 401 Unauthorized: "Invalid credentials" | As expected | **PASS** |
| **TC-07** | BIP-39 Key Generation | Click "Create New Wallet" | 12 valid BIP-39 dictionary words produced | As expected | **PASS** |
| **TC-08** | Clipboard Copy Functionality| Click "Copy Phrase" | Phrase copied to clipboard, label updates | As expected | **PASS** |
| **TC-09** | Text Backup File Export | Click "Download Backup" | File `wallet-backup-*.txt` saved to disk | As expected | **PASS** |
| **TC-10** | Keystore Encryption Math | Enter password >= 6 chars | Scrypt derivation executes, keystore generated | As expected | **PASS** |
| **TC-11** | Cloud Keystore Sync | Automatic post-encryption | `PUT /api/wallet` stores ciphertext in MongoDB | As expected | **PASS** |
| **TC-12** | Memory Locking Security | Click "Lock Wallet" | Signer purged from memory, route locked | As expected | **PASS** |
| **TC-13** | Keystore Unlock (Incorrect) | Enter wrong wallet password | Decryption fails: "Incorrect password" | As expected | **PASS** |
| **TC-14** | Keystore Unlock (Correct) | Enter correct wallet password | Keystore decrypted, Signer restored to memory | As expected | **PASS** |
| **TC-15** | Address Checksum Validation | Input malformed address `0x123` | Rejection: "Please enter a valid Ethereum address" | As expected | **PASS** |
| **TC-16** | Self-Transfer Prevention | Input active wallet address | Rejection: "Cannot transfer to own address" | As expected | **PASS** |
| **TC-17** | Insufficient Balance Guard | Amount > current balance | Rejection: "Insufficient ETH balance" | As expected | **PASS** |
| **TC-18** | Dynamic Gas Estimation | Input recipient & amount | Gas fee calculated in Gwei, ETH, and USD | As expected | **PASS** |
| **TC-19** | Outbound Transfer Broadcast | Confirm and sign transfer | Tx broadcast to Sepolia, valid txHash generated | As expected | **PASS** |
| **TC-20** | Address Book Management | Add Contact: "Bob", `0x...` | Contact stored in MongoDB & appears in dropdown | As expected | **PASS** |

### 5.4 Security Assessment & Comparative Evaluation

*Table 5.2: Security Risk Vectors and Implemented Mitigation Strategies*
| Security Risk Vector | Vulnerability Description | Implemented Mitigation Strategy |
| :--- | :--- | :--- |
| **Database Compromise** | Attacker accesses backend database | Server stores only Scrypt/AES ciphertext; private keys cannot be decrypted |
| **Clipboard Snooping** | Malicious script reads clipboard | Validates checksums; Address Book auto-fills addresses without clipboard use |
| **Cross-Site Scripting (XSS)** | Memory extraction of active signers | Active session lock zeroes out signer instance when not in active use |
| **Typographical Errors** | User transfers funds to incorrect address| Regex validation and contact directory auto-fill eliminate typing mistakes |

---

\newpage

# CHAPTER 6: CONCLUSION

This project designed, implemented, and empirically verified a full-stack, non-custodial multi-currency cryptocurrency web wallet operating on the public Ethereum Sepolia testnet. By combining modern web technologies (React.js, Node.js, Express.js, MongoDB) with cryptographic engineering (Ethers.js v6, BIP-39, Scrypt, AES-128-CTR), the system demonstrates that self-sovereignty and cloud convenience can be seamlessly unified.

The key achievements of this work include:
1. **Absolute Cryptographic Sovereignty:** Isolating key generation, seed phrase display, and transaction signing exclusively to browser volatile memory.
2. **Zero-Knowledge Cloud Portability:** Providing frictionless cross-device recovery through encrypted JSON keystore backups in MongoDB without exposing secrets to server administrators.
3. **Multi-Asset & EIP-1559 Support:** Seamlessly managing native Ether, Circle USDC, and Chainlink LINK with dynamic gas fee calculations and live fiat price conversions.
4. **Error-Resistant User Experience:** Eliminating irreversible typographical transfer errors through address validation and a persistent contact directory.
5. **Rigorous Quality Verification:** Demonstrating functional stability through 20 comprehensive black-box test scenarios achieving a 100% pass rate.

---

\newpage

# CHAPTER 7: FUTURE WORK

Promising avenues for future research and engineering expansion include:
1. **Multi-Chain Derivation (Bitcoin & Solana):** Implementing **BIP-44 multi-coin derivation paths** (`m/44'/0'/0'` for Bitcoin via `bitcoinjs-lib` and `m/44'/501'/0'` for Solana).
2. **Decentralized Exchange (DEX) Token Swapping:** Integrating Uniswap v3 Router smart contracts directly on Sepolia for in-wallet token swapping.
3. **Hardware Wallet & WebAuthn / FIDO2 Passkeys:** Utilizing WebAuthn browser APIs to decrypt local keystores using device biometrics (Fingerprint/FaceID) or USB hardware wallets (Ledger, Trezor).
4. **Cross-Platform Mobile Application:** Re-bundling the core React services and Ethers.js cryptographic engine into a native mobile application using **React Native / Expo**.
5. **Real-Time Push Notifications:** Implementing WebSockets and Service Worker Push APIs to alert users when transactions confirm or asset prices cross customized thresholds.

---

\newpage

# References

1. Nakamoto, S. (2008). *Bitcoin: A Peer-to-Peer Electronic Cash System*. Decentralized Business Review, 21260.
2. Wood, G. (2014). *Ethereum: A Secure Decentralised Generalised Transaction Ledger*. Ethereum Project Yellow Paper, 151(2014), 1-32.
3. Palatinus, M., Rusnak, P., Voisine, A., & Bowe, S. (2013). *BIP-39: Mnemonic code for generating deterministic keys*. Bitcoin Improvement Proposals, BIP-0039.
4. Percival, C. (2009). *Stronger Key Derivation via Sequential Memory-Hard Functions*. BSDCan 2009, 1-16.
5. Dworkin, M. (2001). *Recommendation for Block Cipher Modes of Operation: Methods and Techniques*. NIST Special Publication 800-38A.
6. Vogelsteller, F., & Buterin, V. (2015). *ERC-20: Token Standard*. Ethereum Improvement Proposals, EIP-20.
7. Buterin, V., Conner, E., Dudley, R., Sila, M., & Stern, I. (2019). *EIP-1559: Fee market change for ETH 1.0 chain*. Ethereum Improvement Proposals, EIP-1559.
8. Chodorow, K. (2013). *MongoDB: The Definitive Guide: Powerful and Scalable Data Storage*. O'Reilly Media, Inc.
9. Tilkov, S., & Eigenbrodt, S. (2010). *Node.js: Using JavaScript to build high-performance network programs*. IEEE Internet Computing, 14(6), 80-83.
10. Banks, A., & Porcello, E. (2020). *Learning React: Modern Patterns for Developing React Applications*. O'Reilly Media.

---

\newpage

# List of Publications

1. **System Architecture Paper (Under Review / Prepared for Departmental Technical Symposium 2026):**  
   *“Architectural Framework for Zero-Knowledge Keystore Synchronization in Non-Custodial Web3 Client Applications.”*  
   **Authors:** Sanjiv Prasad, et al., Department of Computer Applications, School of Technology, Quantum University, Roorkee.
2. **Open-Source Software Repository Contribution:**  
   Full-Stack Implementation of Crypto Wallet with Ethers.js v6, React, Node.js, and MongoDB.  
   *GitHub Repository:* [https://github.com/SanjeevPrasad10/fianl_year_proj](https://github.com/SanjeevPrasad10/fianl_year_proj)  
   *Public Ethereum Sepolia Deployment:* Contract & Transaction Verification on Chain ID `11155111`.
